# Imported script base: both the constructor call and the method call
# resolve to code the parent declares, so both are kept.
class_name SuperScriptChild
extends SuperScriptParent

func _init(hp: int):
	super(hp)

func hook(x: int) -> int:
	return super.hook(x) + 1
