export namespace LineContinuations {
  export class Inner extends RefCounted {
    count = 0;
  }
}

export class LineContinuations extends LineContinuationsBase {
  // A `\` continuation, or a comment inside brackets, may sit between any two
  // tokens. The value after it is what matters.
  items: Array<any> = [1, 2];
  // A type may run over lines inside its brackets, too.
  by_name: Dictionary<string, GodotObject> = {};

  after_keywords(a: int, b: int, ok: boolean): int {
    let negated = !ok;
    let minus = -a;
    let grouped = (a + b);
    let lifted_in = !!(a in this.items);
    let lifted_eq = !(a === b);
    print(negated, minus, grouped, lifted_in, lifted_eq);
    return a + b;
  }

  in_chains(n: Node | null, items: Array<any>): void {
    let count = n.get_child_count();
    let node_name = n.name;
    let first = items[0];
    let child = n.get_children()[0];
    let member_item = this.items[0];
    // Inherited through a base class in another file.
    let where = this.position;
    let listed = [1, 2];
    print(count, node_name, first, child, listed, member_item, where);
  }

  with_comments(a: int, items: Array<int>): int {
    let grouped = (a);
    return items[grouped];
  }

  async in_lambdas_and_await(): Promise<void> {
    let twice = (x: int): int => x * 2;
    await this.get_tree().process_frame;
    print(twice);
  }

  in_match(x: any): string {
    gd.match(x, [
      (rest) => ({
        match: [1, rest],
        do: () => {
          return str(rest);
        },
      }),
      {
        matchMany: [3, 4],
        do: () => {
          return 'three or four';
        },
      },
      (n) => ({
        match: n,
        when: gd.is(n, int),
        do: () => {
          return 'int';
        },
      }),
    ]);
    return 'other';
  }

  in_simple_match(x: int): string {
    switch (x) {
      case 1:
      case 2:
        return 'one or two';
    }
    return 'other';
  }
}
