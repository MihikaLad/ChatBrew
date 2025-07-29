import { useEffect, useState } from "react";
import Chat from "../components/Chat";
import Sidebar from "../components/Sidebar";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";

const Home = () => {
  const { session } = UserAuth();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchCustomUser = async () => {
      if (session?.user?.email) {
        const { data, error } = await supabase
          .from("user")
          .select("display_name, file_name")
          .eq("email", session.user.email)
          .single();

        if (!error) {
          setUserData(data);
        } else {
          console.error("User fetch error:", error.message);
        }
      }
    };

    if (session && session.user?.email) {
      fetchCustomUser();
    }
  }, [session]);
  return (
    <div className='home'>
      <div className='container'>
        <Sidebar userData={userData}/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home;
