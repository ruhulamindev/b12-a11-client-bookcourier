import React from "react";
// Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
// Swiper modules
import { Pagination, Autoplay } from "swiper/modules";

const Testimonials = () => {
  const reviews = [
    {
      name: "Alice Johnson",
      company: "Book Lovers Inc.",
      review:
        "BookCourier is amazing! Fast delivery and the collection is huge. Highly recommended!",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Michael Smith",
      company: "Readers Club",
      review:
        "I love the prices and the easy return policy. It's my go-to place for books.",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Sarah Williams",
      company: "EduBooks Co.",
      review:
        "Excellent service and customer support. I always find what I need here.",
      img: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    {
      name: "David Brown",
      company: "Knowledge Hub",
      review:
        "The delivery is super fast and the packaging is excellent. Love this service!",
      img: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Emma Davis",
      company: "Readers World",
      review:
        "Affordable prices and a wide range of books. I always recommend BookCourier to friends.",
      img: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "James Wilson",
      company: "Learning Tree",
      review:
        "User-friendly platform and reliable delivery. It makes buying books online hassle-free.",
      img: "https://randomuser.me/api/portraits/men/53.jpg",
    },
  ];

  return (
    <div className="mt-12 max-w-7xl mx-auto px-4">
      <h2 className="text-center text-3xl font-bold mb-8 text-gray-900">
        What Our Users Say
      </h2>

      <Swiper
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        loop={true}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay, Pagination]}
        className="py-6"
      >
        {reviews.map((rev, index) => (
          <SwiperSlide key={index}>
            <div className="card bg-base-100 shadow-lg p-4 m-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4">
                  <img
                    src={rev.img}
                    alt={rev.name}
                    className="w-16 h-16 rounded-full border-2 border-green-500 mr-4"
                  />
                  <div>
                    <h3 className="text-xl font-semibold">{rev.name}</h3>
                    <p className="text-sm text-gray-500">{rev.company}</p>
                  </div>
                </div>
                <p className="text-gray-700">{rev.review}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Testimonials;
