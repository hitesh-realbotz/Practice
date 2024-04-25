import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import SignInForm from '../sign-in-form/sign-in-form.component';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import { CONSTANTS } from '../../constants/constants';
import StudentForm from '../students/student-form.component';

const FormModal = (props) => {
  const { show, form, action, data , onHide} = props;
  
  console.log(props);

    const [modalShow, setShow] = useState(show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          
        {/* <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered> */}
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>{form} - {action} form</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            { form === CONSTANTS.FOR_STUDENT ? <StudentForm onHide={onHide} data={data} action={action} /> : <SignUpForm /> }
            
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer> */}
        </Modal>
      </>
    );

}

export default FormModal;