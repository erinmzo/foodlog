function WritePage() {
  

  return (
    <>
      <div className="w-[50%] min-w-[1200px] h-[800px] mx-auto mt-20 bg-white rounded-xl p-15 px-20">
        <h1 className="text-center mt-10 mb-3 text-2xl font-bold">오늘의 식당 기록</h1>
        <h3 className="text-center mb-10 text-lg">식당과 메뉴를 공유해주세요!</h3>

        <div className="bg-blue-100 w-full h-auto p-20 rounded-xl">
          <div className="flex w-full mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">방문/배달</label>
            <select className="w-[10%] p-2 border rounded-md">
              <option value="visited">방문</option>
              <option value="delivery">배달</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">식당 이름</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" />
            <label className="w-[10%] whitespace-nowrap">메뉴 이름</label>
            <input className="w-[40%] p-2 border rounded-md" type="text" />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">주문 날짜</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="date" />
            <label className="w-[10%] whitespace-nowrap">작성자</label>
            <input className="w-[40%] p-2 border rounded-md" type="text" />
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">주소</label>
            <input className="w-[40%] p-2 border rounded-md mr-10" type="text" />
            <label className="w-[10%] whitespace-nowrap">별점</label>
            <select className="w-[40%] p-2 rounded-md">
              <option value="one">⭐</option>
              <option value="two">⭐⭐</option>
              <option value="three">⭐⭐⭐</option>
              <option value="four">⭐⭐⭐⭐</option>
              <option value="five">⭐⭐⭐⭐⭐</option>
            </select>
          </div>

          <div className="flex mt-5 items-center">
            <label className="w-[10%] whitespace-nowrap">메뉴 이미지</label>
            <input className="w-[90%] bg-white p-2 rounded-md ml-4" type="file" />
          </div>

          <div className="mt-5">
            <textarea className="w-full h-[400px] p-2 border rounded-md resize-none" name="text"></textarea>
          </div>

          <div className="mt-5 text-right">
            <button className="bg-blue-600 text-white rounded-md px-4 py-2">작성하기</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default WritePage