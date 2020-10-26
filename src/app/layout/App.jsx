import React from 'react';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ModalManager from '../common/modals/ModalManager';
import { ToastContainer } from 'react-toastify';
import {Container} from 'semantic-ui-react';
import './styles.css';
import Dashboard from '../../features/dashboard/Dashboard';
import NavBar from '../../features/nav/NavBar';
import Paysheet from '../../features/paysheet/Paysheet';
import { useSelector } from 'react-redux';
import LoadingComponent from './LoadingComponent';

function App() {
  const {initialized} = useSelector((state)=> state.async);

  //if(!initialized) return <LoadingComponent content='Cargando app ...' />

  return (
    <>
      <ModalManager />
      <ToastContainer position='bottom-right' />
      <Route exact path='/' component={HomePage} />
      <Route path={'/(.+)'} render={() => (
        <>
          <NavBar />
          <Container className='main'>
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/paysheet/:id' component={Paysheet} />
          </Container>
        </>
      )} />
    </>
  );
}

export default App;
