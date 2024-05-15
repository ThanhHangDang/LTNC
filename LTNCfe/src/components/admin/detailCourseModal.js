import React, { useState, useRef, useEffect } from 'react';

export default function DetailCourseModal(props) {
    const [course, setCourse] = useState({
        course_name: "",
        course_description: "",
        teacher_name: "",
        course_id: ""
    })

    const closeModal = useRef(null);

    useEffect(() => {
        if (props && props.course) {
            setCourse({
                course_name: props.course.course_name,
                course_description: props.course.course_description,
                teacher_name: props.course.teacher_name,
                course_id: props.course.course_id
            });
        }
        else {
            setCourse({
                course_name: "",
                course_description: "",
                teacher_name: "",
                course_id: ""
            });
        }
    }, [props.course, props]);

    return (
        <div>
            <div
                className="modal fade"
                id="12222"
                tabIndex={-1}
                role="dialog"
                aria-labelledby="modelTitleId"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Chi tiết khóa học</h5>
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
                                    <label>ID khóa học</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course_id"
                                        value={course.course_id}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Khóa học</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course_name"
                                        value={course.course_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Giảng viên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course_name"
                                        value={course.teacher_name}
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Mô tả</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="course_description"
                                        value={course.course_description}
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
