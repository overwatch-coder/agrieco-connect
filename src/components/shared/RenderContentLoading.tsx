import ResponsiveArticle from "react-content-loader";

const RenderContentLoading = ({ children }: { children?: React.ReactNode }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-5 mx-auto">
      {children ? (
        children
      ) : (
        <ResponsiveArticle width={500} height={500} backgroundColor="#dddddd" />
      )}
    </div>
  );
};

export default RenderContentLoading;
