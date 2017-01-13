// this file is required by the index.html file and will be executed in the renderer process for that window.
import { OpNetwork } from './service/opNetwork.service';
import { OP_TYPE } from '../../addon/optypes';

// populate
let container: HTMLElement = document.getElementById('network');

let options: any = {
	'leaf': { shape: 'square', color: '#FF0000' },
	'add': { shape: 'circle', color: '#FF9900' },
	'sub': { shape: 'circle', color: '#2B7CE9' },
	'mul': { shape: 'circle', color: '#5A1E5C' },
	'div': { shape: 'circle', color: '#C5000B' },
	'neg': { shape: 'circle', color: '#109618' },
	'abs': { shape: 'circle', color: '#666666' },
	'sin': { shape: 'circle', color: '#0AFF00' },
	'cos': { shape: 'circle', color: '#C0C0FF' },
	'tan': { shape: 'circle', color: '#0000FF' },
	'csc': { shape: 'circle', color: '#FFFF00' },
	'sec': { shape: 'circle', color: '#0A0A0A' },
	'cot': { shape: 'circle', color: '#AAAAAA' },
	'exp': { shape: 'circle', color: '#C07777' },
};

let network: OpNetwork = new OpNetwork(container, options);

let a: string = network.add_leaf('Abraham');
let b: string = network.add_leaf('Brandon');
/*let c: string = */network.add_op(OP_TYPE.ADD, a, b);
