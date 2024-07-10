"use client"

interface Props {
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
}

export const ProductsImage = ({ setFile }: Props) => {


  const handleFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (fileList) {
      const filesArray = Array.from(fileList);
      filesArray.forEach((file) => {
        handleAddImages(file);
      });
    }
  };

  const handleAddImages = async (file: File) => {
    try {
     
      setFile(file);
    } catch (error) {
      console.error('알 수 없는 문제가 발생하였습니다. 다시 시도하여 주십시오.', error);
    }
  };

  return (
    <div className="flex mt-5 items-center">
      <label className="w-[10%] whitespace-nowrap" htmlFor="file">이미지</label>
      <input
        className="w-[90%] bg-white p-2 rounded-md"
        type="file"
        onChange={handleFiles}
      />
    </div>
  );
};
