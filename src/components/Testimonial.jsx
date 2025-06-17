import React from 'react'
import '../styles/Testimonial.css';
import model from "../assets/gymTestimonial.webp"
const Testimonial = () => {
  return (
    <div className='special-edition container mt-5 mb-5'>
      <div className='row'>
        <div className='col-md-6'>
          <img src={model} alt='image'></img>
        </div>
        
         <div className='col-md-6'>
          <h4>Special Edition</h4>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas exercitationem dignissimos doloribus similique alias voluptatibus quis, modi nesciunt reprehenderit laboriosam molestias tempora repudiandae, voluptates quo voluptate vitae eligendi officia consectetur?</p>
          <button className='btn-edition'>Learn More </button>
        </div>
      </div>
      </div>
  )
}

export default Testimonial
