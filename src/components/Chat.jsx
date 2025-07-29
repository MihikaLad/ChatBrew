import { useChat } from "../context/ChatContext";
import Add from "../img/Add.png";
import Cam from "../img/Cam.png";
import More from "../img/more.png";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { selectedUser } = useChat();
  if (!selectedUser) {
    return (
      <div className="no-chat">
        <p>Select a chat to start messaging</p>
      </div>
    );
  }
console.log("Currently selected:", selectedUser);
  return (
    <div className="chat">
      <div className="chatInfo">
        <div className="detail">
          <img src={selectedUser.file_name || "/default-avatar.png"} />
          <span>{selectedUser.display_name || selectedUser.email}</span>
        </div>
        <div className="chatIcons">
          <img src={Cam} alt="cam" />
          <img src={Add} alt="add" />
          <img src={More} alt="more" />
        </div>
      </div>
      <Messages selectedUser={selectedUser} />
      <Input selectedUser={selectedUser} />
    </div>
  );
};
export default Chat;
