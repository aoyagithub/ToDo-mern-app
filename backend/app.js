const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('./utils/auth');
const connectDB = require('./utils/database');
const { ItemModel, UserModel } = require('./utils/schemaModels');
const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    await connectDB();
    const hash = await bcrypt.hash(password, 10);

    await UserModel.create({
      name,
      email,
      password: hash,
    });

    res.status(200).json({ message: 'Successfully registered user' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to register user', error });
  }
});

app.post('/login', async (req, res) => {
  try {
    await connectDB();
    const savedUserData = await UserModel.findOne({ email: req.body.email });
    if (savedUserData) {
      const plain = req.body.password;
      const hash = savedUserData.password;
      bcrypt.compare(plain, hash, (error, isEqual) => {
        if (isEqual) {
          const payload = {
            email: req.body.email,
          };
          const token = jwt.sign(payload, process.env.secretKey, {
            expiresIn: '24h',
          });
          console.log(token);
          res.status(200).json({ message: 'Successfully logged in', token });
        } else {
          res.status(400).json({ message: 'Incorrect password' });
        }
      });
    } else {
      res.status(400).json({ message: 'Please sign up' });
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to log in', error });
  }
});

app.get('/items', auth, async (req, res) => {
  const authHeader = await req.headers.authorization;
  if (!authHeader) {
    return res.status(400).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    await connectDB();
    const decoded = jwt.verify(token, process.env.secretKey);
    const userEmail = decoded.email;
    const userItems = await ItemModel.find({ email: userEmail });
    res.status(200).json({ message: 'Successfully read all items', userItems });
  } catch (error) {
    res.status(400).json({ message: 'Failed to read all items', error });
  }
});

app.post('/add', auth, async (req, res) => {
  try {
    await connectDB();
    await ItemModel.create(req.body);
    res.status(200).json({ message: 'Successfully added item' });
  } catch (error) {
    res.status(400).json({ message: 'Failed to add item', error });
  }
});

app.delete('/delete/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email === req.body.email) {
      await ItemModel.deleteOne({ _id: req.params.id });
      res.status(200).json({ message: 'Successfully deleted item' });
    } else {
      throw new Error();
    }
  } catch (error) {
    res.status(400).json({ message: 'Failed to delete item', error });
  }
});

app.get('/item/:id', async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    return res
      .status(200)
      .json({ message: 'Successfully read item', singleItem: singleItem });
  } catch (error) {
    return res.status(400).json({ message: 'Failed to read item', error });
  }
});

app.put('/update/:id', auth, async (req, res) => {
  try {
    await connectDB();
    const singleItem = await ItemModel.findById(req.params.id);
    if (singleItem.email === req.body.email) {
      await ItemModel.updateOne({ _id: req.params.id }, req.body);
      return res.status(200).json({ message: 'Successfully edited item' });
    } else {
      throw new Error();
    }
  } catch (error) {
    return res.status(400).json({ message: 'Failed to edite item', error });
  }
});

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Listening on localhost port ${port}`);
});
