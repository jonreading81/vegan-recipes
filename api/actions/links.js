
import Model  from '../models/link';
import {createActions} from './crud';

const  parseData =  (data) => {
   data.type = JSON.parse(data.type);
}

const defaultActions = createActions(Model, parseData);
module.exports = createActions(Model, parseData);