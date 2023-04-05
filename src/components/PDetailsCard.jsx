import Box from "@mui/material/Box";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { dateConvert } from "../utils/converters";

function PDetailsCard({ personDetails, loading }) {
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
      ) : personDetails ? (
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
              minWidth: { xs: "100%", md: 350 }
            }}
          >
            <Box>
              <CardMedia
                component="img"
                alt={`${personDetails.title}`}
                src={`https://www.themoviedb.org/t/p/original/${personDetails.profile_path}`}
                sx={{
                  borderRadius: 5,
                  height: { xs: "auto", md: 500 },
                  p: 2
                }}
              />
            </Box>
          </Stack>

          <Stack
            my={3}
            pl={{ xs: 0, md: 1 }}
            minHeight="100%"
            justifyContent="space-evenly"
            sx={{ minWidth: { xs: "100%", md: 400 } }}
          >
            <Stack>
              <Typography
                mb={1}
                sx={{ typography: { xs: "h4", md: "h3" } }}
              >{`${personDetails.name}`}</Typography>
            </Stack>

            {personDetails.birthday && (
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Birthday
                </Typography>
                <Chip
                  label={`${dateConvert(personDetails.birthday)}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            )}

            {personDetails.place_of_birth && (
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Birthplace
                </Typography>
                <Chip
                  label={`${personDetails.place_of_birth}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            )}

            {personDetails.deathday && (
              <Stack
                my={{ xs: 2, md: 1 }}
                flexDirection="row"
                alignItems="center"
              >
                <Typography mr={1} variant="caption">
                  Died
                </Typography>
                <Chip
                  label={`${dateConvert(personDetails.deathday)}`}
                  size="small"
                  variant="outlined"
                />
              </Stack>
            )}

            <Stack
              my={{ xs: 2, md: 1 }}
              flexDirection="row"
              alignItems="center"
            >
              <Typography mr={1} variant="caption">
                Known for
              </Typography>
              <Chip
                label={`${personDetails.known_for_department}`}
                size="small"
                variant="outlined"
              />
            </Stack>

            {personDetails.biography && (
              <Stack my={{ xs: 2, md: 0 }}>
                <Typography sx={{ typography: { xs: "h5", md: "h6" } }}>
                  Biography
                </Typography>
                <Typography variant="body">
                  {`${personDetails.biography}`}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
      ) : (
        <Typography variant="h4" m={5}>
          Person not found!
        </Typography>
      )}
      <Divider />
    </>
  );
}

export default PDetailsCard;
