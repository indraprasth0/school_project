"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";


import Loading from "@/components/Loading";
import TableTitleModal from "@/components/TableTitleModal";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { getCommonColumns } from '@/utils/commonColumns';
import { useTableData } from "@/hooks/useTableData";
import { SubjectsList } from "@/types";

const SubjectsPageList = () => {
    const endpoint = "subject"
    const {
        data: subjectsData,
        isLoading,
        error,
        totalCount,
        pagination,
        setPagination,
        sorting,
        setSorting,
        columnFilters,
        setColumnFilters,
        globalFilter,
        setGlobalFilter,
        // refetch,        
    } = useTableData<SubjectsList>({ endpoint });
    const [showFilter, setShowFilter] = useState<boolean>(() => {
        if (typeof window !== "undefined") {
            return JSON.parse(localStorage.getItem("showFilter") || "false");
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== "undefined") {
            localStorage.setItem("showFilter", JSON.stringify(showFilter));
        }
    }, [showFilter]);


    const [columnVisibility, setColumnVisibility] = useState<Record<string, boolean>>({
        
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({        
        rowNumber: 100,
        title: 230,
        teachers: 500,
        actions: 130
    });

const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
                    const baseColumns: ColumnDef<Record<string, string | number>>[] = [
                        {
                            header: "Subject",
                            accessorKey: "title",
                            sortingFn: 'alphanumeric',
                            filterFn: 'includesStringSensitive',
                            meta: {
                                enableDragging: true,
                            },
                            cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.title}</div>
                        },
                        {
                            header: () => <span className="hidden lg:table-cell">Teachers Name</span>,
                            accessorKey: "teachers",
                            sortingFn: 'alphanumeric',
                            filterFn: 'includesStringSensitive',
                            meta: {
                                enableDragging: true,
                            },
                            cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.teachers}</div>
                        },  
                    ];
            
                    const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];
            
                    return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
                }, [endpoint]);

    // const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => [
    //     {
    //         header: () => <span className="">Subject Name </span>,
    //         accessorKey: "name",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.name}</div>
    //     },
    //     {
    //         header: () => <span className="hidden lg:table-cell">Teacher Name </span>,
    //         accessorKey: "teachers",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.teachers}</div>
    //     },        
    //     {
    //         header: "Actions",
    //         accessorKey: "actions",
    //         enableSorting: false,
    //         cell: ({ row }) => (
    //             <div className="flex items-center gap-2">
    //                 <Link href={`/list/subject/${row.original.id}`}>
    //                     <FormModal table="subject" data={row.original} type="view" id={row.original.id} />
    //                 </Link>
    //                 <FormModal table="subject" data={row.original} type="delete" id={row.original.id} visible={["admin"]} />
    //             </div>
    //         ),
    //     },
    // ],
    //     []
    // );


const [columnOrder, setColumnOrder] = useState<string[]>(() =>
        columns.map((c) => {
          if ('accessorKey' in c && c.accessorKey) return c.accessorKey as string;
          if ('id' in c && c.id) return c.id;
          return ''; // fallback to prevent runtime error
        }).filter(Boolean)
      );

    useEffect(() => {
        const handleResize = () => {
            setColumnVisibility((prev) => ({
                ...prev,                
                title: true,
                actions: true,     
                rowNumber: window.innerWidth > 640,           
                teachers: window.innerWidth > 1024,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformSubjectsData = (subjects: SubjectsList[]): Record<string, string | number>[] => {
        return subjects.map((subject) => ({
            id: subject._id?.toString() ?? "N/A",
            title: subject.name ?? "N/A",
            teachers: Array.isArray(subject.teachers) && subject.teachers.length > 0
                ? subject.teachers
                    .map(teacher =>
                        typeof teacher === "object" && "user" in teacher && teacher.user
                            ? `${(teacher.user as { firstName?: string; lastName?: string }).firstName ?? ""} ${(teacher.user as { firstName?: string; lastName?: string }).lastName ?? ""}`.trim()
                            : "N/A"
                    ).join(", ")
                : "N/A",            
        }));
    };



    const formattedSubjectsData = useMemo(() => {
        return subjectsData ? transformSubjectsData(subjectsData) : [];
    }, [subjectsData]);



    const tableKey = useMemo(() => JSON.stringify({ sorting, pagination, columnFilters, globalFilter }), [sorting, pagination, columnFilters, globalFilter]);


    useEffect(() => {
        window.history.replaceState(null, "", window.location.pathname);
    }, [])


    return (
        <div className='bg-p50 p-1 rounded-md flex-1 m-1 mt-2 text-p800 md:p-2  shadow-sm min-w-full w-fit'>
            <TableTitleModal table={`${endpoint}`} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} setShowFilter={setShowFilter} />
            {isLoading ? (
                <div className="w-full min-h-[calc(100vh-190px)]">
                    <Loading zoom={0.6} />
                </div>
            ) : error ? (
                <div className="min-h-[calc(100vh-190px)]">
                    <p className="text-red-500 text-center">Error: {`${error.message, " or Please check your network connection"}`}</p>
                </div>
            ) : (
                <TanstackTable<Record<string, string | number>>
                    key={tableKey}
                    columns={columns}
                    data={formattedSubjectsData}
                    sorting={sorting}
                    onSortingChange={setSorting}
                    pagination={pagination}
                    paginationOptions={{ onPaginationChange: setPagination, rowCount: totalCount }}
                    ColumnFiltersState={columnFilters}
                    onColumnFiltersChange={setColumnFilters}
                    globalFilter={globalFilter}
                    onGlobalFilterChange={setGlobalFilter}
                    columnOrder={columnOrder}
                    setColumnOrder={setColumnOrder}
                    columnVisibility={columnVisibility}
                    setColumnVisibility={setColumnVisibility}
                    columnSizing={columnSizing}
                    setColumnSizing={setColumnSizing as OnChangeFn<Record<string, number>>}
                />
            )}

        </div>
    );
};

export default SubjectsPageList;
