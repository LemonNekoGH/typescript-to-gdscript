class_name SuperUnsupported
extends Node2D

# A virtual is a slot the engine calls, not code it provides, so
# `super` has nothing to reach and Godot rejects the call. Like
# every rejected construct this emits only its marker, and the
# emptied body falls back to `pass`.
func _ready() -> void:
	# ERROR: `super._ready()` has nothing to call — `_ready` is a virtual of `Node2D`, a slot the engine calls rather than code it provides, and no ancestor script defines it. Godot rejects the call. Drop it, or define `_ready` on a base class of your own.
	pass
