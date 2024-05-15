import React, { useEffect, useRef, useState } from 'react';

export default function EditTeacherModal(props) {
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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setTeacherData((preState) => ({
            ...preState,
            [name]: value,
        }))
    }

    const [nameValidMess, setNameValidMess] = useState("");
    const [ageValidMess, setAgeValidMess] = useState("");
    const [dateValidMess, setDateValidMess] = useState("");
    const [phoneValidMess, setPhoneValidMess] = useState("");

    const [nameValid, setNameValid] = useState(false);
    const [ageValid, setAgeValid] = useState(false);
    const [dateValid, setDateValid] = useState(false);
    const [phoneValid, setPhoneValid] = useState(false);

    const [formValid, setFormValid] = useState(false);

    const handleErrors = (e) => {
        const { name, value } = e.target;
        let mess = value.trim() === "" ? name + " Không được rỗng" : "";

        switch (name) {
            case "teacher_name":
                setNameValid(mess === "" ? true : false);

                if (value && !(value.length >= 5 && value.length <= 30)) {
                    mess = "Tên là chuỗi từ 5-30 ký tự";
                    setNameValid(false);
                }
                setNameValidMess(mess);
                break;
            case "age":
                setAgeValid(mess === "" ? true : false);
                if (value && !value.match("^(1[6-9]|[2-6][0-9]|70)$")) {
                    mess = "Tuổi từ 16 đến 70";
                    setAgeValid(false);
                }
                setAgeValidMess(mess);
                break;
            case "birthday":
                setDateValid(mess === "" ? true : false);
                if (value && !value.match("^([0-9]{2})-([0-9]{2})-([0-9]{4})$")) {
                    mess = "Định dạng DD-MM-YYYY";
                    setDateValid(false);
                }
                setDateValidMess(mess);
                break;
            case "phoneNumber":
                setPhoneValid(mess === "" ? true : false);
                if (value && !value.match("^[0-9]{7,14}$")) {
                    mess = "Số điện thoại phải có từ 7 đến 14 chữ số";
                    setPhoneValid(false);
                }
                setPhoneValidMess(mess);
                break;
            default:
                break;
        }

        // console.log(nameValid, ageValid, dateValid, phoneValid);
        // console.log(nameValid && ageValid && dateValid && phoneValid);
        // setFormValid(nameValid && ageValid && dateValid && phoneValid);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // onSubmit(teacherData);
        props.onSubmitUpdateTeacher(teacherData)
        closeModal.current.click();
    }

    useEffect(() => {
        if (props && props.teacherData) {
            setTeacherData({
                teacher_id: props.teacherData.teacher_id,
                teacher_name: props.teacherData.teacher_name,
                age: props.teacherData.age,
                birthday: props.teacherData.birthday,
                password: props.teacherData.password,
                phoneNumber: props.teacherData.phoneNumber,
                email: props.teacherData.email,
                degree: props.teacherData.degree,
                address: props.teacherData.address
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
    }, [props.teacherData, props]);

    useEffect(() => {
        setFormValid(nameValid && ageValid && dateValid && phoneValid);
    }, [nameValid, ageValid, dateValid, phoneValid]);

    return (
        <div>
            <div
                className="modal fade"
                id="123"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Cập nhật thông tin</h5>
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
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Mã số giáo viên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="teacher_id"
                                        onChange={handleOnChange}
                                        value={teacherData.teacher_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="teacher_name"
                                        onBlur={handleErrors}
                                        onChange={handleOnChange}
                                        value={teacherData.teacher_name}
                                    />
                                    {nameValidMess ? (<div className="alert alert-danger">{nameValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Tuổi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="age"
                                        onBlur={handleErrors}
                                        onChange={handleOnChange}
                                        value={teacherData.age}
                                    />
                                    {ageValidMess ? (<div className="alert alert-danger">{ageValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="birthday"
                                        onBlur={handleErrors}
                                        onChange={handleOnChange}
                                        value={teacherData.birthday}
                                    />
                                    {dateValidMess ? (<div className="alert alert-danger">{dateValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        onBlur={handleErrors}
                                        onChange={handleOnChange}
                                        value={teacherData.phoneNumber}
                                    />
                                    {phoneValidMess ? (<div className="alert alert-danger">{phoneValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="email"
                                        onChange={handleOnChange}
                                        value={teacherData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        onChange={handleOnChange}
                                        value={teacherData.address}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Học vị</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="degree"
                                        onChange={handleOnChange}
                                        value={teacherData.degree}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={formValid ? "" : 'disabled'}
                                >
                                    Submit
                                </button>
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
