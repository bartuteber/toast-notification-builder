// Typed, JSON-safe localStorage helpers — a single place that handles parse
// errors and unavailable storage, instead of scattering raw localStorage calls.

export function loadJSON<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw === null ? fallback : (JSON.parse(raw) as T)
  } catch (error) {
    // corrupt JSON or storage disabled — fall back gracefully
    console.error(`Failed to load "${key}" from localStorage`, error)
    return fallback
  }
}

export function saveJSON<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    // quota exceeded / private mode — nothing we can do, don't crash
    console.error(`Failed to save "${key}" to localStorage`, error)
  }
}
