import FavoriteIcon from "@mui/icons-material/Favorite";
import RecommendIcon from "@mui/icons-material/Recommend";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link } from "react-router-dom";
import "../styles.css";

export default function TCard({ item }) {
  return (
    <Card className="card" sx={{ width: 200, borderRadius: "3px" }}>
      <CardActionArea LinkComponent={Link} to={`/tv/${item.id}`}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="flex-end"
          sx={[
            {
              backgroundImage: `url(https://image.tmdb.org/t/p/original/${item.poster_path})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              height: "300px",
            },
          ]}
        >
          <Paper className="content">
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

                <Stack flexDirection="row" justifyContent="flex-end" mt={1}>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                    mr={3}
                  >
                    <RecommendIcon
                      className="recommend_icon"
                      fontSize="small"
                    />
                    <Typography variant="subtitle2" ml={1}>
                      {`${item.vote_average}`}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="row"
                    justifyContent="center"
                  >
                    <FavoriteIcon className="favorite_icon" fontSize="small" />
                    <Typography variant="subtitle2" ml={1}>
                      {`${item.vote_count}`}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            </CardContent>
          </Paper>
        </Box>
      </CardActionArea>
    </Card>
  );
}
