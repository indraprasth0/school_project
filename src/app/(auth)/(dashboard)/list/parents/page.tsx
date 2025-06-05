"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";

import TableTitleModal from "@/components/TableTitleModal";
import { useTableData } from "@/hooks/useTableData";
import { ParentsList } from "@/types";
import Loading from "@/components/Loading";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { getCommonColumns } from '@/utils/commonColumns';

const ParentsPageList = () => {
    const endpoint = "parent"
    const {
        data: parentsData,
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
    } = useTableData<ParentsList>({ endpoint });
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
        info: 150,
        address: 200,
        phone: 160,
        studentName: 350,
        actions: 130
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
                                <div className="flex items-center gap-2 p-2 md:gap-4">
                                    {/* <Image
                                        src={row.original.photo as string || "/avatar.png"}
                                        alt={row.original.firstName as string}
                                        width={40}
                                        height={40}
                                        className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
                                    /> */}
                                    <div className="flex flex-col">
                                        <h3 className="font-semibold">{row.original.firstName} {row.original.lastName}</h3>
                                        <p className="text-sm">{row.original.email || "N/A"}</p>
                                    </div>
                                </div>
                            ),
                        },
                        {
                            header: () => <span className="hidden md:table-cell">Students Name </span>,
                            accessorKey: "studentName",
                            sortingFn: 'alphanumeric',
                            filterFn: 'includesStringSensitive',
                            meta: {
                                enableDragging: true,
                            },
                            cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.studentName}</div>
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
    //                 {/* <Image
    //                     src={row.original.photo as string || "/avatar.png"}
    //                     alt={row.original.firstName as string}
    //                     width={40}
    //                     height={40}
    //                     className="rounded-full md:hidden xl:block w-10 h-10 object-cover"
    //                 /> */}
    //                 <div className="flex flex-col">
    //                     <h3 className="font-semibold">{row.original.firstName}   {row.original.lastName}</h3>
    //                     <p className="text-sm">{row.original.email || "N/A"}</p>
    //                 </div>
    //             </div>
    //         ),
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Student Name </span>,
    //         accessorKey: "studentName",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.studentName}</div>
    //     },

    //     {
    //         header: () => <span className="hidden lg:table-cell">Phone</span>,
    //         accessorKey: "phone",
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.phone}</div>
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
    //             <div className="flex items-center gap-2">
    //                 <Link href={`/list/teachers/${row.original.id}`}>
    //                     <FormModal table="teacher" data={row.original} type="view" id={row.original.id} />
    //                 </Link>
    //                 <FormModal table="teacher" data={row.original} type="delete" id={row.original.id} visible={["admin"]} />
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
                info: true,
                actions: true,
                rowNumber: window.innerWidth > 640,
                phone: window.innerWidth > 1024,
                address: window.innerWidth > 1024,
                studentName: window.innerWidth > 768,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformParentsData = (parents: ParentsList[]): Record<string, string | number>[] => {
        return parents.map((parent) => ({
            id: parent._id?.toString() ?? "N/A",
            title: typeof parent.user === "object" && "firstName" in parent.user ? String(parent.user.firstName) : "N/A",
            firstName: typeof parent.user === "object" && "firstName" in parent.user ? String(parent.user.firstName) : "N/A",
            lastName: typeof parent.user === "object" && "lastName" in parent.user ? String(parent.user.lastName) : "N/A",
            email: typeof parent.user === "object" && "email" in parent.user ? String(parent.user.email) : "N/A",
            phone: typeof parent.user === "object" && "phone" in parent.user ? String(parent.user.phone) : "N/A",
            address: typeof parent.user === "object" && "address" in parent.user && parent.user.address && typeof parent.user.address === "object" && "place" in parent.user.address && "atPost" in parent.user.address && "taluka" in parent.user.address
                ? `${parent.user.address.place ?? ""}, ${parent.user.address.atPost ?? ""}, ${parent.user.address.taluka ?? ""}`.trim()
                : "N/A",
            // studentName: Array.isArray(parent.students)
            //     ? Array.isArray(parent.students) && parent.students.every(student => typeof student === "object" && "user" in student)
            //         ? parent.students.map(student => 
            //             typeof student === "object" && "user" in student && student.user
            //                 ? `${(student.user as { firstName?: string; lastName?: string }).firstName ?? ""} ${(student.user as { firstName?: string; lastName?: string }).lastName ?? ""}`.trim()
            //                 : "N/A"
            //         ).join(", ")
            //         : "N/A"
            //     : "N/A",
            studentName: Array.isArray(parent.students) && parent.students.length > 0
                ? parent.students
                    .map(student =>
                        typeof student === "object" && "user" in student && student.user
                            ? `${(student.user as { firstName?: string; lastName?: string }).firstName ?? ""} ${(student.user as { firstName?: string; lastName?: string }).lastName ?? ""}`.trim()
                            : "N/A"
                    ).join(", ")
                : "N/A",
        }));
    };



    const formattedParentsData = useMemo(() => {
        return parentsData ? transformParentsData(parentsData) : [];
    }, [parentsData]);



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
                    data={formattedParentsData}
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

export default ParentsPageList;
