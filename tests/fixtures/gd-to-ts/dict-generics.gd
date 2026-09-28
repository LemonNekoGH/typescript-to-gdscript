extends Node
class_name DictGenerics

signal data_ready(payload: Dictionary[String, int])

var untyped: Dictionary = {}
var simple: Dictionary[String, int] = {}
var name_keys: Dictionary[StringName, Node2D] = {}

func process(data: Dictionary[String, int]) -> Dictionary[int, String]:
	var local: Dictionary[StringName, Node2D] = {}
	return {}

# A class key: the pipeline's post-pass turns each empty `{}` into
# `gd.dict([])`, which TypeScript accepts as a typed dictionary.
var by_node: Dictionary[Node, int] = {}

func fresh() -> Dictionary[Node, float]:
	var nodes: Dictionary[Node, float] = {self: 1.0}
	nodes = {}
	return {}
