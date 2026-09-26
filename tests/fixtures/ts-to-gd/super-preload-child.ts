// A base named by path. `preload(...)` always names a SCRIPT, so the
// call is kept — and the arguments are no reason to report it.
export class _SuperPreloadChild extends preload('res://super-script-parent.gd') {
  constructor() {
    super(5);
  }
}
