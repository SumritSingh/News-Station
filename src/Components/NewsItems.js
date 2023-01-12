import React, { Component } from 'react'

export class NewsItems extends Component {
  render() {
    let {title, description, imageUrl, newsUrl, author, date,} = this.props;
    return (
      <div className="my-3">
        <div className="card" style={{width: "25rem"}}>
          <img src={!imageUrl?"https://newsstation.media/wp-content/uploads/2020/09/logo.png":imageUrl} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{title}...</h5>
                <p className="card-text">{description}...</p>
                <p className="card-text"><small className="text-muted">By {!author?"Unknown":author} on {new Date(date).toLocaleDateString()} </small></p>
                <a href={newsUrl} target="_blank" className="btn btn-sm btn-primary" rel="noreferrer">Read more...</a>
              </div>
        </div>
      </div>
    )
  }
}

export default NewsItems
