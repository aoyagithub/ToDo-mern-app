import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const UpdateItem = () => {
  const loginUser = useAuth();
  const params = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');

  useEffect(() => {
    document.title = 'Edit';

    const getSingleItem = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/item/${params.id}`
      );
      const jsonRes = await res.json();
      setName(jsonRes.singleItem.name);
    };
    getSingleItem();
  }, [params.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/update/${params.id}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          name,
        }),
      });
      navigate('/');
    } catch (err) {
      alert('Failed to edite item');
    }
  };

  if (loginUser) {
    return (
      <div className="w-full">
        <div className="mb-3 flex justify-between lg:items-center">
          <h2 className="font-semibold text-slate-600 text-2xl">Edit Item</h2>
          <Link
            to={'/'}
            className="text-slate-400 text-base h-11 leading-10 block font-medium"
          >
            Cancel
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="divide-y bg-white p-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            name="title"
            required
            className="block bg-slate-50 mb-6 w-full border rounded-sm py-3 px-4 text-sm text-slate-600"
          />
          <button className="ml-auto rounded-full text-white bg-sky-500 text-base h-10 px-10 leading-10 block">
            Edit
          </button>
        </form>
      </div>
    );
  }
};

export default UpdateItem;
