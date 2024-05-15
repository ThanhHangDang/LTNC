import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export default function StudentSidebar() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row flex-nowrap">
                    <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-primary" >
                        <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
                            <NavLink to="/student/info" className="d-flex align-items-center pb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                                <span className="fs-5 d-none d-sm-inline">StudentPage</span>
                            </NavLink>
                            <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                                <li className="nav-item">
                                    <NavLink exact activeClassName="active" to="/student/info" className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-info-square" /> <span className="ms-1 d-none d-sm-inline">Thông tin sinh viên</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/student/coursesofstudent" className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-card-checklist" /> <span className="ms-1 d-none d-sm-inline">Danh sách khóa học</span>
                                    </NavLink>
                                </li>
                                <li className="nav-item">
                                    <NavLink activeClassName="active" to="/student/courses" className="nav-link align-middle px-0 text-white">
                                        <i className="fs-4 bi-list-task" /> <span className="ms-1 d-none d-sm-inline">Khóa học hiện có</span>
                                    </NavLink>
                                </li>
                            </ul>
                            <hr />
                            <div className="dropdown pb-4">
                                <a href="/teacher/info" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <i class="bs-4 bi-box-arrow-left"></i>
                                    <span className="d-none d-sm-inline mx-1">Sign out</span>
                                </a>
                                <ul className="dropdown-menu dropdown-menu-dark text-small shadow">
                                    <li><NavLink className="dropdown-item" to="/student/info">Profile</NavLink></li>
                                    <li>
                                        <hr className="dropdown-divider" />
                                    </li>
                                    <li><NavLink className="dropdown-item" to="/" onClick={() => { localStorage.removeItem("email"); localStorage.removeItem("password"); localStorage.removeItem("role"); }}>Sign out</NavLink></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col py-3">
                        <Outlet />
                    </div>
                </div>
            </div>
        </div>
    )
}
