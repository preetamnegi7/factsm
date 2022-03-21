import * as React from "react";
import { Button } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import Image from "next/image";
import styles from "../../styles/Home.module.css";

const Navbar = () => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" style={{ background: "#FFCC00" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              style={{ background: "#FFCC00" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={handleCloseNavMenu}
                key="home"
                style={{ color: "grey" }}
              >
                <Button>
                  <Link href={"/"}>Home</Link>
                </Button>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu} key="abt">
                <Button>
                  <Link href={"/about"}>About</Link>
                </Button>
              </MenuItem>
            </Menu>
          </Box>
          <span className={styles.logo}>
            <Image src="/logo.png" alt="Vercel Logo" width={96} height={96} />
          </span>
          <Box
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            style={{ color: "black" }}
          >
            <MenuItem onClick={handleCloseNavMenu} key="home">
              <Link href={"/"}>
                <a>Home</a>
              </Link>
            </MenuItem>
            <MenuItem onClick={handleCloseNavMenu} key="abt">
              <Link href={"/about"}>
                <a>About</a>
              </Link>
            </MenuItem>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
