"use client";

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
}

export const ProductsImage = ({ setFile }: Props) => {
  const handleAddImages = async (file: File) => {
    try {
      setFile(file);
    } catch (error) {
      console.error("알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.", error);
    }
  };

  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleAddImages(file);
      });
    }
  };

  return (
    <div className="flex flex-col sm:flex-row mt-8 items-center">
      <label className="w-[120px] font-bold" htmlFor="file">
        이미지
      </label>
      <input className="bg-white p-2 rounded-md border mt-3 sm:mt-0 lg:w-[623px]" type="file" onChange={handleFiles} />
    </div>
  );
};
