const Message = ({ message, isOwn }) => {
  return (
    <div className={`message ${isOwn ? "owner" : ""}`}>
      <div className="messageInfo">
        {/* <img src="/default-avatar.png" alt="" /> */}
        <span>{new Date(message.created_at).toLocaleTimeString()}</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.image_url && message.image_url !== "" && (
          <img src={message.image_url} alt="chat" className="chat-image"/>
        )}
      </div>
    </div>
  );
};

export default Message;
