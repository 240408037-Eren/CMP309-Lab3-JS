// models.js - Class Structures for University Course Management System

export class Student {
  /**
   * @param {number} id - Unique student identifier (immutable)
   * @param {string} name - Student name
   * @param {Array<{courseId: number, grade: number}>} courses - List of enrolled courses and grades
   */
  constructor(id, name, courses = []) {
    // Immutability Requirement: define id as read-only and non-configurable
    Object.defineProperty(this, "id", {
      value: id,
      writable: false,
      configurable: false,
      enumerable: true
    });

    this.name = name;
    this.courses = Array.isArray(courses) ? courses : [];
  }

  /**
   * Adds a new course record to the student's courses list.
   * @param {number} courseId
   * @param {number} grade
   */
  addCourse(courseId, grade) {
    this.courses.push({ courseId, grade });
  }

  /**
   * Calculates and returns the student's average grade across all courses.
   * @returns {number}
   */
  getAverage() {
    if (this.courses.length === 0) {
      return 0;
    }
    const total = this.courses.reduce((sum, course) => sum + course.grade, 0);
    return total / this.courses.length;
  }
}

export default Student;
