import { TeacherList, StudentList, ParentsList, SubjectsList, ClassesList, LessonsList, ExamsList } from "./index";

export interface ApiResponse<T> {
  data: T[]; // मुख्य डेटा
  totalPages?: number; // जर pagination नसेल तर हे ऑप्शनल ठेवा
  totalCount?: number; // एकूण element count मिळवण्यासाठी (optional)
  success?: boolean; // API request यशस्वी झाली का ते track करणे
  message?: string; // Error किंवा success message साठी
}

// ✅ प्रत्येक Entity साठी वेगवेगळे प्रकार
export type FetchTeachersResponse = ApiResponse<TeacherList>;
export type FetchStudentsResponse = ApiResponse<StudentList>;
export type FetchParentsResponse = ApiResponse<ParentsList>;
export type FetchSubjectsResponse = ApiResponse<SubjectsList>;
export type FetchClassesResponse = ApiResponse<ClassesList>;
export type FetchLessonsResponse = ApiResponse<LessonsList>;
export type FetchExamsResponse = ApiResponse<ExamsList>;

