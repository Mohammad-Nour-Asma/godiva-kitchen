import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OrderCard from "../components/OrderCard";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import { request } from "../api/request";
import Pusher from "pusher-js";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import PastOrderCard from "../components/PastOrderCard";
import Loader from "../components/Loader/loader";

const ReadyOrders = () => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    request({
      url: "/orders?state=3",
      method: "GET",
    })
      .then((res) => {
        setIsLoading(false);
        let reverseArray = res?.data?.data;
        setData([...reverseArray].reverse());
      })
      .catch((err) => {
        setIsLoading(false);
        setIsError(true);
        setError(err?.response?.data?.message);
      });
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "30px",
          color: "#D0B05C",
        }}
      >
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "#232323",
        padding: "20px 10px",
        minHeight: "calc(100vh - 90px)",
      }}
    >
      <GridBox spacing={2}>
        {!isError && (
          <>
            {data?.length === 0 ? (
              <Typography
                sx={{
                  color: "#D0B05C",
                  textAlign: "center",
                  width: "100%",
                  fontSize: "30px",
                  textTransform: "capitalize",
                }}
              >
                no past orders until now
              </Typography>
            ) : (
              data?.map((orderCard) => (
                <GridItem key={orderCard.id} xs={12} md={6}>
                  <OrderCard type={"ready"} orderData={orderCard} />
                </GridItem>
              ))
            )}
          </>
        )}
      </GridBox>
    </Box>
  );
};

export default ReadyOrders;
