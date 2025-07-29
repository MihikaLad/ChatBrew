import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const Search = () => {
  const { session } = UserAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (!searchTerm.trim()) {
        setResults([]);
        return;
      }

      const { data, error } = await supabase
        .from("user")
        .select("email, display_name, file_name")
        .or(`display_name.ilike.%${searchTerm}%,email.ilike.%${searchTerm}%`)
        .neq("email", session?.user?.email); // Exclude self

      if (error) {
        console.error("Search error:", error.message);
      } else {
        setResults(data);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 300); // debounce 300ms

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, session]);

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {results.map((user) => (
        <div className="userChat" key={user.email}>
          <img
            src={user.file_name || "/default-avatar.png"}
            alt={user.display_name || user.email}
          />
          <div className="userChatInfo">
            <span>{user.display_name || user.email}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Search;
