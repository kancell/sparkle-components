/*
 * @Author: xxxafu
 * @Date: 2022-03-15 11:12:10
 * @LastEditTime: 2022-03-15 11:21:26
 * @LastEditors: xxxafu
 * @Description:
 * @FilePath: \sparkle-components\src\utils\index.ts
 */
export function isDef<T>(val: T): val is NonNullable<T> {
  return val !== undefined && val !== null;
}
export function isNumeric(val: string): boolean {
  return /^\d+(\.\d+)?$/.test(val);
}

export function isNaN(val: number): val is typeof NaN {
  if (Number.isNaN) {
    return Number.isNaN(val);
  }
  return val !== val;
}

export function addUnit(value?: string | number): string | undefined {
  if (!isDef(value)) {
    return undefined;
  }
  value = String(value);
  return isNumeric(value) ? `${value}px` : value;
}
