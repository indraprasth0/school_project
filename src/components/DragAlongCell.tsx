// import { Cell, flexRender, ColumnDef } from "@tanstack/react-table";
// import { useSortable } from "@dnd-kit/sortable";
// import clsx from "clsx";
// // import { CSS } from "@dnd-kit/utilities";

// type ColumnDefWithClassName<T> = ColumnDef<T, unknown> & {
//     className?: string;
// };

// type DragAlongCellProps<T> = {
//     cell: Cell<T, unknown> & { column: { columnDef: ColumnDefWithClassName<T> } };
// };
  
//   export default function DragAlongCell<T>({ cell }: DragAlongCellProps<T>) {

//   const { isDragging, setNodeRef, transform } = useSortable({ id: cell.column.id });

//   // const style = {
//   //   opacity: isDragging ? 0.8 : 1,
//   //   transform: CSS.Translate.toString(transform),
//   //   transition: "transform 0.2s ease",
//   //   width: cell.column.getSize() > 0 ? `${cell.column.getSize()}px` : "0px",
//   // };
//   const className = clsx(
//     "transition-transform ease-in-out duration-200",
//     isDragging ? "opacity-50" : "opacity-100",
//     transform && "translate-x-1 translate-y-1",
//     cell.column.columnDef.className, // कॉलमचा मूळ `className`
//       );

//   return <td ref={setNodeRef}  className={`p-2 border-r-1 ${className}`}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>;
// };


import { Cell, flexRender, ColumnDef } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import clsx from "clsx";

type ColumnDefWithClassName<T> = ColumnDef<T, unknown> & {
    className?: string;
};

type DragAlongCellProps<T> = {
    cell: Cell<T, unknown> & { column: { columnDef: ColumnDefWithClassName<T> } };
};

export default function DragAlongCell<T>({ cell }: DragAlongCellProps<T>) {
    const { isDragging, setNodeRef, transform } = useSortable({ id: cell.column.id });

    const style = {
        transform: transform ? CSS.Translate.toString(transform) : undefined,
        transition: "transform 0.5s ease",
    };

    const className = clsx(
        "transition-transform ease-in-out duration-500 ",
        isDragging ? "opacity-50" : "opacity-100",
        cell.column.columnDef.className // कॉलमची मूळ `className` टिकवली आहे
    );

    return (
        <div ref={setNodeRef} style={style} className={`${className}`}>
            {cell.column.columnDef.cell ? flexRender(cell.column.columnDef.cell, cell.getContext()) : null}
        </div>
    );
}
