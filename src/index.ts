// Types
export type {
  SlotName,
  SlotRegistration,
  PluginManifest,
  ToastOptions,
  CurrentUser,
  PluginApiClient,
  PluginStorage,
  PluginContext,
  KleffPlugin,
} from "./types";

// Plugin definition
export { definePlugin } from "./define-plugin";

// Plugin context hook
export { PluginCtx, usePluginContext } from "./plugin-context";
