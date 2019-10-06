import {createStore,combineReducers,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import user from './reducer/user'


const reducer=combineReducers({
    user,
})

export default createStore(reducer,applyMiddleware(reduxThunk))
