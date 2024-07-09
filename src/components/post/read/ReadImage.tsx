import Image from "next/image";
import React from "react";

export default function ReadImage() {
  return (
    <div className="mt-4">
      <Image
        src="/image.png"
        alt="Dish Image"
        width={500}
        height={500}
        className="rounded-lg mx-auto"
      />
    </div>
  );
}
