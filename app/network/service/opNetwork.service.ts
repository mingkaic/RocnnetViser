import {
	IData, IOptions,
	INodeOptions, IEdgeOptions,
	INode, IEdge, DataSet, Network
} from 'vis';

export class OpNetwork {
	private nodes: DataSet<INode>;
	private edges: DataSet<IEdge>;
	private network: Network;

	constructor(container: HTMLElement, groupOption: any) {
		this.nodes = new DataSet<INode>();
		this.edges = new DataSet<IEdge>();

		this.network = new Network(
			container,
			{
				nodes: this.nodes,
				edges: this.edges
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

	// temporary
	private idx: number = 0;
	public add_leaf(tag: string): string {
		let id: string = 'terrible' + this.idx++;
		this.nodes.add({
			id: id,
			label: tag,
			group: 'leaf',
		} as INode);
		return id;
	}

	public add_op(opname: string, tag?: string): string {
		tag = tag || opname;
		let id: string = 'terrible' + this.idx++;
		this.nodes.add({
			id: id,
			label: tag,
			group: opname,
		} as INode);
		return id;
	}

	public connect(idA: string, idB: string) {
		this.edges.add({
			from: idA,
			to: idB,
			physics: false, // no bouncing
		} as IEdge);
	}
}
