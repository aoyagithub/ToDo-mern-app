import { useState, useEffect } from 'react';
import useAuth from '../utils/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const CreateItem = () => {
  const [item, setItem] = useState('');
  const loginUser = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/add`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name: item,
        }),
      });
      navigate('/');
    } catch (err) {
      alert('Failed to add item');
    }
  };

  useEffect(() => {
    document.title = 'Add';
  }, []);

  if (loginUser) {
    return (
      <div className="w-full">
        <div className="mb-3 flex justify-between lg:items-center">
          <h2 className="font-semibold text-slate-600 text-2xl">Add Item</h2>
          <Link
            to={'/'}
            className="text-slate-400 text-base h-11 leading-10 block font-medium"
          >
            Cancel
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="divide-y bg-white p-8">
          <input
            value={item}
            onChange={(e) => setItem(e.target.value)}
            type="text"
            name="item"
            required
            className="block bg-slate-50 mb-6 w-full border rounded-sm py-3 px-4 text-sm text-slate-600"
          />
          <button className="ml-auto rounded-full text-white bg-sky-500 text-base h-10 px-10 leading-10 block">
            Add
          </button>
        </form>
      </div>
    );
  }
};

export default CreateItem;
