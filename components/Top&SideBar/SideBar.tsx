import { useState } from "react";
import Side from "./Side";
import {
  ReceiptLong,
} from "@mui/icons-material";
// import { FormattedMessage } from "react-intl";
const SideItemData = [
  {
    id: 1,
    title: "Products",
    url: "/product",
    icon: <ReceiptLong className="scale-75 lg:block" />,
  }
];
export default function SideBar({ toggleCollapse }) {
  const [dropdown, Setdropdown] = useState(false);
  return (
    <Side
      menuItems={SideItemData}
      toggleCollapse={toggleCollapse}
    />
  );
}
