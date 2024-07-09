'use client'

import Button from '@/components/common/Button'
import { Post } from '@/types/store'
import { useMutation } from '@tanstack/react-query'
import { useRef } from 'react'

function WritePage() {
  const categoryRef = useRef<HTMLInputElement>(null)
  const storeRef = useRef<HTMLInputElement>(null)
  const menuRef = useRef<HTMLInputElement>(null)
  const orderDateRef = useRef<HTMLInputElement>(null)
  const userRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLInputElement>(null)
  const ratingRef = useRef<HTMLInputElement>(null)
  const imageRef = useRef<HTMLInputElement>(null)
  const contentRef = useRef<HTMLInputElement>(null)

  const addStoreList = async (data) => {
    const response = await fetch('http://localhost:3000/api/store', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    console.log(1, data)
    console.log(2, response)

    return response.json()
  }

  const { mutate: addMutation } = useMutation<Post>({
    mutationFn: (data) => addStoreList(data),
  })

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const postData = {
      category: categoryRef.current?.value || '',
      store_name: storeRef.current?.value || '',
      menu_name: menuRef.current?.value || '',
      order_date: orderDateRef.current?.value || '',
      address: addressRef.current?.value || '',
      rating: ratingRef.current?.value || '',
      content: contentRef.current?.value || '',
      img_url: imageRef.current?.value || '',
      user_nickname: '몰라',
      user_id: 'fa77e563-3245-4654-a240-b064703ab2ca',
    }
    addMutation(postData)
  }

  return (
    <>
      <div className="max-w-[1024px] min-w-[1000px] h-auto mx-auto my-20 bg-white rounded-xl p-15 px-20">
        <h1 className="text-center mt-10 mb-3 text-2xl font-bold">
          오늘의 식당 기록
        </h1>
        <h3 className="text-center mb-10 text-lg">
          식당과 메뉴를 공유해주세요!
        </h3>

        <form
          className="bg-blue-100 w-full p-20 rounded-xl shadow-lg shadow-gray-500/20"
          onSubmit={onSubmit}
        >
          <div className="flex w-full mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">유형</label>
            <select className="w-[10%] p-2 border rounded-md" ref={categoryRef}>
              <option value="visited">방문</option>
              <option value="delivery">배달</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">식당이름</label>
            <input
              className="w-[40%] p-2 border rounded-md mr-10"
              type="text"
              ref={storeRef}
            />
            <label className="w-[10%] whitespace-nowrap mr-2">메뉴이름</label>
            <input
              className="w-[40%] p-2 border rounded-md"
              type="text"
              ref={menuRef}
            />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">주문날짜</label>
            <input
              className="w-[40%] p-2 border rounded-md mr-10"
              type="date"
              ref={orderDateRef}
            />
            <label className="w-[10%] whitespace-nowrap mr-2">작성자</label>
            <input
              className="w-[40%] p-2 border rounded-md"
              type="text"
              ref={userRef}
            />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap mr-2">주소</label>
            <input
              className="w-[40%] p-2 border rounded-md mr-10"
              type="text"
              ref={addressRef}
            />
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

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">이미지</label>
            <input
              className="w-[90%] bg-white p-2 rounded-md"
              type="file"
              ref={imageRef}
            />
          </div>

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
  )
}

export default WritePage