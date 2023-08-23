import { useEffect, useState } from "react";
import Rating from "@mui/material/Rating";

type Props = {
  value?: number | undefined;
};
export function RatingApp({ value }: Props) {
  const [rating, setRating] = useState<number>(0);

  useEffect(() => {
    value && setRating(value);
  }, [value]);

  return (
    <Rating
      name="read-only"
      style={{ color: "#333" }}
      precision={0.5}
      value={rating}
      max={10}
      readOnly
    />
  );
}
