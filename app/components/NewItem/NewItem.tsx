import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  useFetcher,
  useMatches,
  useNavigate,
  useParams,
  useSearchParams,
} from "@remix-run/react";
import invariant from "tiny-invariant";
import isEqual from "lodash/isEqual";
import { Button } from "theme-ui";
import * as Tabs from "@radix-ui/react-tabs";

import { StyledInputHolder } from "~/styles/stores/new.styled";
import { IoAddOutline } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";

import TextArea from "../Inputs/TextArea/TextArea";
import Text from "../Inputs/Text/Text";
import { CustomFields, MultiImageUploader } from "~/components";

import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";


import { InputContainer } from "../Inputs/Text/Text.styled";
import {
  StyledBtnContainer,
  StyledTabsContent,
  StyledButtonContent,
} from "./NewItem.styled";
import Dialog from "../Dialog/Dialog";

import {
  StyledTabsList,
  StyledTabsTrigger,
} from "../ImageUploader/ImageDialog.styled";

export type NewItemTriggerProps = {
  onClick: () => void;
};

export type NewItemProps = {
  isNewItem?: boolean | undefined;
};

export type ItemData = {
  itemName: string;
  itemPrice: string;
  itemQuantity: string;
  itemComment: string;
};

export const NewItemTrigger = ({ onClick }: NewItemTriggerProps) => {
  return (
    <StyledIconButton onClick={onClick} style={{ marginLeft: "auto" }}>
      <IoAddOutline />
    </StyledIconButton>
  );
};

const initialItemData: ItemData = {
  itemName: "",
  itemPrice: "",
  itemQuantity: "",
  itemComment: "",
};

const NewItem = ({ isNewItem }: NewItemProps) => {
  const { t } = useTranslation();
  const fetcher = useFetcher();
  const matches = useMatches();
  const [queryParams] = useSearchParams();
  const { storeId, itemId } = useParams();
  const [currentTab, setCurrentTab] = useState<string | null>("defaults");
  const navigate = useNavigate();

  const [open, setOpen] = useState<boolean>(false);
  const [itemFormData, setItemFormData] = useState<ItemData>(initialItemData);

  const currentUrlTab = queryParams.get("currentTab");

  invariant(storeId, "missing store id");

  const matchItem =
    !!storeId && !!itemId
      ? matches.find(
          (match) => match.pathname === `/stores/${storeId}/items/${itemId}`
        )
      : undefined;

  const item = matchItem?.data.item;

  const formattedItem = item
    ? {
        itemName: item.name,
        itemPrice: item.price,
        itemComment: item.comment,
        itemQuantity: item.quantity,
      }
    : undefined;

  useEffect(() => {
    if (!isNewItem && item && item.id) {
      setItemFormData({
        itemName: item.name,
        itemPrice: item.price,
        itemComment: item.comment,
        itemQuantity: item.quantity,
      });
      setOpen(true);
    }
  }, [storeId, itemId, item, isNewItem]);

  const handleTabValueChange = (value: string) => {
    setCurrentTab(value);
    if (!isNewItem) {
      navigate(`/stores/${storeId}/items/${itemId}?currentTab=${value}`);
    }
  };

  const handleItemDeetsFormChange = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    setItemFormData({
      ...itemFormData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSaveItemField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    fetcher.submit(itemFormData, {
      method: "post",
      action: `/stores/${storeId}/items/new`,
    });
  };

  const handleUpdateItemField = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    fetcher.submit(itemFormData, {
      method: "put",
      action: `/stores/${storeId}/items/${itemId}/update`,
    });
  };

  const disabledSubmitButton =
    !isNewItem && formattedItem && isEqual(formattedItem, itemFormData);

  return (
    <Dialog
      closeable
      open={open}
      onClose={() => {
        setOpen(false);
        navigate("..");
      }}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
      <Tabs.Root
        value={currentUrlTab || currentTab || "defaults"}
        onValueChange={handleTabValueChange}
        defaultValue="defaults"
      >
        <StyledTabsList aria-label="Manage your account">
          <StyledTabsTrigger value="defaults">
            {t("defaultFields")}
          </StyledTabsTrigger>
          <StyledTabsTrigger value="uploads" disabled={isNewItem}>
            {t("uploadImages")}
          </StyledTabsTrigger>
          <StyledTabsTrigger value="customs" disabled={isNewItem}>
            {t("customFields")}
          </StyledTabsTrigger>
        </StyledTabsList>
        <StyledTabsContent value="defaults">
          <fetcher.Form method="post" onChange={handleItemDeetsFormChange}>
            <StyledInputHolder>
              <InputContainer
                style={{ position: "relative", paddingBottom: "1.2rem" }}
              >
                <Text
                  labelText={`${t("name")}:`}
                  htmlFor="itemName"
                  name="itemName"
                  value={itemFormData.itemName}
                  horizontal
                  error={fetcher.data?.itemName?._errors[0] || ""}
                  required
                />
              </InputContainer>
            </StyledInputHolder>
            <StyledInputHolder>
              <InputContainer
                style={{ position: "relative", paddingBottom: "1.2rem" }}
              >
                <Text
                  labelText={`${t("price")}:`}
                  htmlFor="itemPrice"
                  name="itemPrice"
                  value={itemFormData.itemPrice}
                  type="number"
                  horizontal
                  error={fetcher.data?.itemPrice?._errors[0] || ""}
                  min="0"
                  required
                />
              </InputContainer>
            </StyledInputHolder>
            <StyledInputHolder>
              <InputContainer
                style={{ position: "relative", paddingBottom: "1.2rem" }}
              >
                <Text
                  labelText={`${t("quantity")}:`}
                  htmlFor="itemQuantity"
                  name="itemQuantity"
                  value={itemFormData.itemQuantity}
                  type="number"
                  horizontal
                  error={fetcher.data?.itemQuantity?._errors[0] || ""}
                  min="0"
                  required
                />
              </InputContainer>
            </StyledInputHolder>
            <StyledInputHolder>
              <InputContainer>
                <TextArea
                  labelText={`${t("comment")}:`}
                  htmlFor="itemComment"
                  name="itemComment"
                  value={itemFormData.itemComment}
                  id="itemComment"
                  rows={5}
                  cols={50}
                  horizontal
                />
              </InputContainer>
            </StyledInputHolder>
            <StyledBtnContainer disabled={disabledSubmitButton}>
              <Button
                type="submit"
                disabled={
                  fetcher.state === "submitting" || disabledSubmitButton
                }
                onClick={
                  isNewItem ? handleSaveItemField : handleUpdateItemField
                }
                name="_action"
                value={isNewItem ? "saveItemDetails" : "updateItemDetails"}
              >
                <StyledButtonContent>
                  {isNewItem ? t("saveItemDetails") : t("updateItemDetails")}
                  <RxDoubleArrowRight size={20} />
                </StyledButtonContent>
              </Button>
            </StyledBtnContainer>
          </fetcher.Form>
        </StyledTabsContent>
        <StyledTabsContent value="uploads">
            <MultiImageUploader labelText={`${t("uploadImages")}:`} />
        </StyledTabsContent>
        <StyledTabsContent value="customs">
          <CustomFields />
        </StyledTabsContent>
      </Tabs.Root>
    </Dialog>
  );
};

export default NewItem;
