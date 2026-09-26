extends Node
class_name ConstClass

const MAX_HP = 100

func get_health():
    return MAX_HP

# A `const` inside a function body is a local binding, not a class
# member — the class-scope emitter never sees this one.
func local_consts(scale: float) -> float:
    const LIMIT := 10
    const NAME: String = "x"
    print(NAME)
    return LIMIT * scale
