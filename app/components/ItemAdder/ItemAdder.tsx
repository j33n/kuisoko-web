import {
  StyledContent,
  StyledLogoBox,
} from "~/styles/stores/singleStore.styled";
import ImageDialog from "../ImageUploader/ImageDialog";
import type { Item } from "@prisma/client";

export type ItemAdderProps = {
  item: Item;
};

export const ItemAdder = ({ item,  }: ItemAdderProps) => {
  const saveNameBtnRef = () => {
    console.log("_______________");
  };

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

      <StyledLogoBox>
        <ImageDialog tabSize="75%" triggerIcon={""} />
      </StyledLogoBox>
      <p contentEditable="true">kshdfaksdhfkasdhf sdjbfhkjshdbfhasdf</p>
    </StyledContent>
  );
};

export default ItemAdder;
