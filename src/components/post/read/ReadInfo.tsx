import React from "react";

export default function ReadInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex mb-2  w-full">
      <span className="font-bold w-1/4 mr-8">{label}</span>
      <span className="w-2/3">{value}</span>
    </div>
  );
}
