import "./util/Firebase";
import "./App.css";
import Login from "./pages/Login";
import firebase from "firebase/app";
import { useAuthState } from "react-firebase-hooks/auth";
import Home from "./pages/Home";

function App() {
  const [user, loading, error] = useAuthState(firebase.auth());
  if (loading) {
    return (
      <div>
        <h1>Loading</h1>
      </div>
    );
  } else if (user) {
    return (
      <div className="App">
        <Home />
      </div>
    );
  } else if (error) {
    return <div>{error}</div>;
  } else {
    return (
      <div className="App">
        <Login />
      </div>
    );
  }
}

export default App;
