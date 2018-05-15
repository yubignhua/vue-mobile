(((doc, win) => {
  const docEle = doc.documentElement;
  const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
  const recalc = () => {
    const width = docEle.clientWidth;
    if (!width) return;
    docEle.style.fontSize = `${100 * (width / 375)}px`;
  };
  win.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window));
