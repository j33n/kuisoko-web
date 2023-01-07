import styled from "styled-components";

import { Box, components } from "..";
import { LargeText } from "../../styles/studio.styled";
import { IComponentView } from "../../types";

const Container = styled(Box)`
  border: ${({ theme: { colors } }) => colors && colors.border ? `1px solid ${colors.border}` : "#000"};
  padding: 0.5rem;
  margin-left: 0.5rem !important;
`;

const ComponentView = ({ componentName }: IComponentView) => {
  return (
    <Container>
      <LargeText>{componentName}</LargeText>
      <Box>
        </Box>
        {/* {components[componentName] || */}
          {`No component with name ${componentName} was found!!`}
    </Container>
  );
};

export default ComponentView;
