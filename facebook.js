const got = require('got');
exports.msg = "Either the video is deleted or it's not shared publicly! 🤧🤧";

const lowResolution = (link) => {
  return got(link)
    .then((res) => {
      const sd_src = res.body.split('sd_src:"')[1];
      return sd_src ? sd_src.split('",hd_tag')[0] : false;
    })
    .catch((error) => {
      throw error;
    });
};

const highResolution = (link) => {
  return got(link)
    .then((res) => {
      const hd_src = res.body.split('hd_src:"')[1];
      return hd_src ? hd_src.split('",sd_src:"')[0] : false;
    })
    .catch((error) => {
      throw error;
    });
};

const getUrl = async (link) => {
  try {
    const videoHigh = await highResolution(link);
    const videoLow = await lowResolution(link);
    return videoHigh ? videoHigh : videoLow;
  } catch (err) {
    console.log('getUrl', err);
    return false;
  }
};

exports.getUrl = getUrl;
