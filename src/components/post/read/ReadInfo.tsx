import React from "react";

export default function ReadInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between mb-2">
      <span className="font-semibold">{label}:</span>
      <span>{value}</span>
    </div>
  );
}
