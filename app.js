const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const live = require('./live');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
app.use(express.json({ extended: true }));
app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  const name = req.files.video.name;
  const inputPath = path.join(__dirname, 'tmp', name);

  req.files.video.mv(inputPath, (err) => {
    if (err) {
      return res.send('Upload error');
    }

    live(inputPath, req.body.rtmps);
  });
  res.send('<h1 style="color: red;">Living 🖖</h1> ');
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
