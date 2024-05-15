import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import DetailStudentModal from './detailStudentModal';
import { useNavigate } from 'react-router-dom';

export default function ListStudent() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listStudent, setListStudent] = useState(null);

    const [studentItem, setStudentItem] = useState(null);

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListStudent = (email, password) => {
        axios.post(`http://${domain}:8000/liststudentofadmin`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListStudent(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const renderListStudent = () => {
        const dataF = listStudent?.filter((student) => {
            return student.student_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((student, index) => {
            return (
                <>
                    <DetailStudentModal key={index} student={studentItem} />
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{student.student_name}</td>
                        <td>{student.email}</td>
                        <td>{student.phoneNumber}</td>
                        <td>{student.address}</td>
                        <td>
                            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#1111222" onClick={() => setStudentItem(student)}>Chi tiết</button>
                        </td>
                        {/* <td>
                            <button className='btn btn-danger' onClick={() => deleteTeacherFromAdmin(teacher)}>Xóa</button>
                        </td> */}
                    </tr >
                </>
            )
        })
    }

    useEffect(() => {
        getListStudent(email, password);

        if (email === '' || password === '' || role !== 'admin') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách Sinh viên</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên sinh viên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ</th>
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
