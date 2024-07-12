import Image from "next/image";

interface ReadImageProps {
  imgUrl: string | null;
}

export default function ReadImage({ imgUrl }: ReadImageProps) {
  return (
    imgUrl && <Image src={imgUrl} alt="음식 사진" width={1000} height={1000} priority className="rounded-lg mx-auto" />
  );
}
