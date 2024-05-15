import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import AddCourseModal from './addCourseModal.js';
import { useNavigate } from 'react-router-dom';

export default function TeacherCourses() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listCourse, setListCourse] = useState(null);

    const [keyword, setKeyword] = useState('')
    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListCourse = (email, password) => {
        axios.post(`http://${domain}:8000/listteachercourse`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListCourse(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const submitAddcourse = (data) => {
        axios.post(`http://${domain}:8000/addcourse`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getListCourse(email, password);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const renderListCourse = () => {
        const dataF = listCourse?.filter((course) => {
            return course.course_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((course, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{course.course_id}</th>
                    <td>{course.course_name}</td>
                    <td>{course.course_description}</td>
                    <td>
                        <button className='btn btn-danger' onClick={() => deleteCourse(course)}>Xóa</button>
                    </td>
                </tr>
            )
        })
    }

    const deleteCourse = (data) => {

        axios.post(`http://${domain}:8000/deletecourse`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getListCourse(email, password);
                    alert("Xóa khóa học thành công!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Xóa khóa học thất bại!");
            })
    }

    useEffect(() => {
        getListCourse(email, password);

        if (email === '' || password === '' || role !== 'teacher') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <AddCourseModal submitAddcourse={submitAddcourse} />
            <h2 className='text-center'>Danh sách khóa học</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Mô Tả</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListCourse()}
                </tbody>
            </table>
            <div><button className='btn btn-success float-end' type="button" data-bs-toggle="modal" data-bs-target="#12">Thêm khóa học</button></div>

        </div>
    )
}
