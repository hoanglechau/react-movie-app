import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MCard from "./MCard";

export default function Movies() {
  const [openGenres, setOpenGenres] = React.useState(false);
  const [loading, setLoading] = React.useState();
  const [genresList, setGenresList] = React.useState([]);
  const [movieList, setMovieList] = React.useState([]);
  const [genreId, setGenreId] = React.useState();
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");

  // Get genres list
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `genre/movie/list?api_key=${API_KEY}&language=en-US`
        );
        setGenresList(res.data.genres);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  // Get movies list by genre
  useEffect(() => {
    const fetchData = async () => {
      let url = `discover/movie?api_key=${API_KEY}&language=en-US`;
      try {
        setLoading(true);
        if (genreId) {
          const res = await apiService.get(`${url}&with_genres=${genreId}`);
          setMovieList(res.data.results);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [genreId]);

  // Get movies list by search
  useEffect(() => {
    const fetchData = async () => {
      let url = `search/movie?api_key=${API_KEY}&language=en-US`;
      try {
        setLoading(true);
        if (q) {
          // Get movies list when there's a search query
          const res = await apiService.get(`${url}&query=${q}`);
          setMovieList(res.data.results);
        } else {
          // Get movies list by default
          const res = await apiService.get(
            `discover/movie?api_key=${API_KEY}&language=en-US`
          );
          setMovieList(res.data.results);
        }
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [q]);

  const placeholder = [0, 1, 2, 3];
  const detailSkeleton = (
    <Stack spacing={1}>
      <Skeleton variant="text" />
      <Skeleton variant="rectangular" width="100%" height={300} />
    </Stack>
  );

  return (
    <>
      <Typography variant="h5" my={3}>
        MOVIES
      </Typography>

      <Divider />
      <Stack flexDirection="row" width="100%" justifyContent="space-between">
        <Grid container direction="row" spacing={2} mt={2}>
          {loading
            ? placeholder.map((item) => (
                <Grid key={item} item xs={10} sm={6} md={4} lg={3}>
                  {detailSkeleton}
                </Grid>
              ))
            : movieList.map((item) => (
                <Grid key={item.id} item xs={10} sm={6} md={4} lg={3}>
                  <MCard key={item.id} item={item} />
                </Grid>
              ))}
        </Grid>
        <Stack minWidth="150px" width={{ xs: "10%" }}>
          <Box>
            <ListItemButton
              alignItems="flex-start"
              onClick={() => setOpenGenres(!openGenres)}
              sx={{
                pr: 2,
                pt: 2.5,
                pb: openGenres ? 0 : 2.5,
                "&:hover, &:focus": {
                  "& svg": { opacity: openGenres ? 1 : 0 },
                },
              }}
            >
              <ListItemText
                primary="Genres"
                primaryTypographyProps={{
                  fontSize: 18,
                  fontWeight: "medium",
                  lineHeight: "20px",
                  mb: "2px",
                }}
                sx={{ my: 0 }}
              />
              <KeyboardArrowDownIcon
                sx={{
                  mr: -1,
                  opacity: 0,
                  transform: openGenres ? "rotate(-180deg)" : "rotate(0)",
                  transition: "0.2s",
                }}
              />
            </ListItemButton>
            {openGenres &&
              genresList.map((item) => (
                <ListItemButton
                  key={item.id}
                  onClick={() => setGenreId(item.id)}
                  sx={{
                    py: 0,
                    minHeight: 40,
                    color: "rgba(255,255,255,.8)",
                    "&:focus": {
                      backgroundColor: "rgba(225,0,0,0.1)",
                    },
                  }}
                >
                  <ListItemText
                    key={item.id}
                    primary={item.name}
                    primaryTypographyProps={{
                      fontSize: 16,
                      fontWeight: "light",
                    }}
                  />
                </ListItemButton>
              ))}
            <Divider sx={{ marginTop: 3 }} />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}
