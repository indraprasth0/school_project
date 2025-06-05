"use client";

import '@tanstack/react-table';
import Image from "next/image";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";

import TableTitleModal from "@/components/TableTitleModal";
import Loading from "@/components/Loading";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { useTableData } from "@/hooks/useTableData";
import { StudentList } from "@/types";
import { getCommonColumns } from '@/utils/commonColumns';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        enableDragging?: boolean;
    }
}

const StudentsPageList = () => {
    const endpoint = "student"
    const {
        data: studentsData,
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
    } = useTableData<StudentList>({ endpoint });
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
        teacher: false,
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({        
        rowNumber: 100,
        info: 250,
        address: 200,
        phone: 160,
        studentId: 280,
        grade: 160,
        actions: 130
    });

    const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
                const baseColumns: ColumnDef<Record<string, string | number>>[] = [
                    {
                        header:"Info",
                        accessorKey: "info",
                        enableSorting: false,
                        meta: {
                            enableDragging: true,
                        },
                        cell: ({ row }) => (
                            <div className="flex items-center gap-2 p-2 md:gap-4">
                                <Image
                                    src={row.original.photo as string || "/avatar.png"}
                                    alt={row.original.firstName as string}
                                    width={40}
                                    height={40}
                                    className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
                                />
                                <div className="flex flex-col">
                                    <h3 className="font-semibold">{row.original.firstName}   {row.original.lastName}</h3>
                                    {/* <p className="text-sm">{row.original.classes || "N/A"}</p> */}
                                    {/* <p className="text-sm">{typeof row.original.classes === "object" && "name" in row.original.classes ? row.original.classes.name : "N/A"}</p> */}
                                    <p className="text-sm">{row.original.classes ?? "N/A"}</p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header:  () => <span className="hidden md:table-cell">Student ID</span>,
                        accessorKey: "studentId",
                        sortingFn: 'alphanumeric',
                        filterFn: 'includesStringSensitive',
                        meta: {
                            enableDragging: true,
                        },
                        cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.studentId}</div>
                    },
                    {
                        header: () => <span className="hidden md:table-cell">Grade</span>,
                        accessorKey: "grade",
                        meta: {
                            enableDragging: true,
                        },
                        cell: ({ row }) => (
                            <div className="hidden md:flex md:items-center md:justify-center">
                                {row.original.grade}
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
                        header: () => <span className="">Teacher</span>,
                        accessorKey: "teacher",
                        cell: ({ row }) => <div className="">{row.original.teacher}</div>
                    },
                ];
        
                const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];
        
                return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
            }, [endpoint]);

    // const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => [
    //     {
    //         header: () => <span className="">Info</span>,
    //         accessorKey: "info",
    //         enableSorting: false,
    //         cell: ({ row }) => (
    //             <div className="flex items-center gap-2 p-2 md:gap-4">
    //                 <Image
    //                     src={row.original.photo as string || "/avatar.png"}
    //                     alt={row.original.firstName as string}
    //                     width={40}
    //                     height={40}
    //                     className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
    //                 />
    //                 <div className="flex flex-col">
    //                     <h3 className="font-semibold">{row.original.firstName}   {row.original.lastName}</h3>
    //                     {/* <p className="text-sm">{row.original.classes || "N/A"}</p> */}
    //                     {/* <p className="text-sm">{typeof row.original.classes === "object" && "name" in row.original.classes ? row.original.classes.name : "N/A"}</p> */}
    //                     <p className="text-sm">{row.original.classes ?? "N/A"}</p>
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Student ID </span>,
    //         accessorKey: "studentId",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.studentId}</div>
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Grade</span>,
    //         accessorKey: "grade",
    //         cell: ({ row }) => (
    //             <div className="hidden md:flex md:items-center md:justify-center">
    //                 {row.original.grade}
    //             </div>
    //         ),
    //     },
    //     {
    //         header: () => <span className="hidden lg:table-cell">Phone</span>,
    //         accessorKey: "phone",
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.phone}</div>
    //     },
    //     {
    //         header: () => <span className="">Teacher</span>,
    //         accessorKey: "teacher",
    //         cell: ({ row }) => <div className="">{row.original.teacher}</div>
    //     },
    //     {
    //         header: () => <span className="hidden lg:table-cell">Full Address</span>,
    //         accessorKey: "address",
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.address}</div>
    //     },
    //     {
    //         header: "Actions",
    //         accessorKey: "actions",
    //         enableSorting: false,
    //         cell: ({ row }) => (
    //             <div className="flex items-center justify-center gap-2">
    //                 <Link href={`/list/students/${row.original.id}`}>
    //                     <FormModal table="student" data={row.original} type="view" id={row.original.id} />
    //                 </Link>
    //                 <FormModal table="student" data={row.original} type="delete" id={row.original.id} visible={["admin"]} />
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
                teacher: false,
                info: true,
                actions: true,
                rowNumber: window.innerWidth > 640,
                phone: window.innerWidth > 1024,
                address: window.innerWidth > 1024,
                studentId: window.innerWidth > 768,                
                grade: window.innerWidth > 768,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformStudentData = (students: StudentList[]): Record<string, string | number>[] => {
        return students.map((student) => ({
            id: student._id?.toString() ?? "N/A",
            studentId: student._id?.toString() ?? "N/A",
            firstName: student.user?.firstName ?? "N/A",
            title: student.user?.firstName ?? "N/A",
            lastName: student.user?.lastName ?? "N/A",
            email: student.user?.email ?? "N/A",
            username: student.user?.username ?? "N/A",
            phone: student.user?.phone ?? "N/A",
            birthday: student.user?.birthday
                ? new Date(student.user.birthday).toLocaleDateString()
                : "N/A",
            grade: typeof student.grade === "object" && "level" in student.grade ? String(student.grade.level) : "N/A",
            address: student.user?.address
                ? `${student.user.address.place ?? ""}, ${student.user.address.atPost ?? ""}, ${student.user.address.taluka ?? ""}`.trim()
                : "N/A",
            classes: typeof student.class === "object" && "name" in student.class ? String(student.class.name) : "N/A",
            teacher: typeof student.class === "object" && "name" in student.class
                ? typeof student.class === "object" && "lessons" in student.class && Array.isArray(student.class.lessons)
                    ? `${student.class.name} - ${student.class.lessons.map(lesson => lesson.teacher?._id).join(", ") || "No Teacher"}`
                    : `${student.class.name}`
                : "N/A",
        }));
    };

    const formattedStudentsData = useMemo(() => {
        return studentsData ? transformStudentData(studentsData) : [];
    }, [studentsData]);

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
                    data={formattedStudentsData}
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

export default StudentsPageList;
