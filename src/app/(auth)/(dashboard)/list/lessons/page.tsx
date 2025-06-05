"use client";

import "@tanstack/react-table";
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";

import Loading from "@/components/Loading";
import TanstackTable from "@/components/tanstack/TanstackTable";
import TableTitleModal from "@/components/TableTitleModal";
import { useTableData } from "@/hooks/useTableData";
import { LessonsList } from "@/types";
import { getCommonColumns } from "@/utils/commonColumns";

const LessonsPageList = () => {
    const endpoint = "lesson"
    const {
        data: lessonsData,
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
    } = useTableData<LessonsList>({ endpoint });
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
        teacherId:false ,   
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({        
        rowNumber: 100,
        title: 150,
        subject: 150,
        class: 100,
        teacher: 250,
        actions: 130
    });

     const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
                            const baseColumns: ColumnDef<Record<string, string | number>>[] = [
                                {
                                    header: "Lesson",
                                    accessorKey: "title",
                                    sortingFn: 'alphanumeric',
                                    filterFn: 'includesStringSensitive',
                                    meta: {
                                        enableDragging: true,
                                    },
                                    cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.title}</div>
                                },
                                {
                                    header: "Subject",
                                    accessorKey: "subject",
                                    sortingFn: 'alphanumeric',
                                    filterFn: 'includesStringSensitive',
                                    meta: {
                                        enableDragging: true,
                                    },
                                    cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.subject}</div>
                                },
                                {
                                    header:  () => <span className="hidden md:table-cell">Class</span>,
                                    accessorKey: "class",
                                    sortingFn: 'alphanumeric',
                                    filterFn: 'includesStringSensitive',
                                    meta: {
                                        enableDragging: true,
                                    },
                                    cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.class}</div>
                                },        
                                {
                                    header: () => <span className="hidden lg:table-cell">Teacher</span>,
                                    accessorKey: "teacher",
                                    meta: {
                                        enableDragging: true,
                                    },
                                    cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.teacher}</div>
                                }, 
                                {
                                    header: () => <span className="hidden">Supervisor Id</span>,
                                    accessorKey: "teacherId",
                                    meta: {
                                        enableDragging: true,                        
                                    },
                                    cell: ({ row }) => <div className="hidden">{row.original.teacherId}</div>
                                },
                            ];
                    
                            const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];
                    
                            return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
                        }, [endpoint]);

    // const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => [
    //     {
    //         header: "Lesson",
    //         accessorKey: "title",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.title}</div>
    //     },
    //     {
    //         header: "Subject",
    //         accessorKey: "subject",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.subject}</div>
    //     },
    //     {
    //         header: "Class",
    //         accessorKey: "class",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         cell: ({ row }) => <div className="table-cell gap-4 p-4">{row.original.class}</div>
    //     },        
    //     {
    //         header: () => <span className="hidden lg:table-cell">Teacher</span>,
    //         accessorKey: "teacher",
    //         cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.teacher}</div>
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
                title: true,
                actions: true,    
                rowNumber: window.innerWidth > 640,            
                subject: true,
                class: window.innerWidth > 768,
                teacher: window.innerWidth > 1024,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformLessons = (lessons: LessonsList[]): Record<string, string | number>[] => {
        return lessons.map((lesson) => ({
            id: lesson._id?.toString() ?? "N/A",
            title: lesson.name ?? "N/A",
            subject: typeof lesson.subject === "object" && "name" in lesson.subject ? String(lesson.subject.name) : "N/A",
            // grade: lesson.grade ?? "N/A",
            class: typeof lesson.class === "object" && "name" in lesson.class ? String(lesson.class.name) : "N/A",
            teacherId: typeof lesson.teacher === "object" && "_id" in lesson.teacher ? String(lesson.teacher._id) : "N/A",
            teacher:
            typeof lesson.teacher === "object" &&
                lesson.teacher.user &&
                typeof lesson.teacher.user === "object" &&
                "firstName" in lesson.teacher.user &&
                "lastName" in lesson.teacher.user
                ? `${lesson.teacher.user.firstName} ${lesson.teacher.user.lastName}`
                : "N/A",            
        }));
    };


    const formattedLessonsData = useMemo(() => {
        return lessonsData ? transformLessons(lessonsData) : [];
    }, [lessonsData]);



    const tableKey = useMemo(() => JSON.stringify({ sorting, pagination, columnFilters, globalFilter }), [sorting, pagination, columnFilters, globalFilter]);


    useEffect(() => {
        window.history.replaceState(null, "", window.location.pathname);
    }, [])


    return (
        <div className='bg-p50 p-1 rounded-md flex-1 m-1 mt-2 text-p800 md:p-2 items-center justify-center shadow-sm min-w-full w-fit'>
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
                    data={formattedLessonsData}
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

export default LessonsPageList;
