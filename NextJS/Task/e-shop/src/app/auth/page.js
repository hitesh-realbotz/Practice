"use client"
import { useState } from "react";
import FormInput from "../component/form-input/form-text-input";
import { getUpdatedErrorMsg, validateForm } from "@/utils/validation/validation.utils";

const defaultErrorMessages = {
    emailError: '',
    passwordError: '',
};

export default function Page() {

    let defaultFormFields = {
        email: '',
        password: '',
    };

    //   const dispatch = useDispatch();
    //   const navigate = useNavigate();
    //   const isValidUser = useSelector(selectIsValidUser);
    //   const isLoading = useSelector(selectIsLoading);

    //   useEffect(() => {
    //     if (isValidUser) {
    //       navigate(CONSTANTS.DASHBOARD_ROUTE_PATH);
    //     }
    //   }, [isValidUser]);

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const [errorMessages, setErrorMessages] = useState(defaultErrorMessages);
    const { emailError, passwordError } = errorMessages;

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

        try {
            dispatch(signUpStart(email, password));
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                alert('Cannot create user, email already in use');
            } else {
                console.log('user creation encountered an error', error);
            }
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

    return (
        <>
            <main className="align-items-center pt-5" >
                <div className="d-flex flex-column align-items-center border border-dark p-3 bg-primary-subtle ">
                    <h1>Sign-Up</h1>
                    <form onSubmit={handleSubmit}>
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
                            <FormInput
                                label='Password'
                                type='password'
                                name='password'
                                value={password}
                                onChange={handleChange}
                                handleBlur={(event) => onHandleBlur(event, 'passwordError')}
                                errorM={passwordError}
                            />
                        </div>
                        <div className="row d-flex justify-content-center ">
                            <div className="col-auto">
                                <button type='submit' class="btn btn-primary">Sign Up</button>
                            </div>
                            <div className="col-auto">
                                <button type='button' class="btn btn-secondary" onClick={resetFormFields}>Reset</button>
                            </div>
                        </div>


                    </form>
                </div>
            </main>

        </>
    );
}