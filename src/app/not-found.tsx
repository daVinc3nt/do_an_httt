'use client'
import Image from "next/image";
import Link from "next/link";
import "./globals.css";
export default function notFoundElement() {
    return (
        <html>
            <body className="no-scrollbar hide-scrollbar">
                <div className="w-full h-screen flex flex-col gap-4 justify-center place-items-center  ">
                    <div className="w-fit h-fit gap-10 items-center justìy-center flex flex-col">
                        {/* <Player
                            src='/animation/404_error.json'
                            loop
                            autoplay
                            className="md:block hidden"
                            style={{ height: '500px', width: '500px' }}
                            rendererSettings={{
                                preserveAspectRatio: "xMidYMid slice",
                            }}
                            data-aos="fade-left"
                        /> */}
                        <Link
                            href="/"
                            className="h-fit w-fit p-4 bg-[#ea2b2b] text-white font-bold rounded-full active:scale-125 duration-300 ease-in-out"
                        >
                            GET BACK
                        </Link>
                    </div>
                </div>
            </body>
        </html>
    );
}