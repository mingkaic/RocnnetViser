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