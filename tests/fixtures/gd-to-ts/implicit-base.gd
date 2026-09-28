class_name ImplicitBase

# No `extends`: Godot's base is RefCounted, and its members are inherited
# like any others — they read bare here and need `this.` in TypeScript.

signal hit

class Counter:
	func count() -> int:
		return get_reference_count()


func connect_once() -> void:
	hit.connect(connect_once, CONNECT_ONE_SHOT)
	print(get_reference_count(), NOTIFICATION_PREDELETE)
