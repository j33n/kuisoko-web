import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAllItems } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { useTranslation } from "react-i18next";
import { StyledPage } from "~/styles/page.styled";
import { StyledPageHeader, StyledTitle } from "../../__stores";

import type { LoaderArgs } from "@remix-run/node";
import { ItemAdder } from "~/components";
import { StyledBody, StyledContainer } from "~/styles/stores/singleStore.styled";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  const items = await getAllItems(user.id);

  return json({ items });
};

export default function ItemsRoute() {
  const data = useLoaderData<typeof loader>();
  let { t } = useTranslation();

  return (
    <StyledContainer>
      <StyledBody>
        <StyledPageHeader>
          {data.items.length === 0 ? (
            <StyledTitle>{t("newItem")}</StyledTitle>
          ) : (
            <>{data.items.length} Items so far</>
          )}
          <ItemAdder onSave={() => {}} />
        </StyledPageHeader>
      </StyledBody>
    </StyledContainer>
  );
}
