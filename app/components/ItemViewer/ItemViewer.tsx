import {
  StyledContent,
  StyledLogoBox,
} from "~/styles/stores/singleStore.styled";
import ImageDialog from "../ImageUploader/ImageDialog";
import type { Item } from "@prisma/client";
import { CiShoppingCart } from "react-icons/ci";
import { LoaderArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import styled from "@emotion/styled";
import { FlexCenter } from "~/styles/page.styled";
import { useState } from "react";

export type ItemAdderProps = {
  item: any;
};

export const StyledPlaceholder = styled.span`
  color: ${({ theme: { colors } }) => colors.gray4};
`;

export const StyledNewItemBox = styled(FlexCenter)`
  flex-direction: column;
`;

export const StyledItemContainer = styled.div`
  display: flex;
`;

export const ItemViewer = ({ item }: ItemAdderProps) => {
  const [showPlaceholder, setShowPlaceholder] = useState<boolean>(false);
  // const saveNameBtnRef = () => {
  //   console.log("_______________");
  // };

  return (
    <StyledContent>
      {/* icon */}
      {/* name */}
      {/* comment */}
      {/* price */}
      {/* currency */}
      {/* categories */}
      {/* unit */}
      {/* quantity */}

      {/* <StyledLogoBox>
        <ImageDialog tabSize="75%" trigger={<CiShoppingCart />} />
  </StyledLogoBox> */}
      <StyledItemContainer>
        <p contentEditable="true" onFocus={() => setShowPlaceholder(false)}>
          {item.name}
        </p>
        <p contentEditable="true">
          {item.comment || <StyledPlaceholder>Item comment</StyledPlaceholder>}
        </p>
        <p contentEditable="true">
          {item.price || <StyledPlaceholder>Item comment</StyledPlaceholder>}
        </p>
        <p contentEditable="true">
          {item.quantity || <StyledPlaceholder>Item comment</StyledPlaceholder>}
        </p>
      </StyledItemContainer>
      {/* <p contentEditable="true">{item.price}</p>
      <p contentEditable="true">{item.categories}</p>
      <p contentEditable="true">{item.unit}</p>
      <p contentEditable="true">{item.quantity}</p> */}
    </StyledContent>
  );
};

export default ItemViewer;