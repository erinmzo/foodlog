import Image from "next/image";
import React from "react";

interface ReadImageProps {
  img_url: string | null;
}

export default function ReadImage({ img_url }: ReadImageProps) {
  const imageUrl = img_url ?? "ds";

  return (
    <div className="mt-4">
      <Image
        src={imageUrl}
        alt="Dish Image"
        width={500}
        height={500}
        className="rounded-lg mx-auto"
      />
    </div>
  );
}
