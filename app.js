const path = require('path');
const express = require('express');
const fileUpload = require('express-fileupload');
const rfs = require('rotating-file-stream');
const morgan = require('morgan');
const live = require('./live');
const { generator } = require('./utils');
const { getUrl, msg } = require('./facebook');

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
  const loop = req.body.loop;
  console.log(req.body);
  const inputPath = path.join(__dirname, 'videos', name);

  req.files.video.mv(inputPath, (err) => {
    if (err) {
      return res.send('Upload error');
    }
    if (loop === 'infiniteLoop') {
      live(inputPath, req.body.rtmps, '-stream_loop -1');
    } else if (loop === 'customLoop') {
      const customLoop = parseInt(req.body.customLoop) - 1;
      live(inputPath, req.body.rtmps, `-stream_loop ${customLoop}`);
    } else {
      res.send(
        '<h1 style="color: green;">Something Wrong With You Video ⛔️</h1> ',
      );
    }
  });
  res.send('<h1 style="color: green;">Living 🖖</h1> ');
});

app.post('/facebook-url', async (req, res, next) => {
  const facebokUrl = req.body.facebokUrl;
  const loop = req.body.loop;
  const url = await getUrl(facebokUrl);

  console.log(req.body);

  if (url) {
    if (loop === 'infiniteLoop') {
      live(url, req.body.rtmps, '-stream_loop -1');
    } else if (loop === 'customLoop') {
      const customLoop = parseInt(req.body.customLoop) - 1;
      live(url, req.body.rtmps, `-stream_loop ${customLoop}`);
    } else {
      res.send(
        '<h1 style="color: green;">Something Wrong With You Video ⛔️</h1> ',
      );
    }
    return res.send('<h1 style="color: green;">Living 🖖</h1> ');
  }

  res.send(`<h1 style="color: red;">${msg}</h1>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
