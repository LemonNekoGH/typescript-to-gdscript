// A base named by path: `super(5)` goes out as written, and reaches the
// `_init` of the script at that path.
export class _SuperPreloadChild extends preload('res://super-script-parent.gd') {
  constructor() {
    super(5);
  }
}
