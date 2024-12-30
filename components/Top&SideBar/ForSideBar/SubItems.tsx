import { useEffect, useState } from "react";
import Item from "./Item";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
interface MenuItem {
  title: string;
  url: string;
  icon: JSX.Element;
  submenus?: MenuItem[];
}

const SubItems: React.FC<MenuItem>  = (menuItems) => {
  const [dropdown, Setdropdown] = useState(false)
  return (
    <>
    <div className="w-full">
        <button
                className="p-3 mt-1 flex items-center w-full rounded-md duration-300 cursor-pointer"
            onClick={() => Setdropdown(!dropdown)}
        >
            {menuItems.icon}
            <div className="flex justify-between gap-3 w-full items-center">
                <span className=" ml-4">
                    {menuItems.title}
                </span>
                <span className={`text-sm ease-in-out duration-200 transition-all ${dropdown ? "rotate-180" : "rotate-0"}`}>
                    <ExpandMoreIcon/>
                </span>
            </div>
        </button>
        <div
            className={`text-left text-sm font-medium mt-2 w-4/5 mx-auto  ${dropdown ? "" : "hidden"}`}
        >
            {menuItems.submenus?.map((menu, index) => (
                    menu.submenus ? (
                    <SubItems title={menu.title} url={menu.url} submenus={menu.submenus} icon={menu.icon} key={index} />
                    ) : (
                    <Item title={menu.title} url={menu.url} icon={menu.icon} key={index} />
                    )
                ))}
        </div>
    </div>
    </>
  );
};

export default SubItems;