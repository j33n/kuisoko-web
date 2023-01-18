import { useSpring, animated } from "react-spring";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";

import { Link, Text } from "../components";
import {
  BaseParagraph,
  Container,
  FooterText,
  HeadingBox,
  MainParagraph,
  SocialBlock,
  StyledFooter,
  StyledH1,
} from "../styles/index.styled";

const renderFooterWithSocials = () => {
  return (
    <SocialBlock>
      <Link href="https://twitter.com/kuisoko">
        <FaFacebookF size={24} />
      </Link>
      <Link href="https://www.instagram.com/kuisoko/">
        <FaTwitter size={24} />
      </Link>
      <Link href="https://www.linkedin.com/company/kuisoko/">
        <FaInstagram size={24} />
      </Link>
      <Link href="https://www.linkedin.com/company/kuisoko/">
        <FaLinkedinIn size={24} />
      </Link>
    </SocialBlock>
  );
};

export interface IAnimateText {
  children: React.ReactNode;
};

const AnimateText = ({ children }: IAnimateText) => {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0 },
      to: { opacity: 1 },
    }),
    []
  );

  return <animated.div style={props}>{children}</animated.div>;
};

export default function Landing() {
  return (
    <Container>
      <HeadingBox id="heading">
        <StyledH1>
          In the mood of building something cool for Africa, so are we...
        </StyledH1>
      </HeadingBox>
      <MainParagraph>
        <AnimateText>
          <BaseParagraph>
            Browse the best web components built by our amazing community to
            empower modern web apps in Africa
          </BaseParagraph>
        </AnimateText>
      </MainParagraph>
      <StyledFooter>
        <FooterText>
          <Text variant="footer">
            <Link href="https://kuisoko.com/">
              copyright &copy; 2022 kuisoko ltd
            </Link>
          </Text>
        </FooterText>
        {renderFooterWithSocials()}
      </StyledFooter>
    </Container>
  );
}
