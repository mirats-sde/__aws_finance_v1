import styles from "./Header.module.css";
import logo from "../../assets/miratsLogo.png";
import { Link, Navigate, NavLink } from "react-router-dom";
import {
  Box,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Avatar } from "@nextui-org/react";
import { useState } from "react";
import { Logout } from "@mui/icons-material";
import { signOut } from "firebase/auth";
import { auth } from "../../FirebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
const Header = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user] = useAuthState(auth);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  // console.log(user);
  const handleClose = () => {
    setAnchorEl(null);
  };
  const logOut = () => {
    signOut(auth).then((data) => <Navigate to="/login" />);
  };
  return (
    <>
      <div className={styles.header}>
        <header>
          <div className={styles.header_left}>
            <figure>
              <img src={logo} alt="" />
            </figure>
            <div className={styles.navCenterBody}>
              {/* <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Dashboard</span>
              </NavLink> */}

              <NavLink
                to="/invoices"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Invoices</span>
              </NavLink>
              <NavLink
                to="/vendors"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Vendors</span>
              </NavLink>
              <NavLink
                to="/vendor-invoice"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Vendor Invoices</span>
              </NavLink>
              <NavLink
                to="/client-report"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Client Report</span>
              </NavLink>
              <NavLink
                to="/clients"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Clients</span>
              </NavLink>
              {/* <NavLink
                to="/bank"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Bank</span>
              </NavLink>
              <NavLink
                to="/companies"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Companies</span>
              </NavLink>
              <NavLink
                to="/expense"
                className={({ isActive }) => (isActive ? styles.active : "")}
              >
                <span className={styles.nav_name}>Expense</span>
              </NavLink> */}
              <span className={styles.dropdownContainer}>
                <span className={styles.myNav}>others</span>
                <ul className={styles.dropdownLists}>
                  <li>
                    <NavLink
                      to="/bank"
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                    >
                      <span className={styles.nav_name}>Bank</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/companies"
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                    >
                      <span className={styles.nav_name}>Companies</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/expense"
                      className={({ isActive }) =>
                        isActive ? styles.active : ""
                      }
                    >
                      <span className={styles.nav_name}>Expense</span>
                    </NavLink>
                  </li>
                </ul>
              </span>
            </div>
          </div>
          <div className={styles.right}>
            <section>
              {/* <Link className={styles.create_company} to="/create-company">
                Create Company
              </Link> */}
            </section>
            <section className={styles.sign_in}>
              {/* <section className={styles.sign_in_details}>
                <p>Rohan Gupta</p>
                <p>Recruitment Coordinator</p>
              </section> */}

              <Box>
                <Tooltip title="Account settings">
                  <IconButton
                    onClick={handleClick}
                    size="small"
                    sx={{ ml: 2 }}
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                  >
                    {/* <Avatar>
                      <figure className={styles.portalprofile}>
                        <img
                          src={steve}
                          alt="profileimg"
                          className={styles.avatar_img}
                        />
                      </figure>
                    </Avatar> */}
                    <Avatar
                      size="lg"
                      //   src={steve}
                      //   color="primary"
                      bordered
                      zoomed
                      className={styles.avatar_img}
                    />
                  </IconButton>
                </Tooltip>
              </Box>
              <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: "visible",
                    filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                    mt: 1.5,
                    "& .MuiAvatar-root": {
                      width: 32,
                      height: 32,
                      ml: -0.5,
                      mr: 1,
                    },
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: "background.paper",
                      transform: "translateY(-50%) rotate(45deg)",
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
              >
                <MenuItem>
                  <Avatar
                    size="sm"
                    // src={steve}
                    // color="primary"
                    bordered
                    className={styles.avatar_img}
                  />{" "}
                  <span className={styles.avatar_profile}>{user?.email}</span>
                </MenuItem>
                <MenuItem onClick={logOut}>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Menu>
            </section>
          </div>
        </header>
      </div>
    </>
  );
};

export default Header;
