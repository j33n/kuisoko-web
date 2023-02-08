import { useActionData } from "@remix-run/react";
import {
  json,
  redirect,
  unstable_parseMultipartFormData,
} from "@remix-run/node";
import styled from "@emotion/styled";

import type { ActionArgs } from "@remix-run/node";

import { createStore } from "~/models/store.server";
import { requireUser } from "~/services/session.server";

import { TextInput, TextLabel, ImageUploader, TextArea } from "~/components";

import {
  StyledCreateStore,
  StyledForm,
  StyledInputHolder,
  StyledLogoBox,
  StyledBtnContainer,
  StyledButton,
} from "./styles/new.styled";

import { useState } from "react";
import { s3UploaderHandler } from "~/models/uploader-handler.server";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  const formData = await unstable_parseMultipartFormData(
    request,
    s3UploaderHandler
  );

  const storeIcon = formData.get("storeIcon");

  const storeName = formData.get("storeName");
  const storeComment = formData.get("storeComment");
  const storeCover = "";
  const storeLocation = formData.get("storeLocation");
  const storeCategories = [""];

  // server validations
  if (typeof storeName !== "string" || storeName.length === 0) {
    return json(
      {
        errors: {
          storeName: "Store name is required",
          storeLocation: null,
          storeComment: null,
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
        },
      },
      { status: 400 }
    );
  }

  // create store
  const store = await createStore({
    name: storeName,
    comment: storeComment,
    icon: storeIcon,
    cover: storeCover,
    categories: storeCategories,
    location: storeLocation,
    userId: user.id,
  });

  return redirect(`/stores/${store.id}`);
}

export default function NewStoreRoute() {
  const actionData = useActionData<typeof action>();
  const [selectedFile, setSelectedFile] = useState<any>(null);

  return (
    <StyledCreateStore>
      <StyledForm method="post" encType="multipart/form-data">
        <StyledInputHolder>
          <StyledLogoBox>
            <TextLabel htmlFor="storeIcon">Icon:</TextLabel>
            <ImageUploader
              // imageUrl={formData.icon || ""}
              imageUrl={""}
              name="storeIcon"
              id="storeIcon"
              handleFileChange={(file) => setSelectedFile(file)}
            />
          </StyledLogoBox>
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
          <StyledButton type="submit">Create Store</StyledButton>
        </StyledBtnContainer>
      </StyledForm>

      {/* TODO: investigate using images so avoid naked pages */}
      {/* <ImageContainer align="bottomRight">
        <StyledImg src={shopImage} alt="shop placeholder" />
      </ImageContainer> */}
    </StyledCreateStore>
  );
}
