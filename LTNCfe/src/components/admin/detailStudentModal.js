import React, { useEffect, useRef, useState } from 'react';

export default function DetailStudentModal(props) {
    const [studentData, setStudentrData] = useState({
        student_id: "",
        student_name: "",
        age: 0,
        birthday: "",
        password: "",
        phoneNumber: "",
        email: "",
        address: ""
    });

    const closeModal = useRef(null);

    useEffect(() => {
        if (props && props.student) {
            setStudentrData({
                student_id: props.student.student_id,
                student_name: props.student.student_name,
                age: props.student.age,
                birthday: props.student.birthday,
                password: props.student.password,
                phoneNumber: props.student.phoneNumber,
                email: props.student.email,
                address: props.student.address
            });
        }
        else {
            setStudentrData({
                student_id: "",
                student_name: "",
                age: 0,
                birthday: "",
                password: "",
                phoneNumber: "",
                email: "",
                address: ""
            });
        }
    }, [props.student, props]);

    return (
        <div>
            <div
                className="modal fade"
                id="1111222"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Thông tin chi tiết</h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="modal"
                                aria-label="Close"
                                ref={closeModal}
                            >
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label>Mã số giáo viên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="student_id"
                                        value={studentData.student_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="student_name"
                                        value={studentData.student_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="age"
                                        value={studentData.age}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="birthday"
                                        value={studentData.birthday}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={studentData.phoneNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={studentData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={studentData.address}
                                    />
                                </div>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
