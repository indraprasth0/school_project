"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";
import Image from 'next/image';

import Loading from "@/components/Loading";
import TanstackTable from "@/components/tanstack/TanstackTable";
import TableTitleModal from "@/components/TableTitleModal";
import { TeacherList } from "@/types";
import { useTableData } from "@/hooks/useTableData";
import { getCommonColumns } from '@/utils/commonColumns';

const TeachersPageList = () => {
    const endpoint = "teacher"
    const {
        data: teachersData,
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
    } = useTableData<TeacherList>({ endpoint });
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
        lessons: false, // Default hidden
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({
        info: 250,
        address: 200,
        subjects: 300,
        phone: 160,
        title: 160,
        classes: 160,
        actions: 130,      
        rowNumber: 100, 
    });

    const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
            const baseColumns: ColumnDef<Record<string, string | number>>[] = [
                {
                    header: "Info",
                    accessorKey: "info",
                    enableSorting: false,
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => (
                        <div className="flex gap-1 p-1 md:gap-2">
                            <Image
                                src={row.original.photo as string || "/avatar.png"}
                                alt={row.original.firstName as string}
                                width={40}
                                height={40}
                                className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
                            />
                            <div className="flex flex-col pr-1">
                                <h3 className="font-semibold">{row.original.firstName}   {row.original.lastName}</h3>
                                <p className="text-sm">{row.original.email || "N/A"}</p>
                            </div>
                        </div>
                    ),
                },
                {
                    header: () => <span className="hidden md:table-cell">Teacher ID </span>,
                    accessorKey: "title",
                    sortingFn: 'alphanumeric',
                    filterFn: 'includesStringSensitive',
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.title}</div>
                },
                {
                    header: () => <span className="hidden md:table-cell">Subjects</span>,
                    accessorKey: "subjects",
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => (
                        <div className="hidden md:flex md:items-center md:justify-center">
                            {row.original.subjects}
                        </div>
                    ),
                },
                {
                    header: () => <span className="hidden md:table-cell">Classes</span>,
                    accessorKey: "classes",
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => (
                        <div className="hidden md:flex md:items-center md:justify-center">
                            {row.original.classes}
                        </div>
                    ),
                },
                {
                    header: () => <span className="hidden lg:table-cell">Phone</span>,
                    accessorKey: "phone",
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.phone}</div>
                },
                {
                    header: () => <span className="hidden lg:table-cell">Address</span>,
                    accessorKey: "address",
                    meta: {
                        enableDragging: true,
                    },
                    cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.address}</div>
                },
                {
                    header: () => <span className="hidden">Lesson</span>,
                    accessorKey: "lessons",
                    meta: {
                        enableDragging: true,                        
                    },
                    cell: ({ row }) => <div className="hidden">{row.original.lessons}</div>
                },
            ];
    
            const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];
    
            return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
        }, [endpoint]);

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
                lessons: false,
                info: true,
                actions: true,
                rowNumber: window.innerWidth > 640,
                phone: window.innerWidth > 1024,
                address: window.innerWidth > 1024,
                title: window.innerWidth > 768,
                subjects: window.innerWidth > 768,
                classes: window.innerWidth > 768,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformTeacherData = (teachers: TeacherList[]): Record<string, string | number>[] => {
        return teachers.map((teacher) => ({
            id: String(teacher.user?._id ?? ""),
            firstName: teacher.user?.firstName ?? "N/A",
            lastName: teacher.user?.lastName ?? "N/A",
            email: teacher.user?.email ?? "N/A",
            title: teacher.user?.username ?? "N/A",
            phone: teacher.user?.phone ?? "N/A",
            birthday: teacher.user?.birthday
                ? new Date(teacher.user.birthday).toLocaleDateString()
                : "N/A",
            subjects: Array.isArray(teacher.subjects)
                ? teacher.subjects.map((sub) => typeof sub === "object" && "name" in sub ? sub.name : "N/A").join(", ")
                : "N/A",
            classes: Array.isArray(teacher.classes)
                ? teacher.classes.map((cls) => typeof cls === "object" && "name" in cls ? cls.name : "N/A").join(", ")
                : "N/A",
            address: teacher.user?.address
                ? `${teacher.user.address.place ?? ""}, ${teacher.user.address.atPost ?? ""}, ${teacher.user.address.taluka ?? ""}`.trim()
                : "N/A",
            lessons: Array.isArray(teacher.lessons)
                ? teacher.lessons.map((les) =>
                    typeof les === "object" && "name" in les && "class" in les && les.class && typeof les.class === "object" && "name" in les.class && "_id" in les.class
                        ? `${les.name}, ${les.class.name}, ${les.class._id}  `
                        : "N/A"
                ).join(", ")
                : "N/A",
        }));
    };



    const formattedTeachersData = useMemo(() => {
        return teachersData ? transformTeacherData(teachersData) : [];
    }, [teachersData]);



    const tableKey = useMemo(() => JSON.stringify({ sorting, pagination, columnFilters, globalFilter }), [sorting, pagination, columnFilters, globalFilter]);


    useEffect(() => {
        window.history.replaceState(null, "", window.location.pathname);
    }, [])
       
    return (
        <div className='bg-p50 p-1 rounded-md flex-1 m-1 mt-2 text-p800 md:p-2 md:my-auto  shadow-sm min-w-full w-fit'>
            <TableTitleModal table={`${endpoint}`} globalFilter={globalFilter} onGlobalFilterChange={setGlobalFilter} setShowFilter={setShowFilter}/>
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
                    data={formattedTeachersData}
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

export default TeachersPageList;
