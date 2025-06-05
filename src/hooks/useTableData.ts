// import axios from "axios";
// import { useState } from "react";
// import { useSearchParams } from "next/navigation";
// import { useQuery } from "@tanstack/react-query";
// import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

// import { ApiResponse } from "@/types/api"; // Common API response type
// import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/tanstack/TanstackTable";
// import pluralize from "@/utils/pluralize";

// type TableDataProps = {
//   endpoint: string;
// };

// export const useTableData = <T>({ endpoint }: TableDataProps) => {
//   const searchParams = useSearchParams();
//   const initialSearch = searchParams.get("search") || "";
//   const [globalFilter, setGlobalFilter] = useState(initialSearch)
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [pagination, setPagination] = useState({
//     pageIndex: DEFAULT_PAGE_INDEX, //initial page index
//     pageSize: Number(localStorage.getItem("showRecord")) || DEFAULT_PAGE_SIZE, //default page size
//   });

 
//   // const fetchApiData = async (): Promise<ApiResponse<T>> => {
//   //   const pluralEndpoint = pluralize(endpoint); // 👈 योग्य plural तयार करतो
//   //   const res = await fetch(`/api/${pluralEndpoint}`);
//   //   if (!res.ok) throw new Error("Failed to fetch data");
//   //   return res.json();
//   // };

//   const fetchApiData = async (): Promise<ApiResponse<T>> => {
//   const pluralEndpoint = pluralize(endpoint); // उदाहरण: "student" → "students"
//   try {
//     const res = await axios.get<ApiResponse<T>>(`/api/${pluralEndpoint}`);
//     return res.data;
//   } catch (error: any) {
//     // Axios errors मध्ये HTTP error सुद्धा catch होते
//     throw new Error(error.response?.data?.message || "Failed to fetch data");
//   }
// };

//   const { data, isLoading, error, isFetching, refetch } = useQuery({
//     queryKey: ["tableData", endpoint,],
//     queryFn: () => fetchApiData(),
//     staleTime: 5000, // ✅ डेटा 5 सेकंदांसाठी फ्रेश ठेवतो
//     // keepPreviousData: true, // ✅ Pagination बदलताना पूर्वीचा डेटा ठेवतो
//     // refetchOnWindowFocus: false, // ✅ टॅब स्विच करताना API कॉल होत नाही
//   });

//   return {
//     data: data?.data || [],
//     isLoading,
//     isFetching,
//     error,
//     totalCount: data?.totalCount || 0,
//     pagination,
//     setPagination,
//     sorting: sorting,
//     setSorting: setSorting,
//     columnFilters: columnFilters,
//     setColumnFilters: setColumnFilters,
//     globalFilter: globalFilter,
//     setGlobalFilter: setGlobalFilter,
//     refetch, // ✅ UI मध्ये Refetch बटण वापरता येईल
//   };
// };


import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import pluralize from "@/utils/pluralize";

import axios from "@/lib/axiosInstance"; // 👈 Custom Axios Instance
import { ApiResponse } from "@/types/api";
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/tanstack/TanstackTable";

type TableDataProps = {
  endpoint: string;
};

export const useTableData = <T>({ endpoint }: TableDataProps) => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [globalFilter, setGlobalFilter] = useState(initialSearch);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX,
    pageSize: Number(localStorage.getItem("showRecord")) || DEFAULT_PAGE_SIZE,
  });

  const fetchApiData = async (): Promise<ApiResponse<T>> => {
    const pluralEndpoint = pluralize(endpoint);
    try {
      const res = await axios.get<ApiResponse<T>>(`/${pluralEndpoint}`, {
        params: {
          page: pagination.pageIndex + 1,
          limit: pagination.pageSize,
          search: globalFilter,
          // sorting, filters can be added here
        },
      });
      return res.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "API Error");
    }
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["tableData", endpoint, pagination, globalFilter],
    queryFn: () => fetchApiData(),
    staleTime: 5000,
    // keepPreviousData: true,
    // refetchOnWindowFocus: false,
  });

  

  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    error,
    totalCount: data?.totalCount || 0,
    pagination,
    setPagination,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    globalFilter,
    setGlobalFilter,
    refetch,
  };
};
