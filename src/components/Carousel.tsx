"use client"
import Image from "next/image"
import img1 from "../../public/slide1.png"
import img2 from "../../public/slide2.png"
import img3 from "../../public/slide3.png"
import { useEffect, useState } from "react"

export default function Carousel() {
  const bannerImgs =[img1, img2, img3]
const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
const interval = setInterval(() => setCurrentIndex((prev)=> (prev+1)%bannerImgs.length),5000)
console.log(currentIndex)
return () => clearInterval(interval)
  })

  const nextImg = () => {
    setCurrentIndex((prev) => (prev+1)%bannerImgs.length)
  }
  const previousImg = () => {
    setCurrentIndex((prev) => (prev-1 + bannerImgs.length)%bannerImgs.length)
  }

  return (
    <div className="w-full">
      <ul className=" relative w-[70%] mx-auto my-10 h-[300px]">
           <ul className="absolute flex right-[45%] bottom-0 z-10 p-2 gap-2">{bannerImgs.map((imgs,index) => <li  key={index} className={`w-4 h-4 rounded-full ${currentIndex === index? "bg-slate-700 border": "bg-white"}`}></li>)}</ul>
        {bannerImgs.map((img, index) => (<li className={`w-full absolute ${currentIndex === index? "opacity-100": "opacity-0"}`} key={index}>
        <button className="absolute z-10 top-[40%] p-2 hover:bg-white/25 transition duration-200 right-0 font-bold text-2xl" onClick={nextImg}>{">"}</button>
        <button className="absolute z-10 top-[40%] p-2 hover:bg-white/25 transition duration-200 left-0 font-bold text-2xl" onClick={previousImg}>{"<"}</button>
           <Image className="h-[300px]" alt={"banner image"} src={img}/>
           </li>))}
      </ul>
    </div>
  );
}
