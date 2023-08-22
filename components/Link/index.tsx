import Link from "next/link";

type Props = {
  path: string;
  customStyles: string;
  target?: "_blank";
  text: string;
};
export function LinkApp({ path, text, customStyles, target }: Props) {
  return (
    <Link href={path} className={customStyles} target={target}>
      <span>{text}</span>
    </Link>
  );
}
