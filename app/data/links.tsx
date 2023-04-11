import {
  CiShop,
  CiUser,
  CiCoinInsert,
  CiGrid42,
} from "react-icons/ci";

export const links = [
  {
    name: "myStores",
    path: "/stores",
    icon: <CiShop />,
    menu: true,
  },
  {
    name: "dashboard",
    path: "/dashboard",
    icon: <CiGrid42 />,
  },
  {
    name: "orders",
    path: "/orders",
    icon: <CiCoinInsert />,
  },
  {
    name: "customers",
    path: "/customers",
    icon: <CiUser />,
  },
];
