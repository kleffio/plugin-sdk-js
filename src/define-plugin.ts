import type { KleffPlugin, PluginManifest } from "./types";

interface DefinePluginOptions {
  manifest: PluginManifest;
}

/**
 * Creates a Kleff frontend plugin.
 *
 * @example
 * ```ts
 * import { definePlugin } from "@kleffio/sdk";
 * import { ShowcasePage } from "./ShowcasePage";
 *
 * export default definePlugin({
 *   manifest: {
 *     id: "kleff-plugin-components",
 *     name: "Component Showcase",
 *     version: "1.0.0",
 *     icon: "Layers",
 *     slots: [
 *       { slot: "page", component: ShowcasePage, props: { path: "/components" } },
 *       { slot: "navbar.item", props: { label: "Components", icon: "Layers", href: "/p/components" } },
 *     ],
 *   },
 * });
 * ```
 */
export function definePlugin(options: DefinePluginOptions): KleffPlugin {
  const { manifest } = options;

  if (!manifest.id || manifest.id.trim() === "") {
    throw new Error("[kleff/sdk] Plugin manifest must have a non-empty `id`.");
  }
  if (!manifest.name || manifest.name.trim() === "") {
    throw new Error(`[kleff/sdk] Plugin "${manifest.id}" manifest must have a non-empty \`name\`.`);
  }
  if (!manifest.version || manifest.version.trim() === "") {
    throw new Error(`[kleff/sdk] Plugin "${manifest.id}" manifest must have a non-empty \`version\`.`);
  }
  if (!Array.isArray(manifest.slots) || manifest.slots.length === 0) {
    throw new Error(`[kleff/sdk] Plugin "${manifest.id}" must declare at least one slot registration.`);
  }

  return { manifest: Object.freeze(manifest) };
}
