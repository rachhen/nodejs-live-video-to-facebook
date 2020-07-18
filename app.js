const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const fbvid = require('fbvideos');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const live = require('./live');
const { generator } = require('./utils');

const app = express();
const PORT = process.env.PORT || 3001;
// create a rotating write stream
const accessLogStream = rfs.createStream(generator, {
  interval: '1d', // rotate daily
  path: path.join(__dirname, 'log'),
});

app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());
// app.use(express.json({ extended: true, limit: '10G' }));
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }));
app.use(fileUpload());

app.post('/upload', (req, res, next) => {
  const name = req.files.video.name;
  const inputPath = path.join(__dirname, 'videos', name);

  req.files.video.mv(inputPath, (err) => {
    if (err) {
      return res.send('Upload error');
    }

    live(inputPath, req.body.rtmps);
  });
  res.send('<h1 style="color: red;">Living 🖖</h1> ');
});

app.post('/facebook-url', (req, res, next) => {
  const url = req.body.facebokUrl;
  console.log(req.body);
  fbvid.high(url).then((vid) => {
    live(vid.url, req.body.rtmps);
    res.send('<h1 style="color: red;">Living 🖖</h1> ');
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
