import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function PCard({ item }) {
  return (
    <Card className="card" sx={{ width: 200, borderRadius: "3px" }}>
      <CardActionArea LinkComponent={Link} to={`/person/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          sx={[
            {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.profile_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
            },
          ]}
        >
          <Paper className="content-person">
            <CardContent>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="space-between"
                sx={[
                  {
                    maxHeight: "30%",
                    overflow: "hidden",
                  },
                ]}
              >
                <Typography gutterBottom variant="body1" component="div">
                  {`${item.name}`}
                </Typography>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </Card>
  );
}
