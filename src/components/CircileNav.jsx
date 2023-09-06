import { CheckOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const CircileNav = () => {
  const popup = useSelector((state) => state.popup);
  const location = useLocation();
  return (
    <Box
      sx={{
        margin: "40px 0",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: { xs: "98%", sm: "90%", md: "80%" },
          margin: "0 auto",
          position: "relative",
        }}
      >
        <Box
          className={"link"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
            position: "relative",
            "&::after": {
              content: "''",
              position: "absolute",
              left: "calc(50% - 25px)",
              top: "calc(25px - 1px)",
              backgroundColor: "#fff",
              width: "100%",
              height: "2px",
              zIndex: "-1",
            },
          }}
        >
          <Box
            className={"circle"}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundImage: popup.isOpen
                ? "linear-gradient(#c92f2f , #c92f2f)"
                : location.pathname === "/newOrders"
                ? "linear-gradient(#D0B05C , #FFDD83)"
                : "linear-gradient(#fff , #fff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            component={Link}
            to={"/newOrders"}
          >
            <CheckOutlined
              sx={{
                color: "#fff",
              }}
            />
          </Box>
        </Box>
        <Box
          className={"link"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
            position: "relative",
            "&::after": {
              content: "''",
              position: "absolute",
              left: "calc(50% - 25px)",
              top: "calc(25px - 1px)",
              backgroundColor: "#fff",
              width: "100%",
              height: "2px",
              zIndex: "-1",
            },
          }}
        >
          <Box
            className={"circle"}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundImage:
                location.pathname === "/onGoingOrders"
                  ? "linear-gradient(#D0B05C , #FFDD83)"
                  : "linear-gradient(#fff , #fff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            component={Link}
            to={"/onGoingOrders"}
          >
            <CheckOutlined
              sx={{
                color: "#fff",
              }}
            />
          </Box>
        </Box>
        <Box
          className={"link"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <Box
            className={"circle"}
            sx={{
              width: "50px",
              height: "50px",
              borderRadius: "50%",
              backgroundImage:
                location.pathname === "/pastOrders"
                  ? "linear-gradient(#D0B05C , #FFDD83)"
                  : "linear-gradient(#fff , #fff)",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            component={Link}
            to={"/pastOrders"}
          >
            <CheckOutlined
              sx={{
                color: "#fff",
              }}
            />
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: { xs: "98%", sm: "90%", md: "80%" },
          margin: "20px auto",
          padding: "10px 0",
          textTransform: "capitalize",
        }}
      >
        <Box
          className={"text"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: location.pathname === "/newOrders" ? "#FFDD83" : "#fff",
            }}
          >
            new
          </Typography>
        </Box>
        <Box
          className={"text"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color:
                location.pathname === "/onGoingOrders" ? "#FFDD83" : "#fff",
            }}
          >
            on going
          </Typography>
        </Box>
        <Box
          className={"text"}
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            flex: "1",
          }}
        >
          <Typography
            sx={{
              textAlign: "center",
              color: location.pathname === "/pastOrders" ? "#FFDD83" : "#fff",
            }}
          >
            ready to deliverd
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default CircileNav;
