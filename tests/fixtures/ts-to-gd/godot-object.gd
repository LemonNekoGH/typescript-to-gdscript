class_name GodotObjectNames
extends Object

# An inner class goes out through a different path than the script's own.
class Inner extends Object:
	pass

var held: Object = null
# TypeScript's own `Object` type is the plain-object interface — no
# GDScript type at all, so the annotation is dropped.
var plain = null
signal hit

func take(o: Object) -> Object:
	return o

func make() -> Object:
	return Object.new()

func check(x: Node) -> bool:
	return x is Object

func cast(x: Node) -> Object:
	return x as Object

func flags() -> void:
	self.hit.connect(func():
		pass
		, Object.CONNECT_ONE_SHOT)
	# The VALUE `Object` is the engine class in TypeScript too.
	self.hit.connect(func():
		pass
		, Object.CONNECT_DEFERRED)
