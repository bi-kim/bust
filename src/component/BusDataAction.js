import AppDispatcher from '.././AppDispatcher';
import Constants from '.././Constants';

let BusDataAction = {
    sendSeaatData(o) {
        console.log(o);
        AppDispatcher.dispatch({
            type: Constants.GET_RESERVATION_LIST,
            data: o
        });
    }
}

export default BusDataAction;