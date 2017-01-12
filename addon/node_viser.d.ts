export function addLeaf (label: string, isPlaceholder: boolean): string;
export function addOp (op_type: OP_TYPE, cb: (id: string, narg: number)=>void): string;
export function link (id_from: string, id_to: string, idx: number): void;