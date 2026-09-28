extends ImplicitBase
class_name ImplicitBaseChild

# The base class names no `extends` either; the chain still ends at RefCounted.
func count() -> int:
	return get_reference_count()
