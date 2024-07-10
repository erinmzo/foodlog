import React from "react";

export default function ReadInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between mb-2 ">
      <span className="font-bold w-1/4 mr-8">{label}</span>
      <span className="w-3/4">{value}</span>
    </div>
  );
}
