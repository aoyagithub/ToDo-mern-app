import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`${process.env.REACT_APP_BASE_URL}/signup`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      alert(`Failed to register user. ${err}`);
    }
  };

  useEffect(() => {
    document.title = 'Signup';
  }, []);

  return (
    <div className="w-full bg-white p-8">
      <h2 className="text-center text-2xl	mb-10">Sign up</h2>
      <form onSubmit={handleSubmit}>
        <p className="text-base	mb-2.5">Name</p>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          name="name"
          required
          className="block mb-7 bg-slate-50 w-full border rounded-sm py-3 px-4 text-sm text-slate-600"
        />
        <p className="text-base	mb-2.5">Email</p>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          name="email"
          required
          className="block mb-7 bg-slate-50 w-full border rounded-sm py-3 px-4 text-sm text-slate-600"
        />
        <p className="text-base	mb-2.5">Password</p>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          name="password"
          required
          className="block mb-7 bg-slate-50 w-full border rounded-sm py-3 px-4 text-sm text-slate-600"
        />
        <button className="ml-auto mb-6 rounded-full text-white bg-sky-500 text-lg h-10 px-10 leading-10 block mx-auto">
          Sign up
        </button>
        <Link
          to={'/'}
          className="text-center text-slate-400 text-base h-11 leading-10 block font-medium"
        >
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default Signup;
