import { Box, Button } from "@mui/material";
import React, { useEffect } from "react";
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import "./App.css";
import NewOrders from "./pages/NewOrders";
import OnGoingOrders from "./pages/OnGoingOrders";
import ReadyOrders from "./pages/ReadyOrders";
import CircileNav from "./components/CircileNav";
import { useJawadAuthController } from "./context";
import Pusher from "pusher-js";
import { useDispatch } from "react-redux";
import Popup from "./components/Popup";
import { setPopup } from "./Redux/Slices/PopupSlice";

const CheckAuth = () => {
  const [controller, dispatch] = useJawadAuthController();
  const navigate = useNavigate();
  useEffect(() => {
    if (!controller.isAuth) {
      navigate("/auth/login");
    }
    navigate("/newOrders");
  });
};

const App = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  useEffect(() => {
    const pusher = new Pusher("cce618d86adfad61ca7c", {
      cluster: "mt1",
    });

    const channel = pusher.subscribe("newOrder");

    channel.bind("new-order-added", (data) => {
      dispatch(
        setPopup({
          isOpen: true,
          message: "There is New Order",
          type: "ongoing",
        })
      );
    });

    return () => {
      channel.unbind();
      pusher.disconnect();
    };
  }, []);

  return (
    <Box>
      <Box>
        {!location.pathname.includes("auth") && (
          <>
            <Header />
            {/* <Navbar /> */}
            <CircileNav />
          </>
        )}
      </Box>
      <Routes>
        <Route path="/" element={<CheckAuth />} />
        <Route path="/auth/login" element={<Login />} />
        <Route path="/newOrders" element={<NewOrders />} />
        <Route path="/onGoingOrders" element={<OnGoingOrders />} />
        <Route path="/pastOrders" element={<ReadyOrders />} />
      </Routes>
      <Popup />
    </Box>
  );
};

export default App;
