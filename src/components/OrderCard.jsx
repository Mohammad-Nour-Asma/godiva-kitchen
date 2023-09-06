import {
  Alert,
  Box,
  Button,
  IconButton,
  Snackbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import OrderItem from "./OrderItem";
import { request } from "../api/request";
import { useNavigate } from "react-router";
import CubeLoader from "./CubeLoader/CubeLoader";
import {
  AccessTimeOutlined,
  ArrowLeftOutlined,
  Check,
  CheckOutlined,
  EastOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import Timer from "./Timer";
import Loader from "./Loader/loader";

const OrderCard = ({ orderData, type, handlesub }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isCardOpen, setIsCardOpen] = useState(false);

  const navigate = useNavigate();
  const startPreaparing = () => {
    setIsLoading(true);
    request({
      url: `/start_preparing/${orderData.id}`,
      method: "PATCH",
    })
      .then((res) => {
        setIsLoading(false);
        navigate("/onGoingOrders");
        handlesub();
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err.response.data.message);
        setSnackbarOpen(true);
      });
  };

  const makeOrderReady = () => {
    setIsLoading(true);
    request({
      url: `/make_order_ready/${orderData.id}`,
      method: "PATCH",
    })
      .then((res) => {
        setIsLoading(false);
        navigate("/newOrders");
        handlesub();
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(err?.response?.data?.message);
        setSnackbarOpen(true);
      });
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setSnackbarOpen(false);
  };

  if (isLoading) {
    return <Loader />;
  }

  const date = new Date(orderData.created_at);

  return (
    <>
      <Box
        className="order-card"
        sx={{
          borderRadius: "8px",
          // overflow : 'hidden',
          position: "relative",
        }}
      >
        <IconButton
          sx={{
            position: "absolute",
            left: "50%",
            bottom: "-12.5px",
            transform: "translateX(-50%)",
            backgroundColor: "#4E4E4E",
            width: "25px",
            height: "25px",
            zIndex: "2",
            "&:hover": {
              backgroundColor: "#3E3E3E",
            },
          }}
        >
          <KeyboardArrowUp
            sx={{
              color: "white",
              transition: "0.5s",
              transform: !isCardOpen ? "rotate(0.5turn)" : "0",
            }}
          />
        </IconButton>
        <Box
          className="order-card-header"
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 15px",
            backgroundColor:
              type === "new" && orderData.newItem
                ? "#16a34a"
                : type === "new"
                ? "#4E4E4E"
                : type === "ongoing"
                ? "#F4E3B7"
                : "#EECE7B",
            flexWrap: "wrap",
            borderRadius: "8px 8px 0px 0px",
          }}
          onClick={() => setIsCardOpen(!isCardOpen)}
        >
          <Box>
            <Typography
              sx={{
                fontSize: { xs: "25px" },
              }}
            >
              Order ID : <b>{orderData?.id}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "13px" },
              }}
            >
              date : <b>{date.toLocaleString()}</b>
            </Typography>
          </Box>

          <Box>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              table : <b>{orderData?.relationship?.table?.table_number}</b>
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: "20px" },
              }}
            >
              total : {orderData?.total}SAR
            </Typography>
          </Box>
        </Box>
        <Box
          className="order-card-body"
          sx={{
            backgroundColor: "#333",
            transition: "max-height 0.5s",
            color: "#fff",
            maxHeight: !isCardOpen ? "0px" : "1000px",
            overflow: "hidden",
            borderRadius: "0px 0px 8px 8px",
          }}
        >
          {orderData?.relationship?.order_items?.map((orderItemCard) => (
            <OrderItem key={orderItemCard.id} orderItemData={orderItemCard} />
          ))}
          {type === "ongoing" && (
            <Timer
              updated_at={orderData.updated_at}
              estimatedTime={orderData.estimated_time}
              id={orderData.id}
            />
          )}
          {type === "new" ? (
            <Box
              sx={{
                marginTop: "10px",
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  border: "1px solid #FFDD83",
                  padding: "6px 25px",
                  color: "#FFDD83",
                }}
                color="success"
                onClick={startPreaparing}
                endIcon={<EastOutlined />}
              >
                start preparing
              </Button>
            </Box>
          ) : type === "ongoing" ? (
            <Box
              sx={{
                marginTop: "10px",
                padding: "10px 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
              }}
            >
              <Button
                sx={{
                  textTransform: "capitalize",
                  fontSize: "20px",
                  color: "#fff",
                  backgroundImage: "linear-gradient(90deg , #008334 , #4BFF93)",
                }}
                color="success"
                onClick={makeOrderReady}
                startIcon={<CheckOutlined />}
              >
                ready
              </Button>
            </Box>
          ) : undefined}
        </Box>
      </Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          {errorMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default OrderCard;
