import {createStore} from 'redux';
import {reducer} from './reducer';

export function make_store() {
  return createStore(reducer);
}   