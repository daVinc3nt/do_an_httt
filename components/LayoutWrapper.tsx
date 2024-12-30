"use client"
import React, { ReactNode, useState } from "react";
import SideBar from "./Top&SideBar/SideBar"
import MenuHambuger from "./Top&SideBar/MenuHambuger";
// import ThemeSwitcher from "./Theme/ThemeSwitch";
// import Provider from "./Theme/Provider";
import { motion, Variants } from "framer-motion";
// import LangSelector from "@/components/LangSelector/LangSelector";
interface LayoutProps {
  children: ReactNode;
} 
//reactNode is a dataType of react, its can be JSX, 
//component or any fragment
const leftSideVariant: Variants = {
  initial: { x: 20, opacity: 0 },
  enter: { x: 0, opacity: 1 },
  exit: { x: -20, opacity: 0 }
}
const Wrapper = ({ children }: LayoutProps) => {
  const [toggleCollapse, settoggleCollapse] = useState(false);
  const handleSidebarToggleMobile = () => {
    settoggleCollapse(!toggleCollapse);
  };
  return (
   <div className="flex flex-col overflow-hidden">
      <div className="flex  flex-col h-screen ">
        <header className="py-2 flex justify-between w-full bg-white 
        dark:bg-[#111319] items-center px-4 xl:px-2 border-b shadow-xl 
        dark:border-gray-700 gap-1">
        <div className="flex flex-row-reverse lg:flex-row items-center">
          <motion.img
                  variants={leftSideVariant}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.7 }}
                  className="rounded-xl p-2 hidden lg:block bg-white shadow-inner shadow-gray-400 "
                  src={"/bk_name_vi.png"}
                  alt=""
                  width="250"
                  height="250"
          />

          <motion.img
                  variants={leftSideVariant}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  transition={{ duration: 0.7 }}
                  className=" block lg:hidden "
                  src={"/Logo.png"}
                  alt=""
                  width="100"
                  height="100"
          />
          <MenuHambuger toggle ={handleSidebarToggleMobile}/>
        </div>
          <div className="flex items-center">
              {/* <div className="flex items-center">
                <div className="flex flex-row gap-2 items-center">
                  <ThemeSwitcher/>
                </div>
              </div> */}
          </div>
        </header>

        <div className="flex-1 flex">
          <SideBar toggleCollapse={toggleCollapse}/>
          <div className="bg-gray-200 dark:bg-[#111319] flex flex-1 ">
              {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wrapper;
