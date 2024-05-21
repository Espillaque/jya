import React from 'react';
import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/forms/formRegister';
import Header from '../components/header-footer/header';
import Footer from '../components/header-footer/footer';

const Register = () => {
    return (
        <>
        <Header/>
        <RegisterForm/>
        <Footer/>
        </>
    );
}

export default Register;