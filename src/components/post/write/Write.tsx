"use client";

import Button from "@/components/common/Button";
import { createClient } from "@/supabase/client";
import { Post } from "@/types/store";
import { useAuthStore } from "@/zustand/auth";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter} from "next/navigation"
import { useEffect, useRef, useState } from "react";
import { uuid } from "uuidv4";
import { ProductsImage } from "./ProductsImage";
export interface PostData {
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
  id? : string;
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
  const [file, setFile] = useState<File | null>(null);
  const [ imgUrl, setImgUrl ] = useState("");
  const user = useAuthStore((state) => state.user);
  const router = useRouter();
  const { id } = useParams();

  const getPostsData = async () => {
    const response = await fetch("http://localhost:3000/api/post");
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: Post[] = await response.json();
    const post: Post | undefined = data.find((post) => post.id === id);
    if(!post){
      return
    }
    if(categoryRef.current) categoryRef.current.value = post.category
    if(storeRef.current) storeRef.current.value = post.store_name
    if(menuRef.current) menuRef.current.value = post.menu_name
    if(orderDateRef.current) orderDateRef.current.value = post.order_date
    if(userRef.current) userRef.current.value = post.user_nickname
    if(addressRef.current) addressRef.current.value = post.address
    if(ratingRef.current) ratingRef.current.value = post.rating
    if(contentRef.current) contentRef.current.value = post.content
    setImgUrl(post.img_url);
  };

  useEffect(()=>{
    if(id !== "new") {
      getPostsData();
    }
  },[id])

  const addStoreList = async (data: PostData): Promise<Post> => {
    const response = await fetch("http://localhost:3000/api/post", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const editStoreList = async (data: PostData): Promise<Post> => {
    data.id = id as string;
    const response = await fetch("http://localhost:3000/api/post", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return response.json();
  };

  const { mutate: addMutation } = useMutation<Post, unknown, PostData>({
    mutationFn: (data: PostData) => id === "new"? addStoreList(data) : editStoreList(data),
  });

  const uploadImg = async (): Promise<string | null> => {
    if (!file) {
      return imgUrl;
    }
    const newFileName = uuid();
    const supabase = createClient();
    const { data, error } = await supabase.storage.from("post").upload(`${newFileName}`, file);
    if (error) {
      alert(`파일이 업로드 되지 않습니다.${error}`);
      return null;
    }
    const res = await supabase.storage.from("post").getPublicUrl(data.path);

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
      <div className="max-w-[1024px] mx-auto my-20">
        <h1 className="text-center mt-10 mb-3 text-2xl font-bold">오늘의 식당 기록</h1>
        <h3 className="text-center mb-10 text-lg">식당과 메뉴를 공유해주세요!</h3>

        <form className="w-full pt-[40px] pb-[100px] px-[15px] lg:px-[140px] shadow-lg" onSubmit={onSubmit}>
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-y-8">
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] h-10 font-bold">유형</label>
              <select className="p-2 border rounded-md" ref={categoryRef}>
                <option value="방문">방문</option>
                <option value="배달">배달</option>
              </select>
            </div>
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">별점</label>
              <select className="p-2 rounded-md border" ref={ratingRef}>
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
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">식당이름</label>
              <input className="p-2 border rounded-md" type="text" ref={storeRef} />
            </div>
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">메뉴이름</label>
              <input className="p-2 border rounded-md" type="text" ref={menuRef} />
            </div>
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">주문날짜</label>
              <input className="p-2 border rounded-md" type="date" ref={orderDateRef} />
            </div>
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">작성자</label>
              <input
                className="p-2 border rounded-md"
                type="text"
                ref={userRef}
                defaultValue={user?.user_metadata.display_name}
              />
            </div>
            <div className="flex items-center">
              <label className="w-[80px] sm:w-[120px] font-bold">주소</label>
              <input className="p-2 border rounded-md" type="text" ref={addressRef} />
            </div>
          </div>
          <ProductsImage setFile={setFile} />
          <div className="mt-5">
            <textarea
              className="w-full h-[400px] p-5 border rounded-md resize-none"
              name="text"
              placeholder="내용을 입력해주세요."
              ref={contentRef}
            ></textarea>
          </div>

          <div className="mt-5 text-right">
            <Button>{id === "new" ? "작성하기" : "수정완료"}</Button>
          </div>
        </form>
      </div>
    </>
  );
}
export default WritePage;
