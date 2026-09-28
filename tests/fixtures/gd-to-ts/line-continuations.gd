extends \
	LineContinuationsBase
class_name LineContinuations

# A `\` continuation, or a comment inside brackets, may sit between any two
# tokens. The value after it is what matters.

class Inner extends \
		RefCounted:
	var count = 0

var items: Array = [1, 2]
# A type may run over lines inside its brackets, too.
var by_name: Dictionary[String, \
	Object] = {}


func after_keywords(a: int, b: int, ok: bool) -> int:
	var negated = not \
		ok
	var minus = - \
		a
	var grouped = (\
		a + b)
	var lifted_in = not \
		a not in self.items
	var lifted_eq = not \
		a == b
	print(negated, minus, grouped, lifted_in, lifted_eq)
	return \
		a + b


func in_chains(n: Node, items: Array) -> void:
	var count = n \
		.get_child_count()
	var node_name = n.\
		name
	var first = items[\
		0]
	var child = n.get_children()[\
		0]
	var member_item = self.items[\
		0]
	# Inherited through a base class in another file.
	var where = position
	var listed = [\
		1, 2]
	print(\
		count, node_name, first, child, listed, member_item, where)


func with_comments(a: int, items: Array[\
		int]) -> int:
	var grouped = (
		# leading comment
		a)
	return items[
		# leading comment
		grouped]


func in_lambdas_and_await() -> void:
	var twice = func(x: int) -> int: return \
		x * 2
	await \
		get_tree().process_frame
	print(twice)


func in_match(x: Variant) -> String:
	match x:
		[\
				1, var \
				rest]:
			return str(rest)
		3, \
				4:
			return 'three or four'
		var n when \
				n is int:
			return 'int'
	return 'other'


func in_simple_match(x: int) -> String:
	match x:
		1, \
				2:
			return 'one or two'
	return 'other'
