"use client";

import Button from "@/components/common/Button";
import { createClient } from "@/supabase/client";
import { Post } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import { useMutation } from "@tanstack/react-query";
import { useRouter} from "next/navigation"
import { useRef, useState } from "react";
import { uuid } from "uuidv4";
import { ProductsImage } from "./ProductsImage";
interface PostData {
  category: string;
  store_name: string;
  menu_name: string;
  order_date: string;
  address: string;
  rating: string;
  content: string;
  img_url: string;
  user_nickname: string;
  user_id: string;
}

function WritePage() {
  const categoryRef = useRef<HTMLSelectElement>(null);
  const storeRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLInputElement>(null);
  const orderDateRef = useRef<HTMLInputElement>(null);
  const userRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLInputElement>(null);
  const ratingRef = useRef<HTMLSelectElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);
  const [file, setFile] = useState<File>();

  const user = useAuthStore((state) => state.user);
  console.log(user?.user_metadata.sub);

  const router = useRouter();

  const addStoreList = async (data: PostData): Promise<Post> => {
    const response = await fetch("http://localhost:3000/api/store", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutate: addMutation } = useMutation<Post, unknown, PostData>({
    mutationFn: (data: PostData) => addStoreList(data),
  });

  const uploadImg = async () => {
    if (!file) {
      return null;
    }
    const newFileName = uuid();
    const supabase = createClient();
    const { data, error } = await supabase.storage.from("post").upload(`${newFileName}`, file);
    if (error) {
      console.log("파일이 업로드 되지 않습니다.", error);
      return;
    }
    const res = await supabase.storage.from("post").getPublicUrl(data.path);
    console.log(data.path);

    console.log(res);
    return res.data.publicUrl;
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const img_url = (await uploadImg()) || "";
    const postData: PostData = {
      category: categoryRef.current?.value || "",
      store_name: storeRef.current?.value || "",
      menu_name: menuRef.current?.value || "",
      order_date: orderDateRef.current?.value || "",
      address: addressRef.current?.value || "",
      rating: ratingRef.current?.value || "",
      content: contentRef.current?.value || "",
      img_url: img_url,
      user_nickname: user?.user_metadata.display_name || "",
      user_id: user?.user_metadata.sub,
    };
    if (
      !postData.category ||
      !postData.store_name ||
      !postData.menu_name ||
      !postData.order_date ||
      !postData.address ||
      !postData.rating ||
      !postData.content ||
      !postData.img_url
    ) {
      alert("빈칸을 채워주세요.");
      return;
    }

    addMutation(postData);
    router.push("/");
  };

  return (
    <>
      <div className="max-w-[1024px] min-w-[1000px] h-auto mx-auto my-20 bg-white rounded-xl p-15 px-20">
        <h1 className="text-center mt-10 mb-3 text-2xl font-bold">오늘의 식당 기록</h1>
        <h3 className="text-center mb-10 text-lg">식당과 메뉴를 공유해주세요!</h3>

        <form className="bg-blue-50 w-full p-20 rounded-xl shadow-lg shadow-gray-500/20" onSubmit={onSubmit}>
          <div className="flex w-full mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">유형</label>
            <select className="w-[10%] p-2 border rounded-md" ref={categoryRef}>
              <option value="방문">방문</option>
              <option value="배달">배달</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">식당이름</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" ref={storeRef} />
            <label className="w-[10%] whitespace-nowrap mr-2">메뉴이름</label>
            <input className="w-[40%] p-2 border rounded-md" type="text" ref={menuRef} />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">주문날짜</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="date" ref={orderDateRef} />
            <label className="w-[10%] whitespace-nowrap mr-2">작성자</label>
            <input
              className="w-[40%] p-2 border rounded-md"
              type="text"
              ref={userRef}
              defaultValue={user?.user_metadata.display_name}
            />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">주소</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" ref={addressRef} />
            <label className="w-[10%] whitespace-nowrap mr-2">별점</label>
            <select className="w-[40%] p-2 rounded-md" ref={ratingRef}>
              <option value="1">1</option>
              <option value="1.5">1.5</option>
              <option value="2">2</option>
              <option value="2.5">2.5</option>
              <option value="3">3</option>
              <option value="3.5">3.5</option>
              <option value="4">4</option>
              <option value="4.5">4.5</option>
              <option value="5">5</option>
            </select>
          </div>
          <ProductsImage setFile={setFile} />
          <div className="mt-5">
            <textarea
              className="w-full h-[400px] p-2 border rounded-md resize-none"
              name="text"
              placeholder="내용을 입력해주세요."
              ref={contentRef}
            ></textarea>
          </div>

          <div className="mt-5 text-right">
            <Button>작성하기</Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default WritePage;
