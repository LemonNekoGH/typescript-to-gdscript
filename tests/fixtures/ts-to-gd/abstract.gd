@abstract
extends Node
class_name AbstractBase

@abstract
class InnerAbstract:
	@abstract
	func do_something() -> void

@abstract
func process_item(item: String) -> String

func concrete_method():
	return 42
