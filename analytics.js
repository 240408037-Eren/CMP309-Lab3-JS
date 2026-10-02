// analytics.js - Calculation and Analytical Helper Functions

/**
 * Calculates the average score of all students for a specific course ID.
 * @param {Array<import('./models.js').Student>} students - Array of Student instances
 * @param {number} courseId - Target course identifier
 * @returns {number} The average grade for that course
 */
export function calculateClassAverage(students, courseId) {
  if (!Array.isArray(students) || students.length === 0) {
    return 0;
  }

  const courseGrades = [];

  students.forEach((student) => {
    const matchedCourse = student.courses.find((c) => c.courseId === courseId);
    if (matchedCourse && typeof matchedCourse.grade === "number") {
      courseGrades.push(matchedCourse.grade);
    }
  });

  if (courseGrades.length === 0) {
    return 0;
  }

  const sum = courseGrades.reduce((acc, grade) => acc + grade, 0);
  return sum / courseGrades.length;
}

/**
 * Uses Array.prototype.reduce to find and return the student with the highest overall average.
 * @param {Array<import('./models.js').Student>} students - Array of Student instances
 * @returns {import('./models.js').Student | null}
 */
export function findTopStudent(students) {
  if (!Array.isArray(students) || students.length === 0) {
    return null;
  }

  return students.reduce((topStudent, currentStudent) => {
    return currentStudent.getAverage() > topStudent.getAverage()
      ? currentStudent
      : topStudent;
  });
}

/**
 * Higher-order function that filters students based on a custom criteria callback function.
 * @param {Array<import('./models.js').Student>} students - Array of Student instances
 * @param {Function} criteriaFn - Predicate returning true for matching students
 * @returns {Array<import('./models.js').Student>}
 */
export function filterStudents(students, criteriaFn) {
  if (!Array.isArray(students) || typeof criteriaFn !== "function") {
    return [];
  }

  return students.filter(criteriaFn);
}
