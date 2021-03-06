import { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import FirebaseContext from '../../context/firebase';
import UserContext from '../../context/user';

export default function AddComment({ docId, comments, setComments, commentInput }) {
  const [comment, setComment] = useState('');
  const { firebase, FieldValue } = useContext(FirebaseContext);
  const {
    user: { displayName }
  } = useContext(UserContext);

  const handleSubmitComment = (event) => {
    event.preventDefault();

    // explanation for setComments
    // "give me an array []"
    // "add the old comments"
    // "put the new comment in there"
    // "then we have a  new array with the new comment and the older comments"
    setComments([...comments, { displayName, comment }]);
    // clear state of the comment input after posting
    setComment('');

    return firebase
      .firestore()
      .collection('photos')
      .doc(docId)
      .update({
        comments: FieldValue.arrayUnion({ displayName, comment })
      });
  };

  return (
    <div className="border-t border-gray-primary">
      <form
        className="flex justify-between pl-0 pr-5"
        method="POST"
        onSubmit={(event) =>
          comment.lenth >= 1 ? handleSubmitComment(event) : event.preventDefault()
        }
      />
      <input
        aria-label="Add a comment"
        autoComplete="off"
        className="text-sm text-gray-base w-11/12 mr-3 py-5 px-4"
        type="text"
        name="add-comment"
        placeholder="Add a comment..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
        ref={commentInput}
      />
      <button
        className={`text-sm font-bold text-blue-medium ${!comment && 'opacity-25'}`}
        type="button"
        disabled={comment.length < 1}
        onClick={handleSubmitComment}
      >
        Post
      </button>
    </div>
  );
}

AddComment.propTypes = {
  docId: PropTypes.string.isRequired,
  comments: PropTypes.array.isRequired,
  setComments: PropTypes.func.isRequired,
  commentInput: PropTypes.object.isRequired
};
