(() => {
  document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 75 * 2 + 'px';
  }, false);
})();

export function fonts(func) {
  var html = document.documentElement;
  var windowWidth = html.clientWidth;
  html.style.fontSize = windowWidth / 75 * 2 + 'px';
  if (func)
    func()
}

//css3前缀
let elementStyle = document.createElement('div').style

let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }

  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }

  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }

  if (vendor === 'standard') {
    return style
  }

  return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}

export function musicData(songMsg){
  return {
    songname:songMsg.musicData.songname,
    interval:songMsg.musicData.interval,
    singer:songMsg.musicData.singer,
    songid:songMsg.musicData.songid,
    albummid:songMsg.musicData.albummid

  }
}
export function gdMusicData(songMsg){
  return {
    songname:songMsg.songname,
    interval:songMsg.interval,
    singer:songMsg.singer,
    songid:songMsg.songid,
    albummid:songMsg.albummid

  }
}
