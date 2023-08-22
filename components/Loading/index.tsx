import { CircularProgress, Container, Grid } from "@mui/material";

export function Loading() {
  return (
    <Container
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <Grid item md={12}>
        <CircularProgress
          style={{
            width: "100px",
            height: "100px",
          }}
        />
      </Grid>
    </Container>
  );
}
