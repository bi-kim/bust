import React, { Component } from 'react';
import axios from 'axios';
import { Config } from '../../conf';
import { Security } from '../../utils';
import LoginStore from '../../LoginStore';

import SeatTable from '../seat/SeatTable';

import '../../css/popupCancelReservation.css';

class PopupCancelReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            BURE_SEAT: "",
            BUSS_INDX: "",
            BUSS_STTE: "",
            BUSS_TIME: "",
            USER_NUMB: "",
        };
        this.handleCancel = this.handleCancel.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }

    handleModalClose(e) {
        var target = e.target.closest(".PopupCancelReservation");
        if(target) {
            target.style.display = "none";
        }
    }

    handleCancel() {
        let get = LoginStore.getState();
        let security = new Security();
        let encryptData = security.encryptByUUID(this.state, get.uuid, get.sid);

        axios.post(Config.host + '/cancelStntBusReservation', {
            datas: encryptData,
            cookies: get.sid,
        }).then(function (response) {
            let data = JSON.parse(response.data);
            if(data.success) {
                var d               = JSON.parse(JSON.parse(security.decryptByUUID(data.data, get.uuid)));
                console.log(d);
            }else {

            }
            console.group("Login.handleSubmit");
            console.log("RequestURL: " + Config.host + '/cancelStntBusReservation');
            console.groupEnd("PopupCancelReservation.handleCancel");
        })
    }
    render() {
        return (
            <div className="PopupCancelReservation">
                <div className="modal modalShow" id="myModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                    <div className="modal-header">
                        {/* Modal Name Props Settigns. */}
                        <h5 className="modal-title" id="exampleModalLabel"></h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.handleModalClose}>
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">

                        <SeatTable/>

                        {/* direct input for component */}
                        <label htmlFor="cancel-reservation-bure-seat">좌석번호</label>
                        <input className="form-control" id="cancel-reservation-bure-seat" type="text" placeholder="BURE_SEAT"/>
                        <label htmlFor="cancel-reservation-buss-index">버스인덱스</label>
                        <input className="form-control" id="cancel-reservation-buss-index" type="text" placeholder="BUSS_INDX"/>
                        <label htmlFor="cancel-reservation-buss-stte">지역이름</label>
                        <input className="form-control" id="cancel-reservation-buss-stte" type="text" placeholder="BUSS_STTE"/>
                        <label htmlFor="cancel-reservation-buss-index" id="cancel-reservation-buss-time">버스인덱스</label>
                        <input className="form-control" id="cancel-reservation-buss-time" type="text" placeholder="BUSS_TIME"/>
                        <label htmlFor="cancel-reservation-buss-user-numb">버스인덱스</label>
                        <input className="form-control" id="cancel-reservation-user-numb" type="text" placeholder="USER_NUMB"/>
                        {/* submit data for component */}
                        <button type="button" className="btn btn-primary" onClick={this.handleCancel}>취소하기</button>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default PopupCancelReservation;