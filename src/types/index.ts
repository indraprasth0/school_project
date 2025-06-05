import { IUser, ITeacher, IStudent, IParent, IClass, ISubject, ILesson,  IGrade, IExam, IResult, IAssignment, IEvent, IAnnouncement,} from "@/models";


export type TeacherList = ITeacher & { user: IUser; subjects: ISubject[]; classes: IClass[]; lessons: ILesson[] };
export type StudentList = IStudent & { user: IUser; classes: IClass;  }
export type ParentsList = IParent & { students: IStudent[] };
export type SubjectsList = ISubject & { teachers: ITeacher[], lessons: ILesson[] }
export type ClassesList = IClass & { grade: IGrade; supervisor: ITeacher, lessons: ILesson[] }
export type LessonsList = ILesson & { subject: ISubject; class: IClass; teacher: ITeacher }
export type ExamsList = IExam & { lessons: ILesson, result: IResult[] }
export type AssignmentsList = IAssignment & { subject: ISubject; class: IClass; teacher: ITeacher }
export type ResultsList = IResult & { exam: IExam &{subject: ISubject; class: IClass; teacher: ITeacher }}  & { assignment: IAssignment & {subject: ISubject; class: IClass; teacher: ITeacher }}
export type EventsList = IEvent & { class: IClass }
export type AnnouncementsList = IAnnouncement & { class: IClass }
