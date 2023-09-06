import { Box, Typography } from "@mui/material";
import React from "react";
import OrderItem from "./OrderItem";

const PastOrderCard = ({ type, orderData }) => {
  console.log(orderData);
  return (
    <Box
      className="order-card"
      sx={{
        borderRadius: "8px",
        overflow: "hidden",
      }}
    >
      <Box
        className="order-card-header"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 15px",
          backgroundColor:
            type === "waiting"
              ? "#BCBCBC"
              : type === "ongoing"
              ? "#FFDD83"
              : "#ffde83d1",
          flexWrap: "wrap",
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: "25px" },
          }}
        >
          Order ID : <b>{orderData?.id}</b>
        </Typography>
        <Box>
          <Typography
            sx={{
              fontSize: { xs: "20px" },
            }}
          >
            table : <b>{orderData?.relationship.table.table_number}</b>
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
          backgroundColor: "#333333",
        }}
      >
        {orderData?.relationships?.ready_sub_orders?.map((subOrder) => {
          return subOrder?.relationship?.order_items?.map((orderItem) => {
            return <OrderItem key={orderItem.id} orderItemData={orderItem} />;
          });
        })}
      </Box>
    </Box>
  );
};

export default PastOrderCard;
