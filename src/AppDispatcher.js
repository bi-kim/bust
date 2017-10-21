import { Dispatcher } from 'flux';

/**
 * Dispatcher Logging.
 */
class AppDispatcher extends Dispatcher {
    dispatch(action = {}) {
        console.log("Dispatcher", action);
        super.dispatch(action);
    }
}

export default new AppDispatcher();