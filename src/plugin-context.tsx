"use client";

import { createContext, useContext } from "react";
import type { PluginContext } from "./types";

/**
 * React context that the panel populates with real implementations.
 * Plugins never import panel internals — they only consume this context.
 */
export const PluginCtx = createContext<PluginContext | null>(null);

/**
 * Access panel functionality from within a plugin component.
 *
 * Must be used inside a component rendered by the panel (i.e. inside a PluginSlot).
 *
 * @example
 * ```tsx
 * function MyWidget() {
 *   const { navigate, toast, currentUser } = usePluginContext();
 *   return <button onClick={() => navigate("/servers")}>Go to servers</button>;
 * }
 * ```
 */
export function usePluginContext(): PluginContext {
  const ctx = useContext(PluginCtx);
  if (!ctx) {
    throw new Error(
      "[kleff/sdk] usePluginContext() must be called inside a component rendered by the Kleff panel. " +
        "Make sure your plugin component is registered in a PluginSlot."
    );
  }
  return ctx;
}
