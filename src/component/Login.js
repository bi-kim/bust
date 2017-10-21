import React, { Component } from 'react';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { Config } from '../conf';
import { Utils, Security } from '../utils';

import LoginAction from './LoginAction';
import LoginStore from '../LoginStore';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pw: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentWillMount() {
        axios.get(Config.host + "/data").then((response) => {
            console.group("Login.componentWillMount");
            console.log("RequestURL: " + Config.host + "/data");
            console.log("response:", response, "\n data:", response.data);
            console.groupEnd("Login.Component");
            LoginAction.loginAccess({
                    sid : response.data["sid"],
                    uuid: response.data["uuid"]
                }
            );
        });
    }

    /**
     * 데이터의 변경을 업데이트 합니다.
     * @param {*} event
     * @param {*} value
     */
    handleChange(event, value) {
        if(event.target.id === "id") {
            this.setState({ id : event.target.value });
        }else if(event.target.id === "pw") {
            this.setState({ pw : event.target.value });
        }
    }

    /**
     * 로그인 API 서버로 데이터를 전송하는 함수입니다.
     */
    handleSubmit() {
        var self = this;
        let get = LoginStore.getState();
        let security = new Security();
        let encryptData = security.encryptByUUID({
            id  : this.state.id,
            pw  : this.state.pw
        }, get.uuid, get.sid);

        axios.post(Config.host + '/login', {
            datas: encryptData,
            cookies: get.sid,
        }).then(function (response) {
            let data = JSON.parse(response.data);
            if(data.success) {
                var d               = JSON.parse(JSON.parse(security.decryptByUUID(data.data, get.uuid)));
                d.data.LOGIN_COND   = true;
                LoginAction.loginSuccess(d.data);
            }else {
                console.error("[ERROR!] Login.handleSubmit");
            }
            console.group("Login.handleSubmit");
            console.log("RequestURL: " + Config.host + '/login');
            console.groupEnd("Login.handleSubmit");
        })
    }

    render() {
        return (
            <div className="Login" style={{display: this.props.LOGIN_COND=="false" ? 'block' : 'none' }}>

                {/* School Number */}
                <div className="form-group">
                    <label htmlFor="id">School Number</label>
                    <input id="id" type="text" className="form-control" aria-describedby="emailHelp" placeholder="Enter School Number" value={this.state.id} 
                        onChange={this.handleChange}/>
                    <small id="emailHelp" className="form-text text-muted">Chungkang College of Cultural Industries School Number</small>
                </div>

                {/* Password */}
                <div className="form-group">
                    <label htmlFor="pw">Password</label>
                    <input type="password" className="form-control" id="pw" placeholder="Password" value={this.state.pw}
                        onChange={this.handleChange}/>
                </div>

                <div className="form-check">
                    <label className="form-check-label"><input type="checkbox" className="form-check-input" />Check me out</label>
                </div>

                <button type="button" className="btn btn-primary"
                        onClick={this.handleSubmit}>로그인</button>

            </div>
        );
    }
}
export default Login;