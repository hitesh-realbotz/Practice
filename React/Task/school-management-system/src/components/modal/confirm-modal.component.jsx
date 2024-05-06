import { useState } from 'react';
// import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import Button, { BUTTON_TYPE_CLASSES } from '../button/button.component';
import { ButtonsContainer } from '../students/student-form/student-form.styles';
import { CONSTANTS } from '../../constants/constants';

const ConfirmModal = (props) => {
  const { show, action, data , form, onHide, onConfirm} = props;
  console.log('Confirm Data',data.project);

  




    return (
      <>        
        <Modal  {...props} aria-labelledby="contained-modal-title-vcenter" centered>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure to {action} {form} ?</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              {
                form === CONSTANTS.FOR_STUDENT && data.project.length ?
                <p>Project with {data.project.map(project => project.title)} title will also be deleted!</p>
                : ''
              }
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