import cuid from "cuid";

// NOT TO BE CHANGED
export const HtmlTypes = {
  BUTTON: "button",
  CHECKBOX: "checkbox",
  COLOR: "color",
  DATE: "date",
  DATETIME: "datetime-local",
  EMAIL: "email",
  FILE: "file",
  HIDDEN: "hidden",
  IMAGE: "image",
  MONTH: "month",
  NUMBER: "number",
  PASSWORD: "password",
  RADIO: "radio",
  RANGE: "range",
  RESET: "reset",
  SEARCH: "search",
  SUBMIT: "submit",
  TEL: "tel",
  TEXT: "text",
  TIME: "time",
  URL: "url",
  WEEK: "week",
};

export const fields = {
  PLAIN_TEXT: {
    name: "Plain Text",
    type: HtmlTypes.TEXT,
  },
  NUMBER: {
    name: "Number",
    type: HtmlTypes.NUMBER,
  },
  IMAGE: {
    name: "Image",
    type: HtmlTypes.FILE,
  },
  LINK: {
    name: "Link",
    type: HtmlTypes.URL,
  },
  FORMATTED_TEXT: {
    name: "Formatted Text",
    type: "textarea",
  },
  DATE: {
    name: "Date",
    type: HtmlTypes.DATE,
  },
  OPTION: {
    name: "Option",
    type: HtmlTypes.RADIO,
  },
  TOGGLE: {
    name: "Toggle",
    type: HtmlTypes.CHECKBOX,
  },
  COLOR: {
    name: "Color",
    type: HtmlTypes.COLOR,
  },
};

export type Field = {
  id: string;
  name: string;
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week"
    | string;
  supported: boolean;
  icon?: string | null;
};

const fieldTypes = [
  {
    id: cuid(),
    ...fields.PLAIN_TEXT,
    supported: true,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.NUMBER,
    supported: true,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.IMAGE,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.LINK,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.FORMATTED_TEXT,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.DATE,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.OPTION,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.TOGGLE,
    supported: false,
    icon: null,
  },
  {
    id: cuid(),
    ...fields.COLOR,
    supported: false,
    icon: null,
  },
];

export const defaultFields = [
  {
    id: cuid(),
    name: "name",
    type: fields.PLAIN_TEXT.name,
    default: true,
  },
  {
    id: cuid(),
    name: "price",
    type: fields.NUMBER.name,
    default: true,
  },
  {
    id: cuid(),
    name: "Quantity",
    type: fields.NUMBER.name,
    default: true,
  },
  {
    id: cuid(),
    name: "comment",
    type: fields.FORMATTED_TEXT.name,
    default: true,
  },
];

export default fieldTypes;
