const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');

const app = express();
const port = process.env.PORT || 3000;

// Connections to MongoDB
const dbUrl = 'mongodb://localhost:27017/hospital_login';
mongoose.connect(dbUrl)
  .then(() => console.log('Connected to MongoDB: hospital_login'))
  .catch(err => console.error('MongoDB connection error:', err));

//getting the User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }, // Plain text password as per your DB
  name: String
}, { collection: 'employees' });

const User = mongoose.model('User', userSchema);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

//  session Setup
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: dbUrl }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(async (req, res, next) => {
  if (req.session.userId) {
    res.locals.user = await User.findById(req.session.userId);
  } else {
    res.locals.user = null;
  }
  next();
});


// Login Page
app.get('/login', (req, res) => {
  if (req.session.userId) return res.redirect('/dashboard');
  res.sendFile(path.join(__dirname, 'login.html'));
});

// adding new users witht he  SIGN UP feature
app.post('/signup', async (req, res) => {
  const { name, username, password } = req.body;

  if (!username || !password) {
    return res.send('<script>alert("Please fill in all fields."); window.location.href="/login";</script>');
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('<script>alert("Username already exists. Please Login."); window.location.href="/login";</script>');
    }

    const newUser = new User({ 
      name: name || "New Member", 
      username: username, 
      password: password 
    });
    
    await newUser.save();
    
    // once new user is assignd redirect the page to login page.
    res.redirect('/login'); 

  } catch (err) {
    console.error(err);
    res.send('<script>alert("Database Error"); window.location.href="/login";</script>');
  }
});

//  LOGIN 
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });

    // username and password check
    if (!user || user.password !== password) {
      // if login fails then,and go back to login
      return res.send('<script>alert("Invalid Username or Password"); window.location.href="/login";</script>');
    }

    // if the login works, then, redirect to the Dashboard
    req.session.userId = user._id;
    res.redirect('/dashboard');

  } catch (err) {
    console.error(err);
    res.send('<script>alert("Server Error"); window.location.href="/login";</script>');
  }
});

// Dashboard
app.get('/dashboard', (req, res) => {
  if (!req.session.userId) return res.redirect('/login');
  res.render('dashboard', { 
    username: res.locals.user ? res.locals.user.name : 'User' 
  });
});

// Logout
app.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Root
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});