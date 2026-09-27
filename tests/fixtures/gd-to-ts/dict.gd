extends Node
class_name MyClass

func test_dict():
	var key1 = "key"
	var key2 = Vector2.DOWN
	var key3 = Node2D.new()

	var dict = {
		key1: "value",
		key2: "value",
		key3: "value",
		"key": "value",
	}

	var dict2 = {
		key1: "value",
		"key2": "value",
	}

	var s1 = "key1"
	var s2 = "key2"

	var dict3 = {
		s1 + "_" + s2 + str(1): "value",
		s1[0]: "value",
		s2.left(2): "value",
		s2.left(2) + s1.left(1): "value",
	}

	# A Lua-style key is a name, not a variable: `key1` here is the
	# StringName &"key1", whatever the variable key1 holds.
	var lua = {key1 = "value", hp = 3}
	print(dict, dict2, dict3, lua)
