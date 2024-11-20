import React from 'react'
import "./App.css"
import DisplayUsers from './components/DisplayUsers';
import AddUser from './components/AddUser';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { handleShow } from './store/Slicer/userSlicer';


function App() {

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <Button onClick={() => dispatch(handleShow())} >+</Button>
      <DisplayUsers />
      <AddUser />
    </div>
  )
}

export default App