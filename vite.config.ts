import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "node:path";
import https from "node:https";
import AutoImport from "unplugin-auto-import/vite";

const base = process.env.BASE_PATH || "/";
const isPreview = process.env.IS_PREVIEW ? true : false;

/**
 * Vite plugin that proxies Aladin book cover images server-side.
 * This is exactly how Streamlit's st.image(url) works in admin:
 * the server fetches the image and pipes it to the browser,
 * bypassing all CORS/hotlinking restrictions.
 *
 * Usage: <img src="/api/book-cover?url=https://image.aladin.co.kr/..." />
 */
function aladinCoverProxy(): Plugin {
  return {
    name: "aladin-cover-proxy",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url?.startsWith("/api/book-cover")) return next();

        const parsed = new URL(req.url, "http://localhost");
        const coverUrl = parsed.searchParams.get("url");
        if (!coverUrl) {
          res.statusCode = 400;
          res.end("Missing url param");
          return;
        }

        const fetchUrl = coverUrl.replace("http://", "https://");

        const request = https.get(
          fetchUrl,
          {
            headers: {
              Referer: "https://www.aladin.co.kr/",
              "User-Agent":
                "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              Accept: "image/webp,image/apng,image/*,*/*;q=0.8",
            },
          },
          (proxyRes) => {
            if (proxyRes.statusCode !== 200) {
              res.statusCode = proxyRes.statusCode || 502;
              res.end();
              return;
            }
            res.setHeader(
              "Content-Type",
              proxyRes.headers["content-type"] || "image/jpeg"
            );
            res.setHeader("Cache-Control", "public, max-age=86400");
            res.setHeader("Access-Control-Allow-Origin", "*");
            proxyRes.pipe(res);
          }
        );

        request.on("error", () => {
          res.statusCode = 502;
          res.end();
        });

        request.setTimeout(8000, () => {
          request.destroy();
          res.statusCode = 504;
          res.end();
        });
      });
    },
  };
}

export default defineConfig({
  define: {
    __BASE_PATH__: JSON.stringify(base),
    __IS_PREVIEW__: JSON.stringify(isPreview),
    __READDY_PROJECT_ID__: JSON.stringify(process.env.PROJECT_ID || ""),
    __READDY_VERSION_ID__: JSON.stringify(process.env.VERSION_ID || ""),
    __READDY_AI_DOMAIN__: JSON.stringify(process.env.READDY_AI_DOMAIN || ""),
  },
  plugins: [
    aladinCoverProxy(),
    react(),
    AutoImport({
      imports: [
        {
          react: [
            ["default", "React"],
            "useState",
            "useEffect",
            "useContext",
            "useReducer",
            "useCallback",
            "useMemo",
            "useRef",
            "useImperativeHandle",
            "useLayoutEffect",
            "useDebugValue",
            "useDeferredValue",
            "useId",
            "useInsertionEffect",
            "useSyncExternalStore",
            "useTransition",
            "startTransition",
            "lazy",
            "memo",
            "forwardRef",
            "createContext",
            "createElement",
            "cloneElement",
            "isValidElement",
          ],
        },
        {
          "react-router-dom": [
            "useNavigate",
            "useLocation",
            "useParams",
            "useSearchParams",
            "Link",
            "NavLink",
            "Navigate",
            "Outlet",
          ],
        },
        {
          "react-i18next": ["useTranslation", "Trans"],
        },
      ],
      dts: true,
    }),
  ],
  base,
  build: {
    sourcemap: true,
    outDir: 'out',
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 5173,
    host: "127.0.0.1",
  },
});
