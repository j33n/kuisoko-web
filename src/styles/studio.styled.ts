import styled from "styled-components";

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

export const Subtitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  color: ${({ theme: { colors } }) => colors.text};
  background-clip: text;
  -webkit-background-clip: text;
`;

export const LargeText = styled.h3`
  font-size: 1rem;
  font-weight: 200;
  color: ${({ theme: { colors } }) => colors.text};
  background-clip: text;
  -webkit-background-clip: text;
`;
