import {createStore,combineReducers,applyMiddleware} from 'redux'
import reduxThunk from 'redux-thunk'
import user from './reducer/user'
import home from './reducer/home'


const reducer=combineReducers({
    user,
    home
})

export default createStore(reducer,applyMiddleware(reduxThunk))
