# Nothing proves what `SuperAddonBase` is (see `super-addon-base.gd.d.ts`),
# so `super()` is kept: dropping it would skip the base's `_init`
# without a word.
class_name SuperUnknownChild
extends SuperAddonBase

func _init():
	super()
