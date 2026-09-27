extends \
	Node
class_name LineContinuations

# A `\` continuation, or a comment inside brackets, may sit between any two
# tokens. The value after it is what matters.


func after_keywords(a: int, b: int, ok: bool) -> int:
	var negated = not \
		ok
	var minus = - \
		a
	var grouped = (\
		a + b)
	print(negated, minus, grouped)
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
	var listed = [\
		1, 2]
	print(\
		count, node_name, first, child, listed)


func with_comments(a: int, items: Array) -> int:
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
		var n when \
				n is int:
			return 'int'
	return 'other'
