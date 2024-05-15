import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import DetailCourseModal from './detailCourseModal';
import { useNavigate } from 'react-router-dom';

export default function ListCourse() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listCourse, setListCourse] = useState(null);

    const [courseItem, setCourseItem] = useState(null);

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListCourse = (email, password) => {
        axios.post(`http://${domain}:8000/listcourseofadmin`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data)
                    setListCourse(res.data);
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
                <>
                    <DetailCourseModal key={index} course={courseItem} />
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{course.course_name}</td>
                        <td>{course.teacher_name}</td>
                        <td>{course.course_description}</td>
                        <td>
                            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#12222" onClick={() => setCourseItem(course)}>Chi tiết</button>
                        </td>
                        {/* <td>
                            <button className='btn btn-danger' onClick={() => deletecourseFromAdmin(course)}>Xóa</button>
                        </td> */}
                    </tr >
                </>
            )
        })
    }

    useEffect(() => {
        getListCourse(email, password);

        if (email === '' || password === '' || role !== 'admin') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách khóa học</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Khóa học</th>
                        <th scope="col">Giảng viên</th>
                        <th scope="col">Mô tả</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListCourse()}
                </tbody>
            </table>
        </div>
    )
}
