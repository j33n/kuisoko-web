import { imageLoader, MemoryCache } from "remix-image/server";

import type { LoaderFunction } from "@remix-run/node";

const config = {
  selfUrl: "http://localhost:3000",
  cache: new MemoryCache(),
};

export const loader: LoaderFunction = ({ request }) => {
  return imageLoader(config, request);
};
