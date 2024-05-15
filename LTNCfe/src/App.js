import './App.css';
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Login from './components/login';
import PageNotFound from './components/pageNotFound/index.js';
import TeachSibar from './components/teacher/teacherSidebar.js';
import TeacherData from './components/teacher/teacherData.js';
import TeacherCourses from './components/teacher/teacherCourses.js';
import TeacherManageStudent from './components/teacher/teacherManageStudent.js';
import StudentSidebar from './components/student/studentSidebar.js';
import StudentData from './components/student/studentData.js';
import CoursesOfStudent from './components/student/coursesOfStudent.js';
import StudentCourses from './components/student/studentCourses.js';
import AdminSibar from './components/admin/adminSibar.js';
import ListTeacher from './components/admin/listTeacher.js';
import ListStudent from './components/admin/listStudent.js';
import ListCourse from './components/admin/listCourse.js';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    const interval = setInterval(() => {
      localStorage.clear();
    }, 1200000);

    return () => clearInterval(interval);
  }, []);


  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Login} />
          <Route Component={TeachSibar}>
            <Route path='/teacher/info' Component={TeacherData}></Route>
            <Route path='/teacher/courses' Component={TeacherCourses}></Route>
            <Route path='/teacher/managestudent' Component={TeacherManageStudent}></Route>
          </Route>
          <Route Component={AdminSibar}>
            <Route path='/admin/listteacher' Component={ListTeacher}></Route>
            <Route path='/admin/liststudent' Component={ListStudent}></Route>
            <Route path='/admin/listcourse' Component={ListCourse}></Route>
          </Route>
          <Route Component={StudentSidebar}>
            <Route path='/student/info' Component={StudentData}></Route>
            <Route path='/student/coursesofstudent' Component={CoursesOfStudent}></Route>
            <Route path='/student/courses' Component={StudentCourses}></Route>
          </Route>
          <Route path='*' Component={PageNotFound} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
