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
import { useRef, useState } from "react";
import type { Item } from "@prisma/client";

export type ItemViewProps = {
  item: any;
  key?: string;
  handleDelete: (itemId: string) => void;
  handleUpdate: (itemId: string) => void;
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

export const ItemView = ({
  item,
  key,
  handleUpdate,
  handleDelete,
}: ItemViewProps) => {
  const { t } = useTranslation();
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [showAlertDialog, setShowAlertDialog] =
    useState<DialogStateProps>(initialDialogState);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);

  const handleShowDialog = (item: Item) => {
    dialogTriggerRef.current?.click();
    setShowDropDown(false);
  };

  const dialogTitle = (name: string) => `are you sure you want to delete ${name}`

  return (
    <StyledItemBox key={key}>
      <StyledDDContainer>
        <DropDownMenu
          width="100px"
          open={showDropDown}
          onOpenChange={setShowDropDown}
          mini
        >
          <StyledFieldType onClick={() => handleUpdate(item.id)}>
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
              title: dialogTitle(item.name),
              description: `Item ${item.name} will be deleted and all details`,
            });
          } else {
            setShowAlertDialog({ ...showAlertDialog, state: state });
          }
        }}
        onConfirm={() => handleDelete(item.id)}
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
