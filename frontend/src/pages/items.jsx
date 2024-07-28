import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../utils/useAuth';

const Items = () => {
  const loginUser = useAuth();
  const [allItems, setAllItems] = useState();

  useEffect(() => {
    document.title = 'Items';

    const getAllItems = async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/items`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const jsonRes = await res.json();
      setAllItems(jsonRes);
    };
    getAllItems();
  }, []);

  const onClickDelete = async (id) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this item?'
    );
    if (!confirmDelete) {
      return;
    }
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/delete/${id}`, {
        method: 'DELETE',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setAllItems((prevItems) => ({
        ...prevItems,
        userItems: prevItems.userItems.filter((item) => item._id !== id),
      }));
    } catch (err) {
      alert('Failed to delete item');
    }
  };

  if (loginUser) {
    return (
      <div className="w-full">
        <div className="flex justify-between lg:items-center mb-3">
          <h2 className="font-semibold text-slate-600 text-2xl">ToDo List</h2>
          <Link
            to={'/add'}
            className="rounded-full text-white bg-sky-500 text-base h-10 px-4 leading-10 block"
          >
            + Add Item
          </Link>
        </div>
        <ul className="divide-y divide-zinc-100">
          {allItems &&
            allItems.userItems.map((item) => (
              <li
                key={item._id}
                className="flex justify-between lg:items-center bg-white text-slate-400 font-medium	px-5 py-3"
              >
                <div>{item.name}</div>
                <div>
                  <Link to={`/edit/${item._id}`} className="mx-4">
                    edit
                  </Link>
                  <button
                    onClick={() => onClickDelete(item._id)}
                    className="mx-4"
                  >
                    delete
                  </button>
                </div>
              </li>
            ))}
        </ul>
      </div>
    );
  }
};

export default Items;
