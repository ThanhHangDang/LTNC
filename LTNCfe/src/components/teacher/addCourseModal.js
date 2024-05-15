import React, { useState, useRef } from 'react';

export default function AddCourseModal(props) {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const [course, setCourse] = useState({
        course_name: "",
        course_description: "",
        email: email,
        password: password
    })

    const closeModal = useRef(null);

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setCourse((preState) => ({
            ...preState,
            [name]: value,
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.submitAddcourse(course);
        closeModal.current.click();
    }

    return (
        <div>
            <div
                className="modal fade"
                id="12"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Thêm khóa học</h5>
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
                                        type="text"
                                        className="form-control"
                                        name="course_name"
                                        onChange={handleOnChange}
                                        value={course.course_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course_description"
                                        onChange={handleOnChange}
                                        value={course.course_description}
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
