import { NavLink, NavLinkProps } from 'react-router-dom';

function CustomNavLink(props: NavLinkProps) {
  return (
    <NavLink {...props}>
      {props.children}
    </NavLink>
  );
}

export default CustomNavLink;