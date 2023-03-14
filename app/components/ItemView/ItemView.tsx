import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useMatches, useNavigate } from "@remix-run/react";

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

export type ItemViewProps = {
  id: string;
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

export const ItemView = ({ id }: ItemViewProps) => {
  const { t } = useTranslation();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] =
    useState<DialogStateProps>(initialDialogState);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const fetcher = useFetcher();
  const matches = useMatches();
  const navigate = useNavigate();

  const matchStores = matches.find((match) => match.pathname === `/stores`);

  const item = matchStores?.data.items.find((item: Item) => item.id === id);

  const handleShowDialog = () => {
    dialogTriggerRef.current?.click();
    setShowDropDown(false);
  };

  const handleDeleteItem = (itemId: string) => {
    fetcher.submit(
      { itemId },
      {
        method: "post",
        action: `/stores/${item.storeId}/items/delete`,
      }
    );
  };

  return (
    <StyledItemBox>
      <StyledDDContainer>
        <DropDownMenu
          width="100px"
          open={showDropDown}
          onOpenChange={setShowDropDown}
          mini
        >
          <StyledFieldType
            onClick={() => {
              setShowDropDown(false);
              navigate(
                `/stores/${item.storeId}/items/${item.id}?currentTab=defaults`
              );
            }
            }
          >
            Update Item
          </StyledFieldType>
          <StyledFieldType
            onClick={(e: any) => {
              e.preventDefault();
              handleShowDialog();
            }}
          >
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
