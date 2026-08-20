/**
 * Class member visitors for TS→GD conversion.
 * Handles signals, enums, properties, accessor pairs, gd.getset(),
 * inner classes, constructors, methods, and decorators.
 */
import ts from 'typescript';
import type { TransformerDelegate } from './transformer-types.ts';
export declare function isSignalProperty(node: ts.PropertyDeclaration, t: TransformerDelegate): boolean;
export declare function visitSignalDeclaration(node: ts.PropertyDeclaration, t: TransformerDelegate): void;
export declare function isEnumProperty(node: ts.PropertyDeclaration, t: TransformerDelegate): boolean;
export declare function visitEnumDeclaration(node: ts.PropertyDeclaration, t: TransformerDelegate): void;
export declare function visitPropertyDeclaration(node: ts.PropertyDeclaration, t: TransformerDelegate): void;
export declare function visitAccessorPair(name: string, getNode: ts.GetAccessorDeclaration | undefined, setNode: ts.SetAccessorDeclaration | undefined, t: TransformerDelegate): void;
export declare function visitConstructor(node: ts.ConstructorDeclaration, t: TransformerDelegate): void;
export declare function visitMethodDeclaration(node: ts.MethodDeclaration, t: TransformerDelegate): void;
export declare function getDecorators(node: ts.HasDecorators, t: TransformerDelegate): string[];
export declare function toPascalCase(str: string): string;
//# sourceMappingURL=class-members.d.ts.map