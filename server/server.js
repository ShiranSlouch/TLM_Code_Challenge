const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, '..', 'public');
const port = process.env.PORT || 3000;
const NinjaName = require("./lib")

app.use(express.static(publicPath));

app.get('/ninjify', (req, res) => {
  
  // ?x=,,,,,,,,,
  const names = (req.query.x || "")
                  .split(",")
                  .map(c => c.trim())
                  .filter(Boolean)
  
  if (!names.length) {
    return res.status(400).json({
      error: "Incomplete data."
    })
  }

  const result = new NinjaName(names).toObjectName()

  res.json(result);
});

app.listen(port, () => {
  console.log('server is up');
});