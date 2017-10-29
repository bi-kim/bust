import {EventEmitter}   from 'fbemitter';
import AppDispatcher    from './AppDispatcher';
import Constants        from './Constants';

const CHANGE_EVENT = "change";
let __emitter = new EventEmitter();

let seatData = {};

let BusDataStore = {
    getState() {
        return seatData.data;
    },
    addListener: (callback) => {
        return __emitter.addListener(CHANGE_EVENT, callback);
    }
};

BusDataStore.dispatchToken = AppDispatcher.register((action) => {
    switch(action.type) {
        case Constants.GET_RESERVATION_LIST:
            seatData = action; // action에 필요한 데이터 추출해서 저장하기.
            __emitter.emit(CHANGE_EVENT);
            break;
        default :
            break;
    }
});

export default BusDataStore;