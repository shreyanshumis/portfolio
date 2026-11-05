import { useLang } from "./useLang";

/**
 * useT() — returns a t() function scoped to current lang.
 * Usage: const t = useT(); then t("Hello") → "ନମସ୍କାର" when lang=or
 */
export function useT() {
  const { t } = useLang();
  return t;
}
