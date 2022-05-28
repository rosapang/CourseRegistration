/* ****************************************************************************
    CS340 2021 Spring
    Group20: Mingming Su & Ruosha Pang
***************************************************************************** */
-- These are some Database Manipulation queries for a partially implemented Project Website
-- Update the table name from lowercase to uppercase

-- SELECT
-- select students, departments, instructors, courses table
SELECT * FROM Students;
SELECT * FROM Departments;
SELECT * FROM Instructors;
SELECT * FROM Courses;
-- select M:M table
SELECT * FROM Courses2Students;

-- get all student_id and student_name from the Students table;
SELECT student_id, student_name FROM Students;

-- get the department_id from the Departments table;
-- set the department_id dropdown for instructor table and courses table;
SELECT department_id AS department_id FROM Departments;
-- set the instructor id dropdown
SELECT instructor_id AS instructor_id FROM Instructors;
-- set the course id dropdown
SELECT course_id AS course_id FROM Courses;
-- set the student id dropdown
SELECT student_id AS student_id FROM Students;

-- INSERT
-- 
-- insert student name, student degree into students table
INSERT INTO Students (student_name, student_degree)
VALUES (:student_nameInput, :student_degreeInput);

-- insert departname name into departments table
INSERT INTO Departments (department_name)
VALUES (:department_nameInput);

--insert instructor name and deparment id into instructors table
INSERT INTO Instructors (instructor_name, department_id)
VALUES (:instructor_nameInput, :department_idInput);

-- insert course id, course name, department id and instructor id into courses table
INSERT INTO Courses (course_id, course_name, department_id, instructor_id)
VALUES (:course_idInput, :course_nameInput, :department_idInput, :instructor_idInput);

-- M to M relationship addition
-- insert course id and student id into courses2students table
INSERT INTO Courses2Students (course_id, student_id)
VALUES (:course_idInput, :student_idInput);

-- UPDATE

UPDATE Students SET student_name = :student_nameInput, student_degree = :student_degreeInput WHERE student_id = :student_idInput;

UPDATE Departments SET department_name = :department_nameInput WHERE department_id = :department_idInput;

UPDATE Instructors SET instructor_name = :instructor_nameInput, department_id = :department_idInput WHERE instructor_id = :instructor_idInput;

UPDATE Courses SET course_name = :course_nameInput, department_id = :department_idInput, instructors_id = :instructor_idInput WHERE course_id = :course_idInput;
-- update the M:M table
UPDATE Courses2Students SET course_id = :course_idInput, student_id =:student_idInput WHERE id = :idInput;



-- DELETE
-- DELETE THE TABLE

DELETE FROM Students WHERE student_id = :student_idInput;
DELETE FROM Departments WHERE department_id = :department_idInput;
DELETE FROM Instructors WHERE instructor_id = :instructor_idInput;
DELETE FROM Courses WHERE course_id = :course_idInput;
-- delete M:M table
DELETE FROM Courses2Students WHERE id = :idInput;