import { useEffect, useState } from "react";
import { useGetAllMoviesQuery } from "@/redux/queries/movies";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { ImageApp } from "@/components/Image";
import { Loading } from "@/components/Loading";
import { Error } from "@/components/Error";
import { AllMovies } from "types/movies";
import { Add } from "@mui/icons-material";
import styles from "@/pages/index.module.css";

export default function Home() {
  const [movies, setMovies] = useState<AllMovies[]>([]);
  const [page, setPage] = useState(1);
  const [timeWindow, setTimeWindow] = useState("day");
  const { data, isError, isLoading } = useGetAllMoviesQuery({
    page,
    time_window: timeWindow,
  });

  useEffect(() => {
    if (data?.results) {
      setMovies((prev) => prev.concat(data?.results));
    }
  }, [data]);

  const handleChange = (event: SelectChangeEvent) => {
    setMovies([]);
    setTimeWindow(event.target.value);
  };

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <header>
        <Container>
          <Typography variant="h1">Metro Movies</Typography>
          <FormControl style={{ maxWidth: "100px", width: "100%" }}>
            <InputLabel id="demo-simple-select-label">Time Window</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Time Window"
              value={timeWindow}
              onChange={handleChange}
            >
              <MenuItem value={"day"}>Day</MenuItem>
              <MenuItem value={"week"}>Week</MenuItem>
            </Select>
          </FormControl>
        </Container>
      </header>
      <main>
        <section>
          <Container className={styles.container}>
            <Grid
              className={styles.container}
              container
              spacing={{ xs: 4, sm: 4, md: 2, lg: 4 }}
              columns={{ ms: 2, md: 4, lg: 8 }}
            >
              {movies.map(({ id, poster_path }) => (
                <Grid key={id} item>
                  <Link href={`/movie/${encodeURIComponent(id)}`}>
                    <picture className={styles.image}>
                      <ImageApp image={poster_path} />
                    </picture>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Container>
        </section>
        <section>
          {data?.total_pages && data?.total_pages >= page && (
            <Button
              style={{ color: "#333", borderColor: "#333" }}
              startIcon={<Add />}
              variant="outlined"
              onClick={() => {
                setPage(page + 1);
              }}
            >
              see more movies
            </Button>
          )}
        </section>
      </main>
    </>
  );
}
