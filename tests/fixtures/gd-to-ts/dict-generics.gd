extends Node
class_name DictGenerics

signal data_ready(payload: Dictionary[String, int])

var untyped: Dictionary = {}
var simple: Dictionary[String, int] = {}
var name_keys: Dictionary[StringName, Node2D] = {}

func process(data: Dictionary[String, int]) -> Dictionary[int, String]:
	var local: Dictionary[StringName, Node2D] = {}
	return {}
