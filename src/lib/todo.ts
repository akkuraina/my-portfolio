// Content placeholders: any string starting with "TODO" is shown as a visible
// badge in `npm run dev` and hidden in production builds, so unfinished copy
// never reaches the live site.

export const showTodos = process.env.NODE_ENV !== 'production';

export function isTodo(value?: string): boolean {
  return typeof value === 'string' && value.trim().startsWith('TODO');
}

export function isVisible(value?: string): value is string {
  return typeof value === 'string' && value.trim() !== '' && (!isTodo(value) || showTodos);
}
