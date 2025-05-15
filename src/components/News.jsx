import React from 'react'

const News = ({ articles }) => {
  console.log("article component", articles)
  return (
    <div className='row'>
      {articles.map((item,idx) => {
        return (
          <div key={idx} className='col-md-3'>
          <div className="card" style={{width: "18rem"}}>
            <img src={item.urlToImage} className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">{item.title.slice(0,40) }</h5>
              <p className="card-text">{item.description}</p>
              <a href={item.url} target = "_blank" className='btn btn-primary'>Read more</a>
            </div>
          </div>
          </div>
        )
      })}

    </div>
  )
}

export default News;
