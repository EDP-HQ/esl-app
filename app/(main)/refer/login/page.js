/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { Formik } from 'formik';

import { isLogin, kcvlLogin, setLogin } from '../../../api/kcvl';

const LoginPage = () => {
    const router = useRouter();
    const toast = useRef(null);

    const handleLogin = async (params) => {
        try {
            const result = await kcvlLogin(params.UserID, params.PWord);
           
            if (result.data && result.data.length > 0) {
                setLogin(result.data[0]);
                toast.current.show({ severity: 'success', summary: 'Sign In', detail: 'Success..', life: 3000 });
                router.push('/');
            } else {
                toast.current.show({ severity: 'error', summary: 'Sign In', detail: 'Invalid Login', life: 3000 });
            }
        } catch (error) {
            const errorMessage = error.message || 'An error occurred';
            toast.current.show({ severity: 'error', summary: 'Warning', detail: errorMessage, life: 3000 });
        }
    };

    const handleLoad = async () => {
        const _userLogin = isLogin();
        if (_userLogin) {
            router.push('/');
        }
    };

    useEffect(() => {
        handleLoad();
    }, []);

    return (
        <div className="grid">
            <Toast ref={toast} />
            <div className="col-12 xl:col-12">
                <div className="card">
                    <div className="flex align-items-center justify-content-center">
                        <div className="flex flex-column align-items-center justify-content-center">
                            <div className="w-full surface-card py-8 px-6" style={{ borderRadius: '12px' }}>
                                <div className="text-center mb-5">
                                    <div className="text-900 text-3xl font-medium mb-3">Login Page</div>
                                    <span className="text-600 font-medium">Sign in to continue</span>
                                </div>
                                <Formik
                                    initialValues={{
                                        UserID: '',
                                        PWord: ''
                                    }}
                                    validate={values => {
                                        const errors = {};
                                        if (!values.UserID) { errors.UserID = 'Required'; }
                                        if (!values.PWord) { errors.PWord = 'Required'; }

                                        return errors;
                                    }}
                                    onSubmit={(values, { setSubmitting }) => {
                                        setTimeout(() => {
                                            handleLogin(values);
                                            setSubmitting(false);
                                        }, 400);
                                    }}
                                >
                                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, }) => (
                                        <form onSubmit={handleSubmit}>
                                            <label htmlFor="UserID" className="block text-900 font-medium text-xl mb-2">
                                                User
                                            </label>
                                            <InputText
                                                name='UserID'
                                                value={values.UserID}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                type="text"
                                                placeholder="User"
                                                className={`w-full mb-3 ${errors.UserID ? 'p-invalid' : ''}`}
                                                style={{ padding: '1rem' }}
                                                autoComplete='true'
                                            />
                                            {errors.UserID && touched.UserID && <small className="p-error">{errors.UserID}</small>}

                                            <label htmlFor="PWord" className="block text-900 font-medium text-xl mb-1">
                                                Password
                                            </label>
                                            <Password
                                                name="PWord"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                placeholder="Password"
                                                feedback={false}
                                                toggleMask
                                                className={`w-full mb-3 ${errors.PWord ? 'p-invalid' : ''}`}
                                                inputClassName="w-full p-3"
                                                autoComplete='true'
                                            />
                                            {errors.PWord && touched.PWord && <small className="p-error">{errors.PWord}</small>}
                                            
                                            <Button label="Sign In" icon='pi pi-lock-open' type="submit" className="w-full p-3 text-xl" disabled={isSubmitting}></Button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
