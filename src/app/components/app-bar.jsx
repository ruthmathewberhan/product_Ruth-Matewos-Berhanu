import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

export default function MenuAppBar() {
  return (
    <Box sx={{ flexGrow: 1, mt: 6, mx: 4 }}>
      <AppBar
        position="static"
        sx={{ p: 3, background: "#CED6E4", color: "#6A7C9B" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            m: 3,
          }}
        >
          <Typography variant="h3" sx={{ flexGrow: 1, }}>
            <i>Nuna</i>  <b>Products</b>
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
