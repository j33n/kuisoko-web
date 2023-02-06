import { useActionData } from "@remix-run/react";
import { json } from "@remix-run/node";
import styled from "@emotion/styled";
import { redirect } from "@remix-run/node";

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

import addStoreIcon from "~/assets/images/addStoreIcon.svg";
import { useEffect, useRef, useState } from "react";

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const imagePlaceholder = <img src={addStoreIcon} alt="add store icon" />;

export async function action({ request }: ActionArgs) {
  const user = await requireUser(request);

  const formData = await request.formData();

  const storeName = formData.get("storeName");
  const storeComment = formData.get("storeComment");
  const storeIcon = "";
  const storeCover = "";
  const storeLocation = formData.get("storeLocation");
  const storeCategories = [""];

  console.log("formData ===============>>>>", formData.get("storeName"));

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

  const store = await createStore({
    name: storeName,
    comment: storeComment,
    icon: storeIcon,
    cover: storeCover,
    categories: storeCategories,
    location: storeLocation,
    userId: user.id,
  });

  console.log("🎉", store);

  return redirect(`/store/${store.id}`);
}

export default function NewStoreRoute() {
  const actionData = useActionData<typeof action>();
  // const [formData, setFormData] = useState({
  //   name: "",
  //   comment: "",
  //   icon: "",
  //   cover: "",
  //   location: "",
  //   categories: [],
  // });

  console.log("----------------->>>>>>", actionData);

  // const handleFileUpload = async (file: File) => {
  //   let inputFormData = new FormData();
  //   inputFormData.append("storeIcon", file);

  //   // TODO: fix this
  //   // const response = await fetch("/avatar", {
  //   //   method: "POST",
  //   //   body: inputFormData,
  //   // });

  //   // const { storeIcon } = await response.json();
  //   // setFormData({
  //   //   ...formData,
  //   //   icon: storeIcon,
  //   // });
  // };

  return (
    <StyledCreateStore>
      <StyledForm method="post">
        <StyledInputHolder>
          <StyledLogoBox>
            <TextLabel htmlFor="storeIcon">Icon:</TextLabel>
            <ImageUploader
              placeholder={imagePlaceholder}
              // imageUrl={formData.icon || ""}
              imageUrl={""}
              onChange={() => {}}
            />
          </StyledLogoBox>
          <InputContainer>
            <TextInput
              labelText="Name:"
              htmlFor="storeName"
              name="storeName"
              error={actionData?.errors?.storeName}
            />
            <TextInput
              labelText="Location:"
              htmlFor="storeLocation"
              name="storeLocation"
              error={actionData?.errors?.storeLocation}
            />
          </InputContainer>
        </StyledInputHolder>
        <StyledInputHolder>
          <TextLabel htmlFor="storeComment">Comment:</TextLabel>
          <TextArea
            name="storeComment"
            id="storeComment"
            rows={5}
            cols={50}
            error={actionData?.errors?.storeComment}
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
