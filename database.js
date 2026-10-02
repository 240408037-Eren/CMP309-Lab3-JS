// database.js - Simulated Asynchronous Database API

const rawStudentsData = [
  {
    id: 1,
    name: "Ali",
    courses: [
      { courseId: 101, grade: 90 },
      { courseId: 102, grade: 85 }
    ]
  },
  {
    id: 2,
    name: "Zeynep",
    courses: [
      { courseId: 101, grade: 70 },
      { courseId: 102, grade: 95 }
    ]
  },
  {
    id: 3,
    name: "Ahmet",
    courses: [
      { courseId: 101, grade: 60 },
      { courseId: 102, grade: 55 }
    ]
  }
];

/**
 * Simulates a slow database query with a 2-second delay.
 * @param {Function} callback - Function to receive the fetched student data
 */
export function fetchStudents(callback) {
  setTimeout(() => {
    callback(rawStudentsData);
  }, 2000);
}

export default fetchStudents;
