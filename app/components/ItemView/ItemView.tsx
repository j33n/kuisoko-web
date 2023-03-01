import { EditableP, StyledItemBox } from "./ItemView.styled";

export type ItemViewProps = {
  item: any;
  key: string;
};

export const ItemView = ({ item, key }: ItemViewProps) => {
  return (
    <StyledItemBox key={key}>
      <EditableP contentEditable={true}>{item.name}</EditableP>
      <EditableP contentEditable={true}>{item.comment}</EditableP>
      <EditableP contentEditable={true}>{item.price}</EditableP>
      <EditableP contentEditable={true}>{item.quantity}</EditableP>
    </StyledItemBox>
  );
};

export default ItemView;
