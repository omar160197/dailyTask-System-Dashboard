import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import SummarizeIcon from "@mui/icons-material/Summarize";
import AssessmentIcon from "@mui/icons-material/Assessment";
import { useNavigate } from "react-router-dom";
import Profile from "../../component/profile/profile";
import { useDispatch, useSelector } from "react-redux";
import { reset } from "../../store/users/userSlice";
import ViewTasks from "../../component/tasks/viewTasks";
import Summary from "../../component/summry/summary";
import styles from "./home.module.css";
const drawerWidth = 250;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(2),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (user === null) {
      dispatch(reset());
      navigate("/login");
    }
  });

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState("Report");

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box className={styles.homeContainer}>
      <CssBaseline />
      <AppBar position="fixed" className={styles.appBarStyle} open={open}>
        <Toolbar className={styles.toolBarStyle}>
          <div>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 0, ...(open && { display: "none" }) }}
            >
              <MenuIcon className={styles.appBarIconStyle} />
            </IconButton>
          </div>
          <div>
            {" "}
            <Profile username={user && user.username} />
          </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <h5 className={styles.drawerTitle}>Daily Work</h5>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        {user && user.email !== "admin@gmail.com" && (
          <List>
            <ListItem
              className={
                currentPage === "Report"
                  ? styles.listItemSelect
                  : styles.listItemNonSelect
              }
              disablePadding
              onClick={() => {
                setCurrentPage("Report");
              }}
            >
              <ListItemButton>
                <ListItemIcon>
                  {
                    <SummarizeIcon
                      className={
                        currentPage === "Report" ? styles.tabIconStyle : ""
                      }
                    />
                  }
                </ListItemIcon>
                <ListItemText
                  className={`${styles.listItemNonSelect} ${
                    currentPage === "Report" ? styles.tabStyle : ""
                  }`}
                  primary={"Report"}
                />
              </ListItemButton>
            </ListItem>
            <ListItem
              className={
                currentPage === "Summary"
                  ? styles.listItemSelect
                  : styles.listItemNonSelect
              }
              disablePadding
              onClick={() => setCurrentPage("Summary")}
            >
              <ListItemButton>
                <ListItemIcon>
                  {
                    <AssessmentIcon
                      className={
                        currentPage === "Summary" ? styles.tabIconStyle : ""
                      }
                    />
                  }
                </ListItemIcon>
                <ListItemText
                  className={currentPage === "Summary" ? styles.tabStyle : ""}
                  primary={"Summary"}
                />
              </ListItemButton>
            </ListItem>
          </List>
        )}
      </Drawer>

      {user && user.username !== "Admin" && (
        <Main open={open}>
          <DrawerHeader />

          {currentPage === "Report" && <ViewTasks userId={user && user._id} />}
          {currentPage === "Summary" && <Summary userId={user && user._id} />}
        </Main>
      )}
    </Box>
  );
}
