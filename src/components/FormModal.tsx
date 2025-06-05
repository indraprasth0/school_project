// "use client";

// import Image from "next/image";
// import React, { useEffect, useState, JSX } from "react";

// import { role } from "@/lib/data";
// import dynamic from "next/dynamic";
// // import TeacherForm from "./forms/TeacherForm";
// // import StudentForm from "./forms/StudentForm";

// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), {
//   loading: () => <p>Loading...</p>, // लोडिंग टेक्स्ट
// });

// const StudentForm = dynamic(() => import("./forms/StudentForm"), {
//   loading: () => <p>Loading...</p>, // लोडिंग टेक्स्ट
// });

// const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading: () => <p>Loading...</p> });



// const forms: {
//   [key: string]: (type: "create" | "update", data?: Record<string, unknown>) => JSX.Element
// } = {
//   teacher: (type, data) => <TeacherForm type={type} data={data} />,
//   student: (type, data) => <StudentForm type={type} data={data} />,
//   parent: (type, data) => <ParentForm type={type} data={data} />,
// }




// interface FormModalProps {
//   table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement" | "other";
//   type: "create" | "update" | "delete" | "sort" | "filter" | "view" | "announcement" | "message" | "upload";
//   id: number | string;
//   data?: Record<string, unknown>;
//   visible?: string[]; // optional visibility
// }

// const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

// const FormModal = ({ table, type, id, data, visible }: FormModalProps) => {
//   const [hoveredItems, setHoveredItems] = useState<Record<string, boolean>>({});
//   const [myRole, setMyRole] = useState<string | null>(null);
//   const [open, setOpen] = useState<boolean>(false);



//   useEffect(() => {
//     setMyRole(role); // जर role dynamic असेल तर API कॉलने अपडेट करणे चांगले
//   }, []);

//   const handleMouseEnter = (id: string) => {
//     setHoveredItems((prev) => ({ ...prev, [id]: true }));
//   };

//   const handleMouseLeave = (id: string) => {
//     setHoveredItems((prev) => ({ ...prev, [id]: false }));
//   };

//   const tName = capitalize(type);
//   const tTable = capitalize(table);

//   // **default visibility (admin, teacher, student, parent)**
//   const defaultVisibleRoles = ["admin", "teacher", "student", "parent"];
//   const allowedRoles = visible?.length ? visible : defaultVisibleRoles;

//   console.log(data);


//   const Form = () => {
//     return type === "delete" && id ? (
//       <form className="flex flex-col gap-1 mt-4 md:gap-4" action="">
//         <span className="text-center font-medium text-p500">All data will be lost. Are you sure you want to delete this {table}?</span>
//         <button
//           type="submit"
//           className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 px-6 border-none w-max self-center shadow-md shadow-black"
//         >
//           Delete
//         </button>
//       </form>
//     ) : (type === "create" || type === "update") ? (
//       forms[table](type, data)
//       // table === "teacher" ? <TeacherForm type={type} data={data} /> : <StudentForm type={type} data={data} />
//     ) : "Form not found!";
//   }

//   return (
//     <>
//       {(myRole && allowedRoles.includes(myRole)) && (
//         <button
//           className="w-8 h-8 flex items-center justify-center rounded-full bg-white overflow-hidden shadow-sm shadow-primary transition-all duration-200 ease-in-out"
//           title={tName}
//           onMouseEnter={() => handleMouseEnter(String(id))}
//           onMouseLeave={() => handleMouseLeave(String(id))}
//           onClick={() => type === "delete" && setOpen(true) || type === "update" && setOpen(true) || type === "create" && setOpen(true)} // फक्त "view" बटण क्लिक झाले तरी मोडल उघडणार नाही
//         >
//           <Image
//             src={hoveredItems[String(id)] ? `/inew/${type}.gif` : `/inew/${type}.png`}
//             alt={tName}
//             width={hoveredItems[String(id)] ? 25 : 18}
//             height={hoveredItems[String(id)] ? 25 : 18}
//             unoptimized={hoveredItems[String(id)] ? true : false}
//           />
//         </button>
//       )}
//       { open && (

//         <div
//           className="fixed inset-0 z-70 bg-black bg-opacity-60 flex items-center justify-center"
//           onClick={() => setOpen(false)} // बॅकड्रॉप क्लिक केल्यास बंद
//         >
//           <div
//             className="w-[350px] md:w-1/2 bg-p800 p-6 rounded-lg shadow-lg relative shadow-primary border-t-4 border-t-p600 
//                  max-h-[80vh] overflow-y-auto" // मुख्य सुधारणा
//             onClick={(e) => e.stopPropagation()} // मोडल क्लिक केल्यास बंद होऊ नये
//           >
//             {/* बंद करण्याचा बटण */}
//             <div className="absolute top-2 right-4 cursor-pointer shadow-sm hover:opacity-50" onClick={() => setOpen(false)}>
//               <span className="text-p400 text-2xl font-extrabold">X</span>
//             </div>

//             {/* हेडिंग */}
//             <h1 className="text-2xl font-bold text-center text-p200 mb-2">{type === "delete" ? `Delete ${tTable}` : type === "create" ? `Create a new ${tTable}` : `Update ${tTable} details`}</h1>

//             {/* फॉर्म */}
//             <div className="overflow-y-auto max-h-[70vh] p-2">
//               <Form />
//             </div>

//           </div>
//         </div>
//       )}

//     </>
//   );
// };

// export default FormModal;

// "use client";

// import Image from "next/image";
// import React, { useEffect, useState, JSX } from "react";
// import dynamic from "next/dynamic";

// import { role } from "@/lib/data";

// // Lazy loaded forms
// const TeacherForm = dynamic(() => import("./forms/TeacherForm"), { loading: () => <p>Loading...</p> });
// const StudentForm = dynamic(() => import("./forms/StudentForm"), { loading: () => <p>Loading...</p> });
// const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading: () => <p>Loading...</p> });
// // const SubjectForm = dynamic(() => import("./forms/SubjectForm"), { loading: () => <p>Loading...</p> });
// // const ClassForm = dynamic(() => import("./forms/ClassForm"), { loading: () => <p>Loading...</p> });
// // const LessonForm = dynamic(() => import("./forms/LessonForm"), { loading: () => <p>Loading...</p> });
// // const ExamForm = dynamic(() => import("./forms/ExamForm"), { loading: () => <p>Loading...</p> });
// // const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), { loading: () => <p>Loading...</p> });
// // const ResultForm = dynamic(() => import("./forms/ResultForm"), { loading: () => <p>Loading...</p> });
// // const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), { loading: () => <p>Loading...</p> });
// // const EventForm = dynamic(() => import("./forms/EventForm"), { loading: () => <p>Loading...</p> });
// // const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), { loading: () => <p>Loading...</p> });


// // Form mapping
// const forms: {
//   [key: string]: (type: "create" | "update", data?: Record<string, unknown>) => JSX.Element
// } = {
//   teacher: (type, data) => <TeacherForm type={type} data={data} />,
//   student: (type, data) => <StudentForm type={type} data={data} />,
//   parent: (type, data) => <ParentForm type={type} data={data} />,
//   // subject: (type, data) => <SubjectForm type={type} data={data} />,
//   // class: (type, data) => <ClassForm type={type} data={data} />,
//   // lesson: (type, data) => <LessonForm type={type} data={data} />,
//   // exam: (type, data) => <ExamForm type={type} data={data} />,
//   // assignment: (type, data) => <AssignmentForm type={type} data={data} />,
//   // result: (type, data) => <ResultForm type={type} data={data} />,
//   // attendance: (type, data) => <AttendanceForm type={type} data={data} />,
//   // event: (type, data) => <EventForm type={type} data={data} />,
//   // announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
// };


// interface FormModalProps {
//   table: "teacher" | "student" | "parent" | "subject" | "class" | "lesson" | "exam" | "assignment" | "result" | "attendance" | "event" | "announcement" | "other";
//   type: "create" | "update" | "delete" | "sort" | "filter" | "view" | "announcement" | "message" | "upload";
//   id: number | string;
//   data?: Record<string, unknown>;
//   visible?: string[]; // Optional visibility control
// }

// const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

// const FormModal = ({ table, type, id, data, visible }: FormModalProps) => {
//   const [hoveredItems, setHoveredItems] = useState<Record<string, boolean>>({});
//   const [myRole, setMyRole] = useState<string | null>(null);
//   const [open, setOpen] = useState<boolean>(false);

//   useEffect(() => {
//     setMyRole(role); // Replace with API call if role is dynamic
//   }, []);

//   // ESC key to close modal
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") setOpen(false);
//     };
//     document.addEventListener("keydown", handleEsc);
//     return () => document.removeEventListener("keydown", handleEsc);
//   }, []);

//   const handleMouseEnter = (id: string) => {
//     setHoveredItems((prev) => ({ ...prev, [id]: true }));
//   };

//   const handleMouseLeave = (id: string) => {
//     setHoveredItems((prev) => ({ ...prev, [id]: false }));
//   };

//   const tName = capitalize(type);
//   const tTable = capitalize(table);

//   const defaultVisibleRoles = ["admin", "teacher", "student", "parent"];
//   const allowedRoles = visible?.length ? visible : defaultVisibleRoles;

//   const Form = () => {
//     if (type === "delete" && id) {
//       return (
//         <form className="flex flex-col gap-1 mt-4 md:gap-4">
//           <span className="text-center font-medium text-p500">
//             All data will be lost. Are you sure you want to delete this {table}?
//           </span>
//           <button
//             type="submit"
//             className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 px-6 border-none w-max self-center shadow-md shadow-black"
//           >
//             Delete
//           </button>
//         </form>
//       );
//     }

//     if ((type === "create" || type === "update") && forms[table]) {
//       return forms[table](type, data);
//     }

//     return <p className="text-red-500 text-center mt-4">Form not found for this table or type.</p>;
//   };

//   return (
//     <>
//       {myRole && allowedRoles.includes(myRole) && (
//         <button
//           className="w-8 h-8 flex items-center justify-center rounded-full bg-white overflow-hidden shadow-sm shadow-primary transition-all duration-200 ease-in-out"
//           title={tName}
//           onMouseEnter={() => handleMouseEnter(String(id))}
//           onMouseLeave={() => handleMouseLeave(String(id))}
//           onClick={() => ["create", "update", "delete"].includes(type) && setOpen(true)}
//         >
//           <Image
//             src={hoveredItems[String(id)] ? `/inew/${type}.gif` : `/inew/${type}.png`}
//             alt={tName}
//             width={hoveredItems[String(id)] ? 25 : 18}
//             height={hoveredItems[String(id)] ? 25 : 18}
//             unoptimized={!!hoveredItems[String(id)]}
//           />
//         </button>
//       )}

//       {open && (
//         <div
//           className="fixed inset-0 z-70 bg-black bg-opacity-60 flex items-center justify-center"
//           onClick={() => setOpen(false)}
//         >
//           <div
//             className="w-[350px] md:w-1/2 bg-p800 p-6 rounded-lg shadow-lg relative shadow-primary border-t-4 border-t-p600 max-h-[80vh] overflow-y-auto"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* Close button */}
//             <div className="absolute top-2 right-4 cursor-pointer shadow-sm hover:opacity-50" onClick={() => setOpen(false)}>
//               <span className="text-p400 text-2xl font-extrabold">X</span>
//             </div>

//             {/* Heading */}
//             <h1 className="text-2xl font-bold text-center text-p200 mb-2">
//               {type === "delete"
//                 ? `Delete ${tTable}`
//                 : type === "create"
//                 ? `Create a new ${tTable}`
//                 : `Update ${tTable} details`}
//             </h1>

//             {/* Form */}
//             <div className="overflow-y-auto max-h-[70vh] p-2">
//               <Form />
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default FormModal;
"use client";

import Image from "next/image";
import React, { useEffect, useState, JSX } from "react";
import dynamic from "next/dynamic";
// import { motion, AnimatePresence } from "framer-motion";
// import { createPortal } from "react-dom";
import { role } from "@/lib/data";
import ModalWrapper from "./ui/ModalWrapper";

const TeacherForm = dynamic(() => import("./forms/TeacherForm"), { loading: () => <p>Loading...</p> });
const StudentForm = dynamic(() => import("./forms/StudentForm"), { loading: () => <p>Loading...</p> });
const ParentForm = dynamic(() => import("./forms/ParentForm"), { loading: () => <p>Loading...</p> });
// const SubjectForm = dynamic(() => import("./forms/SubjectForm"), { loading: () => <p>Loading...</p> });
// const ClassForm = dynamic(() => import("./forms/ClassForm"), { loading: () => <p>Loading...</p> });
// const LessonForm = dynamic(() => import("./forms/LessonForm"), { loading: () => <p>Loading...</p> });
// const ExamForm = dynamic(() => import("./forms/ExamForm"), { loading: () => <p>Loading...</p> });
// const AssignmentForm = dynamic(() => import("./forms/AssignmentForm"), { loading: () => <p>Loading...</p> });
// const ResultForm = dynamic(() => import("./forms/ResultForm"), { loading: () => <p>Loading...</p> });
// const AttendanceForm = dynamic(() => import("./forms/AttendanceForm"), { loading: () => <p>Loading...</p> });
// const EventForm = dynamic(() => import("./forms/EventForm"), { loading: () => <p>Loading...</p> });
// const AnnouncementForm = dynamic(() => import("./forms/AnnouncementForm"), { loading: () => <p>Loading...</p> });

const forms: {
  [key: string]: (type: "create" | "update", data?: Record<string, unknown>) => JSX.Element
} = {
  teacher: (type, data) => <TeacherForm type={type} data={data} />,
  student: (type, data) => <StudentForm type={type} data={data} />,
  parent: (type, data) => <ParentForm type={type} data={data} />,
  // subject: (type, data) => <SubjectForm type={type} data={data} />,
  // class: (type, data) => <ClassForm type={type} data={data} />,
  // lesson: (type, data) => <LessonForm type={type} data={data} />,
  // exam: (type, data) => <ExamForm type={type} data={data} />,
  // assignment: (type, data) => <AssignmentForm type={type} data={data} />,
  // result: (type, data) => <ResultForm type={type} data={data} />,
  // attendance: (type, data) => <AttendanceForm type={type} data={data} />,
  // event: (type, data) => <EventForm type={type} data={data} />,
  // announcement: (type, data) => <AnnouncementForm type={type} data={data} />,
};

interface FormModalProps {
  table: keyof typeof forms;
  type: "create" | "update" | "delete" | "sort" | "filter" | "view" | "announcement" | "message" | "upload";
  id: number | string;
  data?: Record<string, unknown>;
  visible?: string[];
}

const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

const FormModal = ({ table, type, id, data, visible }: FormModalProps) => {
  const [hoveredItems, setHoveredItems] = useState<Record<string, boolean>>({});
  const [myRole, setMyRole] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    setMyRole(role);
  }, []);

  const handleMouseEnter = (id: string) => {
    setHoveredItems((prev) => ({ ...prev, [id]: true }));
  };

  const handleMouseLeave = (id: string) => {
    setHoveredItems((prev) => ({ ...prev, [id]: false }));
  };

  const tName = capitalize(type);
  const tTable = capitalize(String(table));

  const defaultVisibleRoles = ["admin", "teacher", "student", "parent"];
  const allowedRoles = visible?.length ? visible : defaultVisibleRoles;
  // console.log(data?.firstName, id);

  const Form = () => {
    return type === "delete" && id ? (
      <form className="flex flex-col gap-1 mt-4 md:gap-4" action="">
        <div className="text-center font-medium text-red-500">
          All data will be lost. Are you sure you want to delete this?
        </div>
        <div className="text-center font-medium text-p300">
          Id: {id}
          <br />
          Title: {data?.title as string}
        </div>
        <button
          type="submit"
          className="p-2 bg-red-500 text-white rounded-md hover:bg-red-600 px-6 border-none w-max self-center shadow-md shadow-black"
        >
          Delete
        </button>
      </form>
    ) : (type === "create" || type === "update") ? (
      forms[table](type, data)
    ) : (<div className="font-medium text-red-500">Form not found!</div>)
  };

  return (
    <>
      {(myRole && allowedRoles.includes(myRole)) && (
        <button
          className="w-8 h-8 flex items-center justify-center rounded-full bg-white overflow-hidden shadow-sm shadow-primary transition-all duration-200 ease-in-out"
          title={`${tName} ${data?.title}`}
          onMouseEnter={() => handleMouseEnter(String(id))}
          onMouseLeave={() => handleMouseLeave(String(id))}
          onClick={() => ["delete", "update", "create"].includes(type) && setOpen(true)}
        >
          <Image
            src={hoveredItems[String(id)] ? `/inew/${type}.gif` : `/inew/${type}.png`}
            alt={tName}
            width={hoveredItems[String(id)] ? 25 : 18}
            height={hoveredItems[String(id)] ? 25 : 18}
            unoptimized={hoveredItems[String(id)]}
          />
        </button>
      )}

      <ModalWrapper
        isOpen={open}
        onClose={() => setOpen(false)}
        title={type === "delete"
          ? `Delete ${tTable}`
          : type === "create"
            ? `Create a new ${tTable}`
            : `Update ${tTable} details`
        }
      >
        <Form />
      </ModalWrapper>

    </>
  );
};

export default FormModal;
