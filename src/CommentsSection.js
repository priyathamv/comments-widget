import React, { useState, useEffect } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.bubble.css';

import UserIcon from './svg-icons/UserIcon.svg';
import SubmitIcon from './svg-icons/SubmitIcon.svg';
import "./CommentsSection.css";


function CommentsSection({ applicationId, blogId }) {

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', comment: '' });
  const [newCommentAdded, setNewCommentAdded] = useState(null);


  useEffect(() => {
    if (newCommentAdded === null || newCommentAdded) {
      fetchComments();
      setNewCommentAdded(false);
    }
  }, [newCommentAdded]);

  async function fetchComments() {

    const url = `https://comments-api.priyatham.workers.dev/api/v1/comments?applicationId=${applicationId}&blogId=${blogId}`;
    const options = {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log('Exception while posting comment');
        throw new Error('Network response was not ok.');
      }

      const json = await response.json();
      setComments(json);
      console.log('Comments', json);

    } catch (error) {
      console.log('Exception while posting comment', error);
    }
  }

  async function handlePostComment(event) {
    event.preventDefault();

    const url = 'https://comments-api.priyatham.workers.dev/api/v1/comments/save';
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        applicationId,
        blogId,
        userName: 'Anonymous',
        comment: newComment.comment,
        email: "vinnakota4201@gmail.com",
        isVerified: 1,
        parentId: null,
        isAnonymous: 0
      })
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        console.log('Exception while posting comment');
        throw new Error('Network response was not ok.');
      }

      const json = await response.json();
      console.log('Response', json);
      setNewComment({ name: '', comment: '' });
    } catch (error) {
      console.log('Exception while posting comment', error);
    } finally {
      setNewCommentAdded(true);
    }
  }

  const handleNameChange = event => {
    setNewComment((prevComment) => ({
      ...prevComment,
      name: event.target.value,
    }));
  }

  const handleCommentChange = newValue => {
    setNewComment((prevComment) => ({
      ...prevComment,
      comment: newValue,
    }));
  }

  const createMarkup = content => {
    return { __html: content };
  }

  return (
    <div className="comments-section">
      {comments.map((comment) => (
        <div className="comment" key={comment.Id}>
          <div className='comment-name-time'>
            <div className="comment-name">{comment.UserName}</div>
            <div className="comment-time">{comment.CreatedOn}</div>
          </div>
          <div className="comment-text" dangerouslySetInnerHTML={createMarkup(comment.Comment)}></div>
        </div>
      ))}
      <div>
        {/* <input
          type="text"
          placeholder="Name"
          name="name"
          required
          value={newComment.name}
          onChange={handleNameChange}
        /> */}

        <div className='editor-wrap'>
          <img src={UserIcon} className="user-icon" alt="user" />

          <ReactQuill className='editor' theme="bubble" value={newComment.comment} onChange={handleCommentChange} />

          <img src={SubmitIcon} className='submit-icon' alt='submit' onClick={handlePostComment}/>
        </div>

        <div className='line'></div>
      </div>
    </div>
  );
}

export default CommentsSection;
