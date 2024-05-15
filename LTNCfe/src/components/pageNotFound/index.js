import React from 'react';
import { NavLink } from 'react-router-dom';

export default function PageNotFound() {
    return (
        <div className="w-100 h-100 d-flex flex-column justify-content-center align-items-center mt-5 pt-2">
            <img alt="bonk" src={require('./bonk-meme.jpg')} className="w-50 h-50 pt-5"></img>
            <h1>Page Not Found</h1>
            <button className='btn btn-primary' ><NavLink className='text-decoration-none text-white' to="/">Về trang đăng nhập</NavLink></button>
        </div>
    )
}
