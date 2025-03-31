/**
 * Inspired by Kotlin Compose LaunchedEffect
 * Executes side effects that run when dependencies change
 *
 * @param dependencies - Values that trigger the effect when changed
 * @returns A function that accepts the effect callback
 *
 * @example
 * ```typescript
 * // Basic usage
 * LaunchedEffect(someValue)(() => {
 *   // Effect code here
 * })
 *
 * // With cleanup
 * LaunchedEffect(someValue)((dispose) => {
 *   // Effect code here
 *   dispose(() => {
 *     // Cleanup code here
 *   })
 * })
 *
 * // Multiple dependencies
 * LaunchedEffect(value1, value2)((dispose) => {
 *   // Effect runs when either value1 or value2 changes
 *   dispose(() => {
 *     // Cleanup when effect is disposed
 *   })
 * })
 * ```
 */
import { useEffect } from 'react'

type DisposeFn = () => void
type EffectCallback =
  | ((dispose: (cleanup: DisposeFn) => void) => void | (() => void))
  | (() => void)

export function LaunchedEffect(...dependencies: any[]) {
  return function (callback: EffectCallback) {
    useEffect(() => {
      let cleanup: DisposeFn | void

      const dispose = (fn: DisposeFn) => {
        cleanup = fn
      }

      const result =
        typeof callback === 'function' && callback.length > 0
          ? callback(dispose)
          : (callback as () => void | (() => void))()

      return () => {
        if (cleanup) cleanup()
        if (typeof result === 'function') result()
      }
    }, dependencies)
  }
}
