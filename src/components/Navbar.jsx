import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const Navbar = () => {
  const [value, setValue] = React.useState(0);
  const popup = useSelector((state) => state.popup);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "90px",
        backgroundColor: "#3C3C3C",
        position: "relative",
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="secondary"
        textColor="inherit"
        variant="fullWidth"
        sx={{
          height: "100%",
          fontWeight: "500",
          "& .MuiTabs-flexContainer": {
            height: "100%",
          },
          "& .Mui-selected": {
            color: "#FFDD83",
          },
          "& .MuiTabs-indicator": {
            backgroundColor: "#FFDD83",
          },
        }}
      >
        <Tab
          LinkComponent={Link}
          to={"/newOrders"}
          label="new orders"
          {...a11yProps(0)}
          sx={{
            textTransform: "capitalize",
            color: "white",
            fontSize: { xs: "20px", sm: "22px", md: "26" },
          }}
        />
        <Tab
          LinkComponent={Link}
          to={"/onGoingOrders"}
          label="ongoing orders"
          {...a11yProps(1)}
          sx={{
            textTransform: "capitalize",
            color: "white",
            fontSize: { xs: "20px", sm: "22px", md: "26" },
          }}
        />
        <Tab
          LinkComponent={Link}
          to={"/pastOrders"}
          label="past orders"
          {...a11yProps(2)}
          sx={{
            textTransform: "capitalize",
            color: "white",
            fontSize: { xs: "20px", sm: "22px", md: "26" },
          }}
        />
      </Tabs>
    </Box>
  );
};

export default Navbar;
