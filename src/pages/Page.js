import { useEffect } from "react";
import Container from "../components/Container";

const Page = ({ title, children, wide }) => {
  useEffect(() => {
    document.title = `${title} | ComplexApp`;
    window.scrollTo(0, 0);
  }, []);

  return <Container wide={wide}>{children}</Container>;
};

export default Page;
