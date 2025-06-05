// export const fetchData = async ({
//     endpoint,
//     pageIndex,
//     pageSize,
//     sorting,
//     columnFilters,
//     globalFilter,
// }: {
//     endpoint: string;
//     pageIndex: number;
//     pageSize: number;
//     sorting: SortingState;
//     columnFilters: ColumnFiltersState;
//     globalFilter: string;
// }): Promise<any> => {
//     const queryParams = new URLSearchParams({
//         page: pageIndex.toString(),
//         limit: pageSize.toString(),
//         sort: sorting.length > 0 ? `${sorting[0].id},${sorting[0].desc ? "desc" : "asc"}` : "",
//         filter: globalFilter || "",
//     });

//     columnFilters.forEach((filter) => {
//         queryParams.append(`filter[${filter.id}]`, filter.value);
//     });

//     const res = await fetch(`/api/${endpoint}?${queryParams.toString()}`);
//     if (!res.ok) throw new Error(`Failed to fetch ${endpoint} data`);
//     return res.json();
// };
