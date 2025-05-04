import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function Header() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ justifyContent: "center" }}>
        {/* App Name */}
        <Typography
          variant="h6"
          sx={{
            textDecoration: "none",
            color: "inherit",
            cursor: "pointer",
          }}
        >
          Noema
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
