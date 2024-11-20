import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { addUser, handleClose } from "../store/Slicer/userSlicer";
import { Button, Form } from "react-bootstrap";
import { IUser } from "../interface";

function AddUser() {
  const [user, setUser] = useState<IUser>({
    name: "",
    username: "",
    age: 0,
  });

  const showUserModal = useSelector(
    (state: RootState) => state.showModal.showModal
  );
  const dispatch = useDispatch<AppDispatch>();

  const handleCloseBtn = () => {
    dispatch(handleClose());
  };

  const addUserBtn = () => {
    dispatch(addUser(user));
    setUser({
      name: "",
      username: "",
      age: 0,
    });
    handleCloseBtn();
  };

  return (
    <div>
      <Modal show={showUserModal} onHide={handleCloseBtn}>
        <Modal.Header closeButton>
          <Modal.Title>Add user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label>Name:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="Name"
              defaultValue={user.name}
              onChange={(e) => {
                setUser({ ...user, name: e.target.value });
              }}
            />
            <Form.Label>Username:</Form.Label>
            <Form.Control
              required
              type="text"
              placeholder="username"
              defaultValue={user.username}
              onChange={(e) => {
                setUser({ ...user, username: e.target.value });
              }}
            />
            <Form.Label>Age:</Form.Label>
            <Form.Control
              required
              type="number"
              placeholder="age"
              defaultValue={user.age}
              onChange={(e) => {
                setUser({ ...user, age: Number(e.target.value) });
              }}
            />
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={addUserBtn}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddUser;
