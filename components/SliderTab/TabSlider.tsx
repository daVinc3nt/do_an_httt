"use client"
import { useEffect, useRef, useState } from "react";
import { CgMoreO } from "react-icons/cg";


  interface CustomDropdownProps {
    allTabs: any
    onSelectOption: (option: any) => void;
  }
  export const TabSlider:React.FC<CustomDropdownProps> = ({
    allTabs,
    onSelectOption,
  }) => { 
    const tabsRef = useRef<(HTMLElement | null)[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState<number | null>(0);
    const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
    const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);
  
    useEffect(() => {
      if (activeTabIndex === null) {
        return;
      }
  
      const setTabPosition = () => {
        const currentTab = tabsRef.current[activeTabIndex] as HTMLElement;
        setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
        setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
      };
  
      setTabPosition();
    }, [activeTabIndex]);

    const handleSelect =(index, value) => {
        setActiveTabIndex(index)
        onSelectOption(value)
    }
  
    return (
      <div className="flex gap-5 my-5">
        <div className="group rounded-tl-xl rounded-tr-xl relative inline-flex h-14 w-full items-center 
        justify-center overflow-hidden bg-transparent font-medium ">
              <div className="flew-row w-fit text-nowrap relative mx-auto flex h-12 rounded-3xl
                  bg-gray-500 px-2 backdrop-blur-sm">
                <span
                  className="absolute bottom-0 top-0 -z-10 flex overflow-hidden rounded-3xl py-2 transition-all duration-300"
                  style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
                >
                  <span className="h-full w-full rounded-3xl bg-gray-400/30 dark:bg-gray-200/30" />
                </span>
                {allTabs.map((tab) => {
                  const isActive = activeTabIndex === tab.id;
          
                  return (
                    <button
                      key={tab.id}
                      ref={((el) => (tabsRef.current[tab.id] = el)) as any}
                      className={`${
                        isActive ? `` : `hover:text-do_600`
                      } my-auto cursor-pointer select-none rounded-full px-2 text-center font-medium text-white `}
                      onClick={() => handleSelect(tab.id, tab.value)}
                    >
                      {tab.name}
                    </button>
                  );
                })}
              </div>
        </div>
      </div>
    );
  };