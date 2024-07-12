"use client";
interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ProductsImage = ({ setFile }: Props) => {
  const handleChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.files !== null) {
    const imgFile = e.target.files[0];
    console.log(imgFile);
    setFile(imgFile);
  }
  };

  return (
    <div className="flex flex-col sm:flex-row mt-8 items-center">
      <label className="w-[120px] font-bold" htmlFor="file">
        이미지
      </label>
      <input className="bg-white p-2 rounded-md border mt-3 sm:mt-0 lg:w-[623px]" type="file" onChange={handleChangeFile} />
    </div>
  );
};
