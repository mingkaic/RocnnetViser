//#include "include/vis_graph.hpp"
#include <node.h>
#include <nbind/nbind.h>

#include <functional>

namespace demo
{

#ifdef NBIND_CLASS

void hello(nbind::Buffer buf) {
    size_t length = buf.length();
    unsigned char* data = buf.data();

    if(!data || !length) return;

    std::string message = "hello world";
    size_t cpylen = message.length() > length ? length : message.length();
    
    memcpy(data, message.data(), cpylen * sizeof(unsigned char));

    buf.commit();
}

NBIND_GLOBAL() {
    function(hello);
}

#endif

} // namespace demo
