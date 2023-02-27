import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getAllItems } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { useTranslation } from "react-i18next";
import { StyledPage } from "~/styles/page.styled";
import { StyledPageHeader, StyledTitle } from "../../__stores";

import type { LoaderArgs } from "@remix-run/node";
import { ItemAdder } from "~/components";
import {
  StyledBody,
  StyledContainer,
} from "~/styles/stores/singleStore.styled";
import ItemViewer from "~/components/ItemViewer/ItemViewer";

export const loader = async ({ request }: LoaderArgs) => {
  const user = await requireUser(request);

  const items = await getAllItems(user.id);

  return json({ items });
};

export default function ItemsRoute() {
  const data = useLoaderData<typeof loader>();
  let { t } = useTranslation();

  const onSaveItem = (e: any) => {
    console.log("------------>", e);
  };

  return (
    <StyledContainer>
      <StyledBody>
        <StyledPageHeader>
          {data.items.length === 0 ? (
            <StyledTitle>{t("newItem")}</StyledTitle>
          ) : (
            <>{data.items.length} Items so far</>
          )}

          {data.items.length > 0 &&
            data.items.map((item) => <ItemViewer item={item} key={item.id} />)}

          <ItemAdder onBlur={onSaveItem} />
        </StyledPageHeader>
      </StyledBody>
    </StyledContainer>
  );
}
