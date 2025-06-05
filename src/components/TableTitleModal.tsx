"use client";

import React from "react";
import TableSearch from "./TableSearch";
import FormModal from "./FormModal";
import { OnChangeFn } from "@tanstack/react-table";
import pluralize from "@/utils/pluralize";
import { useStore } from "@tanstack/react-store";
import { store } from "@/app/store";

type Props = {
    table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement" | "other"
    globalFilter: string
    onGlobalFilterChange: OnChangeFn<string>
    setShowFilter: React.Dispatch<React.SetStateAction<boolean>>
}

function TableTitleModal({
    table,
    globalFilter,
    onGlobalFilterChange,
}: Props) {
    const Tname = table.charAt(0).toUpperCase() + table.slice(1);


    const toggleFilter = () => {
        const newValue = !(JSON.parse(localStorage.getItem("showFilter") || "false"));
        localStorage.setItem("showFilter", JSON.stringify(newValue));

        // Custom event emit करा
        window.dispatchEvent(new Event("showFilterUpdated"));
    };

    const pluralEndpoint = pluralize(Tname); // 👈 योग्य plural तयार करतो

    const totalRecordCount = useStore(store, (state) => state.totalRecordCount)



return (
    <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">{`All ${pluralEndpoint}`}</h1>

        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
            <div className="hidden md:block text-sm font-semibold text-p500 text-nowrap">
                {totalRecordCount}
            </div>
            <TableSearch title={Tname} onGlobalFilterChange={onGlobalFilterChange} globalFilter={globalFilter} />
            <div className="w-full flex items-center justify-between">
                <div className="flex items-center justify-center gap-4 self-end">
                    <h1 className="block md:hidden text-lg font-semibold items-center">{`All ${Tname}s`}</h1>
                </div>
                <div className="flex items-center gap-4 self-end">
                    <div onClick={toggleFilter}>
                        <FormModal table={table} type="filter" id="A1" />
                    </div>
                    {/* <FormModal table={table} type="sort" id="A2" /> */}
                    <FormModal table={table} type="create" id="A3" visible={["admin"]} />
                </div>
            </div>
        </div>
    </div >
);
};

export default TableTitleModal;
