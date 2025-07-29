import { useEffect, useState } from "react";
import { UserAuth } from "../context/AuthContext";
import { supabase } from "../supabaseClient";
import Message from "./Message";

const Messages = ({ selectedUser }) => {
  const { session } = UserAuth();
  const user = session?.user;
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (!user || !selectedUser?.email) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .or(
          `and(sender_id.eq.${user.email},receiver_id.eq.${selectedUser.email}),and(sender_id.eq.${selectedUser.email},receiver_id.eq.${user.email})`
        )
        .order("created_at", { ascending: true });

      if (!error) setMessages(data);
      else console.error("Fetch messages error:", error.message);
    };

    fetchMessages();

    const channel = supabase
      .channel("chat-messages")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "messages" },
        () => fetchMessages()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, selectedUser]);

  return (
    <div className="messages">
      {messages.map((msg) => (
        <Message key={msg.id} message={msg} isOwn={msg.sender_id === user.email} />
      ))}
    </div>
  );
};

export default Messages;
