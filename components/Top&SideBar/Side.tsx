import classNames from "classnames";
import { usePathname, useRouter } from "next/navigation";
import React, { useState, useMemo } from "react";
import { motion, Variants } from "framer-motion";
// import { FormattedMessage, useIntl } from "react-intl";
import Item from "./ForSideBar/Item";
import SubItems from "./ForSideBar/SubItems"; 
import { LogoutOutlined, KeyboardDoubleArrowLeft }from '@mui/icons-material';
import Cookies from "js-cookie";
import { Logout } from "./ForSideBar/Logout";
interface MyComponentProps {
  toggleCollapse: boolean;
}
interface MenuItem {
  id:number;
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

interface Props {
  menuItems: MenuItem[];
  toggleCollapse: boolean;
}
export default function Side({menuItems, toggleCollapse }) {
  const [isCollapsible, setIsCollapsible] = useState(false);
  const router = useRouter();
  const pathName = usePathname()
  // const intl = useIntl();

  const activeMenu = useMemo(
    () => menuItems.find((menu) => menu.url === pathName),
    [pathName]
  );

  const leftSideVariant: Variants = {
    initial: { x: 20, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -20, opacity: 0 }
  }

  const leftSideVariantMobile: Variants = {
    initial: { x: 5, opacity: 0 },
    enter: { x: 0, opacity: 1 },
    exit: { x: -5, opacity: 0 }
  }

  const wrapperClasses = classNames(
    "h-full flex pt-8 pb-10 bg-gray-700 justify-between flex-col",
    {
      ["w-64 px-4"]: !toggleCollapse,
      ["w-0 px-0"]: toggleCollapse,
    }
  );
  const wrapperClassesMobile = classNames(
    "h-full flex z-50 fixed bg-white bg-gray-700 lg:hidden px-4 pt-8 pb-4 justify-between flex-col",
    {
      ["w-52"]: !toggleCollapse,
      ["w-0 px-0"]: toggleCollapse,
    }
  );

  const collapseIconClasses = classNames(
    "p-3 rounded bg-gray-400 dark:bg-[#373839] absolute right-0 hidden lg:block",
    {
      "rotate-180": toggleCollapse,
    }
  );

  const getNavItemClasses = (menu : any) => {
    return classNames(
      "flex items-center jutify-center rounded-xl cursor-pointer w-full overflow-hidden whitespace-nowrap",
      {
        ["bg-gray-300/70 text-gray-800"]: activeMenu?.id === menu.id,
      }
    );
  };

  const onMouseOver = () => {
    setIsCollapsible(!isCollapsible);
  };


  // const handleSidebarToggleMobile = () => {
  //   settoggleCollapse(!toggleCollapse);
  // };

  return (
    <>
    <div
      className={wrapperClasses}
      onMouseEnter={onMouseOver}
      onMouseLeave={onMouseOver}
      style={{ transition: "width 200ms cubic-bezier(0.2, 0, 0, 1) 0s" }}
    >
      <div className="flex flex-col">
        <div className={`flex flex-col font-extrabold items-start text-white `}>
           {menuItems.map((menu, index) => {
            const classes = getNavItemClasses(menu);
            return (
              <div key={menu.id} className={classes}>
                {menu.submenus? (
                <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
              ) : (
                <Item  title={menu.title} url={menu.url} icon={menu.icon} key={index} />
              )}
              </div>
            );
          })}
        </div>
      </div>

      <div className={`${getNavItemClasses({})}`}>
        <button
        onClick={() => Logout(router)}
        className="flex py-4 px-3 items-center w-full h-full text-white hover:bg-gray-200/70 dark:hover:bg-gray-200/70 hover:text-[#e1201c]">
          <div style={ !toggleCollapse? { width: "2.5rem" }: { width: "0rem" }}>
            <LogoutOutlined />
          </div>
          {!toggleCollapse && (
            <span
              className={classNames(
                "text-lg font-extrabold "
              )}
            >
             Thoát
            </span>
          )}
        </button>
      </div>
    </div>
    </>
  );
};
