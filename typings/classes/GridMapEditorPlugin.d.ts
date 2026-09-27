// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** Editor for {@link GridMap} nodes. */
declare class GridMapEditorPlugin extends EditorPlugin {
  /** Deselects any currently selected cells. */
  clear_selection(): void;
  /** Returns the {@link GridMap} node currently edited by the grid map editor. */
  get_current_grid_map(): GridMap | null;
  /** Returns an array of {@link Vector3i}s with the selected cells' coordinates. */
  get_selected_cells(): Array<unknown>;
  /**
   * Returns the index of the selected {@link MeshLibrary} item in the grid map editor's palette or `-1` if no item is selected.
   * **Note:** The indices might not be in the same order as they appear in the editor's interface.
   */
  get_selected_palette_item(): int;
  /**
   * Returns the cell coordinate bounds of the current selection. Use {@link has_selection} to check if there is an active selection.
   */
  get_selection(): AABB;
  /** Returns `true` if there are selected cells. */
  has_selection(): boolean;
  /**
   * Selects the {@link MeshLibrary} item with the given index in the grid map editor's palette. If a negative index is given, no item will be selected. If a value greater than the last index is given, the last item will be selected.
   * **Note:** The indices might not be in the same order as they appear in the editor's interface.
   */
  set_selected_palette_item(item: int): void;
  /** Selects the cells inside the given bounds from `begin` to `end`. */
  set_selection(begin: Vector3i | Vector3, end: Vector3i | Vector3): void;
}
