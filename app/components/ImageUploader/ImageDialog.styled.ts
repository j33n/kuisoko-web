import * as Tabs from "@radix-ui/react-tabs";
import { styled } from "@stitches/react";
import { violet, mauve, blackA, green } from "@radix-ui/colors";

export const StyledTabsRoot = styled(Tabs.Root, {
  display: "flex",
  flexDirection: "column",
  width: 300,
  boxShadow: `0 2px 10px ${blackA.blackA4}`,
});

export const StyledTabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid ${mauve.mauve6}`,
});

export const StyledTabsTrigger = styled(Tabs.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "white",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: mauve.mauve11,
  userSelect: "none",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: violet.violet11 },
  '&[data-state="active"]': {
    color: violet.violet11,
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

export const StyledTabsContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

export const StyledFlex = styled("div", { display: "flex" });

export const StyledText = styled("p", {
  marginTop: 0,
  marginBottom: 20,
  color: mauve.mauve11,
  fontSize: 15,
  lineHeight: 1.5,
});

export const StyledFieldset = styled("fieldset", {
  all: "unset",
  marginBottom: 15,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

export const StyledLabel = styled("label", {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: violet.violet12,
  display: "block",
});

export const StyledInput = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: violet.violet11,
  boxShadow: `0 0 0 1px ${violet.violet7}`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px ${violet.violet8}` },
});

export const StyledButton = styled("button", {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  variants: {
    variant: {
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        "&:hover": { backgroundColor: green.green5 },
        "&:focus": { boxShadow: `0 0 0 2px ${green.green7}` },
      },
    },
  },

  defaultVariants: {
    variant: "green",
  },
});
