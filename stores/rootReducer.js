import {combineReducers} from 'redux';
import tabReducer from './tab/TabReducer';
import marketReducer from './market/marketReducer';
export default combineReducers({
    tabReducer,
    marketReducer
})