// import React from 'react';

// import Table from '@/components/Table';
// import Pagination from '@/components/Pagination';
// import FormModal from '@/components/FormModal';
// // import TableTitleModal from '@/components/TableTitleModal';
// import { assignmentsData } from '@/lib/data';

// type Assignment = {
//     id: number;
//     subject: string;
//     class: string;
//     teacher: string;
//     dueDate: string;
// }

// const columns = [
//     {
//         header: "Subject Name", accessor: "name",
//     },
//     {
//         header: "Class", accessor: "class",
//     },
//     {
//         header: "Teacher", accessor: "teacher", className: "hidden md:table-cell",
//     },
//     {
//         header: "Due Date", accessor: "dueDate", className: "hidden md:table-cell",
//     },
//     {
//         header: "Actions", accessor: "actions",
//     },
// ]

// const AssignmentsPageList = () => {

//     const renderRow = (item: Assignment) => (
//         <tr key={item.id} className='border-b border-p600 bg-p300 even:bg-p400 text-sm hover:bg-p500'>
//             <td className='table-cell gap-4 p-4'>{item.subject}</td>
//             <td className='table-cell'>{item.class}</td>
//             <td className='hidden md:table-cell'>{item.teacher}</td>
//             <td className='hidden md:table-cell'>{item.dueDate}</td>
//             <td>
//                 <div className="flex items-center gap-2">
//                     <FormModal table="assignment" data={item} type="update" id={item.id} visible={["admin"]} />
//                     <FormModal table="assignment" data={item} type="delete" id={item.id} visible={["admin"]} />
//                 </div>
//             </td>

//         </tr>
//     )

//     return (
//         <div className='bg-p50 p-1 rounded-md flex-1 m-1 mt-2 text-p800 overflow-hidden md:p-4 md:m-4 shadow-md'>
//             {/* <TableTitleModal table="assignment" /> */}
//             <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
//             <Pagination />
//         </div>
//     );
// }

// export default AssignmentsPageList;
"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";


import Loading from "@/components/Loading";
import TableTitleModal from "@/components/TableTitleModal";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { AssignmentsList } from "@/types";
import { useTableData } from "@/hooks/useTableData";
import { getCommonColumns } from "@/utils/commonColumns";

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        enableDragging?: boolean;
    }
}

const AssignmentsPageList = () => {
    const endpoint = "assignment"
    const {
        data: assignmentsData,
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
    } = useTableData<AssignmentsList>({ endpoint });
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
        teacherId: false,
        classId: false,
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({
        rowNumber: 100,
        title: 150,
        lesson: 150,
        class: 100,
        subject: 150,
        teacher: 250,
        date: 150,
        actions: 130
    });

    const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
        const baseColumns: ColumnDef<Record<string, string | number>>[] = [
            {
                header: "Assignment",
                accessorKey: "title",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.title}</div>
            },
            {
                header: () => <span className="hidden md:table-cell">Subject</span>,
                accessorKey: "subject",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.subject}</div>
            },
            {
                header: "Class",
                accessorKey: "class",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.class}</div>
            },
            {
                header: () => <span className="hidden md:table-cell">Lesson</span>,
                accessorKey: "lesson",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="hidden md:flex md:items-center md:justify-center">{row.original.lesson}</div>
            },
            {
                header: () => <span className="hidden lg:table-cell">Teacher</span>,
                accessorKey: "teacher",
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => (
                    <div className="hidden lg:flex lg:items-center lg:justify-center">
                        {row.original.teacher}
                    </div>
                ),
            },
            {
                header: () => <span className="hidden lg:table-cell">Due Date</span>,
                accessorKey: "date",
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => (
                    <div className="hidden lg:flex lg:items-center lg:justify-center">
                        {row.original.date}
                    </div>
                ),
            },
            {
                header: () => <span className="hidden">Teacher Id</span>,
                accessorKey: "teacherId",
                meta: {
                    enableDragging: true,                        
                },
                cell: ({ row }) => <div className="hidden">{row.original.teacherId}</div>
            },
            {
                header: () => <span className="hidden">Class Id</span>,
                accessorKey: "classId",
                meta: {
                    enableDragging: true,                        
                },
                cell: ({ row }) => <div className="hidden">{row.original.classId}</div>
            },
            // {
            //     header: () => <span className="">Results Score</span>,
            //     accessorKey: "results",
            //     sortingFn: 'alphanumeric',
            //     filterFn: 'includesStringSensitive',
            //     cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.results}</div>
            // }, 
        ];

        const commonColumns = getCommonColumns<{ id: string } & Record<string, string | number>>(`${endpoint}`) as ColumnDef<Record<string, string | number>>[];

        return [...commonColumns.slice(0, 1), ...baseColumns, commonColumns[1]];
    }, [endpoint]);

    // const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => [
    //     {
    //         header: "Sr. No.",
    //         id: "rowNumber",
    //         cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.index + 1}</div>,
    //         enableSorting: false,
    //         enableColumnFilter: false,
    //         enableDragging: false,
    //       },
    //     {
    //         header: "Exam Name",
    //         accessorKey: "name",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         enableDragging: true,
    //         cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.name}</div>
    //     },
    //     {
    //         header: "Class",
    //         accessorKey: "class",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         enableDragging: true,
    //         cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.class}</div>
    //     },
    //     {
    //         header: "Subject",
    //         accessorKey: "subject",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         enableDragging: true,
    //         cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.subject}</div>
    //     },
    //     {
    //         header: "Lesson",
    //         accessorKey: "lesson",
    //         sortingFn: 'alphanumeric',
    //         filterFn: 'includesStringSensitive',
    //         enableDragging: true,
    //         cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.lesson}</div>
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Teacher</span>,
    //         accessorKey: "teacher",
    //         enableDragging: true,
    //         cell: ({ row }) => (
    //             <div className="hidden md:flex md:items-center md:justify-center">
    //                 {row.original.teacher}
    //             </div>
    //         ),
    //     },
    //     {
    //         header: () => <span className="hidden md:table-cell">Date</span>,
    //         accessorKey: "date",
    //         enableDragging: true,
    //         cell: ({ row }) => (
    //             <div className="hidden md:flex md:items-center md:justify-center">
    //                 {row.original.date}
    //             </div>
    //         ),
    //     },
    //     // {
    //     //     header: () => <span className="">Results Score</span>,
    //     //     accessorKey: "results",
    //     //     sortingFn: 'alphanumeric',
    //     //     filterFn: 'includesStringSensitive',
    //     //     cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.results}</div>
    //     // },        
    //     {
    //         header: "Actions",
    //         accessorKey: "actions",
    //         enableSorting: false,
    //         enableColumnFilter: false,
    //         enableDragging: false,
    //         cell: ({ row }) => (
    //             <div className="flex items-center justify-center gap-2">
    //                 <Link href={`/list/exams/${row.original.id}`}>
    //                     <FormModal table="exam" data={row.original} type="view" id={row.original.id} />
    //                 </Link>
    //                 <FormModal table="exam" data={row.original} type="delete" id={row.original.id} visible={["admin"]} />
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
                lesson: window.innerWidth > 768,
                class: true,
                subject: window.innerWidth > 768,
                teacher: window.innerWidth > 1024,
                date: window.innerWidth > 1024,
                actions: true,
            }));
        };

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [setColumnVisibility]);

    const transformAssignments = (assignments: AssignmentsList[]): Record<string, string | number>[] => {
        return assignments.map((assignment) => ({
            id: String(assignment._id),
            title: assignment.title ?? "N/A",
            // date: assignment.dueDate ? new Date(assignment.dueDate).toISOString() : "N/A", // same date in mongoDB
            date: assignment.dueDate
                ? new Date(assignment.dueDate).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                })
                : "N/A",
            class: typeof assignment.lesson === "object" && "class" in assignment.lesson && assignment.lesson.class && typeof assignment.lesson.class === "object" && "name" in assignment.lesson.class ? String(assignment.lesson.class.name) : "N/A",
            classId: typeof assignment.lesson === "object" && "class" in assignment.lesson && assignment.lesson.class && typeof assignment.lesson.class === "object" && "_id" in assignment.lesson.class ? String(assignment.lesson.class._id) : "N/A",
            subject: typeof assignment.lesson === "object" && "subject" in assignment.lesson && assignment.lesson.subject && typeof assignment.lesson.subject === "object" && "name" in assignment.lesson.subject ? String(assignment.lesson.subject.name) : "N/A",
            lesson: typeof assignment.lesson === "object" && "name" in assignment.lesson ? String(assignment.lesson.name) : "N/A",
            teacher: typeof assignment.lesson === "object" && "teacher" in assignment.lesson && assignment.lesson.teacher && typeof assignment.lesson.teacher === "object" && "user" in assignment.lesson.teacher && assignment.lesson.teacher.user && typeof assignment.lesson.teacher.user === "object" && "firstName" in assignment.lesson.teacher.user && "lastName" in assignment.lesson.teacher.user ? String(`${assignment.lesson.teacher.user.firstName} ${assignment.lesson.teacher.user.lastName}`) : "N/A",
            teacherId: typeof assignment.lesson === "object" && "teacher" in assignment.lesson && assignment.lesson.teacher && typeof assignment.lesson.teacher === "object" && "_id" in assignment.lesson.teacher   ? String(`${assignment.lesson.teacher._id}`) : "N/A",
        }));
    };


    const formattedAssignmentsData = useMemo(() => {
        return assignmentsData ? transformAssignments(assignmentsData) : [];
    }, [assignmentsData]);


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
                    data={formattedAssignmentsData}
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

export default AssignmentsPageList;


