import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/forms/formLogin';
import Header from '../components/header-footer/header';
import Footer from '../components/header-footer/footer';

const Login = () => {
    return (
        <>
        <Header/>
        <LoginForm/>
        <Footer/>
        </>
    );
}

export default Login;