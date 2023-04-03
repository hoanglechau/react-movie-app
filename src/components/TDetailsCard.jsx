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
import { dateConvert } from "../utils/converters";

function TDetailsCard({ tvShowDetails, loading }) {
  const [tvShowMessage, setTvShowMessage] = useState();

  const addFavoriteTvShow = (name, poster, voteAverage, voteCount, id) => {
    let list = JSON.parse(localStorage.getItem("favoriteTvShows"));
    if (list) {
      let itemId = [];
      for (const element of list) {
        itemId.push(element.id);
      }
      if (itemId.includes(tvShowDetails.id)) {
        setTvShowMessage("You've already added this TV Show!");
      } else {
        list.push({
          id: id,
          name: name,
          poster_path: poster,
          vote_average: voteAverage,
          vote_count: voteCount,
        });
        localStorage.setItem("favoriteTvShows", JSON.stringify(list));
        setTvShowMessage("Added to Favorites!");
      }
    } else {
      localStorage.setItem("favoriteTvShows", JSON.stringify([]));
      list = JSON.parse(localStorage.getItem("favoriteTvShows"));
      list.push({
        id: id,
        name: name,
        poster_path: poster,
        vote_average: voteAverage,
        vote_count: voteCount,
      });
      localStorage.setItem("favoriteTvShows", JSON.stringify(list));
      setTvShowMessage("Added!");
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
      ) : tvShowDetails ? (
        <Stack
          minWidth="80%"
          flexDirection={{ xs: "column", md: "row" }}
          sx={{
            borderRadius: "10px",
          }}
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
                alt={`${tvShowDetails.name}`}
                height="500px"
                src={`https://www.themoviedb.org/t/p/original/${tvShowDetails.poster_path}`}
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
                {`${tvShowDetails.name}`}
              </Typography>
              <Stack flexDirection="column" alignItems="end">
                <IconButton
                  onClick={() =>
                    addFavoriteTvShow(
                      tvShowDetails.name,
                      tvShowDetails.poster_path,
                      tvShowDetails.vote_average,
                      tvShowDetails.vote_count,
                      tvShowDetails.id
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
                  {tvShowMessage}
                </Typography>
              </Stack>
            </Stack>
            <Stack my={{ xs: 2, md: 0 }}>
              <Typography variant="h6">Overview</Typography>
              <Typography variant="body">{`${tvShowDetails.overview}`}</Typography>
            </Stack>

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Genres
              </Typography>
              {tvShowDetails.genres.map((item) => (
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
              {tvShowDetails.production_companies.map((item) => (
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
              flexWrap="wrap"
            >
              <Typography mr={1} variant="caption">
                Status
              </Typography>
              <Chip
                label={`${tvShowDetails.status}`}
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
                First Air
              </Typography>
              <Chip
                label={`${dateConvert(tvShowDetails.first_air_date)}`}
                size="small"
                variant="outlined"
              />
              {tvShowDetails.last_air_date && (
                <>
                  <Typography mr={1} variant="caption">
                    &nbsp;&nbsp;&nbsp;Last Air
                  </Typography>
                  <Chip
                    label={`${dateConvert(tvShowDetails.last_air_date)}`}
                    size="small"
                    variant="outlined"
                  />
                </>
              )}
            </Stack>
            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Episodes
              </Typography>
              <Chip
                label={`${tvShowDetails.number_of_episodes}`}
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
                Seasons
              </Typography>
              <Chip
                label={`${tvShowDetails.number_of_seasons}`}
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
                  {`${tvShowDetails.vote_count}`}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="row" justifyContent="center">
                <FavoriteIcon className="favorite_icon" fontSize="small" />
                <Typography variant="subtitle2" ml={1}>
                  {`${tvShowDetails.vote_average}`}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          TV Show not found!
        </Typography>
      )}
      <Divider />
    </>
  );
}

export default TDetailsCard;
