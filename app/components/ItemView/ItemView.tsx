import { useTranslation } from "react-i18next";
import { EditableP, StyledItemBox, StyledPLabel } from "./ItemView.styled";

export type ItemViewProps = {
  item: any;
  key: string;
};

export const ItemView = ({ item, key }: ItemViewProps) => {
  const { t } = useTranslation();

  return (
    <StyledItemBox key={key}>
      <StyledPLabel>{t("name")}</StyledPLabel>
      <EditableP contentEditable={true}>{item.name}</EditableP>
      <StyledPLabel>{t("comment")}</StyledPLabel>
      <EditableP contentEditable={true}>{item.comment}</EditableP>
      <StyledPLabel>{t("price")}</StyledPLabel>
      <EditableP contentEditable={true}>{item.price}</EditableP>
      <StyledPLabel>{t("quantity")}</StyledPLabel>
      <EditableP contentEditable={true}>{item.quantity}</EditableP>
    </StyledItemBox>
  );
};

export default ItemView;
