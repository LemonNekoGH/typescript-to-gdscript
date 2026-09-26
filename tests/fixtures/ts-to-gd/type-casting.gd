extends Node
class_name MyClass

func test_casting():
	var node: Node = self
	var sprite = node as Sprite2D
	if sprite != null:
		print("It is a Sprite2D")
	var satisfies = "string"

# `as` binds looser than `.`, `()` and `[]`, so a cast standing as the
# receiver of one of them has to be parenthesised — `node as Sprite2D.texture`
# reads as `node as (Sprite2D.texture)` and Godot rejects it.
func test_cast_receiver(node: Node, packed: PackedInt32Array):
	var texture = (node as Sprite2D).texture
	var rid = (node as Sprite2D).get_rid()
	var first = (packed as PackedInt32Array)[0]

# Every other position leaves the cast bare.
func test_cast_bare(node: Node):
	print(node as Sprite2D)
	var same = node as Sprite2D == null
	var list = [node as Sprite2D]
