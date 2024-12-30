'use client'
import Image from "next/image";
import Link from "next/link";
import "../globals.css";
export default function CustomLoadingElement() {
    return (
        <div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center  ">
            <div className="w-fit h-fit p-20 gap-10 items-center justify-center  flex flex-col">
                {/* <Player
                    src='/animation/loading.json'
                    loop
                    autoplay
                    className="md:block hidden"
                    style={{ height: '100px', width: '100px' }}
                    rendererSettings={{
                        preserveAspectRatio: "xMidYMid slice",
                    }}
                    data-aos="fade-left"
                /> */}
            </div>
        </div>
    );
}