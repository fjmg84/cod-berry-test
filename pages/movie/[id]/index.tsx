import { useEffect, useState } from "react";
import { ImageApp } from "@/components/Image";
import { useGetMovieByIdQuery } from "@/redux/queries/movies";
import { useSearchParams } from "next/navigation";

import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { LinkApp } from "@/components/Link";
import { Loading } from "@/components/Loading";
import styles from "./movie.module.css";
import { Error } from "@/components/Error";
import { RatingApp } from "@/components/Rating";

type SkipProps = {
  action: boolean;
  data: string;
};
export default function Movie() {
  const [skip, setSkip] = useState<SkipProps>({
    action: true,
    data: "",
  });

  const search = useSearchParams();
  const movieId = search.get("id");

  const { data, isLoading, isError } = useGetMovieByIdQuery(skip.data, {
    skip: skip.action,
  });

  useEffect(() => {
    if (movieId !== null)
      setSkip({
        action: false,
        data: movieId,
      });
  }, [movieId]);

  const poster_path = data?.poster_path;
  const backdrop_path = data?.backdrop_path;
  const homepage = data?.homepage;
  const genres = data?.genres;
  const original_title = data?.original_title;
  const overview = data?.overview;
  const production_companies = data?.production_companies;
  const production_countries = data?.production_countries;
  const release_date = data?.release_date;
  const runtime = data?.runtime;
  const spoken_lang = data?.spoken_languages;
  const status = data?.status;
  const rating = data?.vote_average;

  if (isError) return <Error />;
  if (isLoading) return <Loading />;

  return (
    <>
      <header>
        <Container className={styles.container}>
          <Grid container rowGap={{ sm: 4, xs: 4 }}>
            <Grid
              item
              md={4}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
              }}
            >
              <LinkApp
                path="/"
                customStyles={styles.go__to__back}
                text="Go to back"
              />
            </Grid>
            <Grid
              item
              md={8}
              sm={12}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0",
              }}
            >
              <Typography variant="h2">{original_title}</Typography>
            </Grid>
          </Grid>
        </Container>
      </header>

      <main>
        <section>
          <Container className={styles.container}>
            <Grid container rowGap={2} className={styles.center__view}>
              <Grid item md={4} sm={4} xs={4}>
                <Grid container rowGap={2}>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    xs={12}
                    className={styles.center__view}
                  >
                    {poster_path && (
                      <ImageApp
                        customStyles={styles.poster}
                        image={poster_path}
                      />
                    )}
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    sm={12}
                    md={12}
                    className={styles.center__view}
                  >
                    {backdrop_path && (
                      <ImageApp
                        customStyles={styles.poster}
                        image={backdrop_path}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>

              <Grid item md={8}>
                <Grid container rowGap={2}>
                  <Typography variant="h6">
                    {overview}

                    <Grid
                      container
                      columnGap={2}
                      style={{ alignItems: "center" }}
                    >
                      <ul>
                        {production_countries?.map(({ name }, index) => {
                          return (
                            <li
                              key={index}
                              style={{ fontSize: "0.9rem", marginRight: "5px" }}
                            >
                              <p>{name}</p>
                            </li>
                          );
                        })}
                      </ul>
                      <ul className={styles.chips}>
                        {spoken_lang?.map(({ name }, index) => {
                          return (
                            <li key={index}>
                              <Chip label={name} />
                            </li>
                          );
                        })}
                      </ul>
                    </Grid>
                  </Typography>

                  <RatingApp value={rating} />

                  <ul className={`${styles.chips} ${styles.table}`}>
                    {genres?.map(({ id, name }) => (
                      <li key={id}>
                        <Chip label={name} />
                      </li>
                    ))}
                  </ul>

                  <ul className={styles.table}>
                    {production_companies?.map(({ id, logo_path, name }) => {
                      return (
                        <li key={id}>
                          {logo_path && (
                            <ImageApp
                              customStyles={styles.logo_company}
                              image={logo_path}
                            />
                          )}
                          <p>{name}</p>
                        </li>
                      );
                    })}
                  </ul>

                  <Grid container columnGap={2} style={{ fontSize: "0.9rem" }}>
                    <p>release date: {release_date}</p>
                    <p>runtime: {runtime}</p>
                    <p>status: {status}</p>
                  </Grid>

                  <Grid item>
                    {homepage && (
                      <LinkApp
                        path={homepage}
                        customStyles={styles.link}
                        target="_blank"
                        text="Let's see it"
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </section>
      </main>
    </>
  );
}
