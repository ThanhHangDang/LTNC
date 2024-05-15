import React, { useState } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import { useEffect } from 'react';
import EditTeacherModal from './editTeacherModal.js';
import { useNavigate } from 'react-router-dom';

export default function TeacherData() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [teacherData, setTeacherData] = useState(null);

    const getTeacherData = (email, password) => {
        axios.post(`http://${domain}:8000/teacher`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setTeacherData(res.data[0]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSubmitUpdateTeacher = (data) => {
        axios.post(`http://${domain}:8000/teacheredit`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getTeacherData(email, password);
                    alert("Cập nhật thông tin thành công!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Cập nhật thông tin thất bại!");
            })
    }

    useEffect(() => {
        getTeacherData(email, password);

        if (email === '' || password === '' || role !== 'teacher') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <EditTeacherModal teacherData={teacherData} onSubmitUpdateTeacher={onSubmitUpdateTeacher} />
            <div className='row min-vh-100 ml-5'>
                <div className='col-11 back_ground rounded'>
                    <div className="container mt-1">
                        <div className="main-body ">
                            <div className="row justify-content-center">
                                <div className="col-lg-4">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="d-flex flex-column align-items-center text-center">
                                                <img src="https://bootdey.com/img/Content/avatar/avatar6.png" alt="Admin" className="rounded-circle p-1 bg-primary" width={110} />
                                                <div className="mt-3">
                                                    <h4>{teacherData && teacherData.teacher_name}</h4>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-9 mt-2">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Mã số</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.teacher_id} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Tên giảng viên</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.teacher_name} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Tuổi</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.age} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Ngày sinh</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.birthday} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Số điện thoại</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.phoneNumber} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.email} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Địa chỉ</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.address} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Học vị</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={teacherData && teacherData.degree} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3" />
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#123" defaultValue="Save Changes" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
