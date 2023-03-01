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

export type ItemAdderProps = {
  item: Item;
};

export const StyledPlaceholder = styled.span`
  color: ${({ theme: { colors } }) => colors.gray4};
`;

export const ItemAdder = ({ item }: ItemAdderProps) => {
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
      <p contentEditable="true">
        <StyledPlaceholder>Item comment</StyledPlaceholder>
      </p>
      <p contentEditable="true">
        <StyledPlaceholder>Item comment</StyledPlaceholder>
      </p>
      {/* <p contentEditable="true">{item.price}</p>
      <p contentEditable="true">{item.categories}</p>
      <p contentEditable="true">{item.unit}</p>
      <p contentEditable="true">{item.quantity}</p> */}
    </StyledContent>
  );
};

export default ItemAdder;
