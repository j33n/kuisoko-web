import React, { useContext, useEffect, useState } from "react";
import { withEmotionCache } from "@emotion/react";
import { ThemeProvider } from "@theme-ui/core";
import { ColorModeProvider } from "@theme-ui/color-modes";
import type { Theme } from "theme-ui";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { Global } from "@emotion/react";

import { ServerStyleContext, ClientStyleContext } from "~/styles/context";
import { base, light, dark } from "~/themes";
import GlobalStyles from "~/styles/globals.styled";
import { requireUserId } from "~/services/session.server";
import ThemeContext from "./themes/context";

import type { LoaderArgs, MetaFunction } from "@remix-run/node";

// i18n
import { useTranslation } from "react-i18next";
import i18next from "~/i18next.server";
import { useChangeLanguage } from "./hooks/useChangeLanguage";


export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Kuisoko",
  description: "Powering the next generation of Africa’s marketplaces",
  viewport: "width=device-width,initial-scale=1",
});

interface DocumentProps {
  children: React.ReactNode;
}

export const loader = async ({ request }: LoaderArgs) => {
  const userId = await requireUserId(request);
  let locale = await i18next.getLocale(request);

  return json({ locale, userId });
};

export let handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

const Document = withEmotionCache(
  ({ children }: DocumentProps, emotionCache) => {
    const serverStyleData = useContext(ServerStyleContext);
    const clientStyleData = useContext(ClientStyleContext);

    // Get the locale from the loader
    let { locale } = useLoaderData<typeof loader>();

    let { i18n } = useTranslation();

    // This hook will change the i18n instance language to the current locale
    // detected by the loader, this way, when we do something to change the
    // language, this locale will change and i18next will load the correct
    // translation files
    useChangeLanguage("rw");

    // Only executed on client
    useEffect(() => {
      // re-link sheet container
      emotionCache.sheet.container = document.head;
      // re-inject tags
      const tags = emotionCache.sheet.tags;
      emotionCache.sheet.flush();
      tags.forEach((tag) => {
        (emotionCache.sheet as any)._insertTag(tag);
      });
      // reset cache to reapply global styles
      clientStyleData?.reset();
    }, []);

    return (
      <html lang={locale} dir={i18n.dir()}>
        <head>
          <Meta />
          <Links />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin=""
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;400;600&display=swap"
            rel="stylesheet"
          />
          {serverStyleData?.map(({ key, ids, css }) => (
            <style
              key={key}
              data-emotion={`${key} ${ids.join(" ")}`}
              dangerouslySetInnerHTML={{ __html: css }}
            />
          ))}
        </head>
        <body style={{ height: "100vh", width: "100vw" }}>
          {children}
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    );
  }
);

const themesMap: any = {
  light,
  dark,
};

export default function App() {
  const [currentTheme, setCurrentTheme] = useState("dark");

  const theme: Theme = { ...base, colors: themesMap[currentTheme] };

  const themeContext = {
    theme: currentTheme,
    setTheme: setCurrentTheme,
  };

  return (
    <Document>
      <Global styles={GlobalStyles} />
      <ThemeProvider theme={theme}>
        <ColorModeProvider>
          <ThemeContext.Provider value={themeContext}>
            <Outlet />
          </ThemeContext.Provider>
        </ColorModeProvider>
      </ThemeProvider>
    </Document>
  );
}
