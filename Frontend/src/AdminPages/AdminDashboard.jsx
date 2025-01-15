import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Notification from "./Notification";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import LogoutIcon from "@mui/icons-material/Logout";
import UploadMeal from "./UploadMeal";
import TotalOrders from "./TotalOrders";
import Reservation from "./Reservation";
import { Avatar } from "@mui/material";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import UpdateIcon from "@mui/icons-material/Update";
import DetailsIcon from "@mui/icons-material/Details";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import EditCalendarIcon from "@mui/icons-material/EditCalendar";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import Emad from "../Images/Emad.jpg";
import FastfoodIcon from "@mui/icons-material/Fastfood";
// import ReactVirtualizedTable from "./Customer";
import { Route, Routes, useNavigate } from "react-router-dom";
import AcceptedAndRejectedOrder from "./AcceptedAndRejectedOrder";
import AcceptedAndRejectedReservation from "./AcceptedAndRejectedReservation";
const drawerWidth = 240;

const routes1 = [
  {
    name: "Items",
    path: "items",
    element: <UploadMeal />,
    icon: <RestaurantIcon />,
  },
  {
    name: "Orders",
    path: "order",
    element: <TotalOrders />,
    icon: <AddShoppingCartIcon />,
  },
  //   ProductionQuantityLimitsIcon
  //   AddShoppingCartIcon
  {
    name: "Reservation",
    path: "reservation",
    element: <Reservation />,
    icon: <ContactPhoneIcon />,
  },
  {
    name: "Notification",
    path: "Notification",
    element: <Notification />,
    icon: <CircleNotificationsIcon />,
  },
];

const routes2 = [
  {
    name: "Orders Deatil",
    path: "orderDetail",
    element: <AcceptedAndRejectedOrder />,
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    name: "Reservation Detail",
    path: "reservationDetail",
    element: <AcceptedAndRejectedReservation />,
    icon: <EditCalendarIcon />,
  },
];

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

export default function AdminDashboard() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [page, setPage] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();
  const navigateHandler = (path) => {
    navigate(path);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgb(295, 150, 0)",
        }}
        open={open}
      >
        <Toolbar>
          <IconButton
            // color="inherit"
            className="text-black"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h4"
            sx={{ color: "black" }}
            noWrap
            component="div"
          >
            <span className="jacques-francois-shadow-regular">
              <b>Savory Bite Restaurant</b>{" "}
              <span className="fw-light">(Admin Portal)</span>
            </span>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          style={{
            backgroundColor: "rgb(295, 150, 0)",
          }}
        >
          {open && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                width: "100%",
                padding: "10px 0",
                margin: "10px",
              }}
            >
              <Avatar
                sx={{ width: 90, height: 90 }}
                className="border border-black border-2"
                alt="Remy Sharp"
                src={Emad}
              />
            </Box>
          )}

          <IconButton
            onClick={handleDrawerClose}
            className="bg-black text-light"
          >
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List
          style={{
            backgroundColor: "rgb(295, 150, 0)",
            color: "black",
          }}
        >
          {routes1.map((route, index) => (
            <ListItem
              onClick={() => {
                setPage(false);
              }}
              key={index}
              disablePadding
            >
              <ListItemButton onClick={() => navigateHandler(route.path)}>
                <ListItemIcon sx={{ minWidth: "48px", color: "black" }}>
                  {/* {route.icon} */}
                  {React.cloneElement(route.icon, { sx: { fontSize: "2rem" } })}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  primaryTypographyProps={{
                    fontSize: "1.2rem", // Increase text size
                    // color: "black", // Set text color
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider sx={{ backgroundColor: "white", height: "3px" }} />

          {routes2.map((route, index) => (
            <ListItem
              onClick={() => {
                setPage(false);
              }}
              key={index}
              disablePadding
            >
              <ListItemButton onClick={() => navigateHandler(route.path)}>
                {" "}
                <ListItemIcon sx={{ minWidth: "48px", color: "black" }}>
                  {React.cloneElement(route.icon, { sx: { fontSize: "2rem" } })}
                </ListItemIcon>
                <ListItemText
                  primary={route.name}
                  primaryTypographyProps={{
                    fontSize: "1.1rem",
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}

          <div className="d-flex justify-content-center align-item-center my-5">
            {open ? (
              <button
                className="btn btn-dark px-3"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutIcon /> Logout
              </button>
            ) : (
              <button
                className="btn btn-dark px-3"
                onClick={() => {
                  localStorage.clear();
                  navigate("/");
                }}
              >
                <LogoutIcon />
              </button>
            )}
          </div>
        </List>
        <Divider />
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />

        <Routes>
          {routes1.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
          {routes2.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
}
