import React, { useEffect, useState } from "react";
import { IUser } from "../interface";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import { allUsersData, changeUsername, deleteUser } from "../store/Slicer/userSlicer";
import "bootstrap/dist/css/bootstrap.min.css";
import Accordion from "react-bootstrap/Accordion";
import { Button, CloseButton } from "react-bootstrap";

function DisplayUsers() {

    const [newUsername, setNewUsername] = useState<string>("");

  const users = useSelector((state: RootState) => state.users.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(allUsersData());
  }, [dispatch]);

  return <div className="container-fluid d-flex justify-content-center flex-column">
    <Accordion>
        {users.map((user: IUser) => {
            return <Accordion.Item eventKey={user.id || ""} key={user.id}>
                <CloseButton className="d-flex ms-auto " onClick={() => {dispatch(deleteUser(user.id || ""))}}/>
                    <Accordion.Header>{user.username}</Accordion.Header>
                    <Accordion.Body>
                        Name: {user.name}
                        <br />
                        Age: {user.age}
                        <br />
                        Change username below:
                        <br />
                        <input placeholder="username" type="text" value={newUsername} onChange={(e) => {setNewUsername(e.target.value)}}/>
                        <Button onClick={() => {dispatch(changeUsername({id: user.id || "", newUsername}))}}>Change</Button>
                    </Accordion.Body>
            </Accordion.Item>
        })}
    </Accordion>
        
  </div>;
}

export default DisplayUsers;
