import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../context/AuthContext";
import Gallery from "../img/gallery.png";
import { supabase } from "../supabaseClient";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpNewUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (!email || !password || !displayName) {
      setError("Please fill in all required fields.");
      setLoading(false);
      return;
    }

    try {
      const result = await signUpNewUser(email, password);

      if (result.success) {
        let imageUrl = null;

        // Optional Image Upload
        if (file) {
          const fileExt = file.name.split('.').pop();
          const filePath = `displayImg/${displayName}.${fileExt}`;

          const { error: uploadError } = await supabase.storage
            .from('avatars')
            .upload(filePath, file, { upsert: false, contentType: file.type });

          if (uploadError) {
            console.error("Upload Error:", uploadError.message || uploadError);
            setError("Image upload failed.");
            setLoading(false);
            return;
          }

          const { data: publicUrlData } = supabase.storage
            .from('avatars')
            .getPublicUrl(filePath);

          imageUrl = publicUrlData.publicUrl;
        }

        // Insert user into custom table (without id)
        const { error: insertError } = await supabase
          .from('user')
          .insert([{
            email,
            password, // plain text
            display_name: displayName,
            file_name: imageUrl || null
          }]);

        if (insertError) {
          console.error("Insert Error:", insertError.message || insertError);
          setError("Failed to store user details.");
          setLoading(false);
          return;
        }

        navigate("/Home");
      } else {
        setError(result.error.message);
      }
    } catch (error) {
      console.error("Registration failed:", error);
      setError("Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='form-container'>
      <div className='formWrapper'>
        <span className="logo">ChatBrew</span>
        <span className="title">Register</span>
        <form onSubmit={handleSignUp}>
          <input onChange={(e) => setDisplayName(e.target.value)} type="text" placeholder="Display Name" />
          <input onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          <input onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" />
          <input onChange={(e) => setFile(e.target.files[0])} style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <img src={Gallery} alt="" />
            <span>Add Profile Image (optional)</span>
          </label>
          <button disabled={loading}>Sign UP</button>
          {error && <p>{error}</p>}
        </form>
        <p>You do have an account? <a href="/login">Login</a></p>
      </div>
    </div>
  );
};

export default Register;
