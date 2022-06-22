import rootReducer from './reducers';
import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import history from 'utils/history';

const sagaMiddleWare = createSagaMiddleware({
  context: {history},
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(rootSaga);

export default store;