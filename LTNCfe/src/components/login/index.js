import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBCol, MDBRow, MDBBtn, MDBIcon, MDBInput } from 'mdb-react-ui-kit';
import domain from "../../config/domain.js";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



export default function Login() {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const [isWrong, setIsWrong] = useState(false);

    const navigation = useNavigate();

    const submitLogin = (e) => {
        e.preventDefault();
        setIsWrong(false);
        axios.post(`http://${domain}:8000/login`, { params: { email: email, password: password } })
            .then(res => {
                if (res.status === 200) {
                    localStorage.setItem('email', res.data[0].email);
                    localStorage.setItem('password', res.data[0].password);
                    localStorage.setItem('role', res.data[0].role);

                    if (res.data[0].role === 'admin') {
                        navigation('/admin/listteacher');
                    } else if (res.data[0].role === 'teacher') {
                        navigation('/teacher/info');
                    }
                    else {
                        navigation('/student/info');
                    }
                }
            })
            .catch(err => {
                console.log(err);
                setIsWrong(true);
            })

    }

    const role = localStorage.getItem('role');

    useEffect(() => {
        if (role === 'admin') {
            navigation('/admin/listteacher');
        } else if (role === 'teacher') {
            navigation('/teacher/info');
        }
        else if (role === 'student') {
            navigation('/student/info');
        }
    }, [email, password]);

    return (
        <div>
            <MDBContainer fluid className="p-3 my-5 h-custom">

                <MDBRow>

                    <MDBCol col='10' md='6'>
                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" class="img-fluid" alt="" />
                    </MDBCol>

                    <MDBCol col='4' md='6'>

                        <div className="d-flex flex-row align-items-center justify-content-center">

                            <p className="lead fw-normal mb-0 me-3">Hi Our Members</p>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='facebook-f' />
                            </MDBBtn>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='twitter' />
                            </MDBBtn>

                            <MDBBtn floating size='md' tag='a' className='me-2'>
                                <MDBIcon fab icon='linkedin-in' />
                            </MDBBtn>

                        </div>
                        <form onSubmit={submitLogin}>
                            <div className="divider d-flex align-items-center my-4">
                                <p className="text-center fw-bold mx-3 mb-0">Please Login!!!</p>
                            </div>

                            <MDBInput wrapperClass='mb-4' label='Email address' id='formControlLg' type='email' size="lg" required onChange={e => { setEmail(e.target.value) }} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='formControlLg' type='password' size="lg" onChange={e => { setPassword(e.target.value) }} />

                            {
                                isWrong &&
                                <h4 className="text-danger">Email hoặc mật khẩu không đúng!</h4>
                            }

                            <div className='text-center text-md-start mt-4 pt-2'>
                                <MDBBtn className="btn btn-outline-primary px-5" size='lg'>Login</MDBBtn>
                            </div>
                        </form>
                    </MDBCol>

                </MDBRow>
            </MDBContainer>
        </div>
    )
}
