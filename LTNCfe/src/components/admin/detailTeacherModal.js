import React, { useEffect, useRef, useState } from 'react';

export default function DetailTeacherModal(props) {
    const [teacherData, setTeacherData] = useState({
        teacher_id: "",
        teacher_name: "",
        age: 0,
        birthday: "",
        password: "",
        phoneNumber: "",
        email: "",
        degree: "",
        address: ""
    });

    const closeModal = useRef(null);

    useEffect(() => {
        if (props && props.teacher) {
            setTeacherData({
                teacher_id: props.teacher.teacher_id,
                teacher_name: props.teacher.teacher_name,
                age: props.teacher.age,
                birthday: props.teacher.birthday,
                password: props.teacher.password,
                phoneNumber: props.teacher.phoneNumber,
                email: props.teacher.email,
                degree: props.teacher.degree,
                address: props.teacher.address
            });
        }
        else {
            setTeacherData({
                teacher_id: "",
                teacher_name: "",
                age: 0,
                birthday: "",
                password: "",
                phoneNumber: "",
                email: "",
                degree: "",
                address: ""
            });
        }
    }, [props.teacher, props]);

    return (
        <div>
            <div
                className="modal fade"
                id="1111"
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
                                        name="teacher_id"
                                        value={teacherData.teacher_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="teacher_name"
                                        value={teacherData.teacher_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tuổi</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="age"
                                        value={teacherData.age}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="birthday"
                                        value={teacherData.birthday}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        value={teacherData.phoneNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        value={teacherData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={teacherData.address}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Học vị</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="degree"
                                        value={teacherData.degree}
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
