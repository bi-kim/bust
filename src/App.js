import React, { Component } from 'react';
//import logo from './logo.svg';

import Login from './component/Login';
import Navbar from './component/nav/Navbar';
import Table from './component/Table';
import Seat from './component/seat/Seat';
import PopupCancelReservation from './component/popupCancelReservation/PopupCancelReservation';

import LoginStore from './LoginStore';
// import LoginAction from './LoginAction';

class App extends Component {

  constructor(props)
  {
      super(props);

      this.state = {
        sid       :  LoginStore.getState().sid,
        uuid      :  LoginStore.getState().uuid,
        DEPT_NAME :  LoginStore.getState().DEPT_NAME,
        SCHL_NAME :  LoginStore.getState().SCHL_NAME,
        STAT_NAME :  LoginStore.getState().STAT_NAME,
        USER_NAME :  LoginStore.getState().USER_NAME,
        USER_NUMB :  LoginStore.getState().USER_NUMB,
        LOGIN_COND:  LoginStore.getState().LOGIN_COND,
      }
  }

  componentDidMount() {
    this.storeSubscription = LoginStore.addListener( (data) => {
      console.group("ComponentDidMount");
      console.log(data);
      console.groupEnd("ComponentDidMount");
      this.handleStoreChange(data);
    })
  }

  componentWillUnmount() {
    this.storeSubscription.remove();
  }

  handleStoreChange() {
      this.setState({
        sid       :  LoginStore.getState().sid,
        uuid      :  LoginStore.getState().uuid,
        DEPT_NAME :  LoginStore.getState().DEPT_NAME,
        SCHL_NAME :  LoginStore.getState().SCHL_NAME,
        STAT_NAME :  LoginStore.getState().STAT_NAME,
        USER_NAME :  LoginStore.getState().USER_NAME,
        USER_NUMB :  LoginStore.getState().USER_NUMB,
        LOGIN_COND:  LoginStore.getState().LOGIN_COND,
      });
  }

  render() {
    return (
      <div className="App">

        <Navbar name="Busniff"
                sid ={this.state.sid}
                uuid={this.state.uuid}
                DEPT_NAME={this.state.DEPT_NAME}
                SCHL_NAME={this.state.SCHL_NAME}
                STAT_NAME={this.state.STAT_NAME}
                USER_NAME={this.state.USER_NAME}
                USER_NUMB={this.state.USER_NUMB}/>

        <div className="container" style={{overflowX: "scroll"}}>
          <Login                              LOGIN_COND={this.state.LOGIN_COND}  />
          <Table STYLENAME={"BusReservation"} LOGIN_COND={this.state.LOGIN_COND} URL={"/getStntBusReservation"} />
          <Table STYLENAME={"BusList"}        LOGIN_COND={this.state.LOGIN_COND} URL={"/getStntBusList"} />
          <Table STYLENAME={"BusDetailList"}  LOGIN_COND={this.state.LOGIN_COND} URL={"/getStntBusDetailList"}  />
          <Seat />
          <PopupCancelReservation />
        </div>

      </div>
    );
  }
}

export default App;
