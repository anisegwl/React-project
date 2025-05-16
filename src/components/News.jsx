import React , { useContext, useEffect }from 'react'
import ProductContext from '../context/ProductContext';

const News = () => {
  const {
      articles,
      fetchData,
    } = useContext(ProductContext);
  
    useEffect(() => {
      fetchData();
    }, []);

    if (articles.length === 0){
      return(
        <h1>Loading...</h1>
      )
    }
 return (
    <div className="container py-4">
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {articles
        .filter(item => item.urlToImage)    
        .map((item, idx) => (
          <div className="col" key={idx}>
            <div className="card h-100 shadow-sm">
              <img
                src={item.urlToImage }
                alt={item.title}
                className="card-img-top object-fit-cover"
                style={{ height: '300px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">
                  {item.title.length > 60
                    ? item.title.slice(0, 60) + '…'
                    : item.title}
                </h5>
                <p className="card-text flex-grow-1">
                  {item.description || 'No description available.'}
                </p>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary mt-auto"
                >
                  Read More
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
