
import React, { Component } from 'react';
import $ from 'jquery';
import axios from 'axios';

import { Config } from '../conf';
import { Utils, Security } from '../utils';
import LoginStore from '../LoginStore';

import BusDataAction from './BusDataAction';

class Table extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            remainData: [],
            seatData: []
        }
        this.handleTRClick = this.handleTRClick.bind(this);
    }

    handleTRClick (e) {
        if(this.props.URL === "/getStntBusDetailList") {
            // Storage Access.
            let d = this.state.data[$(e.target.parentNode).attr("data-idx")];
            let get = LoginStore.getState();
            let security = new Security();
            let encryptData = security.encryptByUUID({
                BUSS_INDX: d.BUSS_INDX,
                BUSS_STTE: d.BUSS_STTE,
                BUSS_TIME: d.BUSS_TIME,
                USER_NUMB: LoginStore.getState().USER_NUMB,
                STNT_NUMB: LoginStore.getState().USER_NUMB  //getStntBusDetailList에 필요한 데이터
            }, get.uuid, get.sid);

            axios.post(Config.host + "/getBusSeatList", {
                datas: encryptData,
                sid: LoginStore.getState().sid
            }).then((response) => {
                let d = JSON.parse(JSON.parse(security.decryptByUUID(JSON.parse(response.data).data, get.uuid)));
                this.setState({ seatData: d });
                BusDataAction.sendSeaatData(this.state.seatData);
            });

            // let confirmBool = confirm("이 버스로 에약을 진행할까요?");
            // if (confirmBool == true) {
            //     let get = LoginStore.getState();
            //     let security = new Security();
            //     let encryptData = security.encryptByUUID({
            //         BUSS_INDX: d.BUSS_INDX,
            //         BUSS_STTE: d.BUSS_STTE,
            //         BUSS_TIME: d.BUSS_TIME, 
            //         USER_NUMB: LoginStore.getState().USER_NUMB,
            //         STNT_NUMB: LoginStore.getState().USER_NUMB  //getStntBusDetailList에 필요한 데이터
            //     }, get.uuid, get.sid);
    
            //     axios.post(Config.host + "/getBusSeatList", {
            //         datas: encryptData,
            //         sid: LoginStore.getState().sid
            //     }).then((response) => {
            //         let d = JSON.parse(JSON.parse(security.decryptByUUID(JSON.parse(response.data).data, get.uuid)));
            //         this.setState({ seatData: d });
            //     });

            //     alert("예약을 진행합니다.");
            // } else {
            //     alert("예약하지 않았습니다.");
            // }
        }
    }

    componentWillReceiveProps(props) {
        console.group("Table.componentWillReceiveProps");
        console.log("ReceiveProps: ", props);
        console.groupEnd("Table.componentWillReceiveProps");

        if (props.LOGIN_COND !== "false") {
            let get = LoginStore.getState();
            let security = new Security();
            let encryptData = security.encryptByUUID({
                USER_NUMB: LoginStore.getState().USER_NUMB,
                STNT_NUMB: LoginStore.getState().USER_NUMB  //getStntBusDetailList에 필요한 데이터
            }, get.uuid, get.sid);

            axios.post(Config.host + props.URL, {
                datas: encryptData,
                sid: LoginStore.getState().sid
            }).then((response) => {
                console.log(response);
                let d = JSON.parse(JSON.parse(security.decryptByUUID(JSON.parse(response.data).data, get.uuid)));
                console.log(d.data);
                console.group("Table.componentWillMount");
                console.log("RequestURL: " + Config.host + props.URL);
                console.log("response:", response, "\n data:", response.data);
                console.groupEnd("Table.Component");
                console.log(d.data);
                this.setState({ data: d.data });

                if(this.props.URL === "/getStntBusDetailList") {
                    let data = this.state.data;
                    let promises = [];

                    for(let i = 0; i < data.length; i++) {
                        let get = LoginStore.getState();
                        let security = new Security();
                        data[i].BUSS_INDX = 1;
                        let encryptData = security.encryptByUUID(data[i], get.uuid, get.sid);
                        promises.push(axios.post(Config.host + "/getBusRemainSeatList", {
                            datas: encryptData,
                            sid: LoginStore.getState().sid
                        }));
                    }
                    axios.all(promises)
                        .then(((response) => {
                            for(let i=0; i<response.length; i++) {
                                let d = JSON.parse(JSON.parse(security.decryptByUUID(JSON.parse(response[i].data).data, get.uuid)));
                                let val = this.state.remainData.slice()
                                val.push(this.state.data[i].BURE_SENB - (d.cnt + 4));
                                this.setState({ remainData: val });
                                //<td><b>"+ this.state.remainData[i] +"<b/></td>
                                $("<td><b>"+ this.state.remainData[i] +"<b/></td>").insertBefore($(".BusDetailList tr").eq(i+1).find("td").eq(0));
                            }

                            var $el = $(".BusDetailList tr").children().eq(0)
                            $("<th>SEAT</th>").insertBefore($el);
                    }))
                }
            });
        }
    }

    render() {

        const toTD = (str) => {
            return "<td>" + str + "</td>";
        }

        const mapToComponent = (data) => {
            if (this.props.LOGIN_COND !== "false" && data.length > 0) {
                var th = Object.getOwnPropertyNames(data[0]);
                var td;
                th = th.reduce((accumulator, currentValue, index) => {
                    if (index === 1) {
                        accumulator = "<th>" + accumulator + "</th>"; // 최초 실행 시 한번.
                    }
                    return accumulator + "<th>" + currentValue + "</th>"
                });

                if(data.length !== 1) {
                    td = data.reduce((accumulator, currentValue, index) => {
                        let temp = "";
                        if (index === 1) {
                            temp += '<tr data-idx="'+ 0 +'">';
                            for (var key in accumulator) {
                                temp += toTD(accumulator[key]);
                            }
                            temp += "</tr>";
                            temp += '<tr data-idx="'+ 1 +'">';
                            for (var key in currentValue) {
                                temp += toTD(currentValue[key]);
                            }
                            temp += "</tr>";
                            return temp;
                        } else {
                            temp += '<tr data-idx="'+ index +'">';
                            for (var key in currentValue) {
                                temp += toTD(currentValue[key]);
                            }
                            temp += "</tr>";
                            return accumulator + temp;
                        }
                    });
                } else {
                    let temp = "";
                    temp += '<tr data-idx="'+ 0 +'">';
                    for (var key in data[0]) {
                        temp += toTD(data[0][key]);
                    }
                    temp += "</tr>";
                    td = temp;
                }
                return (
                    <table className="table">
                        <thead><tr dangerouslySetInnerHTML={{ __html: th }}></tr></thead>
                        <tbody dangerouslySetInnerHTML={{ __html: td }}></tbody>
                    </table>
                )
            }
            return "데이터가 없습니다.";
        }
        return (
            <div className={`table-reservation ${ this.props.STYLENAME }`} onClick={this.handleTRClick} style={{ display: this.props.LOGIN_COND == "false" ? 'none' : 'block' }}>
                {mapToComponent(this.state.data)}</div>
        );
    }
}

export default Table;