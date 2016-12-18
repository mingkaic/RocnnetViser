import * as nbind from 'nbind'; // nbind stores all the c++ methods and classes
import * as Rocnnet from '../../viser_api/rocnnet-types';

const lib = nbind.init<typeof Rocnnet>().lib;

export function echo() {
    let data = new Uint8Array(16);
    lib.hello(data);
    console.log(data);
}