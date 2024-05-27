"use client"
import { useState } from "react";
import FormInput from "../component/form-input/text-input";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";
import { loginUser, registerUser } from "../store/userSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PasswordInput from "../component/form-input/password-input";

const defaultErrorMessages = {
    emailError: '',
    passwordError: '',
};

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();

    let defaultFormFields = {
        email: '',
        password: '',
    };

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { emailError, passwordError } = errorMessages;

    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);
    };

    //handle FormSubmit
    const handleSubmit = async (event) => {

        event.preventDefault();
        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));
        if (!validationResult.isValid) {
            setErrorMessages(validationResult.errors);
            return;
        }
        const response = isLoginMode
            ? await dispatch(loginUser({ email, password }))
            : await dispatch(registerUser({ email, password }));
        if (!!response.payload) {
            router.push(!!response.payload.answer ? "/" : "/profile");
        }

    };

    //handle Change for TextInput
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    //handle Blur for TextInput
    const onHandleBlur = (event, errorTag) => {
        const { name, value } = event.target;
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    return (
        <>
            <main className="align-items-center pt-5" >
                {/* <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle col-lg-4 col-xl-4 col-xxl-3 col-4 col-md-6 col-sm-12"  > */}
                <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle"
                    sx={{ flexGrow: 1, width: { xs: '100%', md: '40%' } }}  >
                    <h1>{isLoginMode ? 'Login' : 'Sign-Up'}</h1>
                    <form onSubmit={handleSubmit} >
                        <div className="row ">
                            <FormInput
                                label='Email'
                                type='email'
                                name='email'
                                value={email}
                                onChange={handleChange}
                                handleBlur={(event) => onHandleBlur(event, 'emailError')}
                                errorM={emailError}
                            />
                        </div>
                        <div className="row ">
                            <PasswordInput
                                label='Password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                                handleBlur={(event) => onHandleBlur(event, 'passwordError')}
                                errorM={passwordError}
                            />
                        </div>

                        <div className="row d-flex justify-content-center mb-3">
                            <div className="col-6">
                                <button type='submit' className="btn btn-primary col-12">{isLoginMode ? 'Login' : 'Sign-Up'}</button>
                            </div>
                            <div className="col-6">
                                <button type='button' className="btn btn-secondary col-12" onClick={resetFormFields}>Reset</button>
                            </div>
                        </div>
                        <div className="row d-flex flex-column justify-content-center">
                            {/* <div className="col-auto"> */}
                            {
                                isLoginMode ?
                                    <>
                                        <Link href={"/auth/forgot-pass"}>Forgot Password?</Link>
                                        <strong>No account yet! <span className="span-as-link" onClick={() => setIsLoginMode(!isLoginMode)}>Sign-Up</span></strong>
                                    </>
                                    :
                                    <>
                                        <strong>Already have account! <span className="span-as-link" onClick={() => setIsLoginMode(!isLoginMode)}>Login</span></strong>
                                    </>

                            }
                            {/* </div> */}
                        </div>


                    </form>
                </div>
            </main>

        </>
    );
}