# A base named by path. `preload(...)` always names a SCRIPT, so the
# call is kept — and the arguments are no reason to report it.
extends "res://super-script-parent.gd"

func _init():
	super(5)
