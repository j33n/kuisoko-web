import {
  Avatar,
  AspectImage,
  AspectRatio,
  Badge,
  Card,
  Close,
  Container,
  Divider,
  Donut,
  Embed,
  Field,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  MenuButton,
  Message,
  NavLink,
  Paragraph,
  Progress,
  Spinner,
  Switch,
  Text,
} from "theme-ui";
// forms
import {
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
} from "theme-ui";

import Button from "./Forms/Button/Button";
import Layout from "./Layout/Layout";
import Header from "./Layout/Header";
import Footer from "./Layout/Footer";
import Box from "./Layout/Box/Box";
import Preview from "./Layout/Preview/Preview";
import Sidebar from "./Layout/Sidebar/Sidebar";
import Alert from "./Alert/Alert";
import ComponentView from "./DataDisplay/ComponentView";

export const components = {
  BUTTON: (
    <>
      <Button mr={2}>Beep</Button>
      <Button variant="secondary">Boop</Button>
      <Button ml={2} hidden>
        Hidden
      </Button>
    </>
  ),
  BOX: (
    <Box p={4} color="background" bg="primary">
      Beep
    </Box>
  ),
  AVATAR: <Avatar src={""} />,
  ALERT: (
    <>
      <Alert>
        Beep boop, this is an alert!
        <Close ml="auto" mr={-2} />
      </Alert>
    </>
  ),
  LABEL: (
    <>
      <Label>Form Label</Label>,
      <Input defaultValue="Hello" />
    </>
  ),
  SELECT: (
    <>
      <Select defaultValue="Hello">
        <option>Hello</option>
        <option>Hi</option>
        <option>Beep</option>
        <option>Boop</option>
      </Select>
    </>
  ),
  TEXTAREA: <Textarea defaultValue="Hello" rows={8} />,
  RADIO: (
    <>
      <Label>
        <Radio name="dark-mode" value="true" defaultChecked={true} />
        Dark Mode
      </Label>
      <Label>
        <Radio name="dark-mode" value="false" />
        Light Mode
      </Label>
    </>
  ),
  SLIDER: <Slider defaultValue={25} />,
  ASPECTIMAGE: <AspectImage ratio={4 / 3} src={""} />,
  ASPECTRATIO: (
    <AspectRatio
      ratio={16 / 9}
      sx={{
        p: 4,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "background",
        bg: "primary",
      }}
    >
      <Heading>Aspect Ratio</Heading>
    </AspectRatio>
  ),
  BADGE: <Badge>Badge</Badge>,
  CARD: (
    <Card
      sx={{
        maxWidth: 256,
      }}
    >
      <Image src={""} />
      <Text>Card</Text>
    </Card>
  ),
  CLOSE: <Close />,
  CONTAINER: (
    <Container p={4} bg="muted">
      Centered container
    </Container>
  ),
  DIVIDER: <Divider />,
  DONUT: <Donut value={1 / 2} />,
  EMBED: <Embed src="https://www.youtube.com/embed/GNCd_ERZvZM" />,
  FIELD: <Field label="Email" name="email" defaultValue="" />,
  FLEX: (
    <Flex>
      <Box p={2} bg="primary" color="white" sx={{ flex: "1 1 auto" }}>
        Flex
      </Box>
      <Box p={2} bg="muted">
        Box
      </Box>
    </Flex>
  ),
  GRID: (
    <Grid width={[128, null, 192]}>
      <Box bg="primary">Box</Box>
      <Box bg="muted">Box</Box>
      <Box bg="primary">Box</Box>
      <Box bg="muted">Box</Box>
    </Grid>
  ),
  HEADING: <Heading as="h3">Subhead</Heading>,
  ICONBUTTON: (
    <IconButton aria-label="Toggle dark mode">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        fill="currentcolor"
      >
        <circle
          r={11}
          cx={12}
          cy={12}
          fill="none"
          stroke="currentcolor"
          strokeWidth={2}
        />
      </svg>
    </IconButton>
  ),
  IMAGE: <Image src={""} />,
  LINK: <Link href="#!">Hello</Link>,
  MENUBUTTON: <MenuButton aria-label="Toggle Menu" />,
  MESSAGE: <Message>This is just a message for someone to read</Message>,
  NAVLINK: (
    <>
      <Flex as="nav">
        <NavLink href="#!" p={2}>
          Home
        </NavLink>
        <NavLink href="#!" p={2}>
          Blog
        </NavLink>
        <NavLink href="#!" p={2}>
          About
        </NavLink>
      </Flex>
    </>
  ),
  PARAGRAPH: (
    <Paragraph as="small" sx={{ fontStyle: "italic" }}>
      Something a bit less important
    </Paragraph>
  ),
  PROGRESS: (
    <Progress max={1} value={1 / 2}>
      50%
    </Progress>
  ),
  SPINER: <Spinner />,
  SWITCH: <Switch label="Enable email alerts?" />,
  TEXT: (
    <>
      <Text variant="caps">Hello</Text>
      <Text
        sx={{
          fontSize: 2,
          fontWeight: "bold",
          display: "block",
        }}
      >
        How's it going?
      </Text>
    </>
  ),
};

export {
  // primary components
  Button,
  Layout,
  Header,
  Footer,
  Box,
  Preview,
  Sidebar,
  Avatar,
  Alert,
  Label,
  Input,
  Select,
  Textarea,
  Radio,
  Checkbox,
  Slider,
  AspectImage,
  AspectRatio,
  Badge,
  Card,
  Close,
  Container,
  Divider,
  // Donut,
  Embed,
  Field,
  Flex,
  Grid,
  Heading,
  IconButton,
  Image,
  Link,
  MenuButton,
  Message,
  NavLink,
  Paragraph,
  Progress,
  Spinner,
  Switch,
  Text,
  // secondary components
  ComponentView,
};
