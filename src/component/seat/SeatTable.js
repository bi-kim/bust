import React, { Component } from 'react';
import BusDataStore from './../../BusDataStore';

class SeatTable extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
        };
    }

    componentDidMount() {
        this.storeSubscription = BusDataStore.addListener( (data) => {
            this.handleStoreChange(data);
        })
    }

    componentWillReceiveProps(props) {
        console.group("SeatTable.componentWillReceiveProps");
        console.log("propsData: ", props);
        console.groupEnd("SeatTable.componentWillReceiveProps");
    }

    componentWillUnmount() {
        this.storeSubscription.remove();
    }

    handleStoreChange() {
        this.setState({ data : BusDataStore.getState() });
    }

    handleReservation() {
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

    render() {
        const btnPrimaryCreate = (number) => {
            return (
                '<div class="btn-seat">' +
                    '<button type="button" class="btn btn-primary">'+ number + '</button>' +
                '</div>'
            );
        }

        const btnDanger = (number) => {
            return (
                '<div class="btn-seat">' +
                    '<button type="button" class="btn btn-danger">'+ number + '</button>' +
                '</div>'
            );
        }

        const searchValue = (data, value) => {
            var len = data.length;
            while(--len) {
                if(data[len].BURE_SEAT == value) {
                    return true;
                }
            }
            return false;
        }

        const mapToComponent = (data) => {
            if(!data.hasOwnProperty("data")) return false;

            console.group("SeatTable.render");
            console.log("this.state.data: ", data);
            console.groupEnd("SeatTable.render");

            let d = data.data;
            let tempDOM = "";

            for(let i = 1; i <= 40; i+=2) {
                tempDOM += (
                    '<div class="c-row">'+
                        (searchValue(d, i)    ? btnDanger(i) : btnPrimaryCreate(i)) +
                        (searchValue(d, i+1)  ? btnDanger(i+1) : btnPrimaryCreate(i+1)) +
                    '</div>'
                )
            }
            return (
                <div className="container" dangerouslySetInnerHTML={{ __html: tempDOM }}></div>
            );
        }
        return (
            <div className="SeatTable">
                {mapToComponent(this.state.data)}
            </div>
        )
    }
}

export default SeatTable;