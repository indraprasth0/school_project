import { Column } from "@tanstack/react-table";
import DebouncedInput from "./debouncedInput";
import { useMemo } from "react";

/* eslint-disable @typescript-eslint/no-unused-vars */
declare module "@tanstack/react-table" {
  interface ColumnMeta<TData, TValue> {
    filterVariant?: "range" | "select" | "text";
    options?: string[]; // For select dropdown
  }
}

export function Filter<TData, TValue>({ column }: { column: Column<TData, TValue> }) {
//   const columnFilterValue = column.getFilterValue();
//   const { filterVariant, options } = column.columnDef.meta ?? {};

//   return filterVariant === "range" ? (
//     <div>
//       <div className="flex space-x-2">
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[0] ?? ""}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [value, old?.[1]])
//           }
//           placeholder="Min"
//           className="w-24 border shadow rounded"
//         />
//         <DebouncedInput
//           type="number"
//           value={(columnFilterValue as [number, number])?.[1] ?? ""}
//           onChange={(value) =>
//             column.setFilterValue((old: [number, number]) => [old?.[0], value])
//           }
//           placeholder="Max"
//           className="w-24 border shadow rounded"
//         />
//       </div>
//       <div className="h-1" />
//     </div>
//   ) : filterVariant === "select" ? (
//     <select
//       title="Filter options"
//       onChange={(e) => column.setFilterValue(e.target.value)}
//       value={columnFilterValue?.toString() ?? ""}
//       className="border rounded px-2 py-1"
//     >
//       <option value="">All</option>
//       {(options ?? []).map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   ) : (
//     <DebouncedInput
//       className="w-36 border shadow rounded"
//       onChange={(value) => column.setFilterValue(value)}
//       placeholder="Search..."
//       type="text"
//       value={(columnFilterValue ?? "") as string}
//     />
//   );
// }
// export function Filter({ column }: { column: Column<any, unknown> }) {
    const { filterVariant } = column.columnDef.meta ?? {}
  
    const columnFilterValue = column.getFilterValue()
  
    const sortedUniqueValues = useMemo(
      () =>
        filterVariant === 'range'
          ? []
          : Array.from(column.getFacetedUniqueValues().keys())
              .sort()
              .slice(0, 5000),
      [column.getFacetedUniqueValues(), filterVariant]
    )
  
    return filterVariant === 'range' ? (
      <div>
        <div className="flex space-x-2">
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[0] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [value, old?.[1]])
            }
            placeholder={`Min ${
              column.getFacetedMinMaxValues()?.[0] !== undefined
                ? `(${column.getFacetedMinMaxValues()?.[0]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
          <DebouncedInput
            type="number"
            min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
            max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
            value={(columnFilterValue as [number, number])?.[1] ?? ''}
            onChange={value =>
              column.setFilterValue((old: [number, number]) => [old?.[0], value])
            }
            placeholder={`Max ${
              column.getFacetedMinMaxValues()?.[1]
                ? `(${column.getFacetedMinMaxValues()?.[1]})`
                : ''
            }`}
            className="w-24 border shadow rounded"
          />
        </div>
        <div className="h-1" />
      </div>
    ) : filterVariant === 'select' ? (
      <select
        title="Filter options"
        onChange={e => column.setFilterValue(e.target.value)}
        value={columnFilterValue?.toString()}
      >
        <option value="">All</option>
        {sortedUniqueValues.map((value: string | number, index:number) => (
          //dynamically generated select options from faceted values feature
          <option key={index} value={value} >
            {value}
          </option>
        ))}
      </select>
    ) : (
      <>
        {/* Autocomplete suggestions from faceted values feature */}
        <datalist id={column.id + 'list'}>
          {sortedUniqueValues.map((value: string | number, index:number) => (
            <option key={index} value={value}  />
          ))}
        </datalist>
        <DebouncedInput
          type="text"
          value={(columnFilterValue ?? '') as string}
          onChange={value => column.setFilterValue(value)}
          placeholder={` (${column.getFacetedUniqueValues().size}) ${column.id} Search... `}
          className="w-36 border shadow rounded"
          list={column.id + 'list'}
        />
        <div className="h-1" />
      </>
    )
  }