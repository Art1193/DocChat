import logo from "./logo.svg";
import "./App.css";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Home from "./components/Home";
import Error404 from "./components/Error404";
import Layout from "./components/Layout";
import About from "./components/About";
import "/node_modules/primeflex/primeflex.css";
import RoomLayout from "./components/RoomLayout";
import Registration from "./components/Signup";
import Login from "./components/Signin";
import { useFavicon } from "primereact/hooks";
import Hero from "./components/Hero";
import Profile from "./components/Profile";
import Favorates from "./components/Favorates";
import CreateRoom from "./room_assets/CreateRoom";
import { io } from "socket.io-client";
import JoinRoom from "./room_assets/JoinRoom";

const socketio = io("http://localhost:8082");

function App() {
  useFavicon("../images/logo.svg");
  return (
    <Routes>
      <Route path="/hero" element={<Hero />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="Profile" element={<Profile />}>
          <Route path="fav" element={<Favorates />}>
            <Route path="*" element={<Favorates />} />
          </Route>
        </Route>
        <Route path="createroom" element={<CreateRoom />} />
        <Route path="joinroom/:id" element={<JoinRoom />} />
        <Route path="about" element={<About />} />
        <Route path="room/:id" element={<RoomLayout socketio={socketio} />}>
          <Route path="*" element={<RoomLayout />} />
        </Route>

        {/* <Route path="dashboard" element={<Dashboard />} /> */}

        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path="*" element={<Error404 />} />
      </Route>
      <Route path="/signup" element={<Registration />} />
      <Route path="/signin" element={<Login />} />
    </Routes>
  );
}

export default App;
