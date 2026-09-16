extends Node
class_name UnsupportedBody

# Two kinds of statement produce no GDScript, and a body has to
# handle both. A REJECTED one emits only an `# ERROR:` marker, and a
# comment does not fill an indented block — so the body still needs
# `pass` for the `--emit-on-error` output to parse.
func rejected_body(value: int):
	if value > 0:
		# ERROR: Unsupported statement: ThrowStatement
		pass

# A TYPE-ONLY one is erased outright, with no diagnostic: it has no
# runtime meaning, so there is nothing to convert and nothing to
# report. Same rule file scope and namespaces already apply.
func type_only_body(value: int):
	var x = value
	print(x)

# A rejected `break` marks the branch it was written in, not the
# line above the `match` — the marker goes where the emitter is, so
# reporting has to happen while the branch is being emitted.
func switch_break_marker(value: int):
	match value:
		1:
			print("one")
			# ERROR: `break` has no GDScript equivalent inside a `match` branch. Branches never fall through, so a case ends on its own — remove the `break`, and restructure the case if it needs to exit early.
		2:
			# ERROR: `break` has no GDScript equivalent inside a `match` branch. Branches never fall through, so a case ends on its own — remove the `break`, and restructure the case if it needs to exit early.
			pass

# Erased down to nothing, so the block still needs `pass`.
func type_only_alone(value: int):
	if value > 0:
		pass
