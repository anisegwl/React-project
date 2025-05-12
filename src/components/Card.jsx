import React from "react";
import img from "../assets/image1.webp";

const Card = (props) => {
  const cardItems = [
    {
      title: "Card 1",
      description: "This is card 1",
      image: img,
      href: "https://www.youtube.com/",
    },
    {
      title: "Card 2",
      description: "This is card 2",
      image: img,
      href: "https://www.youtube.com/",
    },
    {
      title: "Card 3",
      description: "This is card 3",
      image: img,
      href: "https://www.youtube.com/",
    },
  ];

  return (
    <>
      <div className={`container  bg-${props.mode}  mt-5`}>
        <div className="row">
          <div className="title-content"> Our Services</div>
          {cardItems.map((item) => {
            return (
              <div className="col-md-4">
                <div class="card">
                  <img src={img} class="card-img-top" alt="..." />
                  <div class="card-body">
                    <h5 class="card-title">{item.title}</h5>
                    <p class="card-text">{item.description}</p>
                    <a href={item.href} target="_blank" class="btn btn-primary">
                      Go youtube
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Card;
 {/* <div className="our-prod">Our products from context</div>
        <div className="our-prod">
          Our product from API: {user.title}
        </div> */}