import React from "react";

const Comments = ({ comments }) => {
  return (
    <>
      {comments.map((comment, index) => {
        return (
          <div key={index} className="col-sm-12">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">{comment.title}</h5>
                <p className="card-text">{comment.comment}</p>
                <p>
                  <span
                    style={{
                      fontWeight: "500",
                      textTransform: "uppercase",
                    }}
                  >
                    {comment.firstName} {comment.lastName}
                  </span>
                  &nbsp;
                  <span style={{ color: "red" }}>{comment.dateCreated}</span>
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default Comments;
