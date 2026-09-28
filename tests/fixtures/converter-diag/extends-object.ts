// `Object` in TypeScript is TS's own name. The engine class is
// `GodotObject`, and that is the name an `extends` has to use — for the
// script class and for an inner class alike.
export namespace ExtendsObject {
  export class Inner extends Object {}
}

export class ExtendsObject extends Object {}
