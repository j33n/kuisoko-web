import styled, { css } from "styled-components";

import { Link } from "react-router-dom";

import { Avatar } from "../../components";
import { Title } from "./studio.styled";

export const GRADIENTS = {
  moonlightAsteroid: css`
    background: #0f2027; /* fallback for old browsers */
    background: -webkit-linear-gradient(
      to right,
      #0f2027,
      #203a43,
      #2c5364
    ); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(
      to right,
      #0f2027,
      #203a43,
      #2c5364
    ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  `,
  darkSkies: css`
    background: #4b79a1;
    background: -webkit-linear-gradient(to right, #283e51, #4b79a1);
    background: linear-gradient(to right, #283e51, #4b79a1);
  `,
  darkOcean: css`
    background: #373b44;
    background: -webkit-linear-gradient(to right, #4286f4, #373b44);
    background: linear-gradient(to right, #4286f4, #373b44);
  `,
  brokenHearts: css`
    background: #d9a7c7;
    background: -webkit-linear-gradient(to right, #fffcdc, #d9a7c7);
    background: linear-gradient(to right, #fffcdc, #d9a7c7);
  `,
};

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "main";
  width: 100vw;
  background: ${({ theme: { colors } }) => colors.background};
`;

export const Paragraph = styled.p`
  text-align: center;
  color: ${({ theme: { colors } }) =>
    colors && colors.text ? colors.text : "#fff"};
`;

export const ParagraphHolder = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin: 0 auto;
`;

export const MainParagraph = styled(ParagraphHolder)`
  display: flex;
  background-image: linear-gradient(to left, #553c9a, #b393d3);
  width: calc(100% - 40vw);
  margin: auto 0;
  padding: 1rem 20vw;
`;

export const BaseParagraph = styled(Paragraph)`
  text-align: center;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${({ theme: { colors } }) => colors.nav};
  text-decoration: none;
  font-size: 0.9rem;
  padding: 1rem 0;
  cursor: pointer;

  &:hover {
    color: ${({ theme: { colors } }) => colors.navHover};
  }
`;

export const StyledH1 = styled(Title)`
  text-align: center;
  width: 70%;
  margin: 0 auto;
  padding: 3rem 0;
  background-image: linear-gradient(to left, #553c9a, #b393d3);
  color: transparent;
  background-clip: text;
  -webkit-background-clip: text;
`;

export const StyledH2 = styled.h2`
  color: ${({ theme: { colors } }) => colors.text};
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 700;
  letter-spacing: 0.1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  text-align: center;
`;

export const StyledText = styled.span`
  color: ${({ theme: { colors } }) =>
    colors && colors.text ? colors.text : "#fff"};
  font-size: 1rem;
  line-height: 1.5rem;
  font-weight: 400;
  letter-spacing: 0.1rem;
  margin: 1rem 0;
  padding: 1rem 0;
  text-align: center;
`;

export const ImgColumnUl = styled.ul`
  display: grid;
  grid-gap: 1rem;
  grid-auto-rows: minmax(100px, auto);
  grid-auto-flow: dense;
  grid-template-areas:
    "a a b"
    "a a c"
    "d d c";
  padding: 1rem;
`;

export const ImgColumnLi = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  a {
    color: ${({ theme: { colors } }) => colors && colors.text};
    text-decoration: none;
  }

  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: cover;
    object-position: center;
    border-radius: 0.5rem;
  }
`;

export const Block = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
`;

export const ErrorBlock = styled(Block)`
  color: red;
`;

export const ContactForm = styled(Block)`
  position: relative;

  input {
    margin: 1rem 0;
  }
`;

export const ContactBlock = styled(Block)`
  width: 100%;
  margin: 0 auto;
  ${GRADIENTS.brokenHearts};
`;

export const Feed = styled(Block)`
  width: 100%;
  margin: 0 auto;
`;

export const FormHolder = styled(Block)`
  position: relative;
`;

export const HeadingBox = styled(Block)`
  position: relative;
  width: 100%;
`;

export const AboutBlock = styled(Block)`
  width: 100%;
  ${GRADIENTS.darkSkies};
  padding: 1rem 0;
`;

export const TestimonialBlock = styled(Block)`
  width: 100%;
  ${GRADIENTS.darkOcean};
  padding: 1rem 0;
`;

export const TeamBlock = styled(Block)`
  width: 100%;
  ${GRADIENTS.darkSkies};
  padding: 1rem 0;
`;

export const SocialBlock = styled(Block)`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left left right right";
  grid-gap: 1rem;
  text-align: center;
  padding: 1rem 0;
`;

export const StyledFooter = styled(Block)`
  width: 100%;
  ${GRADIENTS.darkSkies};
  padding: 1rem 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  grid-template-areas: "left right";
  grid-gap: 1rem;
`;

export const FooterText = styled(StyledText)`
  text-align: left;
  margin-left: 3rem;

  a {
    color: ${({ theme: { colors } }) => colors && colors.text};
  }
`;

export const StyledAvatar = styled(Avatar)`
  width: "40px";
  height: "40px";
  borderradius: "50%";
  border: ${({ theme: { colors } }) => `2px solid ${colors.border}`};
  cursor: "pointer";

  &:hover {
    border: "2px solid #1e1d1d";
  }
`;
