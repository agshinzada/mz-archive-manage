const PageTitle = ({ title }) => {
  return (
    <h3 className="mb-2 text-md font-semibold uppercase border-b pb-1">
      {title.toLocaleUpperCase("az")}
    </h3>
  );
};

export default PageTitle;
