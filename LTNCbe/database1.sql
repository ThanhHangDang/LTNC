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
  birthday VARCHAR(255),
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
  birthday VARCHAR(255),
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
  -- Admin
  ('admin@gmail.com', 'admin', 'admin'),
  -- Giáo viên
  ('lananhhoang83@gmail.com', 'lananhhoang83', 'teacher'),
  ('quanvu91@gmail.com', 'quanvu91', 'teacher'),
  ('namnguyen86@gmail.com', 'namnguyen86', 'teacher'),
  ('oanhkim94@gmail.com', 'oanhkim94', 'teacher'),
  ('longlv@gmail.com', 'longlv', 'teacher'),
  ('hapham93@gmail.com', 'hapham93', 'teacher'),
  ('duynguyen84@gmail.com', 'duynguyen84', 'teacher'),
  ('thaotran90@gmail.com', 'thaotran90', 'teacher'),
  ('ducle82@gmail.com', 'ducle82', 'teacher'),
  ('huongnguyen81@gmail.com', 'huongnguyen81', 'teacher'),
  -- Sinh viên
  ('hong.nguyen@gmail.com', 'hong.nguyen', 'student'),
  ('vanan25@gmail.com', 'vanan25', 'student'),
  ('maile93@gmail.com', 'maile93', 'student'),
  ('tuan.pm@gmail.com', 'tuan.pm', 'student'),
  ('hoangnguyen92@gmail.com', 'hoangnguyen92', 'student'),
  ('ngocanh81@gmail.com', 'ngocanh81', 'student'),
  ('tung.dang@gmail.com', 'tung.dang', 'student'),
  ('thuancute@gmail.com', 'thuancute', 'student'),
  ('huong.nguyen87@gmail.com', 'huong.nguyen87', 'student'),
  ('tungtran96@gmail.com', 'tungtran96', 'student');

insert into Teachers(teacher_id, teacher_name, email, password, degree, age, birthday, phoneNumber, address)
values
-- Giáo viên
  (2, 'Hoàng Thị Lan Anh', 'lananhhoang83@gmail.com', 'lananhhoang83', 'Tiến sĩ', 41, '30-09-1983', '0912354678', '876 Lý Tự Trọng, Quận 3, TP.HCM'),
  (3, 'Vũ Minh Quân', 'quanvu91@gmail.com', 'quanvu91', 'Thạc sĩ', 33, '08-02-1991', '0988954321', '789 Đường 3 Tháng 2, Quận 10, TP.HCM'),
  (4, 'Nguyễn Văn Nam', 'namnguyen86@gmail.com', 'namnguyen86', 'Tiến sĩ', 38, '17-11-1986', '0909876543', '654 Điện Biên Phủ, Quận Bình Thạnh, TP.HCM'),
  (5, 'Trần Thị Kim Oanh', 'oanhkim94@gmail.com', 'oanhkim94', 'Thạc sĩ', 30, '22-01-1994', '0978456321', '123 Lê Lai, Quận Hải Châu, Đà Nẵng'),
  (6, 'Lê Văn Long', 'longlv@gmail.com', 'longlv', 'Tiến sĩ', 35, '19-05-1989', '0907345768', '456 Nguyễn Công Trứ, Quận 1, TP.HCM'),
  (7, 'Phạm Thị Hà', 'hapham93@gmail.com', 'hapham93', 'Thạc sĩ', 31, '04-07-1993', '0908647321', '789 Hồ Tùng Mậu, Quận Cầu Giấy, Hà Nội'),
  (8, 'Nguyễn Đức Duy', 'duynguyen84@gmail.com', 'duynguyen84', 'Tiến sĩ', 40, '14-03-1984', '0903234677', '987 Lê Lợi, Quận Hải Châu, Đà Nẵng'),
  (9, 'Trần Thị Thanh Thảo', 'thaotran90@gmail.com', 'thaotran90', 'Tiến sĩ', 34, '28-06-1990', '0931345678', '234 Nguyễn Văn Linh, Quận Hải Châu, Đà Nẵng'),
  (10, 'Lê Văn Đức', 'ducle82@gmail.com', 'ducle82', 'Tiến sĩ', 32, '02-09-1982', '0904654321', '456 Lê Văn Sỹ, Quận 3, TP.HCM'),
  (11, 'Nguyễn Thị Bích Hương', 'huongnguyen81@gmail.com', 'huongnguyen81', 'Tiến sĩ', 43, '09-12-1981', '0908765432', '789 Nguyễn Chí Thanh, Quận Đống Đa, Hà Nội');
 
insert into Students(student_id, student_name, email, password, age, birthday, phoneNumber, address)
values
-- Sinh viên
  (12, 'Nguyễn Thị Hồng', 'hong.nguyen@gmail.com', 'hong.nguyen', 20, '12-05-2004', '0987674321', '123 Điện Biên Phủ, Quận 1, TP.HCM'),
  (13, 'Trần Văn An', 'vanan25@gmail.com', 'vanan25', 20, '25-09-2004', '0905123456', '456 Nguyễn Văn Linh, Đà Nẵng'),
  (14, 'Lê Thị Mai', 'maile93@gmail.com', 'maile93', 20, '03-11-2004', '0978234567', '789 Lê Lợi, Hà Đông, Hà Nội'),
  (15, 'Phạm Minh Tuấn', 'tuan.pm@gmail.com', 'tuan.pm', 20, '15-07-2004', '0912345678', '987 Lê Hồng Phong, Quận 10, TP.HCM'),
  (16, 'Nguyễn Huy Hoàng', 'hoangnguyen92@gmail.com', 'hoangnguyen92', 20, '29-03-2004', '0987654221', '345 Trần Phú, TP.Đà Nẵng'),
  (17, 'Trần Thị Ngọc Ánh', 'ngocanh81@gmail.com', 'ngocanh81', 20, '18-04-2004', '0909123456', '678 Lý Thường Kiệt, Quận 5, TP.HCM'),
  (18, 'Đặng Văn Tùng', 'tung.dang@gmail.com', 'tung.dang', 20, '07-10-2004', '0965732198', '456 Trần Hưng Đạo, Quận Hoàn Kiếm, Hà Nội'),
  (19, 'Lê Minh Thuận', 'thuancute@gmail.com', 'thuancute', 20, '20-12-2004', '0918769432', '321 Lê Duẩn, Quận 1, TP.HCM'),
  (20, 'Nguyễn Thị Hương', 'huong.nguyen87@gmail.com', 'huong.nguyen87', 20, '15-07-2004', '0912348678', '234 Nguyễn Trãi, Quận Thanh Xuân, Hà Nội'),
  (21, 'Trần Đình Tùng', 'tungtran96@gmail.com', 'tungtran96', 20, '05-06-2004', '0903123456', '567 Phan Chu Trinh, Đà Nẵng');
  
  insert into Admins(email, password)
  values
	('admin@example.com', 'admin1');
  
  insert into courses(course_name, course_description, teacher_id)
  values
	('Giải Tích 1', 'Tiết 2-3', 8),
    ('Giải Tích 2', 'Tiết 4-5', 3),
	('Vật lý 1', 'Tiết 3-4', 4),
    ('Vật lý 2', 'Tiết 7-8', 5),
    ('Đại số Tuyến tính', 'Tiết 7-8', 6),
    ('Hệ thống số', 'Tiết 5-6', 7),
	('Kỹ thuật Lập trình', 'Tiết 5-6', 2),
	('Lập trình nâng cao', 'Tiết 7-8', 2),
	('Công nghệ Phần mềm', 'Tiết 11-12', 2),
    ('Kiến trúc Máy tính', 'Tiết 7-8-9', 9),
    ('Cấu trúc Dữ liệu và Giải thuật', 'Tiết 2-3', 10),
    ('Nguyên lý Ngôn ngữ Lập trình', 'Tiết 10-11-12', 11);
    
insert into courseStudents(course_id, student_id, BTL_grade, GK_grade, CK_grade)
values
	(1, 12, -1, -1, -1),
    (1, 14, -1, -1, -1),
    (1, 15, -1, -1, -1),
	(1, 17, -1, -1, -1),
    (1, 19, -1, -1, -1),
    (1, 20, -1, -1, -1),
    (2, 12, 10, 10, 8),
    (2, 13, -1, -1, -1),
    (2, 14, -1, -1, -1),
    (2, 15, -1, -1, -1),
    (2, 16, -1, -1, -1),
    (2, 17, -1, -1, -1),
    (3, 12, -1, -1, -1),
    (3, 13, -1, -1, -1),
    (3, 14, -1, -1, -1),
    (3, 16, -1, -1, -1),
    (3, 17, -1, -1, -1),
    (3, 18, -1, -1, -1),
    (3, 19, -1, -1, -1),
    (3, 21, -1, -1, -1),
    (4, 13, -1, -1, -1),
    (4, 15, -1, -1, -1),
    (4, 17, -1, -1, -1),
    (4, 19, -1, -1, -1),
    (4, 20, -1, -1, -1),
    (4, 21, -1, -1, -1),
    (5, 12, -1, -1, -1),
    (5, 13, -1, -1, -1),
    (5, 17, -1, -1, -1),
    (5, 18, -1, -1, -1),
    (6, 18, -1, -1, -1),
    (6, 19, -1, -1, -1),
    (6, 21, -1, -1, -1),
	(7, 16, -1, -1, -1),
    (7, 17, -1, -1, -1),
    (7, 20, -1, -1, -1),
    (8, 12, -1, -1, -1),
    (8, 14, -1, -1, -1),
    (8, 18, -1, -1, -1),
	(9, 13, -1, -1, -1),
    (9, 14, -1, -1, -1),
    (9, 17, -1, -1, -1),
	(10, 15, -1, -1, -1),
    (10, 18, -1, -1, -1),
    (10, 19, -1, -1, -1),
	(11, 12, -1, -1, -1),
    (11, 13, -1, -1, -1),
    (11, 14, -1, -1, -1),
	(11, 15, -1, -1, -1),
    (11, 16, -1, -1, -1),
    (11, 17, -1, -1, -1),
	(11, 18, -1, -1, -1),
    (11, 19, -1, -1, -1),
    (11, 20, -1, -1, -1),
    (11, 21, -1, -1, -1),
	(12, 15, -1, -1, -1),
    (12, 17, -1, -1, -1),
    (12, 18, -1, -1, -1),
	(12, 19, -1, -1, -1),
    (12, 21, -1, -1, -1);
