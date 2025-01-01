import { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { MdOutlineAddBox } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BooksCard from '../components/home/BooksCard';

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');

  useEffect(() => {
    setLoading(true);
    axios
      .get('http://localhost:3000/books')
      .then((response) => {
        setBooks(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <div className="p-4 ">
      <h1 className="text-2xl font-bold">Books List</h1>
      <Link
        to="/books/create"
        className="flex items-center bg-blue-500 text-white px-4 py-2 my-5 w-fit rounded-md"
      >
        <MdOutlineAddBox className="mr-2" />
      </Link>
      <div className="flex justify-between items-center gap-4">
        <button
          onClick={() => setShowType('table')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Table
        </button>
        <button
          onClick={() => setShowType('card')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Card
        </button>
      </div>
      {loading ? (
        <Spinner />
      ) : showType === 'table' ? (
        <BooksTable books={books} />
      ) : (
        <BooksCard books={books} />
      )}
    </div>
  );
};

export default Home;
