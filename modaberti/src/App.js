import React, { useEffect } from 'react';

import { Router } from './Router';
import { useDispatch } from 'react-redux';
import { checkLoginStatus } from './redux/AuthReducer';


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [])
  return (
    <Router />
  );
}

export default App;
