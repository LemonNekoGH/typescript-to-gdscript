export class LineContinuations extends Node {
  // A `\` continuation, or a comment inside brackets, may sit between any two
  // tokens. The value after it is what matters.

  after_keywords(a: int, b: int, ok: boolean): int {
    let negated = !ok;
    let minus = -a;
    let grouped = (a + b);
    print(negated, minus, grouped);
    return a + b;
  }

  in_chains(n: Node | null, items: Array<any>): void {
    let count = n.get_child_count();
    let node_name = n.name;
    let first = items[0];
    let child = n.get_children()[0];
    let listed = [1, 2];
    print(count, node_name, first, child, listed);
  }

  with_comments(a: int, items: Array<any>): int {
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
}
