import React, { useState, useEffect } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useNavigate } from 'react-router-dom';

export default function CoursesOfStudent() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listStudentCourse, setListStudentCourse] = useState(null);

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListStudentCourse = (email, password) => {
        axios.post(`http://${domain}:8000/liststudentcourse`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListStudentCourse(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const deleteCourseFromStudent = (data) => {
        console.log(data)
        axios.post(`http://${domain}:8000/studentdeletecourse`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getListStudentCourse(email, password);
                    alert("Đã xóa khóa học thành công!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Xóa khóa học không thành công!");
            })
    }

    const renderListStudentCourse = () => {
        const dataF = listStudentCourse?.filter((course) => {
            return course.course_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((course, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{course.course_name}</td>
                    <td>{course.BTL_grade >= 0 ? course.BTL_grade : "Chưa chấm điểm"}</td>
                    <td>{course.GK_grade >= 0 ? course.GK_grade : "Chưa chấm điểm"}</td>
                    <td>{course.CK_grade >= 0 ? course.CK_grade : "Chưa chấm điểm"}</td>
                    <td>{course.grade >= 0 ? course.grade : "Chưa chấm điểm"}</td>
                    <td>
                        <button className='btn btn-danger' onClick={() => deleteCourseFromStudent(course)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    const countAvaragePoint = (lists) => {
        if (lists === null) {
            return 0; // Return 0 if the array is empty
        }
        const filteredLists = lists.filter((list) => parseFloat(list.grade) !== -1);
        if (filteredLists.length === 0) {
            return 0; // Return 0 if no valid grades are present
        }
        const sum = filteredLists.reduce((accumulator, list) => accumulator + parseFloat(list.grade), 0);
        const average = sum / filteredLists.length;
        return average;
    };

    useEffect(() => {
        getListStudentCourse(email, password);

        if (email === '' || password === '' || role !== 'student') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách khóa học của bạn</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Điểm BTL</th>
                        <th scope="col">Điểm GK</th>
                        <th scope="col">Điểm CK</th>
                        <th scope="col">Điểm</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListStudentCourse()}
                </tbody>
                <div className='text-center border border-1 mt-2'>
                    <h2>Điểm trung bình</h2>
                    <h3 className='text-danger text-center'>{countAvaragePoint(listStudentCourse)}</h3>
                </div>
            </table>
        </div>
    )
}
