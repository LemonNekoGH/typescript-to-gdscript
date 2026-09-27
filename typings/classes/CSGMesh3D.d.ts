// AUTO-GENERATED from Godot class documentation.
// Manual overrides applied from typings-overrides/*.d.ts

/** A CSG Mesh shape that uses a mesh resource. */
declare class CSGMesh3D extends CSGPrimitive3D {
  /** The {@link Material} used in drawing the CSG shape. */
  material: Material | null;
  /**
   * The {@link Mesh} resource to use as a CSG shape.
   * **Note:** Some {@link Mesh} types such as {@link PlaneMesh}, {@link PointMesh}, {@link QuadMesh}, and {@link RibbonTrailMesh} are excluded from the type hint for this property, as these primitives are non-*manifold* and thus not compatible with the CSG algorithm.
   * **Note:** When using an {@link ArrayMesh}, all vertex attributes except {@link Mesh.ARRAY_VERTEX}, {@link Mesh.ARRAY_NORMAL} and {@link Mesh.ARRAY_TEX_UV} are left unused. Only {@link Mesh.ARRAY_VERTEX} and {@link Mesh.ARRAY_TEX_UV} will be passed to the GPU.
   * {@link Mesh.ARRAY_NORMAL} is only used to determine which faces require the use of flat shading. By default, CSGMesh will ignore the mesh's vertex normals, recalculate them for each vertex and use a smooth shader. If a flat shader is required for a face, ensure that all vertex normals of the face are approximately equal.
   */
  mesh: Mesh | null;
  set_material(value: Material | null): void;
  get_material(): Material | null;
  set_mesh(value: Mesh | null): void;
  get_mesh(): Mesh | null;
}
