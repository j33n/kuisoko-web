import { useActionData, useTransition } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import styled from "@emotion/styled";

import type { ActionArgs } from "@remix-run/node";

import { createItem } from "~/models/items.server";
import { requireUser } from "~/services/session.server";

import { TextInput, TextArea, Button } from "~/components";

import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledBtnContainer,
} from "~/styles/stores/new.styled";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const itemName = formData.get("itemName");
  const itemComment = formData.get("itemComment");

  // server validations
  if (typeof itemName !== "string" || itemName.length === 0) {
    return json(
      {
        errors: {
          itemName: "Item name is required",
          itemComment: null,
          itemIcon: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof itemComment !== "string" || itemComment.length === 0) {
    return json(
      {
        errors: {
          itemName: null,
          itemComment: "Item comment is required",
          itemIcon: null,
        },
      },
      { status: 400 }
    );
  }

  // create store
  const store = await createItem({
    name: itemName,
    comment: itemComment,
    price: 0,
    categories: [],
    quantity: 0,
  });

  return redirect(`/stores/${store.id}`);
}

export default function NewStoreRoute() {
  const actionData = useActionData<typeof action>();
  const transition = useTransition();

  return (
    <StyledCreateStore>
      <StyledForm method="post" encType="multipart/form-data">
        <StyledInputHolder>
          <InputContainer>
            <TextInput
              labelText="Name:"
              htmlFor="itemName"
              name="storeName"
              error={actionData?.errors?.storeName || ""}
              required
            />
            <TextInput
              labelText="Location:"
              htmlFor="storeLocation"
              name="storeLocation"
              error={actionData?.errors?.storeLocation || ""}
              required
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <TextArea
            labelText="Comment:"
            htmlFor="storeComment"
            name="storeComment"
            id="storeComment"
            rows={5}
            cols={50}
            error={actionData?.errors?.storeComment}
            required
          />
        </StyledInputHolder>
        <StyledBtnContainer>
          <Button
            type="submit"
            loading={transition.state}
            sx={{ width: "20vw" }}
          >
            Create Item
          </Button>
        </StyledBtnContainer>
      </StyledForm>
    </StyledCreateStore>
  );
}
