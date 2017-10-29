import {EventEmitter}   from 'fbemitter';
import AppDispatcher    from './AppDispatcher';
import Constants        from './Constants';

const CHANGE_EVENT = "change";
let __emitter = new EventEmitter();

let account = {
    sid         : 0,        //세션
    uuid        : 0,        //고유번호
    DEPT_NAME   : "전공",    //전공
    SCHL_NAME   : "스쿨",    //스쿨
    STAT_NAME   : "상태",    //재학생 (상태)
    USER_NAME   : "이름",    //이름
    USER_NUMB   : "학번",    //학번
    LOGIN_COND  : "false",  //로그인 상태
};

let AccountStore = {
    getState() {
        return account;
    },
    addListener: (callback) => {
        return __emitter.addListener(CHANGE_EVENT, callback);
    }
};

AccountStore.dispatchToken = AppDispatcher.register((action) => {
    switch(action.type) {
        case Constants.UUID_SID_LOAD :
            account.sid     = action.sid;
            account.uuid    = action.uuid;
            __emitter.emit(CHANGE_EVENT);
            break;
        case Constants.LOGIN_SUCCESS :
            account.DEPT_NAME   = action.DEPT_NAME;
            account.SCHL_NAME   = action.SCHL_NAME;
            account.STAT_NAME   = action.STAT_NAME;
            account.USER_NAME   = action.USER_NAME;
            account.USER_NUMB   = action.USER_NUMB;
            account.LOGIN_COND  = "true";
            __emitter.emit(CHANGE_EVENT);
            break;
        default:
            break;
    }
});

export default AccountStore;