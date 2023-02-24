import styled from "@emotion/styled";

export const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  position: relative;
  background: ${({ theme: { colors } }) => colors.background};
  color: ${({ theme: { colors } }) => colors.text};
`;
