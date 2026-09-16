export class MyClass extends Node {
  // This is a single line comment
  speed: float = 10.0;

  /** This is a documentation comment */
  health: int = 100;

  // Method with comments
  update_speed(new_speed: float) {
    // Update the speed value
    this.speed = new_speed;
  }

  /** Calculate the total damage */
  calculate_damage(base: float, multiplier: float): float {
    return base * multiplier;
  }

  /**
   * Doc comment over several lines.
   *
   * Each source line gets its own `##`; a blank one stays blank.
   */
  documented(value: int) {
    /**
     * And the same inside a body.
     * Second line.
     */
    print(value);
  }

  test_block_comments() {
    /* Block comment */
    let x: int = 1;
    /*
    Multiline block
    comment inside function
    */
  }

  /*
  Block comment
  in class body
  */
  /* Block comment in class body */
}
