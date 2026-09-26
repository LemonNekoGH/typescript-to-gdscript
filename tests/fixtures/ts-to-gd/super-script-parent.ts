// A script base with a constructor of its own. Every `super` call that
// reaches it must survive into the .gd: GDScript runs no parent `_init`
// on its own, so a dropped call would silently skip this body.
export class SuperScriptParent extends RefCounted {
  hp: int = 0;

  constructor(hp: int) {
    this.hp = hp;
  }

  hook(x: int): int {
    return x;
  }
}
