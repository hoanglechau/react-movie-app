import Grid from "@mui/material/Grid";
import React, { useEffect, useState } from "react";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import Movies from "../components/Movies";
import Trending from "../components/Trending";

function Home() {
  const [loadingTrending, setLoadingTrending] = useState();
  const [trendingList, setTrendingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingTrending(true);
        const res = await apiService.get(
          `/trending/all/day?api_key=${API_KEY}`
        );
        const result = res.data.results;
        setTrendingList(result);
        setLoadingTrending(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Grid
        container
        direction="column"
        justifyContent={{ md: "center", xs: "flex-end" }}
        sx={{
          minHeight: "100vh",
        }}
      >
        <Grid item direction="column" container>
          <Trending
            trendingList={trendingList}
            loadingTrending={loadingTrending}
          />
        </Grid>

        <Grid item direction="column" mt={5} container>
          <Movies />
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
