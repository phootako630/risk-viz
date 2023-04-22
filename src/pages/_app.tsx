// _app.tsx
import "../styles/global.css";
import "leaflet/dist/leaflet.css";
import type { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}

export default MyApp;