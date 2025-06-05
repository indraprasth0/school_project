// import { flexRender, Header, ColumnDef } from "@tanstack/react-table";
// import { useSortable } from "@dnd-kit/sortable";
// import { GripHorizontal } from "lucide-react"; // Lucide आयकॉन लायब्ररी वापरत आहे.
// import { CSS } from "@dnd-kit/utilities"; // DnDKit helper for transform
// import { Filter } from "./Filter";
// import { useEffect, useState } from "react";

// type ExtendedColumnDef<T> = ColumnDef<T, unknown> & {
//     className?: string; // Custom className    
// };

// type DraggableTableHeaderProps<T> = {
//     header: Header<T, unknown> & { column: { columnDef: ExtendedColumnDef<T> } };
// };

// export default function DraggableTableHeader<T>({ header }: DraggableTableHeaderProps<T>) {




//     const { attributes, isDragging, listeners, setNodeRef, transform } = useSortable({
//         id: header.column.id
//     })



//     // `style` वापरून `transform` लागू करणे आणि Tailwind `className` योग्यरित्या सेट करणे
//     const style = {
//         transform: transform ? CSS.Translate.toString(transform) : undefined,
//         transition: "transform 0.4s ease",
//     };

//     const [showFilter, setShowFilter] = useState(() => {
//         return JSON.parse(localStorage.getItem("showFilter") || "false");
//     });

//     useEffect(() => {
//         // Custom event listener 
//         const handleStorageChange = () => {
//             setShowFilter(JSON.parse(localStorage.getItem("showFilter") || "false"));
//         };

//         window.addEventListener("showFilterUpdated", handleStorageChange);

//         return () => {
//             window.removeEventListener("showFilterUpdated", handleStorageChange);
//         };
//     }, []);



//     return (
//         <div
//             ref={setNodeRef}
//             style={style}
//             className={`relative p-2 ${header.column.columnDef.className || ""} ${isDragging ? "opacity-90" : "opacity-100"
//                 }`}
//         >
//             {header.isPlaceholder ? null : (
//                 <>
//                     <div
//                         {...{
//                             className: `flex items-center justify-center p-2 cursor-pointer select-none hover:bg-p400 gap-1 ${header.column.getCanSort() ? "cursor-pointer select-none" : ""
//                                 }`,
//                             onClick: header.column.getToggleSortingHandler(),
//                             title: header.column.getCanSort()
//                                 ? header.column.getNextSortingOrder() === "asc"
//                                     ? "Click to sort: Ascending 👆"
//                                     : header.column.getNextSortingOrder() === "desc"
//                                         ? "Click to sort: Descending 👇"
//                                         : "Click to sort: Clear"
//                                 : undefined,
//                         }}
//                     >
//                         <span
//                             {...attributes}
//                             {...listeners}
//                             className="p-1 hover:text-gray-900 cursor-grab active:cursor-grabbing whitespace-nowrap"
//                             title="Drag to reorder"
//                         >
//                             <GripHorizontal size={18} />
//                         </span>
//                         {flexRender(header.column.columnDef.header, header.getContext())}
//                         {{ asc: "👆", desc: "👇", false: "" }[header.column.getIsSorted() as string] ?? null}
//                     </div>
//                     {showFilter && header.column.getCanFilter() ? (
//                         <div>
//                             <Filter column={header.column} />
//                         </div>
//                     ) : null}
//                 </>
//             )}
//         </div>
//     );
// }
import { flexRender, Header, ColumnDef } from "@tanstack/react-table";
import { useSortable } from "@dnd-kit/sortable";
import { GripHorizontal } from "lucide-react";
import { CSS } from "@dnd-kit/utilities";
import { Filter } from "./Filter";
import { useEffect, useState } from "react";


type ExtendedColumnDef<T> = ColumnDef<T, unknown> & {
    className?: string;
    enableDragging?: boolean;
};

type DraggableTableHeaderProps<T> = {
    header: Header<T, unknown> & {
        column: {
            columnDef: ExtendedColumnDef<T>;
            id: string;
        };
    };
};

export default function DraggableTableHeader<T>({ header }: DraggableTableHeaderProps<T>) {
    const isDraggable = header.column.columnDef.meta?.enableDragging
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: header.column.id });

    const style = {
        transform: transform ? CSS.Transform.toString(transform) : undefined,
        transition: transition || "transform 0.25s ease",
    };

    const [showFilter, setShowFilter] = useState<boolean>(() => {
        if (typeof window === "undefined") return false;
        return JSON.parse(localStorage.getItem("showFilter") || "false");
    });

    useEffect(() => {
        const handleStorageChange = () => {
            setShowFilter(JSON.parse(localStorage.getItem("showFilter") || "false"));
        };

        window.addEventListener("showFilterUpdated", handleStorageChange);
        return () => window.removeEventListener("showFilterUpdated", handleStorageChange);
    }, []);

    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`relative p-2 transition-opacity duration-200 ${isDragging ? "opacity-80" : "opacity-100"
                } ${header.column.columnDef.className || ""}`}
        >
            {!header.isPlaceholder && (
                <>
                    <div
                        className={`flex items-center justify-center gap-2 p-2 rounded-md hover:bg-p600 cursor-default`}
                    >                        
                        {isDraggable ?
                        (<span
                            {...attributes}
                            {...listeners}
                            className="text-muted-foreground hover:text-foreground cursor-grab active:cursor-grabbing"
                            title="Drag to reorder"
                        >
                            <GripHorizontal size={18} />
                        </span>) : (<span></span>)}

                        {/* Column Header Title */}
                        <div
                            onClick={header.column.getToggleSortingHandler()}
                            className={`flex items-center gap-1 cursor-pointer select-none`}
                            title={
                                header.column.getCanSort()
                                    ? header.column.getNextSortingOrder() === "asc"
                                        ? "Click to sort: Ascending 👆"
                                        : header.column.getNextSortingOrder() === "desc"
                                            ? "Click to sort: Descending 👇"
                                            : "Click to sort: Clear"
                                    : undefined
                            }
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                            {/* Sorting Icon */}
                            <span className="ml-1">
                                {
                                    {
                                        asc: "👆",
                                        desc: "👇",
                                        false: "",
                                    }[header.column.getIsSorted() as string]
                                }
                            </span>
                        </div>
                    </div>

                    {/* Column Filter */}
                    {showFilter && header.column.getCanFilter() && (
                        <div className="mt-1">
                            <Filter column={header.column} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
