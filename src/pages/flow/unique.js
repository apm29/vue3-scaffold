let id = 0;
export function uniqueId(label) {
  return `${label}-${++id}`;
}
