import { useTextStore } from "../stores/useTextStore";

export function TextProvider({ children }) {
  // Provider kept as a passthrough for backward compatibility.
  // App now uses `useTextStore` directly.
  return children;
}
