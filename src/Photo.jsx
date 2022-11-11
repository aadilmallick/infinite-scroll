import React from "react";
import { memo } from "react";

const Photo = memo((props) => {
  return (
    <article className="photo">
      <img src={props.urls.regular} />
      <div className="photo-info">
        <div>
          <h4>{props.user.name}</h4>
          <p>{props.likes} likes</p>
        </div>
      </div>
    </article>
  );
});

export default Photo;
