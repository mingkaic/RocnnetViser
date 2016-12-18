Viser is a operational graph visualizer for the c++ rocnnet library (https://github.com/mingkaic/rocnnet)

Viser's core purpose is to interact directly with syntax graph in order to provide better 
evaluate the correctness and efficiency of rocnnet (or similar graph-based libraries)

Note: `graph` used in terms of viser and rocnnet refers to the mathematical definition. Not vis.js's definition.

Viser heavily relies on
- Electron
- Typescript
- Vis.js visualization library
- Node-gyp/nbind
- Angular

Todos
- Integrate React for mobile extension (for troubleshooting on the go)