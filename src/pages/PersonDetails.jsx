import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiService from "../api/apiService";
import { API_KEY } from "../api/config";
import PDetailsCard from "../components/PDetailsCard";

function PersonDetails() {
  let { personId } = useParams();
  const [loading, setLoading] = useState();
  const [personDetails, setpersonDetails] = useState(null);

  // Fetch person details
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await apiService.get(
          `person/${personId}?api_key=${API_KEY}&language=en-US`
        );
        setpersonDetails(res.data);
        setLoading(false);
      } catch (e) {
        console.log(e.message);
      }
    };
    fetchData();
  }, [personId]);

  return (
    <>
      <Typography variant="h5" mb={2}>
        PERSON INFO
      </Typography>
      <Divider />

      <PDetailsCard personDetails={personDetails} loading={loading} />
    </>
  );
}

export default PersonDetails;
