import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface ModalProps {
  show: boolean;
  onHide: () => void;
}

const MyVerticallyCenteredModal: React.FC<ModalProps> = ({ show, onHide }) => {
  return (
    <section className="py-4 container text-center">
      <Modal show={show} onHide={onHide} size="lg" centered>
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <p>
            Enter your email and get notified when this page is live. We would not
            add you to any marketing lists without your express permission!
          </p>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter your Email:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="d-flex m-auto" controlId="exampleForm.ControlButton1">
              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button onClick={onHide}>Close</Button>
        </Modal.Footer> */}
      </Modal>
    </section>
  );
};

export default MyVerticallyCenteredModal;
