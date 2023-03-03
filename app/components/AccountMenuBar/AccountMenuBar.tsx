import {
  StyledMenuBox,
  StyledMenubar,
  StyledMenubarLink,
  StyledMenubarWrapper,
} from "./AccountMenuBar.styled";
import { useLocation } from "@remix-run/react";
import {
  HiOutlineCog6Tooth,
  HiOutlineCreditCard,
  HiOutlineTruck,
  HiOutlineUserCircle,
} from "react-icons/hi2";

const links = [
  { name: "My Info", path: "/account", icon: <HiOutlineUserCircle /> },
  // {
  //   name: "Payments",
  //   path: "/account/payments",
  //   icon: <HiOutlineCreditCard />,
  // },
  { name: "Delivery", path: "/account/delivery", icon: <HiOutlineTruck /> },
  {
    name: "Settings",
    path: "/account/settings",
    icon: <HiOutlineCog6Tooth />,
  },
];

const AccountMenuBar = () => {
  const { pathname } = useLocation();

  return (
    <StyledMenubarWrapper>
      {links.map((link) => (
        <StyledMenuBox key={link.name} active={pathname === link.path}>
          <StyledMenubar to={link.path}>
            <StyledMenubarLink>
              {link.icon}
              {link.name}
            </StyledMenubarLink>
          </StyledMenubar>
        </StyledMenuBox>
      ))}
    </StyledMenubarWrapper>
  );
};

export default AccountMenuBar;
