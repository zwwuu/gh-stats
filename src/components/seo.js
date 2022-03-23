import { Helmet } from "react-helmet";

const defaultTitle = "GH Stats";

function Seo({ title }) {
  return <Helmet title={title} titleTemplate={defaultTitle ? `%s | ${defaultTitle}` : null} />;
}

export default Seo;
