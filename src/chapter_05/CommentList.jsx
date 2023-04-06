import React from "react";
import Comment from "./Comment";

const comments = [
    {
      name : "이상현",
      comment : "안녕하세요,  이상현입니다."
    },
    {
      name : "이상현2",
      comment : "안녕하세요, 이상현2입니다."
    },
    {
        name : "이상현3",
        comment : "안녕하세요, 이상현3입니다."
    },
  ]
  
  function CommentList(props) {
    return (
        <div> 
            {comments.map((foo) => {
                return (
                    <Comment name={foo.name} comment={foo.comment} />
                );
            })}
        </div>
    );
  }

  export default CommentList;