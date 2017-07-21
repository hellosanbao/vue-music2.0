(()=>{
  document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 75 * 2 + 'px';
  }, false);
})();

export function fonts(func){
  document.addEventListener('DOMContentLoaded', function () {
    var html = document.documentElement;
    var windowWidth = html.clientWidth;
    html.style.fontSize = windowWidth / 75 * 2 + 'px';
    func()
  }, false);
}
