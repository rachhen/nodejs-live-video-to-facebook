// require('fb-video-downloader')
//   .getInfo('https://www.facebook.com/welaxvideo/videos/2123584921233057/')
//   .then((info) => console.log(JSON.stringify(info, null, 2)));

// const fbvid = require('fbvideos');

const video =
  'https://web.facebook.com/AnnetteD.Shaffer/videos/2716088188659592/';

// fbvid.low(video).then((vid) => {
//   console.log(vid);
//   // => { url: 'https://video.fpat1-1.fna.fbcdn.net/...mp4?934&oe=5972F363' }
// });

// fbvid.high(video).then((vid) => {
//   console.log(vid);
//   // => { url: 'https://video.fpat1-1.fna.fbcdn.net/...mp4?934&OE=2kf2lf4g' }
// });

// ffmpeg -re -i 'https://video.fpnh8-2.fna.fbcdn.net/v/t39.24130-2/10000000_251884786124095_6621719406630014127_n.mp4?_nc_cat=107&_nc_sid=985c63&efg=eyJ2ZW5jb2RlX3RhZyI6Im9lcF9oZCJ9&_nc_ohc=SMhGYbgRxAwAX8d1nEK&_nc_ht=video.fpnh8-2.fna&oh=7c83bc0d9b63a7ed8754e4f94d71245b&oe=5F395D77' -acodec libmp3lame -ar 44100 -b:a 128k -pix_fmt yuv420p -profile:v baseline -s 1280x720 -bufsize 6000k -vb 400k -maxrate 1500k -deinterlace -vcodec libx264 -preset veryfast -g 30 -r 30 -f flv "rtmps://live-api-s.facebook.com:443/rtmp/2948050105451239?s_bl=1&s_ps=1&s_sw=0&s_vt=api-s&a=Abw5ZXYolP67Fjv-"

// const got = require('got');
// (async () => {
//   try {
//     const response = await got(
//       'https://web.facebook.com/AnnetteD.Shaffer/videos/2716088188659592/',
//     );
//     // console.log(response.body);
//     console.log(response.body.split('hd_src:"')[1].split('",sd_src')[0]);
//     //=> '<!doctype html> ...'
//   } catch (error) {
//     console.log(error.response);
//     //=> 'Internal server error ...'
//   }
// })();

const facebook = require('./facebook');

(async () => {
  try {
    const videoUrl = await facebook.getUrl(video);
    console.log(videoUrl);
  } catch (err) {}
})();
