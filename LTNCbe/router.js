const express = require('express'); //gọi express bằng required

const myDatabase = require('./config/databaseConfig.js');

const router1 = express.Router(); //tạo ra router

router1.get('/', (req, res) => { //get truyền thông tin dạng url
    res.sendFile(__dirname + '/index.html');
})

router1.post('/login', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT * FROM Users WHERE email = ? AND password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/loginteacher', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT * FROM teachers WHERE email = ? AND password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
                console.log(results)
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/teacher', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT * FROM Teachers WHERE email = ? AND password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/liststudentofteacher', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT Students.*, Courses.course_name, Courses.course_id, CourseStudents.grade, CourseStudents.BTL_grade, CourseStudents.GK_grade, CourseStudents.CK_grade FROM Teachers
    INNER JOIN Courses ON Teachers.teacher_id = Courses.teacher_id
    INNER JOIN CourseStudents ON Courses.course_id = CourseStudents.course_id
    INNER JOIN Students ON CourseStudents.student_id = Students.student_id
    WHERE Teachers.email = ? AND Teachers.password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/teacheredit', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;
    const email = data.email;
    const password = data.password;

    myDatabase.query(
        `UPDATE Teachers SET teacher_name = ?, degree = ?, birthday = ?, age = ?, phoneNumber = ?, address = ? WHERE email = ? AND password = ?`,
        [data.teacher_name, data.degree, data.birthday, data.age, data.phoneNumber, data.address, email, password],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/teacherupdatepoint', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;

    myDatabase.query(
        `UPDATE CourseStudents SET BTL_grade = ?, GK_grade = ?, CK_grade = ? WHERE course_id = ? AND student_id = ?`,
        [data.BTL_grade, data.GK_grade, data.CK_grade, data.course_id, data.student_id],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/deletestudent', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;

    myDatabase.query(
        `DELETE From CourseStudents WHERE course_id = ? AND student_id = ?`,
        [data.course_id, data.student_id],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/listteachercourse', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(
        `SELECT Courses.* FROM Teachers
        INNER JOIN Courses ON Teachers.teacher_id = Courses.teacher_id
        WHERE Teachers.email = ? AND Teachers.password = ?`,
        [email, password],
        (error, results) => {
            if (error) {
                // callback(null, error);
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.length > 0) {
                    res.json(results);
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/addcourse', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;

    myDatabase.query(
        `SELECT teacher_id FROM Teachers WHERE email = ? AND password = ?`,
        [data.email, data.password],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.length > 0) {
                    const teacherId = results[0].teacher_id;

                    myDatabase.query(
                        `INSERT INTO Courses (course_name, course_description, teacher_id) VALUES (?, ?, ?)`,
                        [data.course_name, data.course_description, teacherId],
                        (error, results) => {
                            if (error) {
                                console.error('Lỗi truy vấn: ' + error.stack);
                                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                            } else {
                                res.json({ success: true });
                            }
                        }
                    );
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/deletecourse', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;
    myDatabase.query(
        `DELETE FROM CourseStudents WHERE course_id = ?`,
        [data.course_id],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                myDatabase.query(
                    `DELETE FROM Courses WHERE course_id = ? AND teacher_id = ?`,
                    [data.course_id, data.teacher_id],
                    (error, results) => {
                        if (error) {
                            console.error('Lỗi truy vấn: ' + error.stack);
                            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                        } else {
                            if (results.affectedRows > 0) {
                                res.json({ success: true });
                            } else {
                                res.status(401).json({ error: 'Không tìm thấy khóa học hoặc không có quyền xóa' });
                            }
                        }
                    }
                );
            }
        }

    );
})

router1.post('/student', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT * FROM students WHERE email = ? AND password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/liststudentcourse', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(`SELECT Courses.course_name, CourseStudents.course_id, CourseStudents.grade, CourseStudents.BTL_grade, CourseStudents.GK_grade, CourseStudents.CK_grade, CourseStudents.student_id
    FROM Students
    INNER JOIN CourseStudents ON Students.student_id = CourseStudents.student_id
    INNER JOIN Courses ON CourseStudents.course_id = Courses.course_id
    WHERE Students.email = ? AND Students.password = ?`, [email, password], (error, results) => {
        if (error) {
            // callback(null, error);
            console.error('Lỗi truy vấn: ' + error.stack);
            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
        } else {
            if (results.length > 0) {
                res.json(results);
            } else {
                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
            }
        }
    });
})

router1.post('/listcourses', (req, res) => { //truyền thông tin ngâm trong body

    myDatabase.query(
        `SELECT Courses.*, teacher_name from courses
        INNER JOIN teachers ON  courses.teacher_id= teachers.teacher_id`,
        [],
        (error, results) => {
            if (error) {
                // callback(null, error);
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.length > 0) {
                    res.json(results);
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/registercourse', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(
        `SELECT * FROM Students WHERE email = ? AND password = ?`,
        [email, password],
        (error, studentResults) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (studentResults.length > 0) {
                    // Sinh viên tồn tại trong bảng Students
                    // Thêm sinh viên vào bảng CourseStudent
                    myDatabase.query(
                        `INSERT INTO CourseStudents (course_id, student_id, BTL_grade, GK_grade, CK_grade) VALUES (?, ?, ?, ?, ?)`,
                        [data.course_id, studentResults[0].student_id, -1, -1, -1],
                        (insertError, insertResults) => {
                            if (insertError) {
                                console.error('Lỗi truy vấn: ' + insertError.stack);
                                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                            } else {
                                if (insertResults.affectedRows > 0) {
                                    res.json({ success: true });
                                } else {
                                    res.status(500).json({ error: 'Không thể thêm sinh viên vào khóa học' });
                                }
                            }
                        }
                    );
                } else {
                    // Sinh viên không tồn tại trong bảng Students
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );

})

router1.post('/studentedit1', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;
    const email = data.email;
    const password = data.password;
    myDatabase.query(
        `UPDATE Students SET student_name = ?, birthday = ?, age = ?, phoneNumber = ?, address = ? WHERE email = ? AND password = ?`,
        [data.student_name, data.birthday, data.age, data.phoneNumber, data.address, email, password],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/studentdeletecourse', (req, res) => { //truyền thông tin ngâm trong body
    const data = req.body.params.data;
    myDatabase.query(
        `DELETE From CourseStudents WHERE course_id = ? AND student_id = ?`,
        [data.course_id, data.student_id],
        (error, results) => {
            if (error) {
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                if (results.affectedRows > 0) {
                    res.json({ success: true });
                } else {
                    res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                }
            }
        }
    );
})

router1.post('/listteacherofadmin', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(
        `SELECT * FROM Admins WHERE email = ? AND password = ?`,
        [email, password],
        (error, studentResults) => {
            if (error) {
                // callback(null, error);
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                myDatabase.query(
                    `SELECT * from teachers`,
                    [],
                    (error, results) => {
                        if (error) {
                            // callback(null, error);
                            console.error('Lỗi truy vấn: ' + error.stack);
                            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                        } else {
                            if (results.length > 0) {
                                res.json(results);
                            } else {
                                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                            }
                        }
                    }
                );
            }
        }
    );
})

// router1.post('/deleteteacherfromadmin', (req, res) => { //truyền thông tin ngâm trong body
//     const data = req.body.params.data;

//     myDatabase.query(
//         `DELETE Teachers, Courses
//         FROM Teachers
//         inner JOIN Courses ON Teachers.teacher_id = Courses.teacher_id
//         WHERE Teachers.teacher_id = ?`,
//         [data.teacher_id],
//         (error, results) => {
//             if (error) {
//                 console.error('Lỗi truy vấn: ' + error.stack);
//                 res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
//             } else {
//                 if (results.affectedRows > 0) {
//                     res.json({ success: true });
//                 } else {
//                     res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
//                 }
//             }
//         }
//     );
// })

router1.post('/listcourseofadmin', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(
        `SELECT * FROM Admins WHERE email = ? AND password = ?`,
        [email, password],
        (error, studentResults) => {
            if (error) {
                // callback(null, error);
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                myDatabase.query(
                    `SELECT Courses.*, teacher_name from courses
                    INNER JOIN teachers ON  courses.teacher_id= teachers.teacher_id`,
                    [],
                    (error, results) => {
                        if (error) {
                            // callback(null, error);
                            console.error('Lỗi truy vấn: ' + error.stack);
                            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                        } else {
                            if (results.length > 0) {
                                res.json(results);
                            } else {
                                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                            }
                        }
                    }
                );
            }
        }
    );
})

router1.post('/liststudentofadmin', (req, res) => { //truyền thông tin ngâm trong body
    const email = req.body.params.email;
    const password = req.body.params.password;

    myDatabase.query(
        `SELECT * FROM Admins WHERE email = ? AND password = ?`,
        [email, password],
        (error, studentResults) => {
            if (error) {
                // callback(null, error);
                console.error('Lỗi truy vấn: ' + error.stack);
                res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
            } else {
                myDatabase.query(
                    `SELECT * from students`,
                    [],
                    (error, results) => {
                        if (error) {
                            // callback(null, error);
                            console.error('Lỗi truy vấn: ' + error.stack);
                            res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý' });
                        } else {
                            if (results.length > 0) {
                                res.json(results);
                            } else {
                                res.status(401).json({ error: 'Tên người dùng hoặc mật khẩu không đúng' });
                            }
                        }
                    }
                );
            }
        }
    );
})

module.exports = router1;