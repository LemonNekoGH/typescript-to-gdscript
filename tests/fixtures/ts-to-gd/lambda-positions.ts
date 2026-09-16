export class MyClass extends Node {
  // Block lambda in a field initializer
  on_ready = () => {
    print("field");
  };

  registry: { [key: string]: any } = {};

  apply(progress: float): void {
    print(progress);
  }

  pair(a: () => void, b: () => void, n: int): void {
    a();
    b();
    print(n);
  }

  // Block lambda as a call argument, with more arguments after it
  tween_block(): void {
    const tween = this.create_tween();
    tween.tween_method((progress: float) => {
      this.apply(progress);
    }, 0.0, 1.0, 1.0);
  }

  // Arrow whose body is a void call
  tween_expr(): void {
    const tween = this.create_tween();
    tween.tween_method((progress: float) => this.apply(progress), 0.0, 1.0, 1.0);
  }

  // Two block lambdas in the same call
  siblings(): void {
    this.pair(() => {
      print("one");
    }, () => {
      print("two");
    }, 5);
  }

  containers(): Callable {
    const arr = [() => {
      print("array");
    }];
    const d = {
      a: 1,
      k: () => {
        print("dict");
      },
      b: 2,
    };
    this.on_ready = () => {
      print("assign");
    };
    print(arr, d);
    return () => {
      print("return");
    };
  }

  // A lambda used as an operand of a larger expression
  operand(flag: bool): Callable {
    return flag ? () => this.apply(0.0) : this.on_ready;
  }

  // `return` of a void call
  early(flag: bool): void {
    if (flag) {
      return this.apply(1.0);
    }
    this.apply(2.0);
  }

  // A block lambda inside another block lambda's body
  nested(): void {
    this.pair(() => {
      this.pair(() => {
        print("inner-a");
      }, () => {
        print("inner-b");
      }, 1);
      print("outer");
    }, () => {
      print("second");
    }, 2);
  }

  // A block lambda as a default parameter value
  with_default(cb: () => void = () => {
    print("default");
  }): void {
    cb();
  }

  // A block lambda as an operand needs the parentheses AND the body
  operand_block(flag: bool): Callable {
    return flag
      ? () => {
          print("yes");
        }
      : () => {
          print("no");
        };
  }

  make(): () => void {
    return () => {
      print("made");
    };
  }

  // Calling a Callable VALUE — GDScript needs `.call()` however the
  // value was produced
  call_values(flag: bool, cbs: (() => void)[]): void {
    (() => {
      print("iife");
    })();
    this.make()();
    cbs[0]();
    (flag ? cbs[0] : cbs[1])();
  }


  // No call signature to go on, but a non-name callee can only ever be
  // a value, so `.call()` is the sole reading
  untyped(x: any): void {
    (x as any)();
    this.registry["fn"]();
  }

  // A Callable reached through an ACCESSOR is still a value. The
  // declaration is what settles it: `Callable` is an interface with
  // no call signature, so the type alone says nothing here.
  get handler(): Callable {
    return this.on_ready;
  }

  set handler(value: Callable) {
    this.on_ready = value;
  }

  accessor_values(): void {
    this.handler();
    this.on_ready();
    this.apply(0.0);
  }
}
