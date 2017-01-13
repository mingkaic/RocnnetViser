import {
	IData, IOptions,
	INodeOptions, IEdgeOptions,
	INode, IEdge, DataSet, Network
} from 'vis';
import { addLeaf, addOp, link } from '../../../addon/node_viser';
import { OP_TYPE } from '../../../addon/optypes';

export class OpNetwork {
	private nList: DataSet<INode>;
	private eList: DataSet<IEdge>;
	private nElem: Network;

	constructor(container: HTMLElement, groupOption: any) {
		this.nList = new DataSet<INode>();
		this.eList = new DataSet<IEdge>();

		this.nElem = new Network(
			container,
			{
				nodes: this.nList,
				edges: this.eList
			} as IData,
			{
				nodes: {
					scaling: { min: 16, max: 32 }
				} as INodeOptions,
				edges: {
					color: '#000',
					smooth: false,
					arrows: { to: true, from: false },
				} as IEdgeOptions,
				physics: {
					barnesHut: { gravitationalConstant: -30000 },
					stabilization: { iterations: 2500 }
				},
				groups: groupOption
			} as IOptions
		);
	}

	public add_leaf(varname: string): string {
		let id: string = addLeaf(varname, false);
		this.nList.add({
			id: id,
			label: varname,
			group: 'leaf',
		} as INode);
		return id;
	}

	// make operator on nodes of idA and possibly idB if operator is binary
	public add_op(op: OP_TYPE, idA: string, idB?: string): string {
		let opname = OP_TYPE[op];
		try {
			let idOp: string = addOp(op, (id, nargs) => {
				this.connect(idA, id, 0);
				if (nargs === 2) {
					if (idB) {
						this.connect(idB, id, 1);
					} else {
						throw new EvalError('expecting binary operation got single argument');
					}
				}
			});
			this.nList.add({
				id: idOp,
				label: opname,
				group: opname,
			} as INode);
			return idOp;
		} catch (err) {
			console.log(err);
			return '';
		}
	}

	private connect(idFrom: string, idTo: string, idx: number) {
		link(idFrom, idTo, idx);
		this.eList.add({
			from: idFrom,
			to: idTo,
			physics: false, // no bouncing
		} as IEdge);
	}
}
