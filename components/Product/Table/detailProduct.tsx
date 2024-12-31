import React, { useRef, useEffect, useState, ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import { FaPen } from "react-icons/fa";
import { TabSlider } from "@/components/SliderTab/TabSlider";
import { ProductOperation } from "@/do_an-library/main";

interface DetailStaffProps {
  onClose: () => void;
  dataInitial: any;
  reload: any;
}

const DetailStaff: React.FC<DetailStaffProps> = ({ onClose, dataInitial, reload }) => {
  const keyNotEdit = ["ProductId"]
  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [data, setData] = useState<any>(dataInitial);
  const [updateData, setupdateData] = useState<any>(dataInitial);
  const filterData =[
    {id: 0, name: "Thông tin", value: "details"},
		{id: 1, name: "Giá mua vào", value: "costHist"},
		{id: 2, name: "Giá bán ra", value: "priceHist"},
		{id: 3, name: "Kho", value: "inventory"},
		{id: 4, name: "Trạng thái", value: "stats"},
		{id: 5, name: "Trả tiền", value: "purchaseStats"},
	]
	const[filter, setFilter] = useState<"purchaseStats"|"costHist" |"priceHist" |"inventory"| "stats"|"details">("details")
  const handleUpdateData =(e, key:string, input:string = "string") => {
    if (input == "number")
      setupdateData({...updateData, [key]: parseInt(e.target.value)});
    else 
      setupdateData({...updateData, [key]: e.target.value});
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsShaking(true);
      setTimeout(() => {
        setIsShaking(false);
      }, 300);
    }
  };
  // useEffect(()=>{
  //   console.log(dataInitial)
  // },[])
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);
  useEffect(()=>{
    const ProductAction = new ProductOperation()
    let res;
		const fetchData = async () =>{
      switch (filter) {
        case "costHist":
          res=await ProductAction.getCostHistory(dataInitial.ProductID)
          console.log(res.data)
          setData(res.data)
          break;
        case "inventory":
          res=await ProductAction.getInventory(dataInitial.ProductID)
          console.log(res.data)
          setData(res.data)
          break;
        case "stats":
          res=await ProductAction.getStats(dataInitial.ProductID)
          console.log(res.data)
          setData(res.data)
          break;
        case "priceHist":
          res=await ProductAction.getPriceHistory(dataInitial.ProductID)
          console.log(res.data)
          setData(res.data)
          break;
        case "purchaseStats":
          res=await ProductAction.getPurchaseStats(dataInitial.ProductID)
          setData(res.data)
          console.log(res.data)
          break;
        default:
          setData(dataInitial)
      }
		}
    fetchData()
	},[filter])
  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(true);
  };
  const handleSaveClick = async () => {
    // Gửi API về server để cập nhật dữ liệu
    // Sau khi hoàn thành, có thể tắt chế độ chỉnh sửa
    // Gửi API về server để cập nhật dữ liệu
    // Sau khi hoàn thành, có thể tắt chế độ chỉnh sửa
    const staff =new ProductOperation()
    setIsEditing(false);
    updateData.ProductLine = updateData?.ProductLine?.trim();
    updateData.Class = updateData?.Class?.trim();
    updateData.Style = updateData?.Style?.trim();
    updateData.SizeUnitMeasureCode =  updateData.SizeUnitMeasureCode.trim()
    updateData.WeightUnitMeasureCode=  updateData.WeightUnitMeasureCode.trim()
    const res =await staff.update(dataInitial.ProductID, updateData)
    reload()
    if (res?.success)
      {
        alert(res?.message)
      }
    else 
    {
      alert(res?.message);
      reload()
    }
  };

  const traverse = (obj, isEditing, canEdit?) => {
  
    const editableElements = [];
    const nonEditableElements = [];
  
    obj && Object?.keys(obj)?.forEach((key) => {
      if (obj[key] && typeof obj[key] === 'object') {
        traverse(obj[key], isEditing);
      } else {
        const formattedKey = `student.${key}`;
        const formattedValue = obj[key] ? obj[key] : "No info"
        const element = (
          <div key={key} id="order_id" className="bg-gray-100 p-3 rounded-xl shadow-inner">
            <div className="font-bold text-base text-black">
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            {isEditing ? (
              <input
                className="w-2/3 bg-transparent border-b-2 border-[#545e7b] text-black"
                type="text"
                value={obj[key]}
                onChange={(e) => {
                  setData({ ...obj, [key]: e.target.value});
                  handleUpdateData(e, key);
                }}
              />
            ) : (
              <div className="text-gray-500 w-fit inline-block break-all">{formattedValue}</div>
            )}
          </div>
        );
        if (key != "ProductID") {
          editableElements.push(element);
        } else {
          nonEditableElements.push(element);
        }
      }
    });
    return (
      <div className="flex flex-col">
        {/* <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          Thông tin 1
        </div> */}
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {editableElements}
        </div>

        {/* <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          Thông tin 2
        </div> */}
        <div className="grid-cols-2 grid lg:grid-cols-3 p-10 gap-4">
          {nonEditableElements}
        </div>
      </div>
    );
  };
  const traverseToList = (obj, isEditing, canEdit?) => {
  
    const editableElements = [];
    const nonEditableElements = [];
  
    obj && Object.keys(obj).forEach((key) => {

      if (obj[key] && typeof obj[key] === 'object') {
        console.log(key)
        editableElements.push(traverseToList(obj[key], isEditing));
      } else {
        const formattedKey = `student.${key}`;
        const formattedValue = obj[key] ? obj[key] : "No info"
        const element = (
          <div key={key} id="order_id" className="w-full flex gap-5">
            <div className="font-bold w-24 text-base text-black">
              {key.replace(/([A-Z])/g, " $1")}
            </div>
            {isEditing ? (
              <input
                className="w-2/3 bg-transparent border-b-2 border-[#545e7b] text-black"
                type="text"
                value={obj[key]}
                onChange={(e) => {
                  setData({ ...obj, [key]: e.target.value });
                  handleUpdateData(e, key);
                }}
              />
            ) : (
              <div className="text-black w-fit inline-block break-all">{formattedValue}</div>
            )}
          </div>
        );
        if (true) {
          editableElements.push(element);
        } else {
          nonEditableElements.push(element);
        }
      }
    });
    return (
      <div className="flex flex-col gap-5 w-full">
        {/* <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          Thông tin 1
        </div> */}
        {editableElements.length !== 0 && 
          <div className="flex flex-col items-center w-full">
            {editableElements}
          </div>}

        {/* <div className="text-xl text-black dark:text-white font-bold uppercase text-center">
          Thông tin 2
        </div> */}
        {nonEditableElements.length !== 0 && 
          <div className="flex items-center">
            {nonEditableElements}
          </div>}
      </div>
    );
  };
  
  return (
    <motion.div
      className={`fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50 text-[#545e7b]`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{
        backdropFilter: "blur(12px)",
      }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-11/12 bg-white dark:bg-[#14141a] h-5/6 rounded-xl p-4
          ${isShaking ? "animate-shake" : ""}`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-black dark:text-white w-full text-center">
            Products information
          </div>

            <IoMdClose className=" absolute right-0 w-8 h-8 cursor-pointer
            rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}/>
        </div>
        <TabSlider allTabs={ filterData } onSelectOption={setFilter}/>
        <div className="w-full h-4/6 border border-[#545e7b] mt-4 no-scrollbar
        justify-center flex flex-wrap gap-5 bg-gray-100 dark:bg-[#14141a] p-5 rounded-md 
        dark:text-white text-black  overflow-y-scroll">
            {
                filter==="details" && traverse(data, isEditing)
            }
            {
                filter==="inventory" &&  Array.isArray(data) && data.map((ele, i) => 
                  <div key={i} className="w-80 h-fit bg-slate-300 rounded-xl p-5">
                    {traverseToList(ele, isEditing)}
                  </div>
                )
            }
            {
                filter==="priceHist" &&  Array.isArray(data) && data.map((ele, i) => 
                  <div key={i}  className="w-80 h-fit bg-slate-300 rounded-xl p-5">
                    {traverseToList(ele, isEditing)}
                  </div>
                )
            }
            {
                filter==="costHist" &&  Array.isArray(data) && data.map((ele, i) => 
                  <div key={i} className="w-80 h-fit bg-slate-300 rounded-xl p-5">
                    {traverseToList(ele, isEditing)}
                  </div>
                )
            }
            {
                filter==="purchaseStats" && traverse(data, isEditing)
            }
            {
                filter==="stats" && traverse(data, isEditing)
            }
        </div>
        <div className="w-full flex">
          {!isEditing ? (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={handleEditClick}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                Sửa
              </span>
            </Button>
          ) : (
            <Button
              className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
              bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border 
              hover:shadow-md"
              onClick={()=>{handleSaveClick()}}
            >
              <FaPen className="xs:mr-2" />
              <span className="hidden xs:block">
                Lưu
              </span>
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailStaff;
