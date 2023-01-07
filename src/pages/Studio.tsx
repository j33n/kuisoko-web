import styled from "styled-components";
import { Box, ComponentView, Grid } from "../components";

import { LargeText, Title } from "../styles/studio.styled";


const componentList = [
  "BUTTON",
  "BOX",
  "AVATAR",
  "ALERT",
  "LABEL",
  "SELECT",
  "TEXTAREA",
  "RADIO",
  "SLIDER",
  "ASPECTIMAGE",
  "ASPECTRATIO",
  "BADGE",
  "CARD",
  "CLOSE",
  "CONTAINER",
  "DIVIDER",
  "DONUT",
  "EMBED",
  "FIELD",
  "FLEX",
  "GRID",
  "HEADING",
  "ICONBUTTON",
  "IMAGE",
  "LINK",
  "MENUBUTTON",
  "MESSAGE",
  "NAVLINK",
  "PARAGRAPH",
  "PROGRESS",
  "SPINER",
  "SWITCH",
  "TEXT",
];

export const Container = styled(Grid)`
  width: 100%;
  background-color: ${({ theme: { colors } }) => colors.background};
  padding: 1rem;
`;

export default function Studio() {
  return (
    <Container gap={2} columns={[2, "1fr 3fr 1fr"]}>
      <Container gap={1} columns={[1, "1fr"]}>
        <Box sx={{ marginLeft: "0.5rem" }}>
          <Title>Browse components</Title>
        </Box>
        <Grid>
          {componentList.map((componentName: string) => (
            <ComponentView componentName={componentName} snapshot />
          ))}
        </Grid>
      </Container>
      <Box sx={{ background: "#fff" }}></Box>
      <Box sx={{ background: "#eee" }}>
        <LargeText></LargeText>
      </Box>
    </Container>
  );
}
