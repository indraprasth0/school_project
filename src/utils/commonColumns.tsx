import React from "react";
import Link from "next/link";

import { ColumnDef } from "@tanstack/react-table";
import FormModal from "@/components/FormModal";
import pluralize from "./pluralize";

export function getCommonColumns<TData extends { id: string }>(
  table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement" | "other",   
): ColumnDef<TData>[] {
  const pTable = pluralize(table); 
  return [
    {
      header: () => <span className="hidden sm:table-cell">Sr. No.</span>,
      id: "rowNumber",
      cell: ({ row }) => (
        <div className="hidden sm:flex gap-4 p-4 items-center justify-center">
          {row.index + 1}
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      meta: {
      enableDragging: false,
    },
    },
    {
      header: "Actions",
      id: "actions",
      cell: ({ row }) => (
        <div className="flex items-center justify-center gap-2">
          <Link href={`/list/${pTable}/${row.original.id}`}>
            <FormModal table={table} data={row.original} type="view" id={row.original.id} />
          </Link>
          <FormModal table={table} data={row.original} type="delete" id={row.original.id}  /> {/* visible={["admin"]} */}
        </div>
      ),
      enableSorting: false,
      enableColumnFilter: false,
      meta: {
      enableDragging: false,
    },
    },
  ];
}
