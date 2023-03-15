import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFetcher, useMatches, useNavigate } from "@remix-run/react";

import {
  StyledParagraph,
  StyledItemBox,
  StyledPLabel,
  StyledDDContainer,
  StyledImageView,
} from "./ItemView.styled";
import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import { StyledFieldType } from "../NewItem/NewItem.styled";
import { AlertDialog, ImageSlider } from "~/components";
import type { Item } from "@prisma/client";

export type ItemViewProps = {
  id: string;
};

export type DialogStateProps = {
  state: boolean;
  title: string;
  description: string;
};

export type DropDownProps = {
  state: boolean;
  value: string | null;
};

const initialDropDownState: DropDownProps = {
  state: false,
  value: null,
};

const initialDialogState = {
  state: false,
  title: "Delete Item",
  description: "Delete Item Description",
};

export const ItemView = ({ id }: ItemViewProps) => {
  const { t } = useTranslation();
  const [showDropDown, setShowDropDown] =
    useState<DropDownProps>(initialDropDownState);
  const [itemMenuIconVisible, setItemMenuIconVisible] = useState<string | null>(
    null
  );
  const [showAlertDialog, setShowAlertDialog] =
    useState<DialogStateProps>(initialDialogState);
  const dialogTriggerRef = useRef<HTMLButtonElement>(null);
  const fetcher = useFetcher();
  const matches = useMatches();
  const navigate = useNavigate();

  const matchStores = matches.find((match) => match.pathname === `/stores`);

  const item = matchStores?.data.items.find((item: Item) => item.id === id);

  const handleShowDialog = () => {
    setShowDropDown(initialDropDownState);
    setItemMenuIconVisible(null);
    dialogTriggerRef.current?.click();
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
    <StyledItemBox
      onMouseOver={() => setItemMenuIconVisible(id)}
      onMouseOut={() => setItemMenuIconVisible(null)}
    >
      <StyledDDContainer
        style={{
          visibility:
            itemMenuIconVisible === id ||
            (showDropDown.state && showDropDown.value === id)
              ? "visible"
              : "hidden",
        }}
      >
        <DropDownMenu
          width="100px"
          open={showDropDown.state}
          onOpenChange={(state: boolean) =>
            setShowDropDown({
              state,
              value: state ? id : null,
            })
          }
          mini
        >
          <StyledFieldType
            onClick={() => {
              setShowDropDown(initialDropDownState);
              navigate(
                `/stores/${item.storeId}/items/${item.id}?currentTab=defaults`
              );
            }}
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
      <StyledImageView>
        {item && item.imageUrls && item.imageUrls.length > 0 && (
          <ImageSlider images={item.imageUrls} />
        )}
      </StyledImageView>
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
          <StyledParagraph>{item.comment}</StyledParagraph>
        </>
      )}
    </StyledItemBox>
  );
};

export default ItemView;

// TODO: fix bug with item nenu icon showing aside delete dialog