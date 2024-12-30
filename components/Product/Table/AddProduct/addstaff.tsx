import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { IoMdClose } from "react-icons/io";
import { Button } from "@nextui-org/react";
import CustomDropdown from "./dropdown";
import { FaMapMarkedAlt } from "react-icons/fa";
// import { FormattedMessage, useIntl } from "react-intl";
// import { CreatingProductInfo, ProductOperation, token } from "@/ambLib/amb";
import cookie from "js-cookie"
import { CreateProduct } from "@/do_an-library/interfaces";
import { ProductOperation } from "@/do_an-library/main";
import { toast } from "sonner";
interface AddStaffProps {
  onClose: () => void;
  reload: any;
}

interface City {
  Id: string;
  Name: string;
  Districts: District[];
}

interface District {
  Id: string;
  Name: string;
  Wards: Ward[];
}

interface Ward {
  Id: string;
  Name: string;
}
const AddStaff: React.FC<AddStaffProps> = ({ onClose, reload }) => {
  const openModal = (type) => {
    setType(type);
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [isShaking, setIsShaking] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [type, setType] = useState();
  // const intl = useIntl();
  const initialProductData: CreateProduct = {
    Name: "",                    
    MakeFlag: null,              
    FinishedGoodsFlag: null,    
    Color: "",                   
    SafetyStockLevel: null,        
    ReorderPoint: null,            
    StandardCost: null,          
    ListPrice: null,               
    Size: "",                   
    SizeUnitMeasureCode: "",    
    WeightUnitMeasureCode: "",  
    Weight: null,                 
    DaysToManufacture: null,       
    ProductLine: null,           // 'R' | 'M' | 'T' | 'S' có thể là null
    Class: null,                 // 'H' | 'M' | 'L' có thể là null
    Style: null,                 // 'U' | 'M' | 'W' có thể là null
    ProductSubcategoryID: null,  // số hoặc null
    ProductModelID: null,        // số hoặc null
    SellStartDate: new Date(),   // mặc định là ngày hiện tại
    SellEndDate: null,           // có thể là null nếu chưa chọn
    DiscontinuedDate: null,      // có thể là null nếu chưa chọn
    ModifiedDate: new Date(),    // mặc định là ngày hiện tại
};

  const [Productdata, setProductdata] = useState<CreateProduct>(initialProductData);
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
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleAnimationComplete = () => {
    if (!isVisible) {
      onClose();
    }
  };

  const handleInputChange = (key: string, value: any) => {
    setProductdata((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  // A function to handle the password input change

  // A function to handle the confirm password input change
  // const handleConfirm = async () => {
  //   const Order = new OrdersOperation();
  //   const condition: UploadingOrderFileCondition = {
  //     file: selectedFile,
  //   };
  //   console.log(condition);
  //   try {
  //     const checkfile = await Order.checkFileFormat(condition);
  //     console.log(checkfile);
  //     if (checkfile.error.error) {
  //       alert(checkfile.error.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     if (checkfile.valid === false) {
  //       alert(checkfile.message);
  //       setSelectedFile(null);
  //       return;
  //     }
  //     const response = await Order.createByFile(condition);
  //     console.log(response);
  //     alert(response.message);
  //     setSelectedFile(null);
  //     reload();
  //   } catch (e) {
  //     console.log(e);
  //     alert("Đã xảy ra lỗi hệ thống, vui lòng thử lại sau!");
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    const Product =new ProductOperation()
    const res= await Product.create(Productdata)
    if (res && res.data) {
      toast.success(res.message)
    }
    else {
      toast.warning(res.message)
    }
    setProductdata(initialProductData)  
    reload();
  };

  return (
    
    <motion.div
      className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onAnimationComplete={handleAnimationComplete}
      style={{ backdropFilter: "blur(12px)" }}
    >
      <motion.div
        ref={notificationRef}
        className={`relative w-[98%] sm:w-9/12 lg:w-1/2 bg-white dark:bg-[#14141a] rounded-xl p-4 overflow-y-auto ${
          isShaking ? "animate-shake" : ""
        }`}
        initial={{ scale: 0 }}
        animate={{ scale: isVisible ? 1 : 0 }}
        exit={{ scale: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative items-center justify-center flex-col flex h-10 w-full border-b-2 border-[#545e7b]">
          <div className="font-bold text-lg sm:text-2xl pb-2 text-white w-full text-center">
            Add product
          </div>
          <IoMdClose className=" absolute right-0 w-8 h-8 cursor-pointer
            rounded-full mb-2 text-white hover:bg-gray-400 hover:text-black"
            onClick={handleClose}/>
        </div>
        <form
          method="POST" onSubmit={handleSubmit}
        >
          <div className="h-fit border border-[#545e7b] mt-4 no-scrollbar flex flex-col items-center bg-white  dark:bg-[#14141a] p-5 rounded-md text-black dark:text-white">
            <div 
              className="w-fit h-fit"
            >
              <div className="flex flex-col gap-3">
                <input required
                  type="string"
                  className={`text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full
                  `}
                  placeholder="Name"
                  value={Productdata.Name}
                  onChange={(e) => handleInputChange("Name", e.target.value)}
                />

                <input required
                  type="string"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Corlor"}
                  value={Productdata.Color}
                  onChange={(e) => handleInputChange("Color", e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-3">
              <input required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Standard cost"}
                  value={Productdata.StandardCost}
                  onChange={(e) => handleInputChange("StandardCost", e.target.valueAsNumber)}
                />
                
                <input required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Reorder point"}
                  value={Productdata.ReorderPoint}
                  onChange={(e) => handleInputChange("ReorderPoint", e.target.valueAsNumber)}
                />
                
                <input required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Safe stock level"}
                  value={Productdata.SafetyStockLevel}
                  onChange={(e) => handleInputChange("SafetyStockLevel", e.target.valueAsNumber)}
                />
              </div>
              
              <div className="flex gap-3 mt-3"> 
                  <input required
                    type="string"
                    className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                    placeholder={"Size"}
                    value={Productdata.Size}
                    onChange={(e) => handleInputChange("Size", e.target.value)}
                  />
                  <input 
                    type="string"
                    className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                    placeholder={"Size unit to measure code"}
                    value={Productdata.SizeUnitMeasureCode}
                    onChange={(e) => handleInputChange("SizeUnitMeasureCode", e.target.value)}
                  />
              </div>

              <div className="flex gap-3 mt-3">               
                <input required
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Weight"}
                  value={Productdata.Weight}
                  onChange={(e) => handleInputChange("Weight", e.target.valueAsNumber)}
                />
                <input 
                  type="text"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Weight unit measure code"}
                  value={Productdata.WeightUnitMeasureCode}
                  onChange={(e) => handleInputChange("WeightUnitMeasureCode", e.target.value)}
                />
              </div>

              <div className="flex gap-3 mt-3">               
                <div className="w-full">
                  <span
                    className="text-xs text-gray-400"
                  >
                    {"Discontinued date"}
                  </span>

                  <input required
                    type="date"
                    className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                    onChange={(e) => handleInputChange("DiscontinuedDate", e.target.value)}
                  />
                </div>

                <div className="w-full">
                  <span
                    className="text-xs text-gray-400"
                  >
                    {"Start to sell date"}
                  </span>
                  <input required
                    type="date"
                    className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                    onChange={(e) => handleInputChange("SellStartDate", e.target.value)}
                  />
                </div>
                
              </div>

              <div className="flex gap-3 mt-3">
                <input required 
                  type="number"
                  className="text-xs md:text-sm border border-gray-600 rounded  bg-white dark:bg-[#14141a] h-10 p-2 w-full"
                  placeholder={"Days to manufacture"}
                  value={Productdata.DaysToManufacture}
                  onChange={(e) =>
                    handleInputChange("DaysToManufacture", e.target.valueAsNumber)
                  }
                />
                <input required
                  type="number"
                  className={`text-xs md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-full
                  `}
                  placeholder={"List price"}
                  value={Productdata.ListPrice}
                  onChange={(e) => handleInputChange("ListPrice", e.target.valueAsNumber)}
                />
              </div>        

              <div className="flex gap-3 mt-3">
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Finished product"}
                    options={["YES", "NO"]}
                    selectedOption={Productdata.FinishedGoodsFlag !== null && (Productdata.FinishedGoodsFlag? "YES" : "NO")}
                    onSelectOption={(option) => handleInputChange("FinishedGoodsFlag", option == "YES")}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Make product"}
                    options={["YES", "NO"]}
                    selectedOption={Productdata.MakeFlag !== null && (Productdata.MakeFlag? "YES" : "NO")}
                    onSelectOption={(option) => handleInputChange("MakeFlag", option == "YES")}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded  bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Product line"}
                    options={['R', 'M', 'T', 'S']}
                    selectedOption={Productdata.ProductLine}
                    onSelectOption={(option) => handleInputChange("ProductLine", option)}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Style"}
                    options={['U', 'M', 'W']}
                    selectedOption={Productdata.Style}
                    onSelectOption={(option) => handleInputChange("Style", option)}
                  />
                </div>
                <div
                  className={`text-xs text-center md:text-sm border border-gray-600 rounded bg-white  dark:bg-[#14141a] h-10 p-2 w-fit
                  `}
                >
                  <CustomDropdown
                    label={"Class"}
                    options={['H', 'M', 'L']}
                    selectedOption={Productdata.Class}
                    onSelectOption={(option) => handleInputChange("Class", option)}
                  />
                </div>        
              </div>
        
            </div>
          </div>
          <Button
            className="w-full rounded-lg mt-5 mb-1 py-3 border-green-700 hover:bg-green-700 text-green-500
          bg-transparent drop-shadow-md hover:drop-shadow-xl hover:text-white border hover:shadow-md"
            onClick={()=>{}}
             type="submit"
          >
             Add
          </Button>
         
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AddStaff;
