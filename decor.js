/* Новогоднее украшение Карусельной: мишура, гирлянда-лампочки и советские ёлочные игрушки, которые качаются.
   Подключается одной строкой, ничего не ломает: слой поверх шапки, клики проходят насквозь. */
(function () {
  if (window.__nyDecor) return; window.__nyDecor = true;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var H = 170;
  var css = '#ny-decor{position:absolute;left:0;top:0;width:100%;height:' + H + 'px;pointer-events:none;z-index:-1;overflow:visible}' +
    '#ny-decor canvas{position:absolute;left:0;top:0;width:100%;height:' + H + 'px}' +
    '#ny-decor .toy{position:absolute;top:0;transform-origin:50% 0;will-change:transform}' +
    '#ny-decor .toy i{display:block;margin:0 auto;width:1.5px;background:linear-gradient(#d8c79a,#a8955f)}' +
    '#ny-decor .toy svg{display:block;filter:drop-shadow(0 6px 6px rgba(60,20,10,.28))}' +
    '@keyframes nySwing{0%{transform:rotate(var(--a))}50%{transform:rotate(calc(var(--a)*-1))}100%{transform:rotate(var(--a))}}' +
    '@media (prefers-reduced-motion:reduce){#ny-decor .toy{animation:none!important}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  // советские стеклянные игрушки
  var TOYS = {
    ball: function (c) { return '<svg width="46" height="58" viewBox="0 0 46 58"><defs><radialGradient id="g' + c + '" cx="35%" cy="35%" r="70%"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset=".25" stop-color="' + c + '"/><stop offset="1" stop-color="#000" stop-opacity=".55"/></radialGradient></defs>' +
      '<rect x="17" y="2" width="12" height="8" rx="2" fill="#d9b25a"/><circle cx="23" cy="2" r="2.5" fill="none" stroke="#b8963f" stroke-width="1.5"/>' +
      '<circle cx="23" cy="33" r="21" fill="' + c + '"/><circle cx="23" cy="33" r="21" fill="url(#g' + c + ')"/>' +
      '<path d="M3 30 Q23 40 43 30" stroke="#fff3c4" stroke-width="2.2" fill="none" opacity=".85"/><path d="M5 38 Q23 48 41 38" stroke="#fff3c4" stroke-width="1.4" fill="none" stroke-dasharray="2 3" opacity=".8"/>' +
      '<g stroke="#fff" stroke-width="1.3" opacity=".9"><path d="M23 18v8M19 22h8M20.2 19.2l5.6 5.6M25.8 19.2l-5.6 5.6"/></g></svg>'; },
    icicle: function () { return '<svg width="22" height="74" viewBox="0 0 22 74"><defs><linearGradient id="ic" x1="0" x2="1"><stop offset="0" stop-color="#9fb6c8"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="#7d93a6"/></linearGradient></defs>' +
      '<rect x="6" y="1" width="10" height="7" rx="2" fill="#d9b25a"/><path d="M3 8 H19 L11 73 Z" fill="url(#ic)"/>' +
      '<path d="M4 16 L18 22 M5 28 L17 34 M6.5 40 L15.5 46 M8 52 L14 57" stroke="#6f8aa0" stroke-width="1.4" opacity=".7"/></svg>'; },
    star: function () { return '<svg width="50" height="56" viewBox="0 0 50 56"><defs><linearGradient id="st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ff5a4d"/><stop offset="1" stop-color="#9e1b16"/></linearGradient></defs>' +
      '<rect x="19" y="1" width="12" height="7" rx="2" fill="#d9b25a"/><path d="M25 9 L30.6 24.8 L47.3 25.1 L34 35.2 L38.8 51.2 L25 41.6 L11.2 51.2 L16 35.2 L2.7 25.1 L19.4 24.8 Z" fill="url(#st)" stroke="#f2c14e" stroke-width="2.4" stroke-linejoin="round"/>' +
      '<path d="M25 9 L25 41.6 M2.7 25.1 L34 35.2 M47.3 25.1 L16 35.2" stroke="#ffd7a8" stroke-width=".8" opacity=".55"/></svg>'; },
    cone: function () { var s = ''; for (var r = 0; r < 6; r++) for (var k = 0; k < 3; k++) s += '<ellipse cx="' + (13 + k * 7 - (r % 2) * 3.5) + '" cy="' + (16 + r * 8) + '" rx="5" ry="4.2" fill="#e2b552" stroke="#8a6420" stroke-width="1"/>';
      return '<svg width="36" height="68" viewBox="0 0 36 68"><rect x="12" y="1" width="12" height="8" rx="2" fill="#c9c9c9"/><clipPath id="cc"><path d="M18 9 C34 18 32 50 18 66 C4 50 2 18 18 9Z"/></clipPath><path d="M18 9 C34 18 32 50 18 66 C4 50 2 18 18 9Z" fill="#b8862e"/><g clip-path="url(#cc)">' + s + '</g></svg>'; },
    bell: function () { return '<svg width="44" height="54" viewBox="0 0 44 54"><defs><linearGradient id="bl" x1="0" x2="1"><stop offset="0" stop-color="#1f6a5a"/><stop offset=".45" stop-color="#5fc2a8"/><stop offset="1" stop-color="#11433a"/></linearGradient></defs>' +
      '<rect x="16" y="1" width="12" height="7" rx="2" fill="#d9b25a"/><path d="M22 8 C10 8 10 26 8 36 L4 44 H40 L36 36 C34 26 34 8 22 8Z" fill="url(#bl)"/><circle cx="22" cy="47" r="4.5" fill="#f2c14e"/><path d="M8 36 H36" stroke="#f2c14e" stroke-width="2"/></svg>'; }
  };
  var ORDER = [['ball', '#C8241E'], ['icicle'], ['star'], ['ball', '#2D6A62'], ['cone'], ['bell'], ['ball', '#E0A21E'], ['icicle'], ['ball', '#3D5FB0']];

  function W0() { return document.documentElement.clientWidth || window.innerWidth; }
  function build() {
    var host = document.body; if (!host) return;
    var old = document.getElementById('ny-decor'); if (old) old.remove();
    var box = document.createElement('div'); box.id = 'ny-decor'; box.setAttribute('aria-hidden', 'true');
    var cv = document.createElement('canvas'); box.appendChild(cv);
    host.appendChild(box);
    var hdr = document.querySelector(window.NY_DECOR_UNDER || 'header.top, header, .top');
    if (W0() < 600 || window.NY_DECOR_PAD) box.style.zIndex = '30';
    if (window.NY_DECOR_PAD && !document.body.dataset.nyPad) { document.body.dataset.nyPad = '1'; document.body.style.paddingTop = (W0() < 600 ? 92 : 124) + 'px'; }
    var off = hdr ? Math.max(0, hdr.getBoundingClientRect().bottom + (window.scrollY || 0) - 4) : 0; box.style.top = off + 'px';
    var W = box.clientWidth || window.innerWidth, dpr = Math.min(2, window.devicePixelRatio || 1);
    cv.width = W * dpr; cv.height = H * dpr; var x = cv.getContext('2d'); x.scale(dpr, dpr);
    // фестоны мишуры: провисают между точками крепления
    var span = W < 600 ? W / 2 : 300, n = Math.max(1, Math.round(W / span)); span = W / n;
    var sag = window.NY_DECOR_PAD ? (W < 600 ? 16 : 20) : (W < 600 ? 34 : 44), y0 = 6;
    function Y(px) { var u = (px % span) / span; return y0 + Math.sin(Math.PI * u) * sag; }
    var rnd = (function (s) { return function () { s ^= s << 13; s >>>= 0; s ^= s >>> 17; s ^= s << 5; s >>>= 0; return s / 4294967296; }; })(20261231);
    var strands = [], sparks = [], bulbs = [];
    for (var px = 0; px <= W; px += 1.6) {
      var py = Y(px);
      for (var k = 0; k < 3; k++) { var a = rnd() * Math.PI * 2, l = 5 + rnd() * 11, gold = rnd() < .62;
        strands.push([px, py, Math.cos(a) * l, Math.sin(a) * l * .9, gold ? (rnd() < .5 ? '#E8B84A' : '#F6D77E') : (rnd() < .5 ? '#D7D7D7' : '#F2F2F2')]); }
      if (rnd() < .05) sparks.push([px + (rnd() - .5) * 14, py + (rnd() - .5) * 14, rnd() * 6.28]);
    }
    for (var bx = span * .12; bx < W; bx += span / 5) bulbs.push([bx, Y(bx) + 14, bulbs.length % 4]);
    var BC = ['#FF4B3E', '#FFD23F', '#3DDC97', '#4FA3FF'];
    function draw(t) {
      x.clearRect(0, 0, W, H);
      x.strokeStyle = 'rgba(80,60,30,.55)'; x.lineWidth = 1; x.beginPath();
      for (var i = 0; i <= W; i += 4) { var yy = Y(i) + 14; i ? x.lineTo(i, yy) : x.moveTo(i, yy); } x.stroke();
      bulbs.forEach(function (b, i) { var on = reduce ? 1 : (Math.floor(t / 650) + b[2]) % 4 !== 0; var c = BC[b[2]];
        x.fillStyle = '#5a4a2a'; x.fillRect(b[0] - 2.5, b[1] - 3, 5, 5);
        if (on) { var g = x.createRadialGradient(b[0], b[1] + 7, 0, b[0], b[1] + 7, 16); g.addColorStop(0, c); g.addColorStop(1, 'rgba(255,255,255,0)'); x.globalAlpha = .55; x.fillStyle = g; x.beginPath(); x.arc(b[0], b[1] + 7, 16, 0, 7); x.fill(); x.globalAlpha = 1; }
        x.fillStyle = on ? c : 'rgba(120,110,90,.55)'; x.beginPath(); x.ellipse(b[0], b[1] + 7, 4.2, 6.5, 0, 0, 7); x.fill(); });
      x.lineCap = 'round'; x.lineWidth = 1.3;
      for (var j = 0; j < strands.length; j++) { var s = strands[j]; x.strokeStyle = s[4]; x.beginPath(); x.moveTo(s[0], s[1]); x.lineTo(s[0] + s[2], s[1] + s[3]); x.stroke(); }
      sparks.forEach(function (p) { var k = reduce ? .6 : Math.max(0, Math.sin(t / 380 + p[2] * 3)); if (k < .05) return; x.save(); x.globalAlpha = k; x.fillStyle = '#fff';
        x.translate(p[0], p[1]); x.beginPath(); for (var q = 0; q < 8; q++) { var r = q % 2 ? 1.2 : 4.5 * k + 1, aa = q * Math.PI / 4; x.lineTo(Math.cos(aa) * r, Math.sin(aa) * r); } x.fill(); x.restore(); });
    }
    // игрушки висят из нижних точек фестонов и между ними
    var spots = []; if (W < 600) spots = [W * .07, W * .93]; else for (var i = 0; i < n; i++) spots.push(span * (i + .5), span * (i + .2), span * (i + .8));
    spots.sort(function (a, b) { return a - b; });
    spots.forEach(function (sx, i) {
      var t = ORDER[i % ORDER.length], d = document.createElement('div'); d.className = 'toy';
      var len = (W < 600 || window.NY_DECOR_PAD) ? 6 + ((i * 37) % 18) : 16 + ((i * 37) % 46), svg = TOYS[t[0]](t[1] || ''), wpx = /width="(\d+)"/.exec(svg)[1];
      d.innerHTML = '<i style="height:' + len + 'px"></i>' + svg;
      d.style.left = (sx - wpx / 2) + 'px'; d.style.top = (Y(sx) + 2) + 'px';
      if (!reduce) { d.style.setProperty('--a', (3 + (i % 4) * 1.5) + 'deg'); d.style.animation = 'nySwing ' + (3.2 + (i % 5) * .45) + 's ease-in-out ' + (-(i * .7)) + 's infinite'; }
      box.appendChild(d);
    });
    if (reduce) { draw(0); return; }
    var raf; (function loop(t) { draw(t || 0); raf = requestAnimationFrame(loop); })();
    box._stop = function () { cancelAnimationFrame(raf); };
  }
  var tmr; function rebuild() { var o = document.getElementById('ny-decor'); if (o && o._stop) o._stop(); build(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rebuild); else rebuild();
  var lastW = window.innerWidth; window.addEventListener('resize', function () { if (Math.abs(window.innerWidth - lastW) < 2) return; lastW = window.innerWidth; clearTimeout(tmr); tmr = setTimeout(rebuild, 200); });
})();
