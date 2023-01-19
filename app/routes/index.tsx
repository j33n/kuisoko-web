import { Link } from "@remix-run/react";

import { useOptionalUser } from "~/utils";

import { StyledMain } from "~/styles/routes/index.styled";

export default function Index() {
  return <StyledMain>TYhis is the first page of app</StyledMain>;
}
