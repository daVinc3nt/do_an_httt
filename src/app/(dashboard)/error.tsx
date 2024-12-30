'use client'
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
export default function Error() {
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center  ">
            <div className="w-fit h-fit p-20 gap-10 items-center justìy-center  flex flex-col ">
                {/* <Player
                    src='/animation/error.json'
                    loop
                    autoplay
                    className="md:block hidden"
                    style={{ height: '200px', width: '200px' }}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice",
                    }}
                    data-aos="fade-left"
                /> */}
                <span className="text-5xl font-bold text-gray-800">
                    Uầy! Hình như đã có lỗi gì đó rồi.
                </span>
                <Link
                    href="/"
                    className="h-fit w-fit p-4 bg-gray-800 text-white font-bold rounded-full active:scale-125 duration-300 ease-in-out"
                >
                    Thử lại
                </Link>
            </div>
        </div>
    );
}