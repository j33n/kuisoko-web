import { useActionData, useTransition } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import styled from "@emotion/styled";

import type { ActionArgs } from "@remix-run/node";

import { createStore } from "~/models/store.server";
import { requireUser } from "~/services/session.server";

import { TextInput, TextArea, Button } from "~/components";

import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledBtnContainer,
} from "~/styles/stores/new.styled";
import { InputContainer } from "~/components/Inputs/Text/Text.styled";

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);
  const formData = await request.formData();

  const storeName = formData.get("storeName");
  const storeComment = formData.get("storeComment");
  const storeLocation = formData.get("storeLocation");

  if (typeof storeName !== "string" || storeName.length === 0) {
    return json(
      {
        errors: {
          storeName: "Store name is required",
          storeLocation: null,
          storeComment: null,
          storeIcon: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof storeComment !== "string" || storeComment.length === 0) {
    return json(
      {
        errors: {
          storeName: null,
          storeLocation: null,
          storeComment: "Store comment/description is required",
          storeIcon: null,
        },
      },
      { status: 400 }
    );
  }

  if (typeof storeLocation !== "string" || storeLocation.length === 0) {
    return json(
      {
        errors: {
          storeName: null,
          storeLocation: "Store location is required",
          storeComment: null,
          storeIcon: null,
        },
      },
      { status: 400 }
    );
  }

  const store = await createStore({
    name: storeName,
    comment: storeComment,
    location: storeLocation,
    userId: user.id,
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
              htmlFor="storeName"
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
            Create Store
          </Button>
        </StyledBtnContainer>
      </StyledForm>
    </StyledCreateStore>
  );
}
