export type ElementType = "text" | "box" | "table" | "image";

export interface BaseElement {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  opacity?: number;
  fixed?: boolean;
}

export interface TextElement extends BaseElement {
  type: "text";
  content: string;
  fontSize?: number;
  color?: string;
  bold?: boolean;
  textAlign?: "left" | "center" | "right";
}

export interface BoxElement extends BaseElement {
  type: "box";
  backgroundColor?: string;
  borderColor?: string;
}

export interface TableElement extends BaseElement {
  type: "table";
  headers: string[];
  isDynamic?: boolean;
  rows: number;
  cols: number;
}

export interface ImageElement extends BaseElement {
  type: "image";
  src: string;
}

export type TemplateElement =
  | TextElement
  | BoxElement
  | TableElement
  | ImageElement;

export interface Page {
  id: string;
  name: string;
  elements: TemplateElement[];
}
