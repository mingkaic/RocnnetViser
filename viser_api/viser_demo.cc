#include "diagnostic/vis_addon.hpp"

namespace demo
{

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

} // namespace demo
