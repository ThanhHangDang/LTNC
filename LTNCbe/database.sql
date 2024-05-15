-- DROP DATABASE IF EXISTS LTNC;
-- CREATE DATABASE LTNC;
-- USE LTNC;

-- CREATE TABLE user (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   email VARCHAR(255) NOT NULL,
--   password VARCHAR(255) NOT NULL,
--   MS VARCHAR(255),
--   Name VARCHAR(255),
--   Age INT,
--   Birthday DATE,
--   PhoneNumber VARCHAR(255),
--   Address VARCHAR(255),
--   type ENUM('admin', 'student', 'teacher'),
--   Grade VARCHAR(255)
-- );

-- INSERT INTO user (email, password, MS, Name, Age, Birthday, PhoneNumber, Address, type, Grade)
-- VALUES ('admin@example.com', 'admin123', NULL, 'Admin User', 30, '1990-01-01', '123456789', '123 ABC Street', 'admin', NULL),
-- ('student1@example.com', 'student123', 'MS123', 'Student One', 20, '2000-05-10', '987654321', '456 XYZ Street', 'student', 'A'),
-- ('teacher1@example.com', 'teacher123', NULL, 'Teacher One', 35, '1985-08-20', '456789123', '789 PQR Street', 'teacher', NULL),
-- ('user1@example.com', 'user123', NULL, 'User One', 25, '1995-12-15', '987123456', '321 XYZ Street', 'student', 'B+'),
-- ('user2@example.com', 'user123', NULL, 'User Two', 28, '1993-07-08', '654987123', '789 ABC Street', 'student', 'A-');

-- CREATE TABLE course (
--     id INT PRIMARY KEY AUTO_INCREMENT,
--     name VARCHAR(255) NOT NULL,
--     teacher_id INT NOT NULL,
--     startDate DATE NOT NULL,
--     endDate DATE NOT NULL,
--     FOREIGN KEY (teacher_id) REFERENCES user(id)
-- );

-- CREATE TABLE course_student (
--     course_id INT,
--     student_id INT,
--     PRIMARY KEY (course_id, student_id),
--     FOREIGN KEY (course_id) REFERENCES course(id),
--     FOREIGN KEY (student_id) REFERENCES user(id)
-- );

-- INSERT INTO course (name, teacher_id, startDate, endDate)
-- VALUES
--     ('Math 101', 3, '2024-03-01', '2024-06-30'),
--     ('English Literature', 3, '2024-04-15', '2024-07-31'),
--     ('Physics 201', 3, '2024-03-15', '2024-06-15');

-- INSERT INTO course_student (course_id, student_id)
-- VALUES
--     (1, 2), (1, 4),
--     (2, 2), (2, 4), (2, 5),
--     (3, 5);


DROP DATABASE IF EXISTS LTNC;
CREATE DATABASE LTNC;
USE LTNC;

CREATE TABLE Users (
  user_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(50) NOT NULL,
  password VARCHAR(50) NOT NULL,
  role ENUM('student', 'teacher', 'admin') NOT NULL
);

CREATE TABLE Admins (
  admin_id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  FOREIGN KEY (admin_id) REFERENCES Users(user_id)
);

CREATE TABLE Teachers (
  teacher_id INT PRIMARY KEY AUTO_INCREMENT,
  teacher_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  degree VARCHAR(255),
  age INT,
  birthday DATE,
  phoneNumber VARCHAR(255),
  address VARCHAR(255),
  FOREIGN KEY (teacher_id) REFERENCES Users(user_id)
);

CREATE TABLE Students (
  student_id INT PRIMARY KEY AUTO_INCREMENT,
  student_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  age INT,
  birthday DATE,
  phoneNumber VARCHAR(255),
  address VARCHAR(255),
  FOREIGN KEY (student_id) REFERENCES Users(user_id)
);

CREATE TABLE Courses (
  course_id INT PRIMARY KEY AUTO_INCREMENT,
  course_name VARCHAR(50) NOT NULL,
  course_description VARCHAR(255),
  teacher_id int,
  FOREIGN KEY (teacher_id) REFERENCES Teachers(teacher_id)
);

-- CREATE TABLE CourseStudents (
--   course_id INT,
--   student_id INT,
--   grade DECIMAL(4, 2) not null,
--   PRIMARY KEY (course_id, student_id),
--   FOREIGN KEY (course_id) REFERENCES Courses(course_id),
--   FOREIGN KEY (student_id) REFERENCES Students(student_id)
-- );

CREATE TABLE CourseStudents (
  course_id INT,
  student_id INT,
  BTL_grade DECIMAL(4, 2) NOT NULL,
  GK_grade DECIMAL(4, 2) NOT NULL,
  CK_grade DECIMAL(4, 2) NOT NULL,
  grade DECIMAL(4, 2) AS (BTL_grade * 0.3 + GK_grade * 0.2 + CK_grade * 0.5) STORED,
  PRIMARY KEY (course_id, student_id),
  FOREIGN KEY (course_id) REFERENCES Courses(course_id),
  FOREIGN KEY (student_id) REFERENCES Students(student_id)
);

-- CREATE TABLE Enrollments (
--   enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
--   student_id INT,
--   course_id INT,
--   FOREIGN KEY (student_id) REFERENCES Students(student_id),
--   FOREIGN KEY (course_id) REFERENCES Courses(course_id)
-- );

-- CREATE TABLE Grades (
--   grade_id INT PRIMARY KEY AUTO_INCREMENT,
--   course_id INT,
--   grade_value DECIMAL(4,2) NOT NULL,
--   FOREIGN KEY (course_id) REFERENCES Courses(course_id)
-- );

INSERT INTO Users (email, password, role)
VALUES
  -- Sinh viên
  ('student1@example.com', 'password1', 'student'),
  ('student2@example.com', 'password2', 'student'),
  ('student3@example.com', 'password3', 'student'),
  ('student4@example.com', 'password4', 'student'),
  ('student5@example.com', 'password5', 'student'),
  -- Giáo viên
  ('teacher1@example.com', 'password6', 'teacher'),
  ('teacher2@example.com', 'password7', 'teacher'),
  ('teacher3@example.com', 'password8', 'teacher'),
  ('teacher4@example.com', 'password9', 'teacher'),
  ('teacher5@example.com', 'password10', 'teacher'),
  -- Admin
  ('admin@example.com', 'admin1', 'admin');
  
insert into Teachers(teacher_id, teacher_name, email, password, degree, age, birthday, phoneNumber, address)
values
-- Giáo viên
  (6, 'Nguyen Van A', 'teacher1@example.com', 'password6', 'Tien Si', 30, '1995-10-20', '0909249903', '130/2/14 Nguyễn Du'),
  (7, 'Nguyen Van B', 'teacher2@example.com', 'password7', 'Thac si', 33, '1992-02-10', '0909249903', '130/2/14 Nguyễn Du'),
  (8, 'Nguyen Van C', 'teacher3@example.com', 'password8', 'Tien Si', 32, '1993-03-07', '0909249903', '130/2/14 Nguyễn Du'),
  (9, 'Nguyen Van D', 'teacher4@example.com', 'password9', 'Tien Si', 34, '1991-01-03', '0909249903', '130/2/14 Nguyễn Du'),
  (10, 'Nguyen Van E', 'teacher5@example.com', 'password10', 'Thac si', 33, '1992-07-16', '0909249903', '130/2/14 Nguyễn Du');
 
insert into Students(student_id, student_name, email, password, age, birthday, phoneNumber, address)
values
-- Giáo viên
  (1, 'Tran Van A', 'student1@example.com', 'password1', 20, '2000-10-20', '0909249903', '130/2/14 Nguyễn Du'),
  (2, 'Dang Van B', 'student2@example.com', 'password2', 18, '2002-02-10', '0909249903', '130/2/14 Nguyễn Du'),
  (3, 'Ho Van C', 'student3@example.com', 'password3', 20, '2000-03-07', '0909249903', '130/2/14 Nguyễn Du'),
  (4, 'Pham Van D', 'student4@example.com', 'password4', 20, '2000-01-03', '0909249903', '130/2/14 Nguyễn Du'),
  (5, 'Banh Van E', 'student5@example.com', 'password5', 19, '2001-07-16', '0909249903', '130/2/14 Nguyễn Du');
  
  insert into Admins(email, password)
  values
	('admin@example.com', 'admin1');
  
  insert into courses(course_name, course_description, teacher_id)
  values
	('Math', 'Tiet 1-2', 6),
	('Physis', 'Tiet 3-4', 7),
	('Chemistry', 'Tiet 5-6', 8),
	('LTNC', 'Tiet 9-10', 9),
	('CNPM', 'Tiet 11-12', 10),
    ('Math1', 'Tiet 4-5', 6);
    
    
insert into courseStudents(course_id, student_id, BTL_grade, GK_grade, CK_grade)
values
	(1, 3, -1, -1, -1),
    (1, 4, -1, -1, -1),
    (1, 5, -1, -1, -1),
    (2, 1, 10, 10, 8),
    (2, 3, -1, -1, -1),
    (2, 4, -1, -1, -1),
    (3, 1, -1, -1, -1),
    (3, 3, -1, -1, -1),
    (3, 4, -1, -1, -1),
    (3, 5, -1, -1, -1),
    (4, 1, -1, -1, -1),
    (4, 2, -1, -1, -1),
    (4, 3, -1, -1, -1),
    (5, 1, -1, -1, -1),
    (5, 2, -1, -1, -1),
    (6, 2, -1, -1, -1);
