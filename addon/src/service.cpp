#include <node.h>
#include <string>
#include <experimental/optional>
#include "creator_vertex.hpp"

using v8::Local;
using v8::Object;

using v8::FunctionCallbackInfo;
using v8::Value;
using v8::Isolate;
using v8::String;
using v8::Boolean;
using v8::Exception;

// graph storage
static tensorio::vertex_manager ctx;

static bool validateArgc (const FunctionCallbackInfo<Value>& args, size_t nargs)
{
	Isolate* isolate = args.GetIsolate();
	// Check the number of arguments passed.
	if ((size_t) args.Length() < nargs)
	{
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong number of arguments")));
		return false;
	}
	return true;
}

static bool getArg (std::string& out, 
	const FunctionCallbackInfo<Value>& args, size_t idx)
{
	Isolate* isolate = args.GetIsolate();
	// Check if argument type is string
	if (!args[idx]->IsString())
	{
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong argument type. Expected string.")));
		return false;
	}
	String::Utf8Value str(args[idx]->ToString());
	out = (const char*)(*str);
	return true;
}

static bool getArg (size_t& out, 
	const FunctionCallbackInfo<Value>& args, size_t idx)
{
	Isolate* isolate = args.GetIsolate();
	// Check if argument type is string
	if (!args[idx]->IsNumber())
	{
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong argument type. Expected string.")));
		return false;
	}
	out = args[idx]->NumberValue();
	return true;
}

static bool getArg (bool& out, 
	const FunctionCallbackInfo<Value>& args, size_t idx)
{
	Isolate* isolate = args.GetIsolate();
	// Check if argument type is string
	if (!args[idx]->IsBoolean())
	{
		isolate->ThrowException(Exception::TypeError(
			String::NewFromUtf8(isolate, "Wrong argument type. Expected boolean.")));
		return false;
	}
	out = args[idx]->BooleanValue();
	return true;
}

// expect arguments { label: string, is_placeholder?: boolean }
// expect return { leaf_id: string } 
void leaf (const FunctionCallbackInfo<Value>& args)
{
	// make this option global or per leaf?
	static tensorio::var_opt rand_option;
	rand_option.type = tensorio::RAND;
	rand_option.parameter_->min2max_ = std::pair<double, double>(-1, 1);
	static tensorio::var_opt place_option;
	rand_option.type = tensorio::PLACE;

	if (!validateArgc(args, 2) && !validateArgc(args, 1)) return;

	Isolate* isolate = args.GetIsolate();
	std::string label;
	bool is_placeholder;
	if (!getArg(label, args, 0)) return;
	if (!getArg(is_placeholder, args, 1))
	{
		is_placeholder = true; // defaults to placeholder
	}

	// return value
	std::string id;
	if (is_placeholder)
	{
		id = ctx.register_leaf(label, place_option);
	}
	else
	{
		id = ctx.register_leaf(label, rand_option);
	}
	args.GetReturnValue().Set(String::NewFromUtf8(isolate, id.c_str()));
}

// expect arguments { op_type: number(enum associated to tensorio::CONNECTOR_TYPE) }
// expect return { operation_id: string } 
void operation (const FunctionCallbackInfo<Value>& args)
{
	Isolate* isolate = args.GetIsolate();
	tensorio::CONNECTOR_TYPE ct;
	size_t ci;
	if (!getArg(ci, args, 0)) return;
	ct = static_cast<tensorio::CONNECTOR_TYPE>(ci);
	std::string id = ctx.register_op(ct);
	args.GetReturnValue().Set(String::NewFromUtf8(isolate, id.c_str()));
}

// expect arguments { id_from: string, id_to: string, idx: number }
// return nothing
void connect (const FunctionCallbackInfo<Value>& args)
{
	if (!validateArgc(args, 3)) return;

	std::string id_from;
	std::string id_to;
	size_t idx;
	if (!getArg(id_from, args, 0)) return;
	if (!getArg(id_to, args, 1)) return;
	if (!getArg(idx, args, 2)) return;
	ctx.link(id_from, id_to, idx);
}

// retrieve existing graph (from reverse-mode to forward-mode)
// no arguments
// expect return { ids: vertices, connections: edges }
void getAll (const FunctionCallbackInfo<Value>& args)
{
	// Isolate* isolate = args.GetIsolate();

	tensorio::CONNECTION_SET connections;
	std::unordered_set<std::string> ids;
	ctx.get_forwards(ids, connections);
	// todo: return connections and ids
}

// (forward-mode to reverse-mode)
// no arguments
// expect return { ids: vertices, connections: edges }
void getReverse (const FunctionCallbackInfo<Value>& args)
{
	// Isolate* isolate = args.GetIsolate();

	tensorio::CONNECTION_SET connections;
	std::unordered_set<std::string> ids;
	ctx.get_backwards(ids, connections);
	// todo: return connections and ids
}

// exports
void init(Local<Object> exports) {
  // add methods here
  NODE_SET_METHOD(exports, "addLeaf", leaf);
  NODE_SET_METHOD(exports, "addOp", operation);
  NODE_SET_METHOD(exports, "link", connect);
//   NODE_SET_METHOD(exports, "forward", getAll);
//   NODE_SET_METHOD(exports, "reverse", getReverse);
}
NODE_MODULE(node_viser, init)