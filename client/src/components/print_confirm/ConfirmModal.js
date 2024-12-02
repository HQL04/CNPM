import { Modal, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function ConfirmModal({ state, confirm_state, campus, room }){
    return (
        <Modal show={state}>
            <Modal.Header>
                <Modal.Title>
                    Thông báo
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {confirm_state? `Đặt in thành công! Xin tui lòng đến ${campus}, Phòng ${room} lấy tài liệu `:'Số dư không đủ :(('}
            </Modal.Body>
            <Modal.Footer>
                <Link 
                    className = "btn btn-primary"
                    to = {confirm_state?'/print/status':'/buy'}
                >
                    OK
                </Link>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmModal;