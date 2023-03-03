import type { ReactNode} from "react";
import { useState } from "react";
import Dialog from "../Dialog/Dialog";
import styled from "@emotion/styled";
import plusPlainIcon from "~/assets/images/plusPlainIcon.svg";
import { useTranslation } from "react-i18next";
import { InputContainer } from "~/routes/__index/stores/__stores/new";
import { Button } from "theme-ui";
import { StyledInputHolder } from "~/styles/stores/new.styled";
import TextArea from "../Forms/TextArea";
import TextInput from "../Forms/TextInput";
import { StyledForm,StyledBtnContainer } from "../ImageUploader/ImageUploader";

export interface NewItemProps {
  children?: ReactNode;
}

export const StyledTriggerContainer = styled.div`
  display: flex;
  background: ${({ theme: { colors } }) => colors.background};
  border: 1px solid ${({ theme: { colors } }) => colors.buttonBgHover};
  border-radius: 0.5rem;
  cursor: pointer;

  img {
    padding: 0.5rem;
  }

  &:hover {
    background: ${({ theme: { colors } }) => colors.primary};
    border: 1px solid transparent;
  }
`;

export const StyledItemsToolbar = styled.div`
  display: flex;
  width: 100%;
`;

export type NewItemTriggerProps = {
  onClick: () => void;
};

export const NewItemTrigger = ({ onClick }: NewItemTriggerProps) => {
  return (
    <StyledTriggerContainer onClick={onClick}>
      <img src={plusPlainIcon} alt="cover" />
    </StyledTriggerContainer>
  );
};

const NewItem = ({ children }: NewItemProps) => {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      closeable
      title={t("newItem")}
      open={open}
      onClose={() => setOpen(false)}
      trigger={<NewItemTrigger onClick={() => setOpen(true)} />}
    >
      <StyledForm method="post">
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("name")}:`}
              htmlFor="itemName"
              name="itemName"
              // error={actionData?.errors?.itemName || ""}
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("price")}:`}
              htmlFor="itemPrice"
              name="itemPrice"
              type="number"
              // error={actionData?.errors?.itemPrice || ""}
              min="0"
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText={`${t("quantity")}:`}
              htmlFor="itemQuantity"
              name="itemQuantity"
              type="number"
              // error={actionData?.errors?.itemPrice || ""}
              min="0"
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <TextArea
            labelText={`${t("comment")}:`}
            htmlFor="itemComment"
            name="itemComment"
            id="itemComment"
            rows={5}
            cols={50}
            // error={actionData?.errors?.itemComment}
            required
          />
        </StyledInputHolder>
        Upload images
        <StyledBtnContainer>
          <Button
            type="submit"
            // loading={transition.state}
            sx={{ width: "20vw" }}
          >
            {t("createItem")}
          </Button>
        </StyledBtnContainer>
      </StyledForm>
    </Dialog>
  );
};

export default NewItem;
