import { useEffect } from "react";
import Container from "../components/Container/Container";

const Page = ({ title, children, wide }) => {
  useEffect(() => {
    document.title = `${title} | ComplexApp`;
    window.scrollTo(0, 0);
  }, [title]);

  return <Container wide={wide}>{children}</Container>;
};

export default Page;
