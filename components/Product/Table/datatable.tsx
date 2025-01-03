"use client";
import React, { useEffect } from "react";
import { TbMinusVertical } from "react-icons/tb";
import { useState } from "react";
import AddStaff from "./AddProduct/addstaff";
import {
  ColumnDef,
  SortingState,
  flexRender,
  ColumnFiltersState,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/TableUI/table";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
// import { FormattedMessage } from "react-intl";
import Filter from "@/components/Common/Filters";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import BasicPopover from "@/components/Common/Popover";
import AddFile from "./AddProduct/addNoti2";
import { ProductOperation } from "@/do_an-library/main";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reload: any;
}
const validValue = ["AGENCY_MANAGER","AGENCY_HUMAN_RESOURCE_MANAGER", "ADMIN", "HUMAN_RESOURCE_MANAGER"]
// const student = new StudentOperation()

export function DataTable<TData, TValue>({
  columns,
  data,
  reload
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [click, setClick] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalIsOpen2, setModalIsOpen2] = React.useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };
  const openModal2 = () => {
    setModalIsOpen2(true);
  };
  const closeModal2 = () => {
    setModalIsOpen2(false);
  };
  const closeModal = () => {
    setModalIsOpen(false);
  };
  const paginationButtons = [];
  for (let i = 0; i < table.getPageCount(); i++) {
    paginationButtons.push(
      <Button key={i} onClick={() => table.setPageIndex(i)}>
        {i + 1}
      </Button>
    );
  }
  const handleDeleteRowsSelected = async () => {
    table.getFilteredSelectedRowModel().rows.forEach(async (row) => {
      const action = new ProductOperation()
      console.log()
      const res = await action.delete((row.original as any).ProductID, "");
      if (res.success) {
        alert(res.message);
        return;
      }
      alert(res.message);
      reload();
    });
  }
  return (
    <div>
      <div className="flex items-center py-4">
        <div className="w-full flex flex-col sm:flex-row">
          <div className="flex flex-col gap-5 w-full">
            <div className="relative w-full sm:w-1/2 lg:w-1/3 flex">
              <input
                id="staffSearch1"
                type="text"
                onChange={(event) =>
                  reload("search", event.target.value)
                }
                className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-gray-500 truncate bg-transparent
                      text-left placeholder-transparent px-2 text-sm text-white`}
                placeholder="Find by keyword"
              />
              <Dropdown className="z-30">
                <DropdownTrigger>
                  <Button
                    className="text-xs md:text-base border border-gray-600 rounded ml-2 w-24 text-center"
                    aria-label="Show items per page"
                  >
                    Show {table.getState().pagination.pageSize}
                  </Button>
                </DropdownTrigger>
                <DropdownMenu
                  className="bg-[#1a1b23] border border-gray-300 rounded w-24"
                  aria-labelledby="dropdownMenuButton"
                >
                  {[10, 20, 30, 40, 50].map((pageSize, index) => (
                    <DropdownItem
                      key={pageSize}
                      textValue={`Show ${pageSize} items per page`}
                    >
                      <Button
                        onClick={() => table.setPageSize(pageSize)}
                        variant="bordered"
                        aria-label={`Show ${pageSize}`}
                        className="text-center  text-white w-full"
                      >
                        Show {pageSize}
                      </Button>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            {/* <div className="relative w-full sm:w-1/2 lg:w-1/3 flex">
              <input
                id="staffSearch"
                type="text"
                value={
                  (table.getColumn("ProductSubcategoryID")?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                  {
                    table.getColumn("ProductModelID")?.setFilterValue(event.target.value)
                    console.log(table.getColumn("ProductSubcategoryID")?.getFilterValue())
                  }
                }
                className={`peer h-10 self-center w-full border border-gray-600 rounded focus:outline-none focus:border-gray-500 truncate bg-transparent
                      text-left placeholder-transparent pl-3 pt-2 pr-12 text-sm text-white`}
                placeholder=""
              />
              <label
                htmlFor="staffSearch"
                className={`absolute left-3 -top-0 text-xxs leading-5 text-gray-500 transition-all 
                      peer-placeholder-shown:text-sm peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-2.5 
                      peer-focus:-top-0.5 peer-focus:leading-5 peer-focus:text-white peer-focus:text-xxs`}
              >
                Tìm kiếm theo category
              </label>
        
            </div> */}

          </div>
          <div className="flex-grow h-10 flex mt-4 sm:mt-0 justify-center sm:justify-end">
            <BasicPopover icon={<FilterAltIcon />}>
              <div
                onClick={()=>{
                  if (!click)
                    reload("active")
                  else 
                    reload()
                  setClick(!click)
                }}
                className={`m-10 p-1 text-white rounded-lg
                  ${click ? "bg-green-500":"bg-gray-700"} 
                  active:bg-gray-500 cursor-pointer`}
              >
                For sale
              </div>
            </BasicPopover>
            <Dropdown className=" z-30 ">
              <DropdownTrigger>
                <Button
                  className="text-xs md:text-base border border-gray-600 rounded ml-2 w-36 h-10 text-center"
                  aria-label="Show items per page"
                >
                  Thêm
                </Button>
              </DropdownTrigger>
              <DropdownMenu
                className="dark:bg-[#1a1b23] bg-white border border-gray-300 rounded w-26"
                aria-labelledby="dropdownMenuButton"
              >
                <DropdownItem>
                  <Button
                    className="text-center  dark:text-white w-36"
                    onClick={openModal}
                  >
                    Thêm sản phẩm
                  </Button>
                </DropdownItem>
                <DropdownItem>
                  <Button
                    className="text-center  dark:text-white w-36"
                    onClick={openModal2}
                  >
                    Thêm hàng loạt
                  </Button>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
              {modalIsOpen &&<AddStaff onClose={closeModal} reload={reload}/>}
              {modalIsOpen2 && ( <AddFile onClose={closeModal2} reloadData={reload} />)}
          </div>
        </div>
      </div>
      <div className="rounded-md h-112 overflow-y-scroll border border-gray-700">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-gray-700">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={`border-gray-700 ${
                    row.getIsSelected() ? "bg-gray-300 dark:bg-gray-700" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="relative  flex items-center justify-center space-x-2 py-4">
        <Button
          className={`text-xs md:text-sm justify-self-start rounded-lg border
           border-gray-600 px-4 py-2 bg-transparent hover:bg-gray-700 
           hover:text-white hover:shadow-md focus:outline-none font-normal text-black dark:text-white
          ${
            table.getFilteredSelectedRowModel().rows.length > 0
              ? "border-red-500"
              : "border-gray-600"
          }`}
          onClick={handleDeleteRowsSelected}
        >
          Xoá {" "}
          {table.getFilteredSelectedRowModel().rows.length}/
          {table.getFilteredRowModel().rows.length}
        </Button>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white border border-black dark:border-white hover:bg-black text-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          dark:text-white rounded-md text-sm text-center me-2"
        >
          <span>
            Trước
          </span>
        </Button>
        <span className="flex items-center gap-1">
          <div className="text-xs md:text-base">
           Trang
          </div>
          <strong className="text-xs md:text-base whitespace-nowrap">
            {table.getState().pagination.pageIndex + 1}{" "}
            trong tổng số {table.getPageCount()}
          </strong>
        </span>
        <TbMinusVertical className="text-xl text-gray-700" />
        <span className="flex items-center gap-1 text-xs md:text-base whitespace-nowrap">
          Đến trang

          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border border-gray-500 px-1 py-0.5 rounded w-8 sm:w-16 bg-transparent"
          />
        </span>
        <Button
          variant="light"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="px-2 py-[0.15rem] mb-0.5 w-12 sm:w-16 bg-transparent 
          drop-shadow-md hover:drop-shadow-xl hover:bg-opacity-30 hover:text-white 
          border border-black dark:border-white hover:bg-black text-black
          hover:shadow-md md:text-base focus:outline-none font-normal
          dark:text-white rounded-md text-sm text-center me-2"
        >
          <span>
            Sau
          </span>
        </Button>
      </div>
    </div>
  );
}
