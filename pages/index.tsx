import { useGetAllMoviesQuery } from "@/redux/queries/movies";
import { Container, Grid, Typography } from "@mui/material";
import { ImageApp } from "@/components/Image";
import Link from "next/link";
import styles from "@/pages/index.module.css";
import { Loading } from "@/components/Loading";

export default function Home() {
  const { data, isError, isLoading } = useGetAllMoviesQuery();

  if (isError) return <p>Error</p>;
  if (isLoading) return <Loading />;

  return (
    <>
      <header>
        <Typography variant="h1">Metro Movies</Typography>
      </header>
      <main>
        <Container className={styles.container}>
          <Grid
            className={styles.container}
            container
            spacing={{ xs: 4, sm: 4, md: 2, lg: 4 }}
            columns={{ ms: 2, md: 4, lg: 8 }}
          >
            {data?.results.map(({ id, poster_path }) => (
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
      </main>
    </>
  );
}
