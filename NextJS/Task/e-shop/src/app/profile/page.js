"use client"
import { useState } from "react";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";
import { updateUser } from "../store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import DropdownInput from "../component/form-input/dropdown-input";
import { ANSWER_ERROR_TAG, EMAIL_ERROR_TAG, S_QUESTION_1, S_QUESTION_2, S_QUESTION_3, S_QUESTION_ERROR_TAG } from "@/config/constants";
import FormInput from "../component/form-input/text-input";

const defaultErrorMessages = {
    emailError: '',
    securityQuestionError: '',
    answerError: ''
};

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    let userData = useSelector((data) => data.usersData.userData);

    let defaultFormFields = {
        email: userData.email || '',
        securityQuestion: userData.securityQuestion || S_QUESTION_1,
        answer: userData.answer || '',
    };

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, securityQuestion, answer } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { emailError, securityQuestionError, answerError } = errorMessages;

    //Reset FormFields
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
        userData = { ...userData, email, securityQuestion, answer };
        const response = await dispatch(updateUser(userData));
        console.log("From Page ", response);
        if (!!response.payload) {
            router.push("/");
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


    //handle Change for Select
    const handleChangeSelect = (event, name, errorTag) => {
        const { value } = event.target;
        setFormFields({ ...formFields, [name]: value });
        const errors = getUpdatedErrorMsg(errorTag, name, value, errorMessages);
        setErrorMessages(errors);
    };

    //handle Blur for Select
    const onHandleBlurSelect = (event, name, errorTag) => {
        const { value } = event.target;
        if (value.length) return;

        handleChangeSelect(event, name, errorTag);
    };

    //SecurityQuestion options
    const securityQuestions = [
        { value: S_QUESTION_1, label: S_QUESTION_1 },
        { value: S_QUESTION_2, label: S_QUESTION_2 },
        { value: S_QUESTION_3, label: S_QUESTION_3 },
    ];

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
                                handleBlur={(event) => onHandleBlur(event, EMAIL_ERROR_TAG)}
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
                                handleBlur={(event) => onHandleBlur(event, ANSWER_ERROR_TAG)}
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