const express = require('express');
const connectDB = require('./config/db')
const cors = require('cors')

// Connect database
connectDB();
const app = express();

// cors
app.use(cors());

// Init middleware
app.use(express.json({ extended: false }))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})

app.get('/', (req, res) => res.send("API running"))

// Define routes
app.use('/api/auth', require('./routes/api/auth'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/posts', require('./routes/api/posts'))
app.use('/api/feed', require('./routes/api/feed'))
