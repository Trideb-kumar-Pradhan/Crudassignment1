const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();
const PORT = 3000;
app.use(cors()); 
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/your_db_name', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use('/employees', employeeRoutes);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
