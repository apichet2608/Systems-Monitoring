import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Drawers from "./DrawerHeader";
import { useLocation } from "react-router-dom";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MiniDrawer = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation(); // เพิ่มบรรทัดนี้

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    // เพิ่ม use effect นี้
    const pageTitle = getPageTitle();
    setPageTitle(pageTitle);
  }, [location.pathname]); // เมื่อ location.pathname เปลี่ยน

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/systems-monituring":
        return "System Monitoring";
      case "/":
        return "System Monitoring";
      default:
        return "System Monitoring";
    }
  };

  const [pageTitle, setPageTitle] = useState(getPageTitle()); // เพิ่มบรรทัดนี้

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: "#FFFFFF" }}>
        <Toolbar>
          <Drawers opens={open} onClicks={handleDrawerClose} />
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <IconButton
            color="black"
            aria-label="open drawer"
            onClick={handleDrawerClose}
            edge="start"
            sx={{
              marginRight: 5,
              ...(!open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" color={"#616161"}>
            {pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawers opens={open} onClicks={handleDrawerClose} />
    </>
  );
};

export default MiniDrawer;
