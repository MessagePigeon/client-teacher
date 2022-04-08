/**
 * Delete element in object array by id field
 * @param array
 * @param id
 * @returns deleted index or `-1` for not found
 */
export function deleteById<E extends { id: unknown }>(array: E[], id: E['id']) {
  const index = array.findIndex((element) => element.id === id);
  array.splice(index, 1);
  return index;
}
