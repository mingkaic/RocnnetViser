Viser API bridges C++ and Node components

In general, the interface supports 2 modes:
- diagnostic (read-only, from some serialized graph)
    - graph hierarchy sorted
    - each node's raw data is accessible (presentation tbd)
- interactive (read-write, with the option to serialize graph to be used on C++ side)

All serialization and deserialization should be done on C++ side 
(although, it could be done by Node since we're using protocolbuffer)
