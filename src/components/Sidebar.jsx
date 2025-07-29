import Chats from "./Chats";
import Navbar from "./Navbar";
import Search from "./Search";
const Sidebar = ({userData}) => {
  return (
    <div className="sidebar">
      <Navbar userData={userData}/>
      <Search/>
      <Chats/>
    </div>
  )
}
export default Sidebar
