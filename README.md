# CMP309 Web Programming — Assignment 3
**University Course Management System**  
**Student:** Eren Ozan Yazar  
**Student ID:** 240408037  

---

## 1. Project Overview & File Organization

This project implements the core logic for a university grading and student management system using modern JavaScript (ES6+). The application is modularized across four distinct files:

- **`models.js`**: Contains the `Student` class definition. The constructor models student identities and initializes their course list. It enforces property immutability on the student's `id` using `Object.defineProperty()`. It also provides instance methods `addCourse(courseId, grade)` and `getAverage()`.
- **`database.js`**: Simulates an asynchronous, slow database connection. It exposes `fetchStudents(callback)`, which waits for 2 seconds using `setTimeout()` before invoking the callback with the raw student records.
- **`analytics.js`**: Contains analytical helper functions for grade evaluation:
  - `calculateClassAverage(students, courseId)`: Computes the average score across all students for a specific course.
  - `findTopStudent(students)`: Uses `Array.prototype.reduce()` to identify and return the student instance with the highest overall grade average.
  - `filterStudents(students, criteriaFn)`: A generic higher-order function that filters the student array according to a custom callback condition.
- **`main.js`**: The main executable script. It imports the modules, initiates the asynchronous data fetch, instantiates `Student` objects, tests ID immutability, and logs the formatted analytics report to the console.

---

## 2. How to Run

Ensure Node.js is installed on your system. From the project directory, run:

```bash
# Using Node directly
node main.js

# Or using npm script
npm start
```

---

## 3. Challenges Faced & Solutions

1. **Enforcing Property Immutability in ES Modules:**
   - *Challenge:* When setting `writable: false` via `Object.defineProperty()`, attempting to reassign the property in ES Module mode (which runs in JavaScript strict mode) throws a `TypeError: Cannot assign to read only property 'id'` rather than failing silently.
   - *Solution:* In `main.js`, the reassignment test (`students[0].id = 999`) was wrapped inside a `try...catch` block. This ensures that the immutability is proven and handled cleanly without halting script execution, confirming that `students[0].id` retains its original value of `1`.

2. **Asynchronous Callback Sequencing:**
   - *Challenge:* Because `fetchStudents` simulates network latency with a 2-second delay, all dependent operations (class instantiation, immutability testing, and report generation) must be deferred until data arrives.
   - *Solution:* The entire workflow was organized cleanly inside the callback passed to `fetchStudents`, ensuring that calculations run only after the raw data array is received.

3. **Pure Functional Array Transformations:**
   - *Challenge:* Calculating course-specific averages and finding the top student required navigating nested arrays (`student.courses`) without mutating the original state.
   - *Solution:* Built clean functional pipelines using `filter()`, `find()`, `some()`, and `reduce()`. For example, `findTopStudent` uses `.reduce()` to compare running student instances directly by calling `.getAverage()`, keeping the logic concise and readable.

---

## 4. Expected Console Output

```
Fetching data from database...
Data received!

Testing Immutability:
Original ID: 1
Attempting to change ID to 999...
Final ID: 1 (Success: ID did not change)

--- Analytics Report ---
Class Average for Course 101: 73.33
Top Student: Ali (Average: 87.5)
Students in Course 102: Ali, Zeynep, Ahmet
```
