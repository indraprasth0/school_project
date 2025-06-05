import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./src/lib/connectDB";
import UserModel from "./src/models/userModel";
import AdminModel from "./src/models/Admin.model";
import GradeModel from "./src/models/Grade.model";
import SubjectModel from "./src/models/Subject.model";
import TeacherModel from "./src/models/Teacher.model";
import ParentModel from "./src/models/Parent.model";
import StudentModel from "./src/models/Student.model";
import LessonModel from "./src/models/Lesson.model";
import ExamModel from "./src/models/Exam.model";
import AssignmentModel from "./src/models/Assignment.model";
import ResultModel from "./src/models/Result.model";
import AttendanceModel from "./src/models/Attendance.model";
import EventModel from "./src/models/Event.model";
import AnnouncementModel from "./src/models/Announcement.model";
import ClassModel from "./src/models/Class.model";

dotenv.config();

async function seeds() {
 await connectDB().catch((error) => {
    console.error("Failed to connect to the database:", error);
    throw new Error("Database connection error");
  });
  console.log("🌱 Seeding Database...");

  try {
    await UserModel.deleteMany({});
    await AdminModel.deleteMany({});
    await GradeModel.deleteMany({});
    await ClassModel.deleteMany({});
    await SubjectModel.deleteMany({});
    await TeacherModel.deleteMany({});
    await ParentModel.deleteMany({});
    await StudentModel.deleteMany({});
    await LessonModel.deleteMany({});
    await ExamModel.deleteMany({});
    await AssignmentModel.deleteMany({});
    await ResultModel.deleteMany({});
    await AttendanceModel.deleteMany({});
    await EventModel.deleteMany({});
    await AnnouncementModel.deleteMany({});
    console.log("🗑️ Old data cleared...");

    interface Address {
      place: string;
      atPost: string;
      taluka: string;
      district: string;
      state: string;
      country: string;
      pinCode: string;
    }

    interface User {
      _id: mongoose.Types.ObjectId;
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
      address: Address;
      bloodType: string;
      birthday: Date;
      sex: string;
      roles: string[];
    }

    interface Teacher {
      _id: mongoose.Types.ObjectId;
      user: mongoose.Types.ObjectId;
      subjects: mongoose.Types.ObjectId[];
      lessons: mongoose.Types.ObjectId[];
      classes: mongoose.Types.ObjectId[];
    }

    interface Student {
      user: mongoose.Types.ObjectId;
      parent: mongoose.Types.ObjectId;
      class: mongoose.Types.ObjectId;
      grade: mongoose.Types.ObjectId;
      attendances: mongoose.Types.ObjectId[];
      results: mongoose.Types.ObjectId[];
    }

    // 1️⃣ **Admin User**
    const adminUser = await UserModel.create({
      username: "9604645777A",
      firstName: "Pankaj",
      lastName: "Patil",
      email: "pankaj@resultplus.com",
      phone: "9604645777",
      address: {
        place: "Panzra-kan Sugar Factory Ltd Bhadane",
        atPost: "Bhadane",
        taluka: "Sakri",
        district: "Dhule",
        state: "Maharashtra",
        country: "India",
        pinCode: "424304",
      },
      bloodType: "O+",
      birthday: new Date("1980-04-1"),
      sex: "male",
      roles: ["admin"],
    });

    await AdminModel.create({ user: adminUser._id });

    console.log("Admin info created...");
    
    // 2️⃣ **Subjects**
    const subjects = await SubjectModel.insertMany([
      { name: "Mathematics" },
      { name: "Science" },
      { name: "English" },
      { name: "History" },
      { name: "Geography" },
      { name: "Physics" },
      { name: "Chemistry" },
      { name: "Biology" },
      { name: "Computer Science" },
      { name: "Art" },
    ]);

    //  3️⃣ **Grades (1 ते 6)**
    const grades = await GradeModel.insertMany(
      Array.from({ length: 10 }, (_, i) => ({ level: i + 1 })),
    );
    console.log("Subjects and Grades info created...");
    
    // 4️⃣ **Classes (A, B Sections)**
    const classes: Array<{
      _id: mongoose.Types.ObjectId;
      name: string;
      grade: mongoose.Types.ObjectId;
      capacity: number;
    }> = [];
    for (const grade of grades) {
      const sectionA = (await ClassModel.create({
        name: `${grade.level}A`,
        grade: grade._id,
        capacity: 25,
      })) as {
        _id: mongoose.Types.ObjectId;
        name: string;
        grade: mongoose.Types.ObjectId;
        capacity: number;
      };
      const sectionB = (await ClassModel.create({
        name: `${grade.level}B`,
        grade: grade._id,
        capacity: 30,
      })) as {
        _id: mongoose.Types.ObjectId;
        name: string;
        grade: mongoose.Types.ObjectId;
        capacity: number;
      };
      classes.push(sectionA, sectionB);
    }

    
    // 5️⃣ **Teachers**    
    const batchSize = 4;
    const teacherUsers: User[] = [];

    for (let i = 0; i < 25; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, 25 - i) },
        (_, j) => ({
          username: `User_Teacher${i + j + 1}`,
          firstName: `Teacher_${i + j + 1}`,
          lastName: `Surname${i + j + 1}`,
          email: `teacher${i + j + 1}@resultplus.com`,
          phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
          address: {
            place: `Teacher Colony ${i + j + 1}`,
            atPost: "Nampur",
            taluka: "Satana",
            district: "Nashik",
            state: "Maharashtra",
            country: "India",
            pinCode: "423204",
          },
          bloodType: ["A+", "B+", "O+", "AB-", "A-", "B-", "O-", "AB+"][
            Math.floor(Math.random() * 8)
          ],
          birthday: new Date(
            1980 + Math.floor(Math.random() * 30),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
          ),
          sex: "male",
          roles: ["teacher"],
        }),
      );

      teacherUsers.push(...((await UserModel.insertMany(batch)) as User[]));
    }

    // **Batch Insert for Teacher Model**
    const teachers: Teacher[] = [];

    for (let i = 0; i < teacherUsers.length; i += batchSize) {
      const batch = teacherUsers.slice(i, i + batchSize).map((user, j) => ({
        user: user._id,
        subjects: [
          subjects[(i + j) % subjects.length]._id,
          subjects[Math.floor(Math.random() * subjects.length)]._id,
        ],
        classes: [
          classes[(i + j) % classes.length]._id,
          classes[Math.floor(Math.random() * classes.length)]._id,
          classes[Math.floor(Math.random() * classes.length)]._id,
        ],
        lessons: [ ],
      }));

      teachers.push(...(await TeacherModel.insertMany(batch)));
    }

    console.log("Generated Teachers:", teacherUsers.length);
    // 6️⃣ **Parents**  

    interface Parent {
      user: mongoose.Types.ObjectId;
      students: mongoose.Types.ObjectId[];
    }   

    interface ParentDocument extends Parent, mongoose.Document {
      user: mongoose.Types.ObjectId;
      students: mongoose.Types.ObjectId[];
    }

    const parentUsers: User[] = [];

    for (let i = 0; i < 50; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, 50 - i) },
        (_, j) => ({
          username: `User_Parent${i + j + 1}`,
          firstName: `Parent${i + j + 1}`,
          lastName: `Surname${i + j + 1}`,
          email: `parent${i + j + 1}@example.com`,
          phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
          address: {
            place: `Parent Colony ${i + j + 1}`,
            atPost: "Karkhana",
            taluka: "Sakri",
            district: "Dhule",
            state: "Maharashtra",
            country: "India",
            pinCode: "424304",
          },
          bloodType: ["A+", "B+", "O+", "AB-", "A-", "B-", "O-", "AB+"][
            Math.floor(Math.random() * 8)
          ],
          birthday: new Date(
            1970 + Math.floor(Math.random() * 30),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
          ),
          sex: "female",
          roles: ["parent"],
        }),
      );

      parentUsers.push(...((await UserModel.insertMany(batch)) as User[]));
    }

    // **Batch Insert for Parent Model**
    const parents: ParentDocument[] = [];

    for (let i = 0; i < parentUsers.length; i += batchSize) {
      const batch = parentUsers.slice(i, i + batchSize).map((user) => ({
        user: user._id,
        students: [],
      }));

      parents.push(...(await ParentModel.insertMany(batch)));
    }

    console.log("Generated Parents:", parentUsers.length);
    // 7️⃣ **Students**   

    interface StudentDocument extends Student, mongoose.Document {
      user: mongoose.Types.ObjectId;
      parent: mongoose.Types.ObjectId;
      class: mongoose.Types.ObjectId;
      grade: mongoose.Types.ObjectId;
      attendances: mongoose.Types.ObjectId[];
      results: mongoose.Types.ObjectId[];
    }

    const studentUsers: User[] = [];

    for (let i = 0; i < 200; i += batchSize) {
      const batch = Array.from(
        { length: Math.min(batchSize, 200 - i) },
        (_, j) => ({
          username: `User_Student${i + j + 1}`,
          firstName: `Student${i + j + 1}`,
          lastName: `Surname${i + j + 1}`,
          email: `student${i + j + 1}@example.com`,
          phone: `9${Math.floor(100000000 + Math.random() * 900000000)}`,
          address: {
            place: `Student Colony ${i + j + 1}`,
            atPost: "Sakri",
            taluka: "Sakri",
            district: "Dhule",
            state: "Maharashtra",
            country: "India",
            pinCode: "424304",
          },
          bloodType: ["A+", "B+", "O+", "AB-", "A-", "B-", "O-", "AB+"][
            Math.floor(Math.random() * 8)
          ],
          birthday: new Date(
            2000 + Math.floor(Math.random() * 30),
            Math.floor(Math.random() * 12),
            Math.floor(Math.random() * 28) + 1,
          ),
          sex: (i + j) % 2 === 0 ? "male" : "female",
          roles: ["student"],
        }),
      );

      studentUsers.push(...((await UserModel.insertMany(batch)) as User[]));
    }

    // **Batch Insert for Student Model**
    const students: StudentDocument[] = [];

    for (let i = 0; i < studentUsers.length; i += batchSize) {
      const batch = studentUsers.slice(i, i + batchSize).map((user) => ({
        user: user._id,
        parent: parents[i % parents.length]._id,
        class: classes[i % classes.length]._id,
        grade: grades[i % grades.length]._id,
        attendances: [],
        results: [],
      }));

      students.push(...(await StudentModel.insertMany(batch)));
    }

    // **Parent-Student Relationship Update**
    const bulkUpdates = students.map((student, i) => ({
      updateOne: {
        filter: { _id: parents[i % parents.length]._id },
        update: { $push: { students: student._id } },
      },
    }));

    if (bulkUpdates.length > 0) {
      await ParentModel.bulkWrite(bulkUpdates);
    }
    console.log("Generated Students:", studentUsers.length);
    // 8️⃣ **Lessons**
    const lessons = await LessonModel.insertMany(
      Array.from({ length: 10 }, (_, i) => ({
        name: `Lesson ${i + 1}`,
        day: ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"][i % 5],
        startTime: new Date(`2025-02-01T08:${i % 4}0:00Z`),
        endTime: new Date(
          new Date(`2025-02-01T08:${i % 4}0:00Z`).getTime() + 60 * 60 * 1000,
        ),
        subject: subjects[i % subjects.length]._id,
        class: classes[i % classes.length]._id,
        teacher: teachers[i % teachers.length]._id,
      })),
    );

    // 9️⃣ **Exams**
    const exams = await ExamModel.insertMany(
      Array.from({ length: 5 }, (_, i) => ({
        title: `Exam ${i + 1}`,
        examType: ["UNIT_TEST", "SEMESTER", "FINAL", "MID_TERM"][i % 4],
        startTime: new Date(`2025-02-01T08:${i % 4}0:00Z`), // ISO Format, UTC Safe
        endTime: new Date(
          new Date(`2025-02-01T08:${i % 4}0:00Z`).getTime() + 60 * 60 * 1000,
        ),
        lesson: lessons[i % lessons.length]._id,
        results: lessons[i % lessons.length]._id,
      })),
    );

    // 🔟 **Assignments**
    const assignments = await AssignmentModel.insertMany(
      Array.from({ length: 5 }, (_, i) => ({
        title: `Assignment ${i + 1}`,
        startDate: new Date(2025, 1, i + 1),
        dueDate: new Date(2025, 1, i + 7),
        status: ["PENDING", "SUBMITTED", "GRADED"][i % 3],
        lesson: lessons[i % lessons.length]._id,
        results: lessons[i % lessons.length]._id,
      })),
    );

    // 1️⃣1️⃣ **Results**    
    const results = await ResultModel.insertMany(
      students.map((student, i) => ({
        score: Math.floor(Math.random() * 100), 
        student: student._id, 
        exam: exams[i % exams.length]._id, 
        assignment: assignments[i % assignments.length]._id, 
        gradedAt: new Date(), 
      })),
    );

    
    for (const student of students) {
      const studentResults = results.filter((res) =>
        res.student.equals(student._id),
      );

      await StudentModel.findByIdAndUpdate(student._id, {
        $set: { results: studentResults.map((res) => res._id) },
      });
    }

    // 1️⃣2️⃣ **Attendance**
       const attendances = await AttendanceModel.insertMany(
      students.map((student, i) => ({
        date: new Date(2025, 1, (i % 28) + 1), 
        present: Math.random() > 0.2, 
        student: student._id, 
        lesson: lessons[i % lessons.length]._id, 
      })),
    );

  
    for (const student of students) {
      const studentAttendance = attendances.filter((att) =>
        att.student.equals(student._id),
      );

      await StudentModel.findByIdAndUpdate(student._id, {
        $set: { attendances: studentAttendance.map((att) => att._id) },
      });
    }

    // 1️⃣3️⃣ **Events**
    const events = await EventModel.insertMany([
      {
        title: "Annual Day",
        description: "Annual Celebration",
        startTime: new Date(2025, 5, 1),
        endTime: new Date(2025, 5, 2),
        class: classes[0]._id,
      },
      {
        title: "Sports Day",
        description: "Games & Competitions",
        startTime: new Date(2025, 7, 15),
        endTime: new Date(2025, 7, 16),
        class: classes[1]._id,
      },
    ]);

    // 1️⃣4️⃣ **Announcements**
    const announcements = await AnnouncementModel.insertMany([
      {
        title: "Exam Notification",
        description: "Mid-term exams starting soon!",
        date: new Date(),
        class: classes[0]._id,
      },
      {
        title: "Holiday Notice",
        description: "School will remain closed on 26th Jan",
        date: new Date(),
        class: classes[1]._id,
      },
    ]);

    for (const cls of classes) {
      const classStudents = students.filter((s) => s.class.equals(cls._id));
      const classLessons = lessons.filter((l) => l.class.equals(cls._id));
      const classEvents = events.filter((e) => e.class.equals(cls._id));
      const classAnnouncements = announcements.filter((a) =>
        a.class.equals(cls._id),
      );

      await ClassModel.findByIdAndUpdate(cls._id, {
        $set: {
          students: classStudents.map((s) => s._id),
          lessons: classLessons.map((l) => l._id),
          events: classEvents.map((e) => e._id),
          announcements: classAnnouncements.map((a) => a._id),
        },
      });
    }

    for (const grade of grades) {
      const gradeStudents = students.filter((s) => s.grade.equals(grade._id));      
      const gradeClasses = classes.filter((c) => c.grade.equals(grade._id));      
      await GradeModel.findByIdAndUpdate(grade._id, {
        $set: {
          students: gradeStudents.map((s) => s._id),
          classes: gradeClasses.map((c) => c._id),
        },
      });
    }

    for (const lesson of lessons) {
      const lessonExams = await ExamModel.find({ lesson: lesson._id });
      const lessonAssignments = await AssignmentModel.find({
        lesson: lesson._id,
      });
      const lessonAttendances = await AttendanceModel.find({
        lesson: lesson._id,
      });

      await LessonModel.findByIdAndUpdate(lesson._id, {
        $set: {
          exams: lessonExams.map((e) => e._id),
          assignments: lessonAssignments.map((a) => a._id),
          attendances: lessonAttendances.map((att) => att._id),
        },
      });
    }

    for (const subject of subjects) {
      const subjectTeachers = await UserModel.find({
        role: "teacher",
        subject: subject._id,
      });

      const subjectLessons = await LessonModel.find({ subject: subject._id });     
      await SubjectModel.findByIdAndUpdate(subject._id, {
        $set: {
          teachers: subjectTeachers.map((t) => t._id),
          lessons: subjectLessons.map((l) => l._id),
        },
      });
    }

    const subjectUpdates = teachers.flatMap((teacher) =>
      teacher.subjects.map((subjectId) => ({
        updateOne: {
          filter: { _id: subjectId },
          update: { $addToSet: { teachers: teacher._id } },
        },
      }))
    );
    
    if (subjectUpdates.length > 0) {
      await SubjectModel.bulkWrite(subjectUpdates);
    }

    const lessonUpdates = lessons.map((lesson) => ({
      updateOne: {
        filter: { _id: lesson.subject },
        update: { $addToSet: { lessons: lesson._id } },
      },
    }));
    
    if (lessonUpdates.length > 0) {
      await SubjectModel.bulkWrite(lessonUpdates);
    }

    for (const lesson of lessons) {
  await TeacherModel.findOneAndUpdate(
    { _id: lesson.teacher }, // संबंधित शिक्षक शोधा
    { $push: { lessons: lesson._id } }, // त्या शिक्षकाच्या lessons मध्ये हे Lesson ID अॅड करा
    { new: true }
  );
}

    console.log("✅ Seeding Complete!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error Seeding Database:", error);
  } finally {
    await mongoose.connection.close();
    console.log("🔴 Connection Closed");
    process.exit(0);
  }
}

seeds();
