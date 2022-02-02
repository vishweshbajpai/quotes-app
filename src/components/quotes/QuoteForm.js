import { useRef, useState } from "react";
import { Prompt } from "react-router-dom";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const QuoteForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);
  const [authorEmpty, setAuthorEmpty] = useState(false);
  const [textEmpty, setTextEmpty] = useState(false);

  const authorInputRef = useRef();
  const textInputRef = useRef();

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here
    if(enteredAuthor.trim().length === 0) {
      setAuthorEmpty(true);
    }
    else {
      setAuthorEmpty(false);
    }

    if(enteredText.trim().length === 0) {
      setTextEmpty(true);
    }
    else {
      setTextEmpty(false);
    }

    if(enteredAuthor && enteredText) {
      props.onAddQuote({ author: enteredAuthor, text: enteredText });
    }
  }

  const finishEnteringHandler = () => {
    setIsEntering(false);
  }

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <>
      <Prompt
        when={isEntering}
        message={(location) => "Are you sure you want to leave?"}
      />
      <Card>
        <form
          onFocus={formFocusedHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={classes.control}>
            <label htmlFor="author">Author</label>
            <input type="text" id="author" ref={authorInputRef} />
            {authorEmpty && <p className={classes.validate}>Please enter something!</p>}
          </div>
          <div className={classes.control}>
            <label htmlFor="text">Text</label>
            <textarea id="text" rows="5" ref={textInputRef}></textarea>
            {textEmpty && <p className={classes.validate}>Please enter something!</p>}
          </div>
          <div className={classes.actions}>
            <button onClick={finishEnteringHandler} className="btn">Add Quote</button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default QuoteForm;
