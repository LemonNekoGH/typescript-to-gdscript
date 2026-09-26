export class MyClass extends Node {
  test_arrays() {
    let numbers = [1, 2, 3, 4, 5];
    let first = numbers[0];
    let length = numbers.size();

    numbers.append(6);
    numbers.remove_at(0);

    for (let n of numbers) {
      print(n);
    }
  }

  test_dictionaries() {
    let dict: { name: string; health: int; alive: boolean; score?: int } = {
      name: "Player",
      health: 100,
      alive: true,
    };
    let player_name = dict["name"];

    dict["score"] = 9001;
  }
}
