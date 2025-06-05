"use client";

import React from "react";
import Image from "next/image";
import DebouncedInput from "./debouncedInput";
import { OnChangeFn } from "@tanstack/react-table";

type Props = { 
  title: string
  globalFilter: string
  onGlobalFilterChange: OnChangeFn<string>  
}

function TableSearch({  
  title,
  globalFilter,
  onGlobalFilterChange,  
}: Props) {  


  return (
    <div       
      className="w-full md:w-auto flex items-center gap-2 text-sm rounded-full ring-[1.5px] ring-primary bg-transparent p-2 mt-2 md:mt-0"
    >
      <Image src="/search.png" alt="search" width={20} height={20} />          
        <DebouncedInput
          value={globalFilter ?? ''}
          onChange={value => onGlobalFilterChange(String(value))}
          className="bg-transparent border-none outline-none text-p800 placeholder:text-p400"
          placeholder={`${title} Search...`}
        />      
    </div>
  );
};

export default TableSearch;
