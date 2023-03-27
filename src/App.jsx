import React, { useState, useEffect } from "react";
import CommentsSection from "./CommentsSection";

function App() {
  const [applicationId, setApplicationId] = useState(null);
  const [blogId, setBlogId] = useState(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    setApplicationId(searchParams.get('applicationId'));
    setBlogId(searchParams.get('blogId'));

  }, []);

  console.log('here', applicationId, blogId);

  return (
    <div className="app">
      {
        applicationId && blogId &&
          <CommentsSection
            applicationId={applicationId}
            blogId={blogId}
          />
      }
    </div>
  );
}

export default App;
