"use client"
import { useState } from "react";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";
import { getUserByEmailId, updateUserPassword } from "../../store/userSlice";
import { useDispatch } from "react-redux";
import { ANSWER_ERROR_TAG, ANSWER_VERIFICATION, EMAIL_ERROR_TAG, EMAIL_VERIFICATION, RESET_PASSWORD, S_QUESTION_1, S_QUESTION_2, S_QUESTION_3, S_QUESTION_ERROR_TAG } from "@/config/constants";
import FormInput from "../../component/form-input/text-input";
import { toast } from "react-toastify";
import PasswordInput from "@/app/component/form-input/password-input";
import { useRouter } from "next/navigation";

const defaultErrorMessages = {
    emailError: '',
    securityQuestionError: '',
    answerError: '',
    passwordError: ''
};
let defaultFormFields = {
    email: '',
    securityQuestion: S_QUESTION_1,
    answer: '',
    password: ''
};

let userDetails = {};

export default function Page() {
    const dispatch = useDispatch();
    const router = useRouter();
    const [formMode, setFormMode] = useState(EMAIL_VERIFICATION);
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, securityQuestion, answer, password } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { emailError, securityQuestionError, answerError, passwordError } = errorMessages;

    //Reset FormFields
    const resetFormFields = () => {
        setErrorMessages(defaultErrorMessages);
        setFormFields(defaultFormFields);
    };

    //handle FormSubmit
    const handleSubmit = async (event) => {

        event.preventDefault();

        //Email input from user
        if (formMode === EMAIL_VERIFICATION) {
            const validationResult = validateForm(Object.keys({ email }), Object.values({ email }), Object.keys({ emailError: defaultErrorMessages.emailError }));
            if (!validationResult.isValid) {
                setErrorMessages(validationResult.errors);
                return;
            }
            const response = await dispatch(getUserByEmailId({ email }))
            if (!!response.payload) {
                if (response.payload.answer.length) {
                    setFormMode(ANSWER_VERIFICATION);
                    userDetails = response.payload;
                    console.log("From Page ", defaultFormFields);
                }
            }
        }
        //Answer input from user for security question
        else if (formMode === ANSWER_VERIFICATION) {
            const validationResult = validateForm(Object.keys({ answer }), Object.values({ answer }), Object.keys({ answerError: defaultErrorMessages.answerError }));
            if (!validationResult.isValid || userDetails.answer !== answer) {
                setErrorMessages(validationResult.errors);
                toast.error("Incorrect answer!");
                return;
            }
            setFormMode(RESET_PASSWORD);
        }
        //Password updation
        else {
            const validationResult = validateForm(Object.keys({ password }), Object.values({ password }), Object.keys({ passwordError: defaultErrorMessages.passwordError }));
            if (!validationResult.isValid) {
                setErrorMessages(validationResult.errors);
                return;
            }
            const response = await dispatch(updateUserPassword({ ...userDetails, newPassword: password }))
            if (!!response.payload) {
                toast.success("Password updated successfully!");
            }
            router.push("/");
        }
    };

    //handle Change for input
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    };

    //handle Blur for input
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
                    <h1>Forgot Pass</h1>

                    <form onSubmit={handleSubmit} >
                        {
                            formMode === EMAIL_VERIFICATION
                                ?
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
                                :

                                (formMode === ANSWER_VERIFICATION
                                    ? <>
                                        <div className="row ">
                                            <FormInput
                                                label='Security Question'
                                                type='text'
                                                name='securityQuestion'
                                                value={securityQuestion}
                                                onChange={handleChange}
                                                handleBlur={(event) => onHandleBlur(event, S_QUESTION_ERROR_TAG)}
                                                errorM={securityQuestionError}
                                                readOnly={true}
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
                                    </>
                                    : <>
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
                                    </>)

                        }

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