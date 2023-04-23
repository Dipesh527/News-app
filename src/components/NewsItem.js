// import React from "react";

// const NewsItem = ({ props }) => {
//   let { title, description } = this.props;
//   return (
//     <>
//       <div className="card" style={{ width: "18rem" }}>
//         <img src="..." className="card-img-top" alt="..." />
//         <div className="card-body">
//           <h5 className="card-title">{title}</h5>
//           <p className="card-text">{description}</p>
//           <a href="#" className="btn btn-primary">
//             Go somewhere
//           </a>
//         </div>
//       </div>
//     </>
//   );
// };

// export default NewsItem;
import React, { Component } from "react";

export class NewsItem extends Component {
  render() {
    let { title, description, imgUrl, newsUrl, author, date } = this.props;
    return (
      <div className="card" style={{ width: "18rem" }}>
        <img
          src={imgUrl ? imgUrl : "no image"}
          className="card-img-top"
          alt="..."
        />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <small class="text-muted">
            <span style={{ fontweight: "400" }}>
              {author ? author : "Unkown"}
            </span>{" "}
            By {new Date(date).toGMTString()} ago
          </small>
          <br />

          <a
            href={newsUrl}
            rel="noreferrer"
            target="_blank"
            className="btn btn-sm btn-dark"
          >
            Read More
          </a>
        </div>
      </div>
    );
  }
}

export default NewsItem;
