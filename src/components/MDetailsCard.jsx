import FavoriteIcon from "@mui/icons-material/Favorite";
import RecommendIcon from "@mui/icons-material/Recommend";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useState } from "react";
import { dateConvert, timeConvert } from "../utils/converters";

function MDetailsCard({ movieDetails, loading }) {
  const [movieMessage, setMovieMessage] = useState();

  const addFavoriteMovie = (title, poster, voteAverage, voteCount, id) => {
    let list = JSON.parse(localStorage.getItem("favoriteMovies"));
    if (list) {
      let itemId = [];
      for (const element of list) {
        itemId.push(element.id);
      }
      if (itemId.includes(movieDetails.id)) {
        setMovieMessage("You've already added this movie!");
      } else {
        list.push({
          id: id,
          title: title,
          poster_path: poster,
          vote_average: voteAverage,
          vote_count: voteCount,
        });
        localStorage.setItem("favoriteMovies", JSON.stringify(list));
        setMovieMessage("Added to Favorites!");
      }
    } else {
      localStorage.setItem("favoriteMovies", JSON.stringify([]));
      list = JSON.parse(localStorage.getItem("favoriteMovies"));
      list.push({
        id: id,
        title: title,
        poster_path: poster,
        vote_average: voteAverage,
        vote_count: voteCount,
      });
      localStorage.setItem("favoriteMovies", JSON.stringify(list));
      setMovieMessage("Added!");
    }
  };

  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      {loading ? (
        detailSkeleton
      ) : movieDetails ? (
        <Stack
          minWidth="80%"
          flexDirection={{ xs: "column", md: "row" }}
          sx={{ borderRadius: "10px" }}
        >
          <Stack
            my={3}
            minWidth="350px"
            sx={{
              borderRadius: "10px",
            }}
          >
            <Box>
              <img
                alt={`${movieDetails.title}`}
                height="500px"
                src={`https://www.themoviedb.org/t/p/original/${movieDetails.poster_path}`}
                style={{ borderRadius: "10px" }}
              />
            </Box>
          </Stack>

          <Stack
            my={3}
            pl={{ xs: 0, md: 1 }}
            minHeight="100%"
            minWidth="400px"
            justifyContent="space-evenly"
          >
            <Stack
              justifyContent="space-between"
              alignItems="center"
              flexDirection="row"
            >
              <Typography mb={1} variant="h3">
                {`${movieDetails.title}`}
              </Typography>
              <Stack flexDirection="column" alignItems="end">
                <IconButton
                  onClick={() =>
                    addFavoriteMovie(
                      movieDetails.title,
                      movieDetails.poster_path,
                      movieDetails.vote_average,
                      movieDetails.vote_count,
                      movieDetails.id
                    )
                  }
                  size="large"
                  children={<LoyaltyIcon fontSize="large" />}
                  color="primary"
                  sx={{
                    marginRight: "30px",
                  }}
                />
                <Typography
                  sx={{
                    marginRight: "34px",
                    marginTop: "10px",
                  }}
                  color="error"
                >
                  {movieMessage}
                </Typography>
              </Stack>
            </Stack>

            <Stack my={{ xs: 2, md: 0 }}>
              <Typography variant="subtitle1">
                {`${movieDetails.tagline}`}
              </Typography>
            </Stack>

            <Stack my={{ xs: 2, md: 0 }}>
              <Typography variant="h6">Overview</Typography>
              <Typography variant="body">
                {`${movieDetails.overview}`}
              </Typography>
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Genres
              </Typography>
              {movieDetails.genres.map((item) => (
                <Chip
                  key={`${item.id}`}
                  label={`${item.name}`}
                  size="small"
                  variant="outlined"
                />
              ))}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
              flexWrap="wrap"
            >
              <Typography mr={1} variant="caption">
                Companies
              </Typography>
              {movieDetails.production_companies.map((item) => (
                <Chip
                  key={`${item.id}`}
                  label={`${item.name}`}
                  size="small"
                  variant="filled"
                />
              ))}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Released
              </Typography>
              <Chip
                label={`${dateConvert(movieDetails.release_date)}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Runtime
              </Typography>
              <Chip
                label={`${timeConvert(movieDetails.runtime)}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            <Stack flexDirection="row" justifyContent="flex-start" mt={1}>
              <Box
                display="flex"
                flexDirection="row"
                justifyContent="center"
                mr={3}
              >
                <RecommendIcon className="recommend_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movieDetails.vote_count}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon className="favorite_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${movieDetails.vote_average}`}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Movie not found!
        </Typography>
      )}

      <Divider />
    </>
  );
}

export default MDetailsCard;
