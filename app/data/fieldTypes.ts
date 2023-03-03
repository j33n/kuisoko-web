// NOT TO BE CHANGED
const fields = {
  PLAIN_TEXT: "Plain Text",
  NUMBER: "Number",
  IMAGE: "Image",
  LINK: "Link",
  FORMATTED_TEXT: "Formatted Text",
  DATE: "Date",
  OPTION: "Option",
  TOGGLE: "Toggle",
  COLOR: "Color",
};

const fieldTypes = [
  {
    name: fields.PLAIN_TEXT,
    supported: true,
    icon: null,
  },
  {
    name: fields.NUMBER,
    supported: true,
    icon: null,
  },
  {
    name: fields.IMAGE,
    supported: false,
    icon: null,
  },
  {
    name: fields.LINK,
    supported: false,
    icon: null,
  },
  {
    name: fields.FORMATTED_TEXT,
    supported: false,
    icon: null,
  },
  {
    name: fields.DATE,
    supported: false,
    icon: null,
  },
  {
    name: fields.OPTION,
    supported: false,
    icon: null,
  },
  {
    name: fields.TOGGLE,
    supported: false,
    icon: null,
  },
  {
    name: fields.COLOR,
    supported: false,
    icon: null,
  },
];

export default fieldTypes;
