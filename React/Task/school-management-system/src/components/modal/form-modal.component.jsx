import { memo } from 'react';
import Modal from 'react-bootstrap/Modal';
import SignUpForm from '../sign-up-form/sign-up-form.component';
import { CONSTANTS } from '../../constants/constants';
import StudentForm from '../students/student-form/student-form.component';
import ProjectForm from '../projects/project-form/project-form.component';

const FormModal = memo((props) => {
  const { show, form, action, data , onHide} = props;

    return (
      <>          
        <Modal  {...props} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>{form} - {action} form</Modal.Title>
          </Modal.Header>
          <Modal.Body className='form-body'>
            { (form === CONSTANTS.FOR_STUDENT) 
                          ? <StudentForm onHide={onHide} data={data} action={action} /> 
                          : (form === CONSTANTS.FOR_PROJECT) 
                                        ? <ProjectForm onHide={onHide} data={data} action={action}  /> 
                                        : <SignUpForm /> }
            
          </Modal.Body>
        </Modal>
      </>
    );

});

export default FormModal;