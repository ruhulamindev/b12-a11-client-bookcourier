import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router";
import Loading from "../Components/Loading";
import axios from "axios";

const DetailsPage = () => {
 const { id } = useParams();
  // console.log(id)

  const {
    data: book,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["book-details", id],
    queryFn: async () => {
      const result = await axios.get(`http://localhost:3000/books_all/${id}`);
      return result.data;
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <p>Error loading book details</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="grid md:grid-cols-2 gap-8 bg-white p-6 rounded-xl shadow">
        {/* Book Image */}
        <img
          src={book.image}
          alt={book.name}
          className="w-full h-96 object-cover rounded-xl"
        />

        {/* Book Info */}
        <div>
          <h1 className="text-3xl font-bold mb-1">{book.name}</h1>

          <p className="text-gray-600 mb-4">
            <strong>Author:</strong> {book.author}
          </p>

          <p className="text-gray-700 text-lg mb-4">{book.description}</p>

          <p className="mb-2">
            <strong>Category: </strong>
            <span className="text-blue-600">{book.category}</span>
          </p>

          <h2 className="text-2xl font-bold text-red-600 mb-4">
            ${book.price}
          </h2>

          <h3 className="font-bold mt-4 mb-2">Seller Information:</h3>

          <div className="flex items-center gap-3 mb-4">
            <img
              src={book.seller?.image}
              referrerPolicy="no-referrer"
              alt={book.seller?.name}
              className="w-10 h-10 rounded-full border"
            />
            <div>
              <p className="font-semibold">{book.seller?.name}</p>
              <p className="text-gray-500">{book.seller?.email}</p>
            </div>
          </div>

          {/* Order Button */}
          <button
            className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700"
          >
            Order Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
