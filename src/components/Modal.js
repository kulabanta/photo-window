import React from 'react'
import {Modal,Button} from "react-bootstrap"
// import "../App.css"

const modalStyle={
  marginTop:"-10%"
  // background : "transparent",
  // border : "none"
  

}

function MyVerticallyCenteredModal(props) {
  return (
    <Modal style={modalStyle}
      {...props}
      // size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>type : {props.image.type}</p>
        <p>date : {props.image.date}</p>
        <p>time : {props.image.time}</p>
        <p>IPAddress : {props.image.IPAddress}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyVerticallyCenteredModal