/**
 * I found this snipet code
 * @see https://www.psvmc.cn/article/2019-08-25-fluent-ffmpeg-rtmp.html
 *
 */

const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

/**
 * Living video uploaded
 * Using terminal to live video
 * ```
 * ffmpeg -re -i 'PUDxF_1Xw3M.f137.mkv' -acodec libmp3lame -ar 44100 -b:a 128k -pix_fmt yuv420p -profile:v baseline -s 1280x720 -bufsize 6000k -vb 400k -maxrate 1500k -deinterlace -vcodec libx264 -preset veryfast -g 30 -r 30 -f flv "rtmps://live-api-s.facebook.com:443/rtmp/xxxxxxxxxxxxxxxxxxxxxxxxxxx"
 * or
 * ffmpeg -re -y -i video.mp4 -c:a copy -ac 1 -ar 44100 -b:a 96k -vcodec libx264 -pix_fmt yuv420p -vf scale=1080:-1 -r 30 -g 60 -tune zerolatency -f flv -maxrate 2000k -preset veryfast "rtmps://live-api-s.facebook.com:443/rtmp/xxxxxxxxxxxxxxxxxxxxxxxxxxx"
 * ```
 * @param {String} inputPath
 * @param {String} outputPath
 */
const live = (inputPath, outputPath) => {
  const ffmpegPath = '/usr/local/bin/ffmpeg'; // Path ffmpeg that you already install

  var command = ffmpeg(inputPath)
    .setFfmpegPath(ffmpegPath)
    .inputOptions('-re')
    .inputOptions('-ac 2')
    .size('1080x?')
    .on('start', function (commandLine) {
      console.log('[' + new Date() + '] Vedio is Pushing !');
      console.log('commandLine: ' + commandLine);
    })
    .on('error', function (err, stdout, stderr) {
      console.log('error: ' + err.message);
      console.log('stdout: ' + stdout);
      console.log('stderr: ' + stderr);
      fs.unlinkSync(inputPath); // Remove video file
    })
    .on('end', function () {
      console.log('[' + new Date() + '] Vedio Pushing is Finished !');
      fs.unlinkSync(inputPath); // Remove video file
    })
    .addOptions([
      '-vcodec libx264',
      '-preset veryfast',
      '-crf 22',
      '-maxrate 1500k',
      '-bufsize 6000k',
      '-acodec libmp3lame',
      '-ac 2',
      '-ar 44100',
      '-b:a 128k',
      '-pix_fmt yuv420p',
      '-profile:v baseline',
      '-vb 400k',
      '-deinterlace',
      '-g 30',
      '-r 30',
    ])
    .format('flv');
  command
    .output(outputPath, {
      end: true,
    })
    .run();
};

module.exports = live;
