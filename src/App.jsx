//import Register from "./pages/Register";
import Login from "./pages/Login";
import "./style.scss";

window.addEventListener('error', function (e) {
  console.error('Global error:', e.message);
});

function App() {
  return <Login/>;
}

export default App;
