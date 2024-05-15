import React, { useState, useEffect } from 'react';
import axios from 'axios';
import domain from '../../config/domain';
import EditStudentModal from './editStudentModal';
import { useNavigate } from 'react-router-dom';

export default function StudentData() {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const [studentData, setStudentData] = useState(null);

    const getStudentData = (email, password) => {
        axios.post(`http://${domain}:8000/student`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    setStudentData(res.data[0]);
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    const onSubmitUpdateStudent = (data) => {
        axios.post(`http://${domain}:8000/studentedit1`, { params: { data } })
            .then(res => {
                if (res.status === 200) {
                    //Cập nhật thành công trẹn hệ thống thì gọi render lại thông tin teacher
                    getStudentData(email, password);
                    alert("Cập nhật thông tin thành công!");
                }
            })
            .catch(err => {
                console.log(err);
                alert("Cập nhật thông tin thất bại!");
            })
    }

    useEffect(() => {
        getStudentData(email, password);

        if (email === '' || password === '' || role !== 'student') {
            navigation('/khongtimthaytrang');
        }
    }, [email, password]);

    return (
        <div>
            <EditStudentModal studentData={studentData} onSubmitUpdateStudent={onSubmitUpdateStudent} />
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
                                                    <h4>{studentData && studentData.student_name}</h4>
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
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.student_id} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Tên sinh viên</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.student_name} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Tuổi</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.age} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Ngày sinh</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.birthday} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Số điện thoại</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.phoneNumber} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Email</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.email} />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-sm-3">
                                                    <h6 className="mb-0">Địa chỉ</h6>
                                                </div>
                                                <div className="col-sm-9 text-secondary">
                                                    <input disabled type="text" className="form-control" value={studentData && studentData.address} />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-3" />
                                                <div className="col-sm-9 text-secondary">
                                                    <input type="button" className="btn btn-primary px-4" data-bs-toggle="modal" data-bs-target="#12345" defaultValue="Save Changes" />
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
