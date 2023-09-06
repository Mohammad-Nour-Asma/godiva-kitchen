import { AccessTimeOutlined } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";

const Timer = ({ estimatedTime, id, updated_at }) => {
  const [timeLeft, setTimeLeft] = useState(estimatedTime);

  useEffect(() => {
    console.log(updated_at);
    const create = new Date(updated_at);
    const now = new Date();

    const createHour = create.getHours();
    const createMinut = create.getMinutes();
    const createSecond = create.getSeconds();

    now.setHours(now.getHours() - createHour);
    now.setMinutes(now.getMinutes() - createMinut);
    now.setSeconds(now.getSeconds() - createSecond);

    const diffHours = now.getHours();
    const diffMinuts = now.getMinutes();
    const diffSecond = now.getSeconds();

    // Estimated Time
    const estimatedArr = estimatedTime.split(":");
    const estimated = new Date();
    estimated.setHours(estimatedArr[0], estimatedArr[1], estimatedArr[2]);
    const day = estimated.getDay();
    estimated.setSeconds(estimated.getSeconds() - diffSecond);
    estimated.setMinutes(estimated.getMinutes() - diffMinuts);
    estimated.setHours(estimated.getHours() - diffHours);

    if (estimated.getDay() === day) {
      const startFrom = `${estimated.getHours()}:${estimated.getMinutes()}:${estimated.getSeconds()}`;
      console.log(startFrom, "realTime");
      console.log(estimatedTime, "estimated");
      setTimeLeft(startFrom);
    } else {
      setTimeLeft("00:00:00");
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const [hours, minutes, seconds] = timeLeft.split(":");
      let secondsLeft =
        Number(hours) * 3600 + Number(minutes) * 60 + Number(seconds);

      if (secondsLeft > 0) {
        secondsLeft--;
        const formattedTimeLeft = [
          Math.floor(secondsLeft / 3600),
          Math.floor((secondsLeft % 3600) / 60),
          secondsLeft % 60,
        ]
          .map((v) => String(v).padStart(2, "0"))
          .join(":");

        setTimeLeft(formattedTimeLeft);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);
  return (
    <Box
      sx={{
        backgroundColor: "#333",
        color: timeLeft == "00:00:00" ? "#d32f3c" : "#fff",
        display: "flex",
        alignItems: "center",
        gap: "5px",
        padding: "10px 5px",
      }}
    >
      <AccessTimeOutlined
        sx={{
          color: "#EECE7B",
        }}
      />
      <Typography
        sx={{
          textDecoration: "underline",
        }}
      >
        {timeLeft}
      </Typography>
      <Typography>Till order number {id} Ready</Typography>
    </Box>
  );
};

export default Timer;
