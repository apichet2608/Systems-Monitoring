import React from "react";
import Button from "@mui/material/Button";
import { Circle, Circle as CircleIcon } from "@mui/icons-material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import "../../../Components/Common/Appbar/globalStyles.css";

const statusColors = {
  Total: "#2E86C1",
  PASS: "#27AE60",
  FAIL: "#CB4335",
  NULL: "#5D6D7E",
};

const IconButton = ({ status }) => {
  const theme = createTheme({
    typography: {
      fontFamily: "'Josefin Sans', sans-serif",
    },
    palette: {
      primary: {
        main: statusColors[status] || "#27AE60",
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Button size="small" startIcon={<Circle />} color="primary">
        <Typography
          className="body"
          variant="subtitle1"
          sx={{
            textTransform: "none",
            fontFamily: "'Josefin Sans', sans-serif",
          }}
        >
          {status}
        </Typography>
      </Button>
    </ThemeProvider>
  );
};

export default IconButton;
