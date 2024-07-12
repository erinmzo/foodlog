export default function ReadInfo({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex">
      <span className="font-bold w-[90px] sm:w-[120px]">{label}</span>
      <span className="">{value}</span>
    </div>
  );
}
