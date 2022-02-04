import { useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/use-http";
import { addComment } from "../../lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";

import classes from "./NewCommentForm.module.css";

const NewCommentForm = (props) => {
  const commentTextRef = useRef();
  const [textEmpty, setTextEmpty] = useState(false); 

  const { sendRequest, status, error } = useHttp(addComment);
  const { onAddedComment } = props;
  useEffect(() => {
    if (status === "completed" && !error) {
      onAddedComment();
    }
  }, [status, error, onAddedComment]);
  const submitFormHandler = (event) => {
    event.preventDefault();

    const enteredText = commentTextRef.current.value;
    // optional: Could validate here
    if(enteredText.trim().length === 0) {
      setTextEmpty(true);
    }
    else {
      setTextEmpty(false);
    }
    // send comment to server
    if(enteredText) {
      sendRequest({commentData: { text: enteredText }, quoteId: props.quoteId});
    }
    commentTextRef.current.value = '';
  };

  return (
    <form className={classes.form} onSubmit={submitFormHandler}>
      {status === "pending" && (
        <div className="centered">
          <LoadingSpinner />
        </div>
      )}
      <div className={classes.control} onSubmit={submitFormHandler}>
        <label htmlFor="comment">Your Comment</label>
        <textarea id="comment" rows="5" ref={commentTextRef}></textarea>
        {textEmpty && <p className={classes.validate}>Please enter something!</p>}
      </div>
      <div className={classes.actions}>
        <button className="btn">Add Comment</button>
      </div>
    </form>
  );
};

export default NewCommentForm;
