"use client"
import React, { useCallback } from "react";
import { useState, useEffect } from "react";
import DemoPage from "./Table/export";
import LoadingSkeleton from "../LoadingSkeleton/loadingSkeleton";
// import { FormattedMessage } from "react-intl";

const StaffMenu = () => {
  const [demoPage, setDemoPage] = useState(<LoadingSkeleton />);
  const fetchDemoPage = async (params="",value="") => {
      const result = await DemoPage(params,value,reloadData);
      setDemoPage(result);
  };
  const reloadData = useCallback((params="",value="") => {
      fetchDemoPage(params,value);
    }, []);
  useEffect(() => {
      fetchDemoPage();
    }, []);
  return (
    <div className="h-[calc(100vh-3rem)] content-center overflow-y-hidden flex flex-col w-full">
      <div className="h-screen  items-center w-full left-0 right-0 ">
        <section className="p-2 flex justify-center">
          <div className="container shadow-sm rounded-xl px-3 bg-white dark:text-white dark:bg-[#1a1b23]">
            <div className="relative text-3xl font-bold border-b-[1px] border-gray-600">
              <div className=" font-bold text-xl sm:text-3xl pt-3 pb-2 text-center">
                Products information
              </div>
            </div>
            <div className="w-full">{demoPage}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default StaffMenu;
