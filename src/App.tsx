import './App.css';
import './App.scss';
import { RouterProvider, useNavigate } from "react-router-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import router from './app-render';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/store';
import { useAppSelector } from '@hooks/hooks';

const App: React.FC = () => {
  // const navigate = useNavigate();
  // const session = useAppSelector((store)=> store.core.session);

  // useEffect(() => {
  //         if(!session) navigate('/login');
  // }, [session?.token]);   

  return (
    <div className="App">
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </div>
  );
};

export default App;
