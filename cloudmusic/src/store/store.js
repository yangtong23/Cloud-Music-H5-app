import {  createStore }  from 'redux'

import Reducers from './reducers'
//  createStore传入一个函数  生成store
export  default   createStore(Reducers)