class_name SuperCalls
extends Node2D

# `super()` is optional here, but when written against a provable
# engine base it has nothing to call — `_init` is a virtual, a slot
# the engine calls rather than code it provides — and Godot rejects
# it. No parent `_init` runs either way, so it is dropped.
func _init():
	print("built")

# A regular engine method DOES have an implementation behind it, so
# `super` reaches it.
func engine_method() -> Node:
	return super.get_child(0)
