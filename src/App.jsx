import React from "react";
import CommentsSection from "./CommentsSection";

function App() {
  const applicationId = 123;
  const blogId = 12;

  return (
    <div className="app">
      <CommentsSection
        applicationId={applicationId}
        blogId={blogId}
      />
    </div>
  );
}

export default App;
