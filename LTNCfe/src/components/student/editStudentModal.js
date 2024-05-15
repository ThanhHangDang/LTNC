import React, { useEffect, useRef, useState } from 'react';

export default function EditStudentModal(props) {
    const [studentData, setStudentData] = useState({
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

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStudentData((preState) => ({
            ...preState,
            [name]: value,
        }))
    }

    const [nameValidMess, setNameValidMess] = useState("");
    const [ageValidMess, setAgeValidMess] = useState("");
    const [dateValidMess, setDateValidMess] = useState("");
    const [phoneValidMess, setPhoneValidMess] = useState("");

    const [nameValid, setNameValid] = useState(true);
    const [ageValid, setAgeValid] = useState(true);
    const [dateValid, setDateValid] = useState(true);
    const [phoneValid, setPhoneValid] = useState(true);

    const [formValid, setFormValid] = useState(false);

    const handleErrors = (e) => {
        const { name, value } = e.target;
        let mess = value.trim() === "" ? name + " Không được rỗng" : "";

        switch (name) {
            case "student_name":
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

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.onSubmitUpdateStudent(studentData)
        closeModal.current.click();
    }

    useEffect(() => {
        if (props && props.studentData) {
            setStudentData({
                student_id: props.studentData.student_id,
                student_name: props.studentData.student_name,
                age: props.studentData.age,
                birthday: props.studentData.birthday,
                password: props.studentData.password,
                phoneNumber: props.studentData.phoneNumber,
                email: props.studentData.email,
                address: props.studentData.address
            });
        }
        else {
            setStudentData({
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
    }, [props.studentData, props]);

    useEffect(() => {
        setFormValid(nameValid && ageValid && dateValid && phoneValid);
    }, [nameValid, ageValid, dateValid, phoneValid]);

    return (
        <div>
            <div
                className="modal fade"
                id="12345"
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
                                    <label>Mã số sinh viên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        name="student_id"
                                        onChange={handleOnChange}
                                        value={studentData.student_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="student_name"
                                        onChange={handleOnChange}
                                        onBlur={handleErrors}
                                        value={studentData.student_name}
                                    />
                                    {nameValidMess ? (<div className="alert alert-danger">{nameValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Tuổi</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="age"
                                        onChange={handleOnChange}
                                        onBlur={handleErrors}
                                        value={studentData.age}
                                    />
                                    {ageValidMess ? (<div className="alert alert-danger">{ageValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Ngày sinh</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="birthday"
                                        onChange={handleOnChange}
                                        onBlur={handleErrors}
                                        value={studentData.birthday}
                                    />
                                    {dateValidMess ? (<div className="alert alert-danger">{dateValidMess}</div>) : ("")}
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phoneNumber"
                                        onChange={handleOnChange}
                                        onBlur={handleErrors}
                                        value={studentData.phoneNumber}
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
                                        value={studentData.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Địa chỉ</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        onChange={handleOnChange}
                                        value={studentData.address}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
                                    disabled={!formValid}
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
