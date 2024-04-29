import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ButtonsContainer } from '../students/student-form/student-form.styles';

const ConfirmModal = (props) => {
  const { show, action, data , form, onHide, onConfirm} = props;
  
  console.log(props);

    const [modalShow, setShow] = useState(show);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
      <>
          
        {/* <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered> */}
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure to {action} {form} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>

            </div>
            <ButtonsContainer>
                    <Button type='submit' buttonType={BUTTON_TYPE_CLASSES.delete} onClick={onConfirm}>YES</Button>
                    <Button  type='button'  onClick={onHide}>NO</Button>
                </ButtonsContainer>
          </Modal.Body>
        </Modal>
      </>
    );

}

export default ConfirmModal;