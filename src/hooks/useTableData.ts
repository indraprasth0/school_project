import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { SortingState, ColumnFiltersState } from "@tanstack/react-table";

import { ApiResponse } from "@/types/api"; // Common API response type
import { DEFAULT_PAGE_INDEX, DEFAULT_PAGE_SIZE } from "@/components/tanstack/TanstackTable";
import pluralize from "@/utils/pluralize";

type TableDataProps = {
  endpoint: string;
};

export const useTableData = <T>({ endpoint }: TableDataProps) => {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  const [globalFilter, setGlobalFilter] = useState(initialSearch)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: DEFAULT_PAGE_INDEX, //initial page index
    pageSize: Number(localStorage.getItem("showRecord")) || DEFAULT_PAGE_SIZE, //default page size
  });

 
  const fetchApiData = async (): Promise<ApiResponse<T>> => {
    const pluralEndpoint = pluralize(endpoint); // 👈 योग्य plural तयार करतो
    const res = await fetch(`/api/${pluralEndpoint}`);
    if (!res.ok) throw new Error("Failed to fetch data");
    return res.json();
  };

  const { data, isLoading, error, isFetching, refetch } = useQuery({
    queryKey: ["tableData", endpoint,],
    queryFn: () => fetchApiData(),
    staleTime: 5000, // ✅ डेटा 5 सेकंदांसाठी फ्रेश ठेवतो
    // keepPreviousData: true, // ✅ Pagination बदलताना पूर्वीचा डेटा ठेवतो
    // refetchOnWindowFocus: false, // ✅ टॅब स्विच करताना API कॉल होत नाही
  });

  return {
    data: data?.data || [],
    isLoading,
    isFetching,
    error,
    totalCount: data?.totalCount || 0,
    pagination,
    setPagination,
    sorting: sorting,
    setSorting: setSorting,
    columnFilters: columnFilters,
    setColumnFilters: setColumnFilters,
    globalFilter: globalFilter,
    setGlobalFilter: setGlobalFilter,
    refetch, // ✅ UI मध्ये Refetch बटण वापरता येईल
  };
};
