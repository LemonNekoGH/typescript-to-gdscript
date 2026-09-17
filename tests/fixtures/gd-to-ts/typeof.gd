extends Node
class_name TypeofRoundTrip

func describe(value: Variant) -> String:
	var kind: Variant.Type = typeof(value)
	if kind == TYPE_INT:
		return "int"
	return type_string(typeof(value))

func compare(op: Variant.Operator) -> bool:
	return op == OP_EQUAL

func pressed(key: Key) -> bool:
	return key == KEY_A
