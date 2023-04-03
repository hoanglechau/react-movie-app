import { Link, Typography } from "@mui/material";
import React from "react";

function MainFooter() {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      p={1}
      mt={2}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://www.coderschool.vn">
        wiredlime
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default MainFooter;
