import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import EditPointModal from './editPointModal.js';
import { useNavigate } from 'react-router-dom';

export default function TeacherManageStudent() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listStudent, setListStudent] = useState(null);

    const [studentItem, setStudentItem] = useState(null);

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);

        // setListStudent(listStudent?.filter((student) => {
        //     return student.student_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        // }))
    }

    const getListStudent = (email, password) => {
        axios.post(`http://${domain}:8000/liststudentofteacher`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListStudent(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteStudentFromTeach = (data) => {
        axios.post(`http://${domain}:8000/deletestudent`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getListStudent(email, password);
                    alert("Đã xóa sinh viên khỏi khóa học!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Xóa sinh viên khỏi khóa học không thành công!");
            })
    }

    const updatePointFromTeacher = (data) => {
        axios.post(`http://${domain}:8000/teacherupdatepoint`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getListStudent(email, password);
                    alert("Đã chấm điểm!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Chấm điểm không thành công!");
            })
    }

    const renderListStudent = () => {
        const dataF = listStudent?.filter((student) => {
            return student.student_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((student, index) => {
            return (
                <>
                    <EditPointModal key={index} student={studentItem} updatePointFromTeacher={updatePointFromTeacher} />
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.course_name}</td>
                        <td>{student.student_name}</td>
                        {/* <td>{student.phoneNumber}</td> */}
                        <td>{student.email}</td>
                        <td>{student.BTL_grade >= 0 ? student.BTL_grade : 'Chưa chấm điểm'}</td>
                        <td>{student.GK_grade >= 0 ? student.GK_grade : 'Chưa chấm điểm'}</td>
                        <td>{student.CK_grade >= 0 ? student.CK_grade : 'Chưa chấm điểm'}</td>
                        <td>{(student.grade >= 0 && student.CK_grade >= 0 && student.GK_grade >= 0 && student.BTL_grade >= 0) ? student.grade : 'Chưa chấm điểm'}</td>
                        <td>
                            <button className='btn btn-primary' data-bs-toggle="modal" data-bs-target="#1" onClick={() => setStudentItem(student)}>Chấm điểm</button>
                        </td>
                        <td>
                            <button className='btn btn-danger' onClick={() => deleteStudentFromTeach(student)}>Xóa</button>
                        </td>
                    </tr >
                </>
            )
        })
    }

    useEffect(() => {
        getListStudent(email, password);

        if (email === '' || password === '' || role !== 'teacher') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách sinh viên của bạn</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Tên sinh viên</th>
                        {/* <th scope="col">Số điện thoại</th> */}
                        <th scope="col">Email</th>
                        <th scope="col">Điểm BTL</th>
                        <th scope="col">Điểm GK</th>
                        <th scope="col">Điểm CK</th>
                        <th scope="col">Điểm TK</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListStudent()}
                </tbody>
            </table>
        </div>
    )
}
