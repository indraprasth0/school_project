"use client";

import '@tanstack/react-table';
import React, { useEffect, useMemo, useState } from "react";
import { ColumnDef, OnChangeFn } from "@tanstack/react-table";


import Loading from "@/components/Loading";
import TableTitleModal from "@/components/TableTitleModal";
import TanstackTable from "@/components/tanstack/TanstackTable";
import { ResultsList } from '@/types';
import { useTableData } from "@/hooks/useTableData";
import { getCommonColumns } from "@/utils/commonColumns";
import { IExam } from '@/models';

declare module '@tanstack/react-table' {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface ColumnMeta<TData, TValue> {
        enableDragging?: boolean;
    }
}

const ResultsPageList = () => {
    const endpoint = "result"
    const {
        data: resultsData,
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
    } = useTableData<ResultsList>({ endpoint });
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
        studentId: false,
        classId: false,
    });

    const [columnSizing, setColumnSizing] = useState<Record<string, number>>({
        rowNumber: 100,
        title: 70,
        score:30,
        student: 80,
        lesson: 150,
        class: 100,
        subject: 150,
        teacher: 250,
        date: 150,
        actions: 130,
    });

    const columns = useMemo<ColumnDef<Record<string, string | number>>[]>(() => {
        const baseColumns: ColumnDef<Record<string, string | number>>[] = [
            {
                header: "Result",
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
                header: "Student",
                accessorKey: "student",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.student}</div>
            },
            {
                header: "Score",
                accessorKey: "score",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="flex gap-4 p-4 items-center justify-center">{row.original.score}</div>
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
                header: () => <span className="hidden lg:table-cell">Class</span>,
                accessorKey: "class",
                sortingFn: 'alphanumeric',
                filterFn: 'includesStringSensitive',
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="hidden lg:flex lg:items-center lg:justify-center">{row.original.class}</div>
            },
            {
                header: () => <span className="hidden lg:table-cell">Start Date/Time</span>,
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
            {
                header: () => <span className="hidden">Student Id</span>,
                accessorKey: "studentId",
                meta: {
                    enableDragging: true,
                },
                cell: ({ row }) => <div className="hidden">{row.original.studentId}</div>
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
    //                     <FormModal table="result" data={row.original} type="view" id={row.original.id} />
    //                 </Link>
    //                 <FormModal table="result" data={row.original} type="delete" id={row.original.id} visible={["admin"]} />
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
                class: window.innerWidth > 1024,
                score: true,
                student: true,
                lesson: window.innerWidth > 768,
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


    const transformResults = (results: ResultsList[]): Record<string, string | number>[] => {

        return results.map((result): Record<string, string | number> | null => {
            const assessment = result.exam || result.assignment;
            if (!assessment || !assessment.lesson) return null;

            const isExam = "startTime" in assessment;

            return {
                id: String(result._id),
                title: assessment.title ?? "N/A",
                score: typeof result.score === "number" ? result.score : "N/A",
                student: typeof result.student === "object" && "user" in result.student && result.student.user && typeof result.student.user === "object" && "firstName" in result.student.user && "lastName" in result.student.user ? String(`${result.student.user.firstName} ${result.student.user.lastName}`) : "N/A",
                studentId: typeof result.student === "object" && "_id" in result.student ? String(`${result.student._id}`) : "N/A",
                lesson: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "name" in assessment.lesson ? String(assessment.lesson.name) : "N/A",
                class: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "class" in assessment.lesson && assessment.lesson.class && typeof assessment.lesson.class === "object" && "name" in assessment.lesson.class ? String(assessment.lesson.class.name) : "N/A",
                classId: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "class" in assessment.lesson && assessment.lesson.class && typeof assessment.lesson.class === "object" && "_id" in assessment.lesson.class ? String(assessment.lesson.class._id) : "N/A",
                subject: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "subject" in assessment.lesson && assessment.lesson.subject && typeof assessment.lesson.subject === "object" && "name" in assessment.lesson.subject ? String(assessment.lesson.subject.name) : "N/A",
                teacher: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "teacher" in assessment.lesson && assessment.lesson.teacher && typeof assessment.lesson.teacher === "object" && "user" in assessment.lesson.teacher && assessment.lesson.teacher.user && typeof assessment.lesson.teacher.user === "object" && "firstName" in assessment.lesson.teacher.user && "lastName" in assessment.lesson.teacher.user ? String(`${assessment.lesson.teacher.user.firstName} ${assessment.lesson.teacher.user.lastName}`) : "N/A",
                teacherId: typeof assessment === "object" && "lesson" in assessment && assessment.lesson && typeof assessment.lesson === "object" && "teacher" in assessment.lesson && assessment.lesson.teacher && typeof assessment.lesson.teacher === "object" && "_id" in assessment.lesson.teacher ? String(`${assessment.lesson.teacher._id}`) : "N/A",                
                date: isExam && "startTime" in assessment
                    ? new Date((assessment as IExam).startTime).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                    })
                    : !isExam && "startDate" in assessment
                        ? new Date((assessment as { startDate: Date }).startDate).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                        })
                        : "N/A",

            };
        }).filter((result): result is Record<string, string | number> => result !== null);
    };

    // const transformResults = (results: ResultsList[]): Record<string, string | number>[] => {
    //     const transformed: Record<string, string | number>[] = [];
    
    //     results.forEach((result) => {
    //         const student = result.student;
    //         const studentUser = student && typeof student === "object" && "user" in student ? student.user : null;
    
    //         const addResult = (
    //             assessment: { title?: string; lesson?: { name?: string; class?: { name?: string; _id?: string }; subject?: { name?: string }; teacher?: { user?: { firstName?: string; lastName?: string }; _id?: string }; }; startTime?: Date; startDate?: Date },
    //             type: "exam" | "assignment",
    //             score: number | undefined,
    //             resultId: string
    //         ) => {
    //             if (!assessment || typeof assessment !== "object" || !assessment.lesson) return;
    
    //             const lesson = assessment.lesson;
    //             const classData = lesson.class;
    //             const subject = lesson.subject;
    //             const teacher = lesson.teacher;
    //             const teacherUser = teacher && typeof teacher === "object" && "user" in teacher ? teacher.user : null;
    
    //             const isExam = type === "exam";
    
    //             const date = isExam && "startTime" in assessment
    //                 ? new Date(assessment.startTime)
    //                 : !isExam && "startDate" in assessment
    //                     ? new Date(assessment.startDate)
    //                     : null;
    
    //             transformed.push({
    //                 id: `${resultId}_${type}`,
    //                 title: assessment.title ?? "N/A",
    //                 score: typeof score === "number" ? score : "N/A",
    //                 student: studentUser && typeof studentUser === "object" && "firstName" in studentUser && "lastName" in studentUser
    //                     ? `${studentUser.firstName} ${studentUser.lastName}`
    //                     : "N/A",
    //                 studentId: studentUser && typeof studentUser === "object" && "_id" in studentUser ? String(studentUser._id) : "N/A",
    //                 lesson: lesson && typeof lesson === "object" && "name" in lesson ? String(lesson.name) : "N/A",
    //                 class: classData && typeof classData === "object" && "name" in classData ? String(classData.name) : "N/A",
    //                 classId: classData && typeof classData === "object" && "_id" in classData ? String(classData._id) : "N/A",
    //                 subject: subject && typeof subject === "object" && "name" in subject ? String(subject.name) : "N/A",
    //                 teacher: teacherUser && typeof teacherUser === "object" && "firstName" in teacherUser && "lastName" in teacherUser
    //                     ? `${teacherUser.firstName} ${teacherUser.lastName}`
    //                     : "N/A",
    //                 teacherId: teacher && typeof teacher === "object" && "_id" in teacher ? String(teacher._id) : "N/A",
    //                 date: date
    //                     ? date.toLocaleDateString("en-GB", {
    //                         day: "2-digit",
    //                         month: "short",
    //                         year: "numeric",
    //                     })
    //                     : "N/A",
    //             });
    //         };
    
    //         // Process exam
    //         if ("exam" in result && result.exam) {
    //             addResult(result.exam, "exam", result.score, String(result._id));
    //         }
    
    //         // Process assignment
    //         if ("assignment" in result && result.assignment) {
    //             addResult(result.assignment, "assignment", result.score, String(result._id));
    //         }
    //     });
    
    //     return transformed;
    // };
    


    const formattedResultsData = useMemo(() => {
        return resultsData ? transformResults(resultsData) : [];
    }, [resultsData]);


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
                    <p className="text-red-500 text-center">Error: {`${error.message, " -OR- Please check your network connection"}`}</p>
                </div>
            ) : (
                <TanstackTable<Record<string, string | number>>
                    key={tableKey}
                    columns={columns}
                    data={formattedResultsData}
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

export default ResultsPageList;


