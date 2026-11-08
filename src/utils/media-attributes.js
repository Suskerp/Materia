import { scopeContext } from "../primitives/sheet.js";
import { resolveAttributes } from "./media.js";

/**
 * The attribute map a media element reads its player with: its own
 * `attributes:`, else the enclosing art scope's, else today's names.
 */
export function attributeMapOf(el) {
  return resolveAttributes(el.config?.attributes, el.isConnected ? scopeContext(el).attributes : undefined);
}
