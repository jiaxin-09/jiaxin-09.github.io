const base = import.meta.env.BASE_URL.replace(/\/$/, "");

const isExternalPath = (path: string) =>
    /^(?:[a-z][a-z\d+.-]*:|\/\/|#)/i.test(path);

export function withBase(path: string): string {
    if (isExternalPath(path)) return path;

    const normalizedPath = `/${path.replace(/^\/+/, "")}`;

    if (!base || base === "/") return normalizedPath;
    if (normalizedPath === base || normalizedPath.startsWith(`${base}/`)) {
        return normalizedPath;
    }

    return `${base}${normalizedPath}`;
}
