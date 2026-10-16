export type IconPosition = { x: number; y: number };
export type IconPositions = Record<string, IconPosition>;

export function desktopGrid(width: number, height: number) {
  height = Math.max(580, height);
  const x = 23;
  const y = Math.round(height * (height <= 800 ? 0.1 : 0.117));
  const columnWidth = 109;
  const rowHeight = 105;
  return {
    x,
    y,
    columnWidth,
    rowHeight,
    columns: Math.max(1, Math.floor((width - x - 102) / columnWidth) + 1),
    rows: Math.max(1, Math.floor((height - 214 - y) / rowHeight) + 1),
  };
}

export function placeDesktopIcon(
  id: string,
  desired: IconPosition,
  positions: IconPositions,
  width: number,
  height: number,
): IconPosition {
  const grid = desktopGrid(width, height);
  const occupied = new Set(
    Object.entries(positions)
      .filter(([other]) => other !== id)
      .map(([, p]) => `${p.x},${p.y}`),
  );
  let nearest = positions[id] || { x: grid.x, y: grid.y };
  let distance = Infinity;
  for (let column = 0; column < grid.columns; column++) {
    for (let row = 0; row < grid.rows; row++) {
      const position = {
        x: grid.x + column * grid.columnWidth,
        y: grid.y + row * grid.rowHeight,
      };
      if (occupied.has(`${position.x},${position.y}`)) continue;
      const candidateDistance =
        (position.x - desired.x) ** 2 + (position.y - desired.y) ** 2;
      if (candidateDistance < distance) {
        distance = candidateDistance;
        nearest = position;
      }
    }
  }
  return nearest;
}

export function defaultDesktopIcons(
  ids: string[],
  width: number,
  height: number,
): IconPositions {
  const grid = desktopGrid(width, height);
  const rows = Math.min(5, grid.rows);
  return Object.fromEntries(
    ids.map((id, index) => [
      id,
      {
        x: grid.x + Math.floor(index / rows) * grid.columnWidth,
        y: grid.y + (index % rows) * grid.rowHeight,
      },
    ]),
  );
}

export function normalizeDesktopIcons(
  ids: string[],
  saved: IconPositions,
  width: number,
  height: number,
): IconPositions {
  const defaults = defaultDesktopIcons(ids, width, height);
  const positions: IconPositions = {};
  for (const id of ids) {
    const desired =
      Number.isFinite(saved?.[id]?.x) && Number.isFinite(saved?.[id]?.y)
        ? saved[id]
        : defaults[id];
    positions[id] = placeDesktopIcon(id, desired, positions, width, height);
  }
  return positions;
}

export function moveDesktopIcon(
  id: string,
  dx: number,
  dy: number,
  positions: IconPositions,
  width: number,
  height: number,
): IconPosition {
  const grid = desktopGrid(width, height);
  const original = positions[id];
  const occupied = new Set(
    Object.entries(positions)
      .filter(([other]) => other !== id)
      .map(([, p]) => `${p.x},${p.y}`),
  );
  let column = Math.round((original.x - grid.x) / grid.columnWidth) + dx;
  let row = Math.round((original.y - grid.y) / grid.rowHeight) + dy;
  while (column >= 0 && column < grid.columns && row >= 0 && row < grid.rows) {
    const position = {
      x: grid.x + column * grid.columnWidth,
      y: grid.y + row * grid.rowHeight,
    };
    if (!occupied.has(`${position.x},${position.y}`)) return position;
    column += Math.sign(dx);
    row += Math.sign(dy);
  }
  return original;
}

export function placeDesktopGroup(
  ids: string[],
  desired: IconPositions,
  positions: IconPositions,
  width: number,
  height: number,
): IconPositions {
  if (ids.length === 1)
    return {
      ...positions,
      [ids[0]]: placeDesktopIcon(
        ids[0],
        desired[ids[0]],
        positions,
        width,
        height,
      ),
    };
  const grid = desktopGrid(width, height);
  const fixed = Object.fromEntries(
    Object.entries(positions).filter(([id]) => !ids.includes(id)),
  );
  const occupied = new Set(Object.values(fixed).map((p) => `${p.x},${p.y}`));
  const anchor = ids[0];
  let best: IconPositions | null = null,
    distance = Infinity;
  for (let column = 0; column < grid.columns; column++) {
    for (let row = 0; row < grid.rows; row++) {
      const x = grid.x + column * grid.columnWidth,
        y = grid.y + row * grid.rowHeight;
      const candidate = Object.fromEntries(
        ids.map((id) => [
          id,
          {
            x: x + positions[id].x - positions[anchor].x,
            y: y + positions[id].y - positions[anchor].y,
          },
        ]),
      );
      if (
        Object.values(candidate).some(
          (p) =>
            p.x < grid.x ||
            p.y < grid.y ||
            p.x > grid.x + (grid.columns - 1) * grid.columnWidth ||
            p.y > grid.y + (grid.rows - 1) * grid.rowHeight ||
            occupied.has(`${p.x},${p.y}`),
        )
      )
        continue;
      const score = (x - desired[anchor].x) ** 2 + (y - desired[anchor].y) ** 2;
      if (score < distance) {
        distance = score;
        best = candidate;
      }
    }
  }
  if (best) return { ...fixed, ...best };
  const placed = { ...fixed };
  for (const id of ids)
    placed[id] = placeDesktopIcon(id, desired[id], placed, width, height);
  return placed;
}
