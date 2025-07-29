// context/ChatContext.jsx
import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export const ChatContextProvider = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <ChatContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatContextProvider");
  }
  return context;
};

