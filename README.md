Viser is a operational graph visualizer for the c++ rocnnet library (https://github.com/mingkaic/rocnnet)

Viser's core purpose is to interact directly with syntax graph in order to provide better 
evaluate the correctness and efficiency of rocnnet (or similar graph-based libraries)

Note: `graph` used in terms of viser and rocnnet refers to the mathematical definition. Not vis.js's definition.

Viser heavily relies on
- Electron
- Typescript
- Vis.js visualization library
- Node-gyp

How to start:
1. install dependencies and typescript declarations:
> npm install
2. compile typescripts and arrange file directory:
> gulp build
3. start electorn application:
> npm start

Cleaning: 
- npm run clean (deletes both installed typescript declarations dir, node_modules and destination directory dist)
- gulp clean (only deletes destination directory dist)