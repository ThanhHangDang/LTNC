import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import DetailTeacherModal from './detailTeacherModal';
import { useNavigate } from 'react-router-dom';

export default function ListTeacher() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [listTeacher, setListTeacher] = useState(null);

    const [teacherItem, setTeacherItem] = useState(null)

    const [keyword, setKeyword] = useState('')

    const handleGetKeyword = (e) => {
        setKeyword(e.target.value);
    }

    const getListTeacher = (email, password) => {
        axios.post(`http://${domain}:8000/listteacherofadmin`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setListTeacher(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    // const deleteTeacherFromAdmin = (data) => {
    //     console.log(data)
    //     axios.post(`http://${domain}:8000/deleteteacherfromadmin`, { params: { data } })
    //         .then(res => {
    //             if (res.status === 200) {
    //                 //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
    //                 getListTeacher(email, password);
    //                 alert("Đã xóa giảng viên thành công!");
    //             }
    //         })
    //         .catch(err => {
    //             console.log(err);
    //             alert("Xóa giảng viên không thành công!");
    //         })
    // }

    const renderListTeacher = () => {
        const dataF = listTeacher?.filter((teacher) => {
            return teacher.teacher_name.toUpperCase().indexOf(keyword?.toUpperCase()) !== -1
        })

        return dataF?.map((teacher, index) => {
            return (
                <>
                    <DetailTeacherModal key={index} teacher={teacherItem} />
                    <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{teacher.teacher_name}</td>
                        <td>{teacher.email}</td>
                        <td>{teacher.phoneNumber}</td>
                        <td>{teacher.address}</td>
                        <td>
                            <button className='btn btn-success' data-bs-toggle="modal" data-bs-target="#1111" onClick={() => setTeacherItem(teacher)}>Chi tiết</button>
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
        getListTeacher(email, password);

        if (email === '' || password === '' || role !== 'admin') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <h2 className='text-center'>Danh sách Giảng viên</h2>
            <input type="text" className="form-control mb-3 w-50" placeholder='Tìm kiếm' onChange={handleGetKeyword} />
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Tên giảng viên</th>
                        <th scope="col">Email</th>
                        <th scope="col">Số điện thoại</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Tác vụ</th>
                    </tr>
                </thead>
                <tbody>
                    {renderListTeacher()}
                </tbody>
            </table>
        </div>
    )
}
