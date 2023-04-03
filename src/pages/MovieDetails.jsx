import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import MDetailsCard from "../components/MDetailsCard";

function MovieDetails() {
  let { movieId } = useParams();
  const [loading, setLoading] = useState();
  const [movieDetails, setMovieDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos`
        );
        console.log(res.data);
        setMovieDetails(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [movieId]);

  return (
    <>
      <Typography variant="h5" mb={2}>
        MOVIE INFO
      </Typography>
      <Divider />

      <MDetailsCard movieDetails={movieDetails} loading={loading} />
    </>
  );
}

export default MovieDetails;
