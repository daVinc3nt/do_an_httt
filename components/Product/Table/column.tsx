"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import DetailStaff from "./detailProduct";
import { Checkbox } from "@/components/TableUI/checkbox";
import { UUID } from "crypto";
export type product = {
  ProductID: number,
  Name: string,
  ProductNumber: string,
  MakeFlag: boolean,
  FinishedGoodsFlag: boolean,
  Color: string,
  SafetyStockLevel: number,
  ReorderPoint: number,
  StandardCost: number,
  ListPrice: number,
  Size: number,
  SizeUnitMeasureCode: number,
  WeightUnitMeasureCode: string,
  Weight: number,
  DaysToManufacture: number,
  ProductLine: string,
  Class: string,
  Style: string,
  ProductSubcategoryID: number,
  ProductModelID: number,
  SellStartDate: Date,
  SellEndDate: Date,
  DiscontinuedDate: Date,
  rowguid: UUID,
  ModifiedDate: Date
};
type MyColumnDef<T> = ColumnDef<T> & {
  reloadData?: () => void;
};
export async function columns(
  reloadData: () => void,
): Promise<MyColumnDef<product>[]> {
  return [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() ? "indeterminate" : false)
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "ProductID",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              ID
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "Name",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Name
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "SellStartDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sell start date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "SellEndDate",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Sell end date
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "Style",

        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Style
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
      },
      {
        accessorKey: "FinishedGoodsFlag",
        header: ({ column }) => {
          return (
            <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
              Finished Goods Flag
              <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
          );
        },
        cell: ({ row }) => {
          return (
            <div className="flex items-center">
              {row.original.FinishedGoodsFlag ? (
                <span className=" text-green-500">
                  Finished
                </span>
              ) : (
                <span className=" text-red-500">
                 Unfinished
                </span>
              )}
            </div>
          );
        },
      },
      {
        accessorKey: "Chi tiết/Sửa đổi",
        header: () => {
          return "Detail";
        },
        cell: function Cell ({ row }) {
          const [modalIsOpen, setModalIsOpen] = useState(false);

          const openModal = () => {
            setModalIsOpen(true);
          };

          const closeModal = () => {
            setModalIsOpen(false);
          };

          return (
            <div className="relative flex  mr-2">
              <Button
                onClick={openModal}
                className="bg-transparent hover:bg-white font-bold hover:text-black py-1 px-[0.65rem] border border-gray-600 hover:border-transparent rounded-full"
              >
                +
              </Button>
              {modalIsOpen && (
                <DetailStaff onClose={closeModal} dataInitial={row.original} reload={reloadData} />
              )}
            </div>
          );
        },
      }
    ]
}