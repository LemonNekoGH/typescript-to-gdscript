# The base is the generated global wrapper, used without an import. The
# wrapper declares no constructor itself; the script behind it does.
class_name SuperGlobalChild
extends SuperScriptParent

func _init():
	super(7)
