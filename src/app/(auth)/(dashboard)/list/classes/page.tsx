"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";

import Loading from "@/components/Loading";
import TableTitleModal from "@/components/TableTitleModal";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { getCommonColumns } from '@/utils/commonColumns';
import { useTableData } from "@/hooks/useTableData";
import { ClassesList } from "@/types";

const ClassesPageList = () => {
    const endpoint = "class"
    const {
        data: classData,
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
    } = useTableData<ClassesList>({ endpoint });
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
        supervisorId:false
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({
        rowNumber: 100,
        title: 100,
        grade: 100,
        capacity: 100,
        supervisor: 200,
        actions: 130
    });

    const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
                        const baseColumns: ColumnDef<Record<string, string | number>>[] = [
                            {
                                header: "Class",
                                accessorKey: "title",
                                sortingFn: 'alphanumeric',
                                filterFn: 'includesStringSensitive',
                                meta: {
                                    enableDragging: true,
                                },
                                cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.title}</div>
                            },
                            {
                                header: "Capacity",
                                accessorKey: "capacity",
                                sortingFn: 'alphanumeric',
                                filterFn: 'includesStringSensitive',
                                meta: {
                                    enableDragging: true,
                                },
                                cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.capacity}</div>
                            },
                            {
                                header: () => <span className="hidden md:table-cell">Grade</span>,
                                accessorKey: "grade",
                                sortingFn: 'alphanumeric',
                                filterFn: 'includesStringSensitive',
                                meta: {
                                    enableDragging: true,
                                },
                                cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.grade}</div>
                            },
                            {
                                header: () => <span className="hidden lg:table-cell">Supervisor</span>,
                                accessorKey: "supervisor",
                                meta: {
                                    enableDragging: true,
                                },
                                cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.supervisor}</div>
                            },  
                            {
                                header: () => <span className="hidden">Supervisor Id</span>,
                                accessorKey: "supervisorId",
                                meta: {
                                    enableDragging: true,                        
                                },
                                cell: ({ row }) => <div className="hidden">{row.original.supervisorId}</div>
                            },
                        ];
                
                        const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];
                
                        return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
                    }, [endpoint]);

    // const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => [
    //     {
    //         header: () => <span className="">Class Name</span>,
    //         accessorKey: "name",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.name}</div>
    //     },
    //     {
    //         header: () => <span className="">Capacity</span>,
    //         accessorKey: "capacity",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.capacity}</div>
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Grade</span>,
    //         accessorKey: "grade",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.grade}</div>
    //     },
    //     {
    //         header: () => <span className="hidden lg:table-cell">Supervisor</span>,
    //         accessorKey: "supervisor",
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.supervisor}</div>
    //     },
    //     {
    //         header: "Actions",
    //         accessorKey: "actions",
    //         enableSorting: false,
    //         cell: ({ row }) => (
    //             <div className="flex items-center justify-center gap-2">
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
                rowNumber: window.innerWidth > 640,
                title: true,
                capacity: true,                
                grade: window.innerWidth > 768,                                
                supervisor: window.innerWidth > 1024,                                
                actions: true,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformClasses = (classes: ClassesList[]): Record<string, string | number>[] => {
        return classes.map((cls) => ({
            id: cls._id?.toString() ?? "N/A",
            title: cls.name ?? "N/A",
            capacity: cls.capacity ?? "N/A",
            grade: typeof cls.grade === "object" && "level" in cls.grade ? String(cls.grade.level) : "N/A",
            supervisorId: typeof cls.supervisor === "object" && "_id" in cls.supervisor ? String(cls.supervisor._id) : "N/A",
            supervisor:
                typeof cls.supervisor === "object" &&
                    cls.supervisor.user &&
                    typeof cls.supervisor.user === "object" &&
                    "firstName" in cls.supervisor.user &&
                    "lastName" in cls.supervisor.user
                    ? `${cls.supervisor.user.firstName} ${cls.supervisor.user.lastName}`
                    : "N/A",
        }));
    };


    const formattedClassesData = useMemo(() => {
        return classData ? transformClasses(classData) : [];
    }, [classData]);



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
                    data={formattedClassesData}
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

export default ClassesPageList;
