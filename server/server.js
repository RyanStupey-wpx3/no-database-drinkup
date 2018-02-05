const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')
const ctrl = require('./controller.js')

const app = express();

app.use(cors());

app.use(bodyParser.json());

const url = '/api/cocktail'

app.post(url, ctrl.create)
// what am i sending? ===  a req.body with a time and text ==>> defined in controller
app.get(url, ctrl.get_drinks_by_name)
// ctrl.read defined in controller
// app.put(`${url}/:id`, ctrl.update)
// app.get(url)

app.delete(`${url}/:id`, ctrl.delete)
const port = 3535;

app.listen(port, () => console.log(`Server is listen on port ${port}`))

