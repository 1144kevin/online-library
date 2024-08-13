import { Link, LinkProps } from 'react-router-dom';

function CustomLink(props: LinkProps) {
  return (
    <Link {...props}>
      {props.children}
    </Link>
  );
}

export default CustomLink;