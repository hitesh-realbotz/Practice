"use client"
import { useState } from "react";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";
import { loginUser, registerUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DropdownInput from "../component/form-input/form-input-dropdown";
import { S_QUESTION_1, S_QUESTION_2, S_QUESTION_3, S_QUESTION_ERROR_TAG } from "@/config/constants";
import FormInput from "../component/form-input/form-text-input";

const defaultErrorMessages = {
    emailError: '',
    securityQuestionError: '',
    answerError: ''
};

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const userData= useSelector((data)=>data.usersData.userData);
    // const navigate = () => {
    //     router.push("/");
    // }

    let defaultFormFields = {
        email: userData.email,
        securityQuestion: userData.securityQuestion,
        answer: userData.answer,
    };

    const securityQuestions = [
        { value:S_QUESTION_1, label: S_QUESTION_1 },
        { value:S_QUESTION_2, label: S_QUESTION_2 },
        { value:S_QUESTION_3, label: S_QUESTION_3 },
    ]

    const [isLoginMode, setIsLoginMode] = useState(true);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, securityQuestion, answer } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { emailError, securityQuestionError, answerError } = errorMessages;

    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);
    };

    const handleSubmit = async (event) => {

        console.log("Submit ", email, password);
        event.preventDefault();

        const validationResult = validateForm(Object.keys(formFields), Object.values(formFields), Object.keys(defaultErrorMessages));
        if (!validationResult.isValid) {
            setErrorMessages(validationResult.errors);
            return;
        }


        const response = isLoginMode
            ? await dispatch(loginUser({ email, password }))
            : await dispatch(registerUser({ email, password }));
        console.log("From Page ", response);
        if (!!response.payload) {
            router.push("/profile");
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };


    //Updating Error messages from FormComponent
    const onHandleBlur = (event, errorTag) => {
        const { name, value } = event.target;
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    const onHandleBlurSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (value.length) {
            return;
        }
        handleChangeSelect(event, name, errorTag);
    };

    return (
        <>
            <main className="align-items-center pt-5" >
                {/* <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle col-lg-4 col-xl-4 col-xxl-3 col-4 col-md-6 col-sm-12"  > */}
                <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle"
                    sx={{ flexGrow: 1, width: { xs: '100%', md: '40%' } }}  >
                    <h1>Profile</h1>
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
                            <DropdownInput
                                label='Security Question'
                                options={securityQuestions}
                                handleChange={(event, name) => handleChangeSelect(event, name, S_QUESTION_ERROR_TAG)}
                                handleBlur={(event, name) => onHandleBlurSelect(event, name, S_QUESTION_ERROR_TAG)}
                                errorM={securityQuestionError}
                                value={securityQuestion}
                                name='securityQuestion'
                            />
                        </div>
                        <div className="row ">
                            <FormInput
                                label='Answer'
                                type='answer'
                                name='answer'
                                value={answer}
                                onChange={handleChange}
                                handleBlur={(event) => onHandleBlur(event, 'answerError')}
                                errorM={answerError}
                            />
                        </div>
                        <div className="row d-flex justify-content-center mb-3">
                            <div className="col-6">
                                <button type='submit' className="btn btn-primary col-12">Submit</button>
                            </div>
                            <div className="col-6">
                                <button type='button' className="btn btn-secondary col-12" onClick={resetFormFields}>Reset</button>
                            </div>
                        </div>
                    </form>
                </div>
            </main>

        </>
    );
}