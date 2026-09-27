extends Control
class_name InheritedConstants

# GDScript reads an engine class's constants and enum values bare in any
# subclass. TypeScript reaches them through `this`, as statics.

signal hit


func _ready() -> void:
	# A constant from Node, an enum value from Object, one from Control.
	print(NOTIFICATION_READY)
	hit.connect(_on_hit, CONNECT_ONE_SHOT)
	set_anchors_preset(PRESET_FULL_RECT)
	# A global enum value is not inherited — it names its enum instead.
	print(HORIZONTAL_ALIGNMENT_LEFT)
	# A local shadows the inherited name.
	var CONNECT_DEFERRED = 3
	print(CONNECT_DEFERRED)


func _on_hit() -> void:
	pass


static func flags() -> int:
	return NOTIFICATION_READY + CONNECT_ONE_SHOT
