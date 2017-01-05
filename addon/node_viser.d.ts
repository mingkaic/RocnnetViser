export function addLeaf (label: string, isPlaceholder?: boolean): string;
export function addOp (op_type: OP_TYPE): string;
export function link (id_from: string, id_to: string, idx: number): void;
export enum OP_TYPE {
    // unaries
    ABS,
    NEG,
    SIN,
    COS,
    TAN,
    CSC,
    SEC,
    COT,
    EXP,
    // scalar operations
//	SQRT, POW, CLIP_VAL, CLIP_NORM, EXTEND, COMPRESS
    // binaries
    ADD,
    SUB,
    MUL,
    DIV,
    // transformations
    MATMUL,
    TRANS,
    FIT
}