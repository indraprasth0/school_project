import { useCallback, useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  getCoreRowModel,
  OnChangeFn,
  ColumnFiltersState,
  SortingState,
  PaginationState,
  PaginationOptions,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  useReactTable,
} from '@tanstack/react-table'
import {
  DndContext,
  DragEndEvent,
  useSensor,
  useSensors,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
  closestCenter,
} from "@dnd-kit/core";
import { motion } from "framer-motion";
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers'
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { useInView } from 'react-intersection-observer'

import DraggableTableHeader from "@/components/DraggableTableHeader";
import DragAlongCell from "@/components/DragAlongCell";
import Loading from '../Loading';
import { Button } from '../ui/button'
import { store } from '@/app/store';
import { TableFooter } from '../TableFooter';

export const DEFAULT_PAGE_INDEX = 0
export const DEFAULT_PAGE_SIZE = 10

type Props<T extends Record<string, string | number>> = {
  data: T[]
  columns: ColumnDef<T>[]
  pagination: PaginationState
  paginationOptions: Pick<PaginationOptions, 'rowCount'> & { onPaginationChange: OnChangeFn<PaginationState> }
  sorting: SortingState
  onSortingChange: OnChangeFn<SortingState>
  globalFilter: string
  onGlobalFilterChange: OnChangeFn<string>
  ColumnFiltersState: ColumnFiltersState
  onColumnFiltersChange: OnChangeFn<ColumnFiltersState>
  columnOrder: string[]
  setColumnOrder: OnChangeFn<string[]>
  setColumnVisibility: OnChangeFn<Record<string, boolean>>
  columnVisibility: Record<string, boolean>
  columnSizing: Record<string, number>
  setColumnSizing: OnChangeFn<Record<string, number>>
}


export default function TanstackTable<T extends Record<string, string | number>>({
  data,
  columns,
  columnOrder,
  setColumnOrder,
  sorting,
  onSortingChange,
  globalFilter,
  onGlobalFilterChange,
  pagination,
  paginationOptions,
  // onColumnFiltersChange: setColumnFilters,
  onColumnFiltersChange,
  ColumnFiltersState: columnFilters,
  columnVisibility,
  setColumnVisibility,
  columnSizing,
  setColumnSizing,
}: Props<T>) {

  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false)
  const [useInfiniteScroll, setUseInfiniteScroll] = useState(() => {
    return JSON.parse(localStorage.getItem("useInfiniteScroll") || "false");
  });
  const [showRecord, setShowRecord] = useState(() => {
    return Number(localStorage.getItem("showRecord"));
  });
  const [loadingTimeout, setLoadingTimeout] = useState(() => {
    return Number(localStorage.getItem("loadingTimeout")) || 1;
  });

  useEffect(() => {
    localStorage.setItem("useInfiniteScroll", JSON.stringify(useInfiniteScroll));
  }, [useInfiniteScroll]);

  useEffect(() => {
    localStorage.setItem("showRecord", String(showRecord));
  }, [showRecord]);

  useEffect(() => {
    localStorage.setItem("loadingTimeout", String(loadingTimeout));
  }, [loadingTimeout]);


  useEffect(() => {
    if (useInfiniteScroll && inView && pagination.pageSize < data.length) {
      setLoading(true);
      setTimeout(() => {
        paginationOptions.onPaginationChange({
          ...pagination,
          pageSize: pagination.pageSize + showRecord,
        });
        setLoading(false);
      }, loadingTimeout * 1000);
    }
  }, [useInfiniteScroll, inView, pagination.pageSize, data.length, loadingTimeout]);


  const table = useReactTable({
    data,
    columns,
    filterFns: {},
    state: { columnFilters, globalFilter, pagination, sorting, columnOrder, columnVisibility, columnSizing, },
    onSortingChange,
    onPaginationChange: paginationOptions.onPaginationChange,
    onGlobalFilterChange,
    onColumnFiltersChange,
    onColumnSizingChange: setColumnSizing,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnOrderChange: setColumnOrder,
    onColumnVisibilityChange: setColumnVisibility,
    getFacetedRowModel: getFacetedRowModel(), // client-side faceting
    getFacetedUniqueValues: getFacetedUniqueValues(), // generate unique values for select filter/autocomplete
    getFacetedMinMaxValues: getFacetedMinMaxValues()

    // debugTable: true,
    // debugHeaders: true,
    // debugColumns: true,
  });


  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (active?.id !== over?.id) {
      setColumnOrder((prev) => {
        const oldIndex = prev.indexOf(active.id as string);
        const newIndex = over ? prev.indexOf(over.id as string) : -1;
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  }, [setColumnOrder]);

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders();
    return headers.reduce((acc, header) => {
      const columnId = header.column.id;

      const size = columnSizing[columnId] ?? header.getSize() ?? header.column.getSize() ?? 150;

      acc[`--header-${header.id}-size`] = size;
      acc[`--col-${columnId}-size`] = size;

      return acc;
    }, {} as { [key: string]: number });
  }, [table.getState().columnSizing, columnSizing]);


  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 190);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [initialColumnOrder] = useState(columnOrder);
  const [myData, setMyData] = useState(() => data);

  const rerender = () => {
    setMyData([...data]);
    setColumnOrder(initialColumnOrder);
  };

  console.log(myData, pagination, paginationOptions,);

  const recordAmount = Number(table.getRowCount())

  const totalSearchRecordCount = recordAmount < 1 ? "No Record found" : recordAmount == 1 ? "1 Record" : `${table.getRowCount().toLocaleString()} Records`


  useEffect(() => {
    store.setState((state) => {
      return {
        ...state,
        totalRecordCount: totalSearchRecordCount,
      }
    })
  }, [totalSearchRecordCount]);


  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd} sensors={sensors} modifiers={[restrictToHorizontalAxis]}>
      <div className="relative flex">
        {/* Sidebar - Hover वर उघडणारी */}
        <div
          className="absolute right-0 top-0 h-full"
          onMouseEnter={() => setShowSidebar(true)}
          onMouseLeave={() => setShowSidebar(false)}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: showSidebar ? "0%" : "100%" }}
            transition={{ duration: 0.3 }}
            className="w-80 h-full bg-p900 text-p50 shadow-lg p-6 fixed right-0.5 top-20 z-50  rounded-lg overflow-auto"
          >
            <h2 className="text-lg font-semibold mb-4">Table Settings</h2>

            <Button variant="defaultOne" onClick={() => rerender()} className="border p-2 mb-2" >
              Regenerate Columns
            </Button>

            {/* Column Visibility */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Table Columns</h3>
              <div className="border border-gray-700 shadow-md rounded p-3">
                <label className="block mb-2">
                  <input
                    type="checkbox"
                    checked={table.getIsAllColumnsVisible()}
                    onChange={table.getToggleAllColumnsVisibilityHandler()}
                  /> Toggle All Columns
                </label>
                {table.getAllLeafColumns().map((column) => (
                  <label key={column.id} className="block px-1">
                    <input
                      type="checkbox"
                      checked={column.getIsVisible()}
                      onChange={column.getToggleVisibilityHandler()}
                    /> {column.id}
                  </label>
                ))}
              </div>
            </div>

            {/* Infinite Scroll Setting */}
            <div className="mb-6">
              <h3 className="text-md font-medium mb-2">Infinite Scroll</h3>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useInfiniteScroll}
                  onChange={(e) => {
                    table.firstPage()
                    setUseInfiniteScroll(e.target.checked)
                  }}
                /> Enable Infinite Scroll
              </label>
              {useInfiniteScroll && (<>
                <label className="block mt-2">
                  Timeout (ms):
                  <input
                    type="number"
                    value={loadingTimeout}
                    onChange={(e) => setLoadingTimeout(Number(e.target.value))}
                    className="border p-1 rounded w-20 ml-2"
                  />
                </label>

                <label className="block mt-2">
                  Infinite Scrolling Record Loading per page:
                  <input
                    type="number"
                    value={showRecord}
                    onChange={(e) => setShowRecord(Number(e.target.value))}
                    className="border p-1 rounded w-20 ml-2"
                  />
                </label>
              </>)}
              <label htmlFor="pageSizeSelect" className="block mt-2">{useInfiniteScroll ? "First Page Show Record" : "Pagination Select Record Page Size"}
                {/* <select
                id='pageSizeSelect'
                value={table.getState().pagination.pageSize}
                onChange={e => {
                  table.setPageSize(Number(e.target.value))
                }}
              >
                {[5, 10, 20, 30, 40, 50].map(pageSize => (
                  <option key={pageSize} value={pageSize}>
                    Show {pageSize}
                  </option>
                ))}
              </select> */}
                <input
                  type="number"
                  value={table.getState().pagination.pageSize}
                  onChange={(e) => table.setPageSize(Number(e.target.value))}
                  className="border p-1 rounded w-20 ml-2"
                />
              </label>
            </div>

            {/* Data Info */}
            <div className="mb-4 text-sm">
              <h3 className="text-md font-medium mb-2">Table Info</h3>
              <p className="mb-1 font-bold">
                Showing {table.getRowModel().rows.length.toLocaleString()} of {" "}
                {table.getRowCount().toLocaleString()} Rows
              </p>
              <pre className="text-xs bg-p50 text-p900 p-2 rounded">{JSON.stringify(table.getState().pagination, null, 2)}</pre>
              <pre className="text-xs bg-p50 text-p900 p-2 rounded mt-2">{JSON.stringify(sorting, null, 2)}</pre>
              <pre className="text-xs bg-p50 text-p900 p-2 rounded mt-2">
                {JSON.stringify(
                  {
                    columnFilters: table.getState().columnFilters,
                    globalFilter: table.getState().globalFilter,
                  },
                  null,
                  2
                )}
              </pre>
              <pre className="text-xs bg-p50 text-p900 p-2 rounded mt-2">
                {JSON.stringify(
                  {
                    columnSizing: table.getState().columnSizing,
                  },
                  null,
                  2
                )}
              </pre>
              <pre className="text-xs bg-p50 text-p900 p-2 rounded mt-2">
                {JSON.stringify(table.getState().columnVisibility, null, 2)}
              </pre>
            </div>

            <Button onClick={() => rerender()} className="border p-2 w-full mt-4">
              Regenerate Columns
            </Button>
          </motion.div>
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center flex-col min-h-[calc(100vh-190px)] ">
        <div className="flex-grow ">
          <table  {...{
            className: 'w-full mt-4 border-collapse avenir-light min-h-[calc(100vh-100)]',
            style: {
              ...columnSizeVars,
              width: table.getTotalSize(),
            },
          }}>
            <thead className={`sticky top-0 z-10 transition-colors duration-500 ${isSticky ? "bg-black text-white" : "bg-p900 text-p200 shadow-lg  border-r-p200 border-2"}`}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  <SortableContext items={columnOrder} strategy={horizontalListSortingStrategy}>
                    {headerGroup.headers.map((header) => (
                      <th
                        key={header.id}
                        colSpan={header.colSpan as number}
                        className={`${columnVisibility[header.column.id] ? "table-cell" : "hidden"} relative`}
                        style={{ width: `calc(var(--header-${header?.id}-size) * 1px)` }}
                      >
                       
                        <DraggableTableHeader key={header.id} header={header} />
                       
                        {header.column.getCanResize() && (
                          <div
                            {...{
                              onDoubleClick: () => header.column.resetSize(),
                              onMouseDown: header.getResizeHandler(),
                              onTouchStart: header.getResizeHandler(),
                              className: `absolute right-0 top-0 h-full w-1 hover:w-2 hover:bg-p200 cursor-ew-resize ${header.column.getIsResizing() ? 'hover:w-3 hover:bg-p50' : ''
                                }`,
                            }}
                          />
                        )}

                      </th>
                    ))}
                  </SortableContext>
                </tr>
              ))}
            </thead>

            <tbody>
              {table.getRowModel().rows.map((row) => (
                <motion.tr
                  key={row.id}
                  className="bg-p300 even:bg-p400 text-p950 text-sm transition-all hover:text-lg hover:bg-p900 hover:text-p200 hover:font-bold"
                  whileHover={{ scale: 1.01, y: -2 }}
                >
                  {row.getVisibleCells().map((cell) => (
                    <SortableContext key={cell.id} items={columnOrder} strategy={horizontalListSortingStrategy}>
                      <motion.td
                        key={cell.id}
                        className={`p-2 transition-all ${columnVisibility[cell.column.id] ? "table-cell" : "hidden"}`}
                        whileHover={{ scale: 1.01, y: -1 }}
                        style={{ width: `calc(var(--col-${cell.column.id}-size) * 1px)`, }}
                      >
                        <DragAlongCell key={cell.id} cell={cell} />
                      </motion.td>
                    </SortableContext>
                  ))}
                </motion.tr>

              ))}

            </tbody>

          </table>
          {loading && <Loading zoom={0.2} />} {/* Loader */}
          <div ref={ref} />
          <TableFooter
            isFetching={false} // Replace with the actual logic or remove if unnecessary
            hasNextPage={table.getCanNextPage()}
            totalRows={table.getRowModel().rows.length}
          />
        </div>
        <div className="p-4 border-t">
          {!useInfiniteScroll &&
            <div className="flex items-center gap-2 py-4">
              <Button
                className="border rounded p-1"
                onClick={() => table.firstPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<<'}
              </Button>
              <Button
                className="border rounded p-1"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                {'<'}
              </Button>
              <span className="flex items-center gap-1">
                <strong>
                  Page {' '}
                  {table.getState().pagination.pageIndex + 1} of{' '}
                  {table.getPageCount().toLocaleString()}
                </strong>
              </span>
              <span className="flex items-center gap-1">
                | Go to page:
                <input
                  type="number"
                  min="1"
                  max={table.getPageCount()}
                  defaultValue={table.getState().pagination.pageIndex + 1}
                  onChange={e => {
                    const page = e.target.value ? Number(e.target.value) - 1 : 0
                    table.setPageIndex(page)
                  }}
                  className="border p-1 rounded w-16"
                  placeholder="Enter page number"
                  title="Page number input"
                />
              </span>
              <Button
                className="border rounded p-1"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>'}
              </Button>
              <Button
                className="border rounded p-1"
                onClick={() => table.lastPage()}
                disabled={!table.getCanNextPage()}
              >
                {'>>'}
              </Button>
            </div>
          }
        </div>

      </div>

    </DndContext>
  );
}

