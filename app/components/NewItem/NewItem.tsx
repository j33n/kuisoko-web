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
import { HiOutlineSelector } from "react-icons/hi";

import { StyledInputHolder } from "~/styles/stores/new.styled";
import { IoAddOutline } from "react-icons/io5";
import { RxDoubleArrowRight } from "react-icons/rx";

import TextArea from "../Inputs/TextArea/TextArea";
import Text from "../Inputs/Text/Text";
import { CustomFields, MultiImageUploader } from "~/components";

import { StyledIconButton } from "../Layout/DropDownMenu/DropDownMenu.styled";

import DropDownMenu from "../Layout/DropDownMenu/DropDownMenu";
import fieldTypes from "~/data/fieldTypes";

import { InputContainer } from "../Inputs/Text/Text.styled";
import {
  StyledDropDown,
  StyledDropDownHeader,
  StyledFieldType,
  StyledBtnContainer,
  StyledTabHeader,
  InactiveText,
  StyledTabsContent,
  StyledButtonContent,
} from "./NewItem.styled";
import Dialog from "../Dialog/Dialog";

import {
  StyledTabsList,
  StyledTabsTrigger,
} from "../ImageUploader/ImageDialog.styled";

import type { Field } from "~/data/fieldTypes";

export type NewItemTriggerProps = {
  onClick: () => void;
};

export type NewItemProps = {
  isNewItem?: boolean | undefined;
};

export interface CustomFieldProps extends Field {
  inputName: string;
}

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
  const [customFields, setCustomFields] = useState<CustomFieldProps[]>([]);
  const [dropDownState, setDropDownState] = useState<boolean>(false);
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

  const formattedItem = item ? {
    itemName: item.name,
    itemPrice: item.price,
    itemComment: item.comment,
    itemQuantity: item.quantity,
  } : undefined;

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

  const customLabel = (type: string) => {
    const similarInputs = customFields.filter((field) => field.type === type);

    if (similarInputs && similarInputs.length > 0) {
      const inputNumIds = similarInputs.map(
        (input) => input.inputName.split("_")[1]
      );

      const id = inputNumIds.sort((a, b) => Number(a) - Number(b)).reverse()[0];
      return `${type}_${Number(id) + 1}`;
    }
    return `${type}_0`;
  };

  const handleAddNewField = (field: Field) => {
    setDropDownState(false);
    setCustomFields([
      ...customFields,
      {
        ...field,
        inputName: customLabel(field.type),
      },
    ]);
  };

  const handleDeleteField = (fieldId: string) => {
    const toDel = customFields.filter(
      (customField) => customField.inputName !== fieldId
    );

    setCustomFields(toDel);
  };

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
              {/* TODO: Mark as inactive until changes have been made to the form */}
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
                  <RxDoubleArrowRight />
                </StyledButtonContent>
              </Button>
            </StyledBtnContainer>
          </fetcher.Form>
        </StyledTabsContent>
        {/* TODO: since disabled move to update view */}
        <StyledTabsContent value="uploads">
          <form
            method="post"
            action={`/stores/${storeId}/items/uploads`}
            encType="multipart/form-data"
          >
            <MultiImageUploader labelText={`${t("uploadImages")}:`} />
            <StyledBtnContainer>
              <Button type="submit">{t("saveUploads")}</Button>
            </StyledBtnContainer>
          </form>
        </StyledTabsContent>
        <StyledTabsContent value="customs">
          <StyledTabHeader>
            <InactiveText style={{ maxWidth: "10rem" }}>Name</InactiveText>
            <InactiveText>Value</InactiveText>
            <StyledDropDown>
              <DropDownMenu
                triggerIcon={<HiOutlineSelector />}
                onOpenChange={setDropDownState}
                open={dropDownState}
                width="100px"
              >
                <StyledDropDownHeader>Add</StyledDropDownHeader>
                {fieldTypes.map((field) => {
                  return (
                    <StyledFieldType
                      key={field.id}
                      onClick={() => handleAddNewField(field)}
                    >
                      {field.name}
                    </StyledFieldType>
                  );
                })}
              </DropDownMenu>
            </StyledDropDown>
          </StyledTabHeader>
          <CustomFields
            customFields={customFields}
            onDelete={(id) => handleDeleteField(id)}
          />
          {customFields && customFields.length > 0 && (
            <StyledBtnContainer>
              <Button type="submit">{t("saveItemDetails")}</Button>
            </StyledBtnContainer>
          )}
        </StyledTabsContent>
      </Tabs.Root>
    </Dialog>
  );
};

export default NewItem;
