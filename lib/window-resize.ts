export const resizeEdges = ["n", "e", "s", "w", "ne", "se", "sw", "nw"] as const;
export type ResizeEdge = (typeof resizeEdges)[number];
export type WindowRect = { left: number; top: number; width: number; height: number };

const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(value, max));

/** Move the selected edges, keeping opposite edges anchored and the titlebar reachable. */
export function resizeWindowRect(
  rect: WindowRect,
  edge: ResizeEdge,
  dx: number,
  dy: number,
  viewport: { width: number; height: number },
  minWidth = 320,
): WindowRect {
  const floor = 34;
  const bottomLimit = Math.max(floor + 1, viewport.height - 12);
  const minW = Math.min(minWidth, viewport.width);
  const minH = Math.min(220, bottomLimit - floor);
  let left = clamp(rect.left, 0, viewport.width - minW);
  let right = clamp(rect.left + rect.width, left + minW, viewport.width);
  let top = clamp(rect.top, floor, bottomLimit - minH);
  let bottom = clamp(rect.top + rect.height, top + minH, bottomLimit);
  if (edge.includes("e")) right = clamp(right + dx, left + minW, viewport.width);
  if (edge.includes("w")) left = clamp(left + dx, 0, right - minW);
  if (edge.includes("s")) bottom = clamp(bottom + dy, top + minH, bottomLimit);
  if (edge.includes("n")) top = clamp(top + dy, floor, bottom - minH);
  return { left, top, width: right - left, height: bottom - top };
}
