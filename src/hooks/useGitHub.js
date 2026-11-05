import { useState, useEffect } from "react";
import { GITHUB_API } from "../constants";

// Module-level cache so data survives page navigation
let _cache = null;

export function useGitHub() {
  const [data,    setData]    = useState(_cache);
  const [loading, setLoading] = useState(!_cache);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    if (_cache) { setData(_cache); setLoading(false); return; }
    let cancelled = false;
    async function load() {
      try {
        const [pRes, rRes] = await Promise.all([
          fetch(GITHUB_API),
          fetch(`${GITHUB_API}/repos?sort=updated&per_page=100`),
        ]);
        if (!pRes.ok || !rRes.ok) throw new Error("GitHub API error");
        const [profile, repos] = await Promise.all([pRes.json(), rRes.json()]);
        const sorted = [...repos].sort(
          (a, b) => b.stargazers_count - a.stargazers_count ||
                    b.updated_at.localeCompare(a.updated_at)
        );
        const result = { profile, repos: sorted };
        _cache = result;
        if (!cancelled) { setData(result); setLoading(false); }
      } catch (e) {
        if (!cancelled) { setError(e.message); setLoading(false); }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  return { ...data, loading, error };
}
