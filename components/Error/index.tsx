import { Container, Grid, Typography } from "@mui/material";

export function Error() {
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
        <Typography variant="h1">Sorry an error occurred. :(</Typography>
      </Grid>
    </Container>
  );
}
