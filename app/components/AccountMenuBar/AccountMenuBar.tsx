import {
    StyledMenuBox,
  StyledMenubar,
  StyledMenubarLink,
  StyledMenubarWrapper,
} from "./AccountMenuBar.styled";
import { useLocation } from "@remix-run/react";
import { CiCreditCard1, CiDeliveryTruck, CiSettings, CiUser } from "react-icons/ci";

const links = [
  { name: "My Info", path: "/account", icon: <CiUser /> },
  { name: "Preferences", path: "/account/preferences", icon: <CiSettings /> },
  { name: "Payments", path: "/account/payments", icon: <CiCreditCard1 /> },
  { name: "Delivery", path: "/account/delivery", icon: <CiDeliveryTruck /> },
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
