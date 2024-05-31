import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 3,
};

const ConfirmModal = (props) => {

    const { isOpen, onClose, onConfirm, title, data } = props;

    return (
        <div>
            <Modal
                open={isOpen}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {title}
                    </Typography>
                    {
                        data.message
                            ? <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {data.message}
                            </Typography>
                            : <></>
                    }

                    <div className="d-flex justify-content-center">

                        <Button variant="contained" className="m-3" color="error" onClick={onConfirm}>
                            YES
                        </Button>
                        <Button variant="contained" className="m-3" color="success" onClick={onClose}>
                            NO
                        </Button>
                    </div>

                </Box>
            </Modal>
        </div>
    );
}

export default ConfirmModal;