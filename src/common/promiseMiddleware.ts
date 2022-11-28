import { isFSA } from '../common/utils/commonUtil';
import { showLoading, hideLoading } from '../store/actions/commonActions';

const isPromise = (val) => val && typeof val.then === 'function';

export default ({ dispatch }) => (next) => async (action) => {
  if (!isFSA(action)) {
    if (isPromise(action)) {
      return dispatch(await action);
    }

    return next(action);
  }

  if (!isPromise(action.payload)) {
    return next(action);
  }

  dispatch(showLoading(action.type));

  if (!action.payload) {
    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response: any = await action.payload;

    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload : response,
      error   : false
    });
  } catch (response) {
    dispatch(hideLoading(action.type));

    return dispatch({
      ...action,
      payload : response.error,
      error   : true,
      warning : false
    });
  }
};
