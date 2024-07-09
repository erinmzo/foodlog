'use client'

import Button from "@/components/common/Button"
import { useRef } from "react"

function WritePage() {
  const categoryRef = useRef(null);
  const restaurantRef = useRef(null);
  const menuRef = useRef(null);
  const orderDateRef = useRef(null);
  const userRef = useRef(null);
  const addressRef = useRef(null);
  const ratingRef = useRef(null);
  

  return (
    <>
      <div className="max-w-[1024px] min-w-[1000px] h-auto mx-auto my-20 bg-white rounded-xl p-15 px-20">
        <h1 className="text-center mt-10 mb-3 text-2xl font-bold">오늘의 식당 기록</h1>
        <h3 className="text-center mb-10 text-lg">식당과 메뉴를 공유해주세요!</h3>

        <div className="bg-blue-100 w-full p-20 rounded-xl shadow-lg shadow-gray-500/20">
          <div className="flex w-full mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap" ref={categoryRef}>유형</label>
            <select className="w-[10%] p-2 border rounded-md">
              <option value="visited">방문</option>
              <option value="delivery">배달</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2" ref={restaurantRef}>식당이름</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" />
            <label className="w-[10%] whitespace-nowrap mr-2" ref={menuRef}>메뉴이름</label>
            <input className="w-[40%] p-2 border rounded-md" type="text" />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2" ref={orderDateRef}>주문날짜</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="date" />
            <label className="w-[10%] whitespace-nowrap mr-2" ref={userRef}>작성자</label>
            <input className="w-[40%] p-2 border rounded-md" type="text" />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2" ref={addressRef}>주소</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" />
            <label className="w-[10%] whitespace-nowrap mr-2" ref={ratingRef}>별점</label>
            <select className="w-[40%] p-2 rounded-md">
              <option value="one">⭐</option>
              <option value="two">⭐⭐</option>
              <option value="three">⭐⭐⭐</option>
              <option value="four">⭐⭐⭐⭐</option>
              <option value="five">⭐⭐⭐⭐⭐</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">이미지</label>
            <input className="w-[90%] bg-white p-2 rounded-md" type="file" />
          </div>

          <div className="mt-5">
            <textarea className="w-full h-[400px] p-2 border rounded-md resize-none" name="text"></textarea>
          </div>

          <div className="mt-5 text-right">
            <button><Button>작성하기</Button></button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WritePage