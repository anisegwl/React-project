import React, { useContext } from 'react'
import ProductContext from '../context/ProductContext'

const About = () => {
  const { products } = useContext(ProductContext)

  return (
    <div className="container my-4">
      <h2 className="mb-4">About Page</h2>
      <h3 className="mt-5 mb-4 text-center">Our Products</h3>

      <div className="row">
        {products.map((prod) => (
          <div key={prod._id} className="col-md-4 d-flex align-items-stretch mb-4">
            <div className="card w-100">
              <img
                src={prod.image || 'https://via.placeholder.com/350x200'}
                className="card-img-top"
                alt={prod.title}
                style={{ objectFit: 'cover', height: '200px' }}
              />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.title}</h5>
                <p className="card-text flex-grow-1">{prod.description}</p>
                <p className="card-text">
                  <strong>Price:</strong> Rs {prod.price}
                </p>
                <a href="#" className="btn btn-primary mt-auto">
                  Buy Now
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default About
