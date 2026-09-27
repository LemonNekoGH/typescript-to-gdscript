extends Node
class_name GodotObjectTypes

# TypeScript already owns `Object`, so the typings call Godot's base class
# `GodotObject`. TS's own `Object` type is the plain-object interface, so
# every type position has to say `GodotObject`.

class Inner extends Object:
	pass

signal got(o: Object)

var held: Object = null
var many: Array[Object] = []
var by_name: Dictionary[String, Object] = {}


func take(o: Object) -> Object:
	var local: Object = o
	var pick = func(x: Object) -> Object: return x
	print(pick)
	return local


func as_values(x: Node) -> void:
	# As a value, `Object` is the engine class in TypeScript too.
	var made = Object.new()
	var is_obj = x is Object
	var cast = x as Object
	var flag = Object.CONNECT_DEFERRED
	print(made, is_obj, cast, flag)
