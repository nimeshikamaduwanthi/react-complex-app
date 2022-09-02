const Container = ({ wide, children }) => (
  <div className={"container py-md-5" + (wide ? "" : " container--narrow")}>
    {children}
  </div>
);

export default Container;
