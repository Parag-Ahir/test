import React, { useState, useEffect } from 'react';
import { signUpUser } from '../../services/auth';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
export const SignUp = () => {
    const [signUpType, setSignUpType] = useState('fan');
    const { register, setValue, errors, handleSubmit, watch, getValues } = useForm({
        defaultValues: {
            firstname: '',
            lastname: '',
            username: '',
            email: '',
            password: '',
            tnc: false
        }
    });

    const handleSignUp = (data) => {
        const details = {
            "first_name": data.firstname,
            "last_name": data.lastname,
            "username": data.username,
            "email": data.email,
            "password": data.password,
        }
        signUpUser(signUpType, details).then((success) => {
            if (success) {
                toast.success('Sign up successfully.')
            }
        }).catch((err) => { });
    }
    return (
        <div className="d-flex justify-content-center min-vh-100 bg-darks font-link">
            <div className="align-self-center bg-secondarys d-flex justify-content-center flex-column  w-40 roundeds pt-3 pb-3">
                <ul id="myTab" role="tablist" className="m-3 nav nav-tabs nav-pills flex-column w30 align-self-center flex-sm-row text-center bg-dark border-0 rounded-nav">
                    <li className="nav-item flex-sm-fill">
                        <button id="fan-tab" data-toggle="tab" href="#fan" role="tab" aria-controls="fan" aria-selected="true" className={signUpType === 'fan' ? 'nav-link border-0 text-uppercase fs8 fw-bold active' : 'nav-link border-0 text-uppercase fs8'} onClick={() => { setSignUpType('fan') }}>FAN SIGNUP</button>
                    </li>
                    <li className="nav-item flex-sm-fill">
                        <button id="talent-tab" data-toggle="tab" href="#talent" role="tab" aria-controls="talent" aria-selected="false" className={signUpType !== 'fan' ? 'nav-link border-0 text-uppercase fs8 fw-bold active' : 'nav-link border-0 text-uppercase fs8'} onClick={() => { setSignUpType('talent') }}>TALENT SIGNUP</button>
                    </li>
                </ul>
                <div className="d-flex justify-content-center align-self-center fs-5 text-white mb-3 mt-3">
                    Create Your Fan Account
                </div>
                <div className="d-flex justify-content-center flex-column align-items-center">
                    <div className="mb-3 col-sm-6">
                        <label className="fs8">First name*</label>
                        <input type="text" placeholder="First name" name="firstname" className="form-control" ref={register({ required: true, pattern: /^[A-Z]+$/i })} />
                        {(errors && errors.firstname && errors.firstname.type === 'required') && <span className="text-danger">Firstname is Required.</span>}
                        {(errors && errors.firstname && errors.firstname.type === 'pattern') && <span className="text-danger">Invalid Firstname.</span>}
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label className="fs8">Last name*</label>
                        <input type="text" placeholder="Last name" name="lastname" className="form-control" ref={register({ required: true, pattern: /^[A-Z]+$/i })} />
                        {(errors && errors.lastname && errors.lastname.type === 'required') && <span className="text-danger">Lastname is Required.</span>}
                        {(errors && errors.lastname && errors.lastname.type === 'pattern') && <span className="text-danger">Invalid Lastname.</span>}
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label className="fs8">Username*</label>
                        <input type="text" placeholder="Username" name="username" className="form-control" ref={register({ required: true })} />
                        {(errors && errors.username && errors.username.type === 'required') && <span className="text-danger">Username is Required.</span>}
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label className="fs8">Email*</label>
                        <input type="text" placeholder="Email" name="email" className="form-control"
                            ref={register({
                                required: true,
                                pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                            })} />
                        {(errors && errors.email && errors.email.type === 'required') && <span className="text-danger">Email is Required.</span>}
                        {(errors && errors.email && errors.email.type === 'pattern') && <span className="text-danger">Invalid email.</span>}
                    </div>
                    <div className="mb-3 col-sm-6">
                        <label className="fs8">Password*</label>
                        <input type="password" placeholder="Password" name="password" className="form-control"
                            ref={register({
                                required: true,
                                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                            })} />
                        {(errors && errors.password && errors.password.type === 'required') && <span className="text-danger error">Password is required</span>}
                        {(errors && errors.password && errors.password.type === 'pattern') && <span className="text-danger error">Password must contain 8 characters with at least 1 upper case, 1 lower case, 1 special and 1 numeric character.</span>}
                    </div>
                    
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-center align-items-center mt-1">
                            <div className="form-check mr-3 align-self-center">
                                <input type="checkbox" className="form-check-input" id="tnc" name="tnc" value="true" ref={register({ required: true })} />
                                <label className="form-check-label fs8" htmlFor="chess">I agree to the <a href="#" className="tnc">Terms and Condition</a></label>
                            </div>
                        </div>
                        {(errors && errors.tnc && errors.tnc.type === 'required') && <span className="text-danger error">Terms and Condition is required</span>}
                    </div>
                    <div className="col-md-6 mb-3">
                        <div className="d-flex justify-content-center align-items-center mt-1">
                            <div className="form-check mr-3 align-self-center">
                                <button className="signup rounded-pill px-5" onClick={handleSubmit(handleSignUp)}>Sign Up</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}