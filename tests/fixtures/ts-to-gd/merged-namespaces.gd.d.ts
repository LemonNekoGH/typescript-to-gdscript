// The statics merge the generator emits for every script class
// (`types/<Name>.gd.d.ts`): static members — namespace constants
// included — become reachable on the instance, as GDScript makes them
// reachable from `self`. The fixture program does not load generated
// script typings, so the shape is mirrored here from
// `content-generators.ts`; without it `this.FIRST` is TS2551.
import type { Merged as ScriptClass } from './merged-namespaces';

type StaticProps = Omit<typeof ScriptClass, 'prototype' | keyof Function>;

declare module './merged-namespaces' {
  interface Merged extends StaticProps {}
}
