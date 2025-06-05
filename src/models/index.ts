import mongoose from "mongoose";

import "./userModel";
import "./Admin.model";
import "./Teacher.model";
import "./Student.model";
import "./Parent.model";
import "./Class.model";
import "./Subject.model";
import "./Lesson.model";
import "./Exam.model";
import "./Announcement.model";
import "./Assignment.model";
import "./Attendance.model";
import "./Event.model";
import "./Grade.model";
import "./Location.model";
import "./Result.model";

export type { IUser } from "./userModel";
export type {IAdmin} from "./Admin.model"
export type { ITeacher } from "./Teacher.model";
export type { IStudent } from "./Student.model";
export type { IParent } from "./Parent.model"
export type { IClass } from "./Class.model";
export type { ISubject } from "./Subject.model";
export type { ILesson } from "./Lesson.model";
export type { IExam } from "./Exam.model";
export type { IAnnouncement } from "./Announcement.model";
export type { IAssignment } from "./Assignment.model";
export type { IAttendance } from "./Attendance.model";
export type { IEvent } from "./Event.model";
export type { IGrade } from "./Grade.model";
export type { ILocation } from "./Location.model";
export type { IResult } from "./Result.model";

export { mongoose };