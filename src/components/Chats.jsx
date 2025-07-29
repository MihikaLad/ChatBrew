import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { useChat } from "../context/ChatContext"; // ⬅️ Import context
import { supabase } from "../supabaseClient";

const Chats = () => {
  const { session } = UserAuth();
  const { setSelectedUser } = useChat(); // ⬅️ Access setter
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (!session?.user?.email) return;

      const { data, error } = await supabase
        .from("user")
        .select("email, display_name, file_name")
        .neq("email", session.user.email); // exclude current user

      if (error) {
        console.error("Error fetching users:", error);
      } else {
        setUsers(data);
      }
    };

    fetchOtherUsers();
  }, [session]);

  return (
    <div>
      {users.map((user) => (
        <div
          className="userChat"
          key={user.email}
          onClick={() => setSelectedUser(user)} // ⬅️ Set selected chat
        >
          <img
            src={user.file_name || "/default-avatar.png"}
            alt={user.display_name}
          />
          <div className="userChatInfo">
            <span>{user.display_name || user.email}</span>
            <p>Click to chat</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;
