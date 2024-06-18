import { Helmet } from "react-helmet-async";

const Feed = () => {
  return (
    <div>
      {/* Title */}
      <Helmet>
        <title>User Feed - Agrieco-Connect </title>
        <meta name="description" content="User Feed" />
      </Helmet>
      <h1>Feed</h1>
    </div>
  );
};

export default Feed;
