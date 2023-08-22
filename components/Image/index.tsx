import Image from "next/image";
import styles from "./image.module.css";

const PATH_IMAGE = process.env.NEXT_PUBLIC_URL_CONFIG;

type Props = {
  image: string | null | undefined;
  customStyles?: string;
};
export function ImageApp({ image, customStyles }: Props) {
  return (
    <Image
      className={`${styles.images} ${customStyles}`}
      src={`${PATH_IMAGE}${image}`}
      alt={image ?? "poster.jpg"}
      width={185}
      height={280}
      priority
    />
  );
}
