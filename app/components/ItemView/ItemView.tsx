import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  StyledParagraph,
  StyledItemBox,
  StyledPLabel,
  StyledDDContainer,
} from "./ItemView.styled";
import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { StyledFieldType } from "../NewItem/NewItem.styled";
import { AlertDialog } from "~/components";

import type { Item } from "@prisma/client";
import { useFetcher, useParams } from "@remix-run/react";

export type ItemViewProps = {
  item: any;
  key?: string;
};

export type DialogStateProps = {
  state: boolean;
  title: string;
  description: string;
};

const initialDialogState = {
  state: false,
  title: "Delete Item",
  description: "Delete Item Description",
};

export const ItemView = ({ item, key }: ItemViewProps) => {
  const { t } = useTranslation();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] =
    useState<DialogStateProps>(initialDialogState);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const fetcher = useFetcher();
  let params = useParams();

  const handleShowDialog = (item: Item) => {
    dialogTriggerRef.current?.click();
    setShowDropDown(false);
  };

  const handleDeleteItem = (itemId: string) => {
    fetcher.submit(
      { itemId },
      {
        method: "post",
        action: `/stores/${params.storeId}/items`,
      }
    );
  };

  return (
    <StyledItemBox key={key}>
      <StyledDDContainer>
        <DropDownMenu
          width="100px"
          open={showDropDown}
          onOpenChange={setShowDropDown}
          mini
        >
          <StyledFieldType onClick={() => navigate(item.id)}>
            Update Item
          </StyledFieldType>
          <StyledFieldType onClick={() => handleShowDialog(item)}>
            Delete Item
          </StyledFieldType>
        </DropDownMenu>
      </StyledDDContainer>
      <AlertDialog
        onOpenChange={(state) => {
          if (state) {
            setShowAlertDialog({
              state: true,
              title: `Are you sure you want to delete ${item.name}?`,
              description: `Item ${item.name} will be deleted and all it's details`,
            });
          } else {
            setShowAlertDialog({ ...showAlertDialog, state: state });
          }
        }}
        onConfirm={() => handleDeleteItem(item.id)}
        open={showAlertDialog.state}
        title={showAlertDialog.title}
        description={showAlertDialog.description}
        trigger={
          <button
            type="button"
            ref={dialogTriggerRef}
            onClick={() =>
              setShowAlertDialog({
                state: true,
                title: item.id,
                description: item.name,
              })
            }
            hidden
          />
        }
      />
      <fetcher.Form></fetcher.Form>
      <StyledPLabel>{t("name")}</StyledPLabel>
      <StyledParagraph>{item.name}</StyledParagraph>
      <StyledPLabel>{t("price")}</StyledPLabel>
      <StyledParagraph>{item.price}</StyledParagraph>
      <StyledPLabel>{t("quantity")}</StyledPLabel>
      <StyledParagraph>{item.quantity}</StyledParagraph>
      {/* TODO: make comment editable */}
      {!!item.comment && (
        <>
          <StyledPLabel>{t("comment")}</StyledPLabel>
          <StyledParagraph contentEditable>{item.comment}</StyledParagraph>
        </>
      )}
    </StyledItemBox>
  );
};

export default ItemView;
