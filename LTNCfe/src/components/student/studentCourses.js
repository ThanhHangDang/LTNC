import React, { useState, useEffect } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useNavigate } from 'react-router-dom';

export default function StudentCourses() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();


    const [listCourses, setListCourses] = useState(null);

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListCourses = () => {
        axios.post(`http://${domain}:8000/listcourses`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListCourses(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const renderListCourses = () => {
        const dataF = listCourses?.filter((course) => {
            return course.course_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((course, index) => {
            return (
                <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td>{course.course_name}</td>
                    <td>{course.course_description}</td>
                    <td>{course.teacher_name}</td>
                    <td>
                        <button className='btn btn-primary' onClick={() => registerCourse(course, email, password)}>Đăng ký</button>
                    </td>
                </tr>
            )
        })
    }

    const registerCourse = (data, email, password) => {
        axios.post(`http://${domain}:8000/registercourse`, { params: { data: data, email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    alert("Đăng ký khóa học thành công!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Đăng ký khóa học thất bại!");
            })
    }

    useEffect(() => {
        getListCourses();

        if (email === '' || password === '' || role !== 'student') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách khóa học hiện có</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Giáo viên</th>
                        <th scope="col">Tác vụ</th>

                    </tr>
                </thead>
                <tbody>
                    {renderListCourses()}
                </tbody>
            </table>

        </div >
    )
}
