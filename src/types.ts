import type { ComponentType } from "react";

// ─── Slot System ─────────────────────────────────────────────────────────────

/**
 * Named injection points in the panel UI.
 * Plugins register components into these slots.
 */
export type SlotName =
  | "navbar.item"        // sidebar nav link
  | "page"               // full page rendered at /<path>
  | "dashboard.top"          // above dashboard content
  | "dashboard.header"       // title + subtitle block — replaces default if provided
  | "dashboard.metrics"      // the 4 metric cards — replaces default if provided
  | "dashboard.widget"       // injection: widget between metrics and tabs
  | "dashboard.servers-tab"  // the servers tab content — replaces default if provided
  | "dashboard.activity-tab" // the activity tab content — replaces default if provided
  | "dashboard.bottom"       // below dashboard content
  | "servers.top"            // above servers content
  | "servers.header"         // title + new server button — replaces default if provided
  | "servers.list"           // the server card grid — replaces default if provided
  | "servers.bottom"         // below servers content
  | "billing.top"            // above billing content
  | "billing.header"         // title + subtitle block — replaces default if provided
  | "billing.plan"           // the current plan card — replaces default if provided
  | "billing.invoices"       // the invoice table — replaces default if provided
  | "billing.bottom"         // below billing content
  | "settings.top"           // above settings content
  | "settings.header"        // title + subtitle block — replaces default if provided
  | "settings.profile"       // the profile card — replaces default if provided
  | "settings.org"           // the organization card — replaces default if provided
  | "settings.section"       // injection: section between org card and danger zone
  | "settings.bottom"        // below settings content
  | "admin.top"              // above admin content
  | "admin.header"           // title + subtitle block — replaces default if provided
  | "admin.metrics"          // the 3 metric cards — replaces default if provided
  | "admin.cards"            // grid wrapper containing users + orgs cards — replaces default if provided
  | "admin.users"            // the users card — replaces default if provided
  | "admin.orgs"             // the organizations card — replaces default if provided
  | "admin.bottom"           // below admin content
  | "topbar.right"       // element in the top bar (right side)
  | "global.provider"    // React provider wrapping the entire app
  | (string & {}); // extensible — allow custom slot names

export interface SlotRegistration {
  /** Target slot name. */
  slot: SlotName;
  /** The React component to render into this slot. */
  component?: ComponentType<any>;
  /**
   * Render priority — lower numbers render first.
   * @default 100
   */
  priority?: number;
  /**
   * Static props forwarded to the component.
   *
   * For "navbar.item" slots, recognised keys:
   *   label: string, icon: string (lucide icon name), href: string
   *
   * For "page" slots, recognised keys:
   *   path: string  (e.g. "/components" → served at /components)
   */
  props?: Record<string, unknown>;
}

// ─── Plugin Manifest ─────────────────────────────────────────────────────────

export interface PluginManifest {
  /** Unique identifier, e.g. "kleff-plugin-components". Kebab-case. */
  id: string;
  /** Human-readable name shown in the plugin list. */
  name: string;
  /** Semver string, e.g. "1.0.0". */
  version: string;
  /** Optional description shown in the plugin list. */
  description?: string;
  /** Lucide icon name (PascalCase), e.g. "Layers". */
  icon?: string;
  /** All slot registrations for this plugin. */
  slots: SlotRegistration[];
}

// ─── Plugin Context ───────────────────────────────────────────────────────────

export interface ToastOptions {
  title?: string;
  description?: string;
  /** @default "default" */
  variant?: "default" | "success" | "error" | "warning" | "info";
  /** Duration in milliseconds. */
  duration?: number;
}

export interface CurrentUser {
  userId: string;
  email: string;
  roles: string[];
}

export interface PluginApiClient {
  get<T = unknown>(url: string): Promise<T>;
  post<T = unknown, B = unknown>(url: string, body?: B): Promise<T>;
  put<T = unknown, B = unknown>(url: string, body?: B): Promise<T>;
  patch<T = unknown, B = unknown>(url: string, body?: B): Promise<T>;
  del<T = unknown>(url: string): Promise<T>;
}

export interface PluginStorage {
  /** Get a value stored under `key`. Returns `null` if not found. */
  get<T = unknown>(key: string): T | null;
  /** Persist `value` under `key`. */
  set<T = unknown>(key: string, value: T): void;
  /** Remove the value stored under `key`. */
  remove(key: string): void;
}

export interface PluginContext {
  /** Navigate to a panel route. Wraps Next.js router.push(). */
  navigate(path: string): void;
  /** Show a toast notification via sonner. */
  toast(opts: ToastOptions): void;
  /** The currently authenticated user, or null if unauthenticated. */
  currentUser: CurrentUser | null;
  /** HTTP client pre-configured for the Kleff API. */
  api: PluginApiClient;
  /** Plugin-scoped localStorage. Keys are automatically namespaced. */
  storage: PluginStorage;
}

// ─── Plugin Object ────────────────────────────────────────────────────────────

export interface KleffPlugin {
  readonly manifest: PluginManifest;
}
