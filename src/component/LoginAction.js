import AppDispatcher from '.././AppDispatcher';
import Constants from '.././Constants';

let LoginAction = {
    loginAccess(o) {
        AppDispatcher.dispatch({
            type: Constants.UUID_SID_LOAD,
            sid : o.sid,    // 세션.
            uuid: o.uuid    // 고유번호.
        });
    },
    loginSuccess(o) {
        console.log(o);
        AppDispatcher.dispatch({
            type        : Constants.LOGIN_SUCCESS,
            DEPT_NAME   : o.DEPT_NAME,
            SCHL_NAME   : o.SCHL_NAME,
            STAT_NAME   : o.STAT_NAME,
            USER_NAME   : o.USER_NAME,
            USER_NUMB   : o.USER_NUMB
        });
    }

}

export default LoginAction;