//#include "diagnostic/vis_addon.hpp"
#include <node.h>
#include <nbind/nbind.h>

namespace demo
{

#ifdef NODE_MODULE

using v8::Local;
using v8::Object;

void SampleDraw(const v8::FunctionCallbackInfo<v8::Value>& args) {
   v8::Isolate* isolate = args.GetIsolate();
   args.GetReturnValue().Set(v8::String::NewFromUtf8(isolate, "world"));
}

// REQUIRED ADDON PATTERN
void init(Local<Object> exports)
{
   // method mapping
   NODE_SET_METHOD(exports, "hello", SampleDraw);
}

NODE_MODULE(addon, init)

#endif

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
