// main.js - Orchestration and Execution Script

import { Student } from "./models.js";
import { fetchStudents } from "./database.js";
import {
  calculateClassAverage,
  findTopStudent,
  filterStudents
} from "./analytics.js";

// Step 1: Initiate asynchronous student data fetch
console.log("Fetching data from database...");

fetchStudents((rawData) => {
  console.log("Data received!\n");

  // Step 2: Convert raw database objects into actual Student class instances
  const students = rawData.map(
    (item) => new Student(item.id, item.name, item.courses)
  );

  // Step 3: Test Object.defineProperty Immutability
  console.log("Testing Immutability:");
  console.log(`Original ID: ${students[0].id}`);
  console.log("Attempting to change ID to 999...");
  try {
    students[0].id = 999;
  } catch (err) {
    // In ES Module strict mode, assigning to a non-writable property raises a TypeError
  }
  console.log(`Final ID: ${students[0].id} (Success: ID did not change)\n`);

  // Step 4: Analytical Calculations & Reporting
  console.log("--- Analytics Report ---");

  // 4a. Class average for Course 101
  const avgCourse101 = calculateClassAverage(students, 101);
  console.log(`Class Average for Course 101: ${avgCourse101.toFixed(2)}`);

  // 4b. Identify top student using .reduce()
  const topStudent = findTopStudent(students);
  if (topStudent) {
    console.log(
      `Top Student: ${topStudent.name} (Average: ${topStudent.getAverage().toFixed(1)})`
    );
  }

  // 4c. Filter students who enrolled in Course 102
  const studentsIn102 = filterStudents(students, (student) =>
    student.courses.some((course) => course.courseId === 102)
  );
  const enrolledNames102 = studentsIn102.map((s) => s.name).join(", ");
  console.log(`Students in Course 102: ${enrolledNames102}`);
});
