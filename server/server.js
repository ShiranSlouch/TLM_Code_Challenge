const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const NinjaName = require("./lib")

app.use(express.static(publicPath));

// GET /ninjify
// querystring: x=node,rails,etc
app.get('/ninjify', (req, res) => {
  
  // Get the buzz words as input (split
  // by comma, trim and remove empty words)
  const names = (req.query.x || "")
                  .split(",")
                  .map(c => c.trim())
                  .filter(Boolean)
  
  // If there are no words to process,
  // send an error response
  if (!names.length) {
    return res.status(400).json({
      error: "Incomplete data."
    })
  }

  // Initialize an instance of NinjaName with the
  // input buzz words, and get the object name
  // e.g. { name: "the ninja name" }
  const result = new NinjaName(names).toObjectName()

  // Return the json response
  res.json(result);
});

app.listen(port, () => {
  console.log('server is up');
});