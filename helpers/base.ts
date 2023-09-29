import { randomUUID } from 'node:crypto';

export function getUUID(): string {
  return randomUUID().replace(/-/g, '').slice(0,6);
}
