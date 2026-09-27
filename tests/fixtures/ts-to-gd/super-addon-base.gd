# A script with no TypeScript source — an addon, say. Its `_init` is
# real, but the typings don't say so (`super-addon-base.gd.d.ts`).
class_name SuperAddonBase
extends Node

var initialized = false

func _init():
	initialized = true
