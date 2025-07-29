import { useState } from "react";
import { UserAuth } from "../context/AuthContext";
import Attach from "../img/attachment.png";
import Img from "../img/gallery1.png";
import Send from "../img/send.png";
import { supabase } from "../supabaseClient"; // make sure this is exported

const Input = ({ selectedUser }) => {
  const { session } = UserAuth();
  const user = session?.user;
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSend = async () => {
    if (!user?.email || !selectedUser?.email || (!text && !file)) return;

    let imageUrl = null;

    // Upload image to Supabase storage if file exists
    if (file) {
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `chatImages/${fileName}`; // 👈 subdirectory in avatars

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload error:", uploadError.message);
        return;
      }

      const { data: publicUrlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      imageUrl = publicUrlData?.publicUrl;
    }

    // Insert message
    const { error: insertError } = await supabase.from("messages").insert([
      {
        sender_id: user?.email,
        receiver_id: selectedUser.email,
        text,
        image_url: imageUrl,
      },
    ]);

    if (insertError) {
      console.error("Message send error:", insertError.message);
    } else {
      setText("");
      setFile(null);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="Send a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div className="right">
        <div className="send">
          <img src={Attach} alt="attach" id="attach" />
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <label htmlFor="file">
            <img src={Img} alt="img" id="img" />
          </label>
          <img
            src={Send}
            alt="send"
            id="sendbtn"
            onClick={handleSend}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Input;
