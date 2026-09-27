// The typings rename GDScript's `Object` to `GodotObject`, because
// TypeScript already owns `Object`. GDScript knows only `Object`, so
// every place a class name goes out has to spell it that way.
export namespace GodotObjectNames {
  // An inner class goes out through a different path than the script's own.
  export class Inner extends GodotObject {}
}

export class GodotObjectNames extends GodotObject {
  held: GodotObject | null = null;

  // TypeScript's own `Object` type is the plain-object interface — no
  // GDScript type at all, so the annotation is dropped.
  plain: Object | null = null;

  hit = gd.signal();

  take(o: GodotObject): GodotObject {
    return o;
  }

  make(): GodotObject {
    return new GodotObject();
  }

  check(x: Node): boolean {
    return x instanceof GodotObject;
  }

  cast(x: Node): GodotObject | null {
    return gd.as(x, GodotObject);
  }

  flags(): void {
    this.hit.connect(() => {}, GodotObject.CONNECT_ONE_SHOT);
    // The VALUE `Object` is the engine class in TypeScript too.
    this.hit.connect(() => {}, Object.CONNECT_DEFERRED);
  }
}
