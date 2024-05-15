import React, { useEffect, useRef, useState } from 'react';

export default function EditPointModal(props) {
    const [student, setStudent] = useState({
        student_id: "",
        student_name: "",
        email: "",
        BTL_grade: "",
        GK_grade: "",
        CK_grade: "",
        grade: "",
        phoneNumber: "",
        course_name: "",
        course_id: ""
    })

    const closeModal = useRef(null);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setStudent((preState) => ({
            ...preState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.updatePointFromTeacher(student);
        closeModal.current.click();
    }

    useEffect(() => {
        if (props && props.student) {
            setStudent({
                student_id: props.student.student_id,
                student_name: props.student.student_name,
                email: props.student.email,
                BTL_grade: props.student.BTL_grade,
                GK_grade: props.student.GK_grade,
                CK_grade: props.student.CK_grade,
                grade: props.student.grade,
                phoneNumber: props.student.phoneNumber,
                course_name: props.student.course_name,
                course_id: props.student.course_id
            })
        }
        else {
            setStudent({
                student_id: "",
                student_name: "",
                email: "",
                BTL_grade: "",
                GK_grade: "",
                CK_grade: "",
                grade: "",
                phoneNumber: "",
                course_name: "",
                course_id: ""
            })
        }
    }, [props, props.student])

    return (
        <div>
            <div
                className="modal fade"
                id="1"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Chấm điểm sinh viên</h5>
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
                                    <label>Khóa học</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={student && student.course_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mã số sinh viên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={student && student.student_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Tên Sinh viên</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={student && student.student_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Email</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={student && student.email}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Số điện thoại</label>
                                    <input
                                        disabled
                                        type="text"
                                        className="form-control"
                                        value={student && student.phoneNumber}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Điểm BTL</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min={0}
                                        max={10}
                                        className="form-control"
                                        name="BTL_grade"
                                        onChange={handleOnChange}
                                        value={student.BTL_grade}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Điểm GK</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min={0}
                                        max={10}
                                        className="form-control"
                                        name="GK_grade"
                                        onChange={handleOnChange}
                                        value={student.GK_grade}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Điểm CK</label>
                                    <input
                                        type="number"
                                        step="0.01"
                                        min={0}
                                        max={10}
                                        className="form-control"
                                        name="CK_grade"
                                        onChange={handleOnChange}
                                        value={student.CK_grade}
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn btn-success"
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
