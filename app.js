(function () {
  'use strict';
  var W = 1080, H = 1350;
  var cv = document.getElementById('cv');
  var ctx = cv.getContext('2d');
  var DISP = "Anton, Impact, 'Arial Narrow', sans-serif";
  var BODY = "Inter, system-ui, -apple-system, 'Segoe UI', sans-serif";
  var SCRIPT = "'Pinyon Script', 'Snell Roundhand', cursive";
  var PLAY = "'Playfair Display', Georgia, serif";
  var MONO = "'Space Mono', ui-monospace, Menlo, monospace";

  var TPL = [
    { id: 'poster', name: 'Poster', note: 'Judul besar', tabs: true, uses: ['title', 'loc', 'alt', 'by'],
      l: { loc: 'Lokasi / jalur' },
      d: { title: 'Mount Merbabu', loc: 'via suwanting', alt: '3145', by: 'Khusnizyy' } },
    { id: 'summit', name: 'Summit', note: 'Skrip + kapital', uses: ['title', 'accent', 'cap', 'loc'],
      l: { title: 'Kata skrip', accent: 'Kata aksen', cap: 'Teks kecil', loc: 'Teks bawah' },
      d: { title: 'Summit', accent: 'ATTACK', cap: 'Lets hike', loc: 'With me' } },
    { id: 'hold', name: 'Hold', note: 'Kutipan + tombol', uses: ['title', 'accent', 'cap', 'loc'],
      l: { title: 'Judul', accent: 'Baris aksen', cap: 'Paragraf kecil', loc: 'Teks tombol' },
      d: { title: 'Hold the moment,', accent: 'Because some peace only exists here.',
           cap: 'Healing bukan tentang melarikan diri, tapi memberi ruang bagi jiwa untuk bernapas lagi.',
           loc: 'Your journey start here' } },
    { id: 'healing', name: 'Healing', note: 'Huruf kecil rapat', tabs: true, uses: ['title', 'loc', 'cap', 'by'],
      l: { loc: 'Lokasi', cap: 'Tanggal' },
      d: { title: 'adakalanya hidup juga butuh healing', loc: 'Gn.Merbabu', cap: '19-03', by: 'made by khusnizyy' } },
    { id: 'majestic', name: 'Majestic', note: 'Kaca + ketinggian', tabs: true, uses: ['title', 'alt', 'cap', 'by'],
      l: { cap: 'Label kaca', by: 'Akun' },
      d: { title: 'The majestic Mount Merbabu', alt: '3145', cap: 'Heal your soul.', by: '@dianarahmaa._' } },
    { id: 'editorial', name: 'Editorial', note: 'Serif miring', uses: ['accent', 'title', 'cap', 'by'],
      l: { accent: 'Teks kecil atas', cap: 'Paragraf', by: 'Oleh' },
      d: { accent: 'Catatan pendakian · 19 Maret', title: 'Slow living, slow hiking.',
           cap: 'Merbabu mengajarkan diam, dan aku belajar mendengarkannya.', by: 'Khusnizyy' } },
    { id: 'signboard', name: 'Papan', note: 'Papan puncak', c: '#E5322D', uses: ['loc', 'title', 'alt', 'cap', 'by'],
      l: { loc: 'Baris atas', title: 'Nama puncak', cap: 'Koordinat', by: 'Akun' },
      d: { loc: 'Selamat datang di', title: 'Puncak Merbabu', alt: '3145', cap: 'S 7°27\'18" E 110°26\'30"', by: '@khusnizyy' } },
    { id: 'postcard', name: 'Kartu pos', note: 'Bingkai putih', uses: ['loc', 'title', 'alt', 'by'],
      l: { loc: 'Sapaan skrip', by: 'Teks bawah' },
      d: { loc: 'Greetings from', title: 'Merbabu', alt: '3145', by: 'Via Suwanting · 2026' } },
    { id: 'outline', name: 'Outline', note: 'Huruf garis', uses: ['title', 'cap', 'by'],
      l: { cap: 'Sub judul' },
      d: { title: 'Chasing heights', cap: 'Merbabu · 3145 mdpl', by: 'khusnizyy' } },
    { id: 'feed', name: 'Feed', note: 'Gaya post sosmed', uses: ['by', 'title', 'cap', 'accent'],
      l: { by: 'Username', title: 'Label kecil', cap: 'Caption besar', accent: 'Baris aksen' },
      d: { by: '@dianarahmaa._', title: 'Heal your soul.', cap: 'yang sakit hatinya, yang disiksa kakinya.', accent: '- hold the moment.' } },
    { id: 'hero', name: 'Hero', note: 'Headline web', uses: ['cap', 'accent', 'title', 'loc'],
      l: { cap: 'Menu kecil', accent: 'Label pill', title: 'Headline', loc: 'Teks tombol' },
      d: { cap: 'EAT   SLEEP   SUMMIT', accent: 'Heal your soul.', title: 'Chasing heights, finding myself along the trail.', loc: 'Merbabu Teaches Silence' } },
    { id: 'mono', name: 'Mono', note: 'Minimal lebar', uses: ['loc', 'alt', 'title', 'cap'],
      l: { loc: 'Nama gunung' },
      d: { loc: 'Merbabu Mountain', alt: '3145', title: 'Slow down', cap: 'Eat · Sleep · Summit' } }
  ];
  var LABEL = { title: 'Judul', accent: 'Baris aksen', loc: 'Lokasi / teks tambahan', alt: 'Ketinggian (mdpl)', cap: 'Caption', by: 'Oleh' };
  var COLORS = [['#FFD84D', 'Kuning'], ['#FF9F43', 'Jingga'], ['#FFFFFF', 'Putih'], ['#8FD3FF', 'Biru langit'], ['#E5322D', 'Merah'], ['#9BE564', 'Hijau muda']];

  var st = { tpl: 'poster', f: {}, tab: 1, size: 1, zoom: 1, px: 0, py: 0, dark: 0.35, color: '#FFD84D' };
  TPL.forEach(function (t) { st.f[t.id] = Object.assign({}, t.d); });
  function cur() { return TPL.filter(function (t) { return t.id === st.tpl; })[0]; }

  /* ---------- sample photo ---------- */
  function samplePhoto() {
    var c = document.createElement('canvas'); c.width = 1600; c.height = 2000;
    var g = c.getContext('2d');
    var gr = g.createLinearGradient(0, 0, 0, 1400);
    gr.addColorStop(0, '#2b79de'); gr.addColorStop(0.55, '#86c3f4'); gr.addColorStop(1, '#e1f1fb');
    g.fillStyle = gr; g.fillRect(0, 0, 1600, 2000);
    function cloud(x, y, r, a) {
      var rg = g.createRadialGradient(x, y, 0, x, y, r);
      rg.addColorStop(0, 'rgba(255,255,255,' + a + ')'); rg.addColorStop(1, 'rgba(255,255,255,0)');
      g.fillStyle = rg; g.fillRect(x - r, y - r, r * 2, r * 2);
    }
    var i, j;
    for (i = 0; i < 14; i++) cloud((i * 379) % 1700 - 50, 220 + (i * 163) % 420, 140 + (i * 71) % 140, 0.55);
    g.fillStyle = '#5879a3';
    g.beginPath(); g.moveTo(0, 1240); g.lineTo(300, 1040); g.lineTo(560, 820); g.lineTo(700, 760);
    g.lineTo(940, 930); g.lineTo(1260, 1030); g.lineTo(1600, 1120); g.lineTo(1600, 1600); g.lineTo(0, 1600); g.fill();
    for (j = 0; j < 22; j++) cloud((j * 311) % 1700 - 50, 1080 + (j * 127) % 260, 150 + (j * 83) % 170, 0.8);
    function hill(col, pts) {
      g.fillStyle = col; g.beginPath(); g.moveTo(0, 2000); g.lineTo(0, pts[0]);
      g.bezierCurveTo(400, pts[1], 900, pts[2], 1600, pts[3]); g.lineTo(1600, 2000); g.fill();
    }
    hill('#6aa84a', [1500, 1380, 1560, 1420]);
    hill('#4c8a37', [1680, 1560, 1720, 1560]);
    hill('#2f6b2b', [1860, 1800, 1760, 1840]);
    g.fillStyle = '#2a2018'; g.fillRect(1070, 1470, 26, 220);
    g.fillStyle = '#1f4f22';
    [[1083, 1440, 120], [1010, 1480, 90], [1160, 1490, 95], [1083, 1380, 80]].forEach(function (p) {
      g.beginPath(); g.arc(p[0], p[1], p[2], 0, Math.PI * 2); g.fill();
    });
    return c;
  }
  var img = samplePhoto();

  /* ---------- helpers ---------- */
  function setFont(w, s, fam, ls) {
    ctx.font = w + ' ' + Math.round(s) + 'px ' + fam;
    if ('letterSpacing' in ctx) ctx.letterSpacing = (ls || 0) + 'px';
  }
  function fitFont(txt, w, maxS, maxW, fam, ls) {
    setFont(w, maxS, fam, ls);
    var m = ctx.measureText(txt).width;
    return m > maxW ? maxS * maxW / m : maxS;
  }
  function wrap(s, maxW) {
    var words = String(s).split(/\s+/).filter(Boolean), lines = [], l = '';
    words.forEach(function (w) {
      var t = l ? l + ' ' + w : w;
      if (ctx.measureText(t).width > maxW && l) { lines.push(l); l = w; } else l = t;
    });
    if (l) lines.push(l);
    return lines;
  }
  function lum(hex) {
    var n = parseInt(hex.slice(1), 16);
    return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  }
  function rr(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }
  function drawPhoto() {
    var iw = img.naturalWidth || img.width, ih = img.naturalHeight || img.height;
    var s = Math.max(W / iw, H / ih) * st.zoom;
    var dw = iw * s, dh = ih * s;
    var x = (W - dw) / 2 - st.px * Math.max(0, dw - W) / 2;
    var y = (H - dh) / 2 - st.py * Math.max(0, dh - H) / 2;
    ctx.drawImage(img, x, y, dw, dh);
  }
  function scrim() {
    var a = st.dark;
    var g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, 'rgba(5,20,15,' + (a * 0.55) + ')');
    g.addColorStop(0.35, 'rgba(5,20,15,' + (a * 0.12) + ')');
    g.addColorStop(0.62, 'rgba(5,20,15,' + (a * 0.18) + ')');
    g.addColorStop(1, 'rgba(5,20,15,' + Math.min(1, a * 1.1) + ')');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
  }
  function base() { drawPhoto(); scrim(); }
  var canBlur = typeof ctx.filter !== 'undefined';
  function glass(x, y, w, h, r, a) {
    ctx.save();
    ctx.shadowColor = 'transparent';
    rr(x, y, w, h, r); ctx.clip();
    if (canBlur) { ctx.filter = 'blur(18px)'; base(); ctx.filter = 'none'; }
    ctx.fillStyle = 'rgba(255,255,255,' + (a || 0.2) + ')';
    ctx.fillRect(x, y, w, h);
    ctx.restore();
    ctx.save();
    ctx.shadowColor = 'transparent';
    rr(x, y, w, h, r);
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
  }
  function tabs(y) {
    var L = ['JOURNEY', 'ADVENTURE', 'HEALING'];
    setFont(500, 30, BODY, 1);
    var ws = L.map(function (s) { return ctx.measureText(s).width; });
    var gap = 64, tot = ws[0] + ws[1] + ws[2] + gap * 2, x = W / 2 - tot / 2;
    ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
    L.forEach(function (s, i) {
      if (i === st.tab) {
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.fillStyle = 'rgba(255,255,255,0.28)'; rr(x - 28, y - 30, ws[i] + 56, 60, 30); ctx.fill();
        ctx.restore();
      }
      ctx.fillStyle = '#fff'; ctx.fillText(s, x, y); x += ws[i] + gap;
    });
    ctx.textBaseline = 'alphabetic';
  }
  function chevrons(cx, cy, size, color) {
    ctx.save(); ctx.shadowColor = 'transparent';
    ctx.strokeStyle = color || '#fff'; ctx.lineWidth = 4; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    for (var i = 0; i < 3; i++) {
      var x = cx + i * size * 0.7;
      ctx.beginPath(); ctx.moveTo(x, cy - size); ctx.lineTo(x + size * 0.7, cy); ctx.lineTo(x, cy + size); ctx.stroke();
    }
    ctx.restore();
  }
  function arrowCircle(cx, cy, r) {
    ctx.save(); ctx.shadowColor = 'transparent';
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 3; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx - r * 0.45, cy); ctx.lineTo(cx + r * 0.45, cy);
    ctx.moveTo(cx + r * 0.1, cy - r * 0.35); ctx.lineTo(cx + r * 0.45, cy); ctx.lineTo(cx + r * 0.1, cy + r * 0.35);
    ctx.stroke(); ctx.restore();
  }
  function centerLines(lines, x, y0, lh) {
    lines.forEach(function (l, i) { ctx.fillText(l, x, y0 + i * lh); });
  }

  /* ---------- templates ---------- */
  var DRAW = {
    poster: function (f) {
      var S = st.size;
      tabs(110);
      var t = (f.title || '').toUpperCase();
      var sz = fitFont(t, 400, 230 * S, 900, DISP, 0);
      setFont(400, sz, DISP, 0);
      ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
      ctx.fillText(t, W / 2, 130 + sz * 1.05);
      var tw = Math.min(ctx.measureText(t).width, 900), ly = 130 + sz * 1.05 + 34;
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 5; ctx.lineCap = 'round';
      ctx.beginPath();
      for (var x = W / 2 - tw / 2; x <= W / 2 + tw / 2; x += 6) {
        var y = ly + Math.sin(x / 22) * 5;
        if (x === W / 2 - tw / 2) ctx.moveTo(x, y); else ctx.lineTo(x, y);
      }
      ctx.stroke(); ctx.restore();
      var line = (f.loc || '') + (f.alt ? ' - ' + f.alt + ' mdpl' : '');
      if (line.trim()) {
        var py = ly + 84;
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(130, py, 24, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = '#10231b'; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(130, py - 2, 8, 0, Math.PI * 2); ctx.stroke();
        ctx.restore();
        setFont(700, 38, BODY, 0); ctx.textAlign = 'left'; ctx.fillStyle = '#fff';
        ctx.textBaseline = 'middle'; ctx.fillText(line, 172, py + 1); ctx.textBaseline = 'alphabetic';
      }
      if (f.by) {
        var cx = W / 2;
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.strokeStyle = st.color; ctx.lineWidth = 16; ctx.lineCap = 'round';
        ctx.beginPath(); ctx.moveTo(cx - 130, 1190);
        ctx.bezierCurveTo(cx - 40, 1150, cx + 70, 1185, cx + 120, 1085);
        ctx.stroke();
        ctx.globalAlpha = 0.55; ctx.lineWidth = 12;
        ctx.beginPath(); ctx.moveTo(cx - 100, 1215); ctx.bezierCurveTo(cx - 10, 1185, cx + 90, 1210, cx + 140, 1115); ctx.stroke();
        ctx.restore();
        setFont(700, 38, BODY, 0); ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
        ctx.fillText('By ' + f.by, cx, 1262);
      }
    },

    summit: function (f) {
      var S = st.size, R = W - 80;
      ctx.textAlign = 'right'; ctx.fillStyle = '#fff';
      var ss = fitFont(f.title || '', 400, 270 * S, 620, SCRIPT, 0);
      setFont(400, ss, SCRIPT, 0); ctx.fillText(f.title || '', R, 1010);
      var a = (f.accent || '').toUpperCase();
      var as = fitFont(a, 400, 210 * S, 580, DISP, 0);
      setFont(400, as, DISP, 0); ctx.fillStyle = st.color; ctx.fillText(a, R, 1010 + as * 0.98);
      ctx.textAlign = 'left'; ctx.fillStyle = '#fff';
      var l = (f.loc || '').toUpperCase();
      var ls = fitFont(l, 400, 130 * S, 400, DISP, 0);
      setFont(400, ls, DISP, 0); ctx.fillText(l, 80, 1262);
      if (f.cap) {
        setFont(400, 30, BODY, 7);
        var c = f.cap.toUpperCase();
        ctx.fillText(c, 80, 1262 - ls * 0.95 - 22);
        var cw = ctx.measureText(c).width;
        arrowCircle(80 + cw + 36, 1262 - ls * 0.95 - 32, 17);
      }
    },

    hold: function (f) {
      var S = st.size, pad = 80, mw = W - pad * 2;
      setFont(400, 28, BODY, 0);
      var pl = wrap(f.cap || '', 640);
      var ts = 120 * S; setFont(400, ts, DISP, 0);
      var tl = wrap((f.title || '').toUpperCase(), mw);
      var as = 104 * S; setFont(400, as, DISP, 0);
      var al = wrap((f.accent || '').toUpperCase(), mw);
      var ph = pl.length * 40 + (pl.length ? 28 : 0);
      var h = ph + tl.length * ts * 1.04 + al.length * as * 1.04;
      var y = Math.max(120, 1135 - h);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#fff';
      setFont(400, 28, BODY, 0);
      pl.forEach(function (l, i) { ctx.fillText(l, pad, y + i * 40); });
      y += ph;
      setFont(400, ts, DISP, 0);
      tl.forEach(function (l, i) { ctx.fillText(l, pad, y + i * ts * 1.04); });
      y += tl.length * ts * 1.04;
      setFont(400, as, DISP, 0); ctx.fillStyle = st.color;
      al.forEach(function (l, i) { ctx.fillText(l, pad, y + i * as * 1.04); });
      ctx.textBaseline = 'alphabetic';
      glass(60, 1180, 960, 112, 30, 0.2);
      if (f.loc) {
        var t = f.loc.toUpperCase();
        var fs = fitFont(t, 400, 46, 620, DISP, 1);
        setFont(400, fs, DISP, 1); ctx.fillStyle = '#fff'; ctx.textAlign = 'center';
        ctx.textBaseline = 'middle'; ctx.fillText(t, 480, 1237); ctx.textBaseline = 'alphabetic';
        chevrons(900, 1236, 24);
      }
    },

    healing: function (f) {
      var S = st.size;
      tabs(130);
      var sz = 175 * S;
      setFont(800, sz, BODY, -sz * 0.04);
      var lines = wrap(f.title || '', W - 160);
      ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#fff';
      var y = 230, lh = sz * 0.92;
      lines.forEach(function (l, i) { ctx.fillText(l, 80, y + i * lh); });
      var end = y + lines.length * lh + 20;
      setFont(500, 34, BODY, -1);
      if (f.loc) ctx.fillText(f.loc, 84, end);
      if (f.cap) ctx.fillText(f.cap, 84, end + 42);
      ctx.textBaseline = 'alphabetic';
      arrowCircle(W - 110, 330, 28);
      if (f.by) {
        setFont(600, 40, BODY, 0); ctx.textAlign = 'center'; ctx.fillText(f.by, W / 2, 1270);
      }
    },

    majestic: function (f) {
      var S = st.size;
      tabs(110);
      if (f.cap) {
        setFont(600, 34, BODY, 0);
        var w = ctx.measureText(f.cap).width + 72;
        glass(80, 180, w, 72, 36, 0.22);
        ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(f.cap, 116, 217); ctx.textBaseline = 'alphabetic';
      }
      var ts = 190 * S; setFont(400, ts, DISP, 0);
      var lines = wrap((f.title || '').toUpperCase(), W - 160);
      var lh = ts * 0.98, y = 290;
      ctx.textAlign = 'left'; ctx.textBaseline = 'top'; ctx.fillStyle = '#fff';
      lines.forEach(function (l, i) { ctx.fillText(l, 80, y + i * lh); });
      ctx.textBaseline = 'alphabetic';
      if (f.alt) {
        var t = f.alt + ' mdpl';
        setFont(600, 38, BODY, 0);
        var pw = ctx.measureText(t).width + 80, py = y + lines.length * lh + 16;
        glass(80, py, pw, 78, 39, 0.22);
        ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle'; ctx.textAlign = 'center';
        ctx.fillText(t, 80 + pw / 2, py + 40); ctx.textBaseline = 'alphabetic';
      }
      if (f.by) {
        glass(80, 1170, 920, 112, 56, 0.22);
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.fillStyle = st.color; ctx.beginPath(); ctx.arc(136, 1226, 38, 0, Math.PI * 2); ctx.fill();
        ctx.restore();
        ctx.fillStyle = '#10231b'; setFont(700, 40, BODY, 0); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(f.by.replace(/^[^A-Za-z0-9]+/, '').charAt(0).toUpperCase() || '·', 136, 1228);
        ctx.fillStyle = '#fff'; setFont(600, 38, BODY, 0); ctx.textAlign = 'left';
        ctx.fillText(f.by, 196, 1227); ctx.textBaseline = 'alphabetic';
        chevrons(910, 1226, 22);
      }
    },

    /* --- gaya baru --- */
    editorial: function (f) {
      var S = st.size, pad = 84;
      ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (f.accent) {
        setFont(700, 26, BODY, 7); ctx.fillStyle = st.color;
        ctx.fillText(f.accent.toUpperCase(), pad, 130);
      }
      setFont(400, 32, BODY, 0);
      var cl = wrap(f.cap || '', 700);
      var capStart = 1160 - (Math.max(cl.length, 1) - 1) * 46;
      var ts = 150 * S; setFont('italic 700', ts, PLAY, -2);
      var tl = wrap(f.title || '', W - pad * 2);
      var tlh = ts * 1.02, ty = capStart - 96 - (tl.length - 1) * tlh;
      ctx.fillStyle = '#fff';
      tl.forEach(function (l, i) { ctx.fillText(l, pad, ty + i * tlh); });
      setFont(400, 32, BODY, 0); ctx.fillStyle = 'rgba(255,255,255,0.92)';
      cl.forEach(function (l, i) { ctx.fillText(l, pad, capStart + i * 46); });
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = st.color; ctx.fillRect(pad, 1204, 120, 4); ctx.restore();
      if (f.by) { setFont(700, 26, BODY, 6); ctx.fillStyle = '#fff'; ctx.fillText(f.by.toUpperCase(), pad, 1262); }
    },

    signboard: function (f) {
      var S = st.size, col = st.color, tx = lum(col) > 0.6 ? '#10231b' : '#ffffff';
      ctx.save();
      ctx.translate(W / 2, 620); ctx.rotate(-0.04);
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#b9c4c1'; ctx.fillRect(-270, 270, 22, 380); ctx.fillRect(248, 270, 22, 380);
      ctx.restore();
      ctx.shadowColor = 'rgba(0,0,0,0.4)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12;
      ctx.fillStyle = col; rr(-440, -290, 880, 580, 18); ctx.fill();
      ctx.shadowColor = 'transparent';
      ctx.strokeStyle = tx; ctx.globalAlpha = 0.5; ctx.lineWidth = 3; rr(-414, -264, 828, 528, 10); ctx.stroke(); ctx.globalAlpha = 1;
      ctx.fillStyle = tx; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var l1 = (f.loc || '').toUpperCase();
      var s1 = fitFont(l1, 400, 66, 760, DISP, 1); setFont(400, s1, DISP, 1);
      ctx.fillText(l1, 0, -170);
      var l2 = (f.title || '').toUpperCase();
      var s2 = fitFont(l2, 400, 170 * S, 780, DISP, 0); setFont(400, s2, DISP, 0);
      ctx.fillText(l2, 0, -40);
      if (f.alt) {
        var l3 = f.alt + ' MDPL';
        var s3 = fitFont(l3, 400, 120, 600, DISP, 0); setFont(400, s3, DISP, 0);
        ctx.fillText(l3, 40, 100);
        var w3 = ctx.measureText(l3).width;
        ctx.beginPath(); var tx0 = 40 - w3 / 2 - 78;
        ctx.moveTo(tx0, 130); ctx.lineTo(tx0 + 40, 70); ctx.lineTo(tx0 + 80, 130); ctx.closePath(); ctx.fill();
      }
      if (f.cap) { setFont(600, 28, BODY, 1); ctx.fillText(f.cap, 0, 205); }
      if (f.by) { setFont(600, 24, BODY, 2); ctx.globalAlpha = 0.8; ctx.fillText(f.by, 0, 245); ctx.globalAlpha = 1; }
      ctx.restore();
    },

    postcard: function (f) {
      var S = st.size;
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.strokeStyle = '#fff'; ctx.lineWidth = 14; ctx.strokeRect(40, 40, W - 80, H - 80);
      ctx.lineWidth = 2; ctx.strokeRect(76, 76, W - 152, H - 152);
      ctx.restore();
      ctx.textAlign = 'center'; ctx.fillStyle = '#fff';
      var l = f.loc || '';
      var s1 = fitFont(l, 400, 210 * S, 860, SCRIPT, 0); setFont(400, s1, SCRIPT, 0);
      ctx.fillText(l, W / 2, 330);
      var t = (f.title || '').toUpperCase();
      var s2 = fitFont(t, 400, 340 * S, 860, DISP, 4); setFont(400, s2, DISP, 4);
      ctx.fillStyle = st.color; ctx.fillText(t, W / 2, 330 + s2 * 0.98);
      if (f.alt) {
        setFont(700, 32, MONO, 8); ctx.fillStyle = '#fff';
        var a = f.alt + ' MDPL', aw = ctx.measureText(a).width;
        ctx.fillText(a, W / 2, 1160);
        ctx.save(); ctx.shadowColor = 'transparent'; ctx.fillStyle = '#fff';
        ctx.fillRect(W / 2 - aw / 2 - 150, 1149, 110, 2); ctx.fillRect(W / 2 + aw / 2 + 40, 1149, 110, 2);
        ctx.restore();
      }
      if (f.by) { setFont(400, 30, BODY, 4); ctx.fillStyle = 'rgba(255,255,255,0.92)'; ctx.fillText(f.by.toUpperCase(), W / 2, 1222); }
    },

    outline: function (f) {
      var S = st.size, ts = 240 * S, lines, k;
      for (k = 0; k < 8; k++) {
        setFont(400, ts, DISP, 3);
        lines = wrap((f.title || '').toUpperCase(), W - 140);
        var mx = 0; lines.forEach(function (l) { mx = Math.max(mx, ctx.measureText(l).width); });
        if (mx <= W - 100) break;
        ts *= 0.9;
      }
      var lh = ts * 1.02, total = lines.length * lh;
      var y0 = (H - total) / 2 + ts * 0.82 - 30;
      ctx.textAlign = 'center'; ctx.lineJoin = 'round';
      lines.forEach(function (l, i) {
        var y = y0 + i * lh;
        if (i === lines.length - 1 && lines.length > 1) { ctx.fillStyle = st.color; ctx.fillText(l, W / 2, y); }
        else { ctx.lineWidth = 4; ctx.strokeStyle = '#fff'; ctx.strokeText(l, W / 2, y); }
      });
      if (lines.length === 1) { /* satu baris: beri isi aksen */
        ctx.globalAlpha = 0.18; ctx.fillStyle = st.color; ctx.fillText(lines[0], W / 2, y0); ctx.globalAlpha = 1;
      }
      if (f.cap) {
        setFont(600, 32, BODY, 10); ctx.fillStyle = '#fff';
        ctx.fillText(f.cap.toUpperCase(), W / 2, y0 + (lines.length - 1) * lh + 92);
      }
      if (f.by) { setFont(500, 28, BODY, 6); ctx.fillStyle = 'rgba(255,255,255,0.85)'; ctx.fillText(f.by.toUpperCase(), W / 2, 1262); }
    },

    feed: function (f) {
      var S = st.size;
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#fff'; rr(60, 80, 960, 112, 26); ctx.fill();
      ctx.fillStyle = '#e6ebe8'; rr(84, 100, 540, 72, 36); ctx.fill();
      ctx.fillStyle = st.color; ctx.beginPath(); ctx.arc(136, 136, 28, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#10231b'; setFont(700, 28, BODY, 0); ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      var nm = (f.by || '').replace(/^[^A-Za-z0-9]+/, '');
      ctx.fillText(nm.charAt(0).toUpperCase() || '·', 136, 138);
      ctx.textAlign = 'left'; ctx.fillStyle = '#0f3a22'; setFont(700, 30, BODY, 0);
      ctx.fillText(f.by || '', 184, 137);
      ctx.fillStyle = '#222';
      [940, 966, 992].forEach(function (x) { ctx.beginPath(); ctx.arc(x, 136, 6, 0, Math.PI * 2); ctx.fill(); });
      ctx.restore();
      ctx.textBaseline = 'alphabetic';
      if (f.title) {
        setFont(500, 34, BODY, -1);
        var w = ctx.measureText(f.title).width + 60;
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(255,255,255,0.8)'; ctx.lineWidth = 2; rr(160, 234, w, 64, 32); ctx.stroke();
        ctx.restore();
        ctx.fillStyle = '#fff'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
        ctx.fillText(f.title, 190, 267); ctx.textBaseline = 'alphabetic';
        chevrons(90, 266, 20, 'rgba(255,255,255,0.75)');
      }
      var cs = 84 * S; setFont(700, cs, BODY, -2);
      var cl = wrap(f.cap || '', 700), clh = cs * 1.12;
      var ay = 1090, cy = ay - 70 - (cl.length - 1) * clh;
      ctx.fillStyle = '#fff'; ctx.textAlign = 'left';
      cl.forEach(function (l, i) { ctx.fillText(l, 84, cy + i * clh); });
      if (f.accent) { setFont(700, 52, BODY, -1); ctx.fillStyle = st.color; ctx.fillText(f.accent, 84, ay); }
      ctx.save(); ctx.shadowColor = 'transparent';
      ctx.fillStyle = '#fff'; rr(60, 1170, 960, 112, 26); ctx.fill();
      var hx = 130, hy = 1228;
      ctx.fillStyle = '#ee3b2f'; ctx.beginPath(); ctx.moveTo(hx, hy + 24);
      ctx.bezierCurveTo(hx - 52, hy - 8, hx - 26, hy - 44, hx, hy - 16);
      ctx.bezierCurveTo(hx + 26, hy - 44, hx + 52, hy - 8, hx, hy + 24); ctx.fill();
      ctx.strokeStyle = '#222'; ctx.lineWidth = 4; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.arc(236, 1226, 24, 0, Math.PI * 2); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(316, 1222); ctx.lineTo(366, 1202); ctx.lineTo(348, 1252); ctx.lineTo(340, 1228); ctx.closePath(); ctx.stroke();
      ctx.restore();
    },

    hero: function (f) {
      var S = st.size, pad = 80;
      ctx.textAlign = 'left'; ctx.textBaseline = 'middle';
      setFont(500, 30, BODY, 1); ctx.fillStyle = '#fff';
      var c = f.cap || '', cw = ctx.measureText(c).width;
      ctx.fillText(c, pad, 140);
      if (f.accent) {
        setFont(500, 32, BODY, -1);
        var aw = ctx.measureText(f.accent).width + 56;
        ctx.save(); ctx.shadowColor = 'transparent';
        ctx.strokeStyle = 'rgba(255,255,255,0.85)'; ctx.lineWidth = 2; rr(pad + cw + 40, 108, aw, 64, 32); ctx.stroke();
        ctx.restore();
        ctx.fillText(f.accent, pad + cw + 68, 141);
      }
      var ts = 128 * S; setFont(500, ts, BODY, -ts * 0.04);
      var lines = wrap(f.title || '', W - pad * 2), lh = ts * 1.03;
      ctx.textBaseline = 'alphabetic'; ctx.fillStyle = '#fff';
      var y0 = 1010 - (lines.length - 1) * lh;
      lines.forEach(function (l, i) { ctx.fillText(l, pad, y0 + i * lh); });
      if (f.loc) {
        setFont(500, 40, BODY, -1);
        var bw = ctx.measureText(f.loc).width + 200;
        glass(pad, 1090, bw, 104, 52, 0.2);
        ctx.fillStyle = '#fff'; ctx.textBaseline = 'middle';
        ctx.fillText(f.loc, pad + 44, 1143);
        chevrons(pad + bw - 80, 1142, 18);
        ctx.textBaseline = 'alphabetic';
      }
    },

    mono: function (f) {
      var S = st.size;
      var pill = (f.loc || '').toUpperCase() + (f.alt ? '   |   ' + f.alt + ' MDPL' : '');
      setFont(400, 26, MONO, 3);
      var pw = ctx.measureText(pill).width + 90;
      glass(W / 2 - pw / 2, 100, pw, 78, 39, 0.2);
      ctx.fillStyle = '#fff'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText(pill, W / 2, 140); ctx.textBaseline = 'alphabetic';
      var ts = 130 * S; setFont(300, ts, BODY, ts * 0.18);
      var lines = wrap((f.title || '').toUpperCase(), W - 160), lh = ts * 1.18;
      var y0 = H / 2 - ((lines.length - 1) * lh) / 2 + ts * 0.34;
      ctx.fillStyle = '#fff';
      lines.forEach(function (l, i) { ctx.fillText(l, W / 2 + ts * 0.09, y0 + i * lh); });
      if (f.cap) {
        setFont(400, 28, MONO, 6);
        var t = f.cap.toUpperCase(), tw = ctx.measureText(t).width;
        ctx.fillStyle = '#fff'; ctx.fillText(t, W / 2, 1240);
        ctx.save(); ctx.shadowColor = 'transparent'; ctx.fillStyle = st.color;
        var lw = Math.max(0, W / 2 - tw / 2 - 40 - 80);
        ctx.fillRect(80, 1230, lw, 2); ctx.fillRect(W - 80 - lw, 1230, lw, 2);
        ctx.restore();
      }
    }
  };

  /* ---------- render ---------- */
  var raf = 0;
  function render() { cancelAnimationFrame(raf); raf = requestAnimationFrame(draw); }
  function draw() {
    ctx.save();
    ctx.clearRect(0, 0, W, H);
    base();
    ctx.shadowColor = 'rgba(0,0,0,0.32)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 2;
    ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
    DRAW[st.tpl](st.f[st.tpl]);
    ctx.restore();
  }

  /* ---------- UI ---------- */
  var $ = function (s) { return document.querySelector(s); };

  function buildTemplates() {
    var box = $('#tpls'); box.textContent = '';
    $('#tplCount').textContent = '(' + TPL.length + ')';
    TPL.forEach(function (t) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('aria-pressed', String(t.id === st.tpl));
      b.appendChild(document.createTextNode(t.name));
      var s = document.createElement('small'); s.textContent = t.note; b.appendChild(s);
      b.addEventListener('click', function () {
        st.tpl = t.id;
        if (t.c) { st.color = t.c; buildSwatches(); }
        buildTemplates(); buildFields(); render();
      });
      box.appendChild(b);
    });
  }
  function buildFields() {
    var t = cur(), box = $('#fields'); box.textContent = '';
    t.uses.forEach(function (k) {
      var wrapEl = document.createElement('div');
      var long = (k === 'cap' || k === 'title');
      wrapEl.className = 'field' + (long ? ' wide' : '');
      var lab = document.createElement('label'); lab.textContent = (t.l && t.l[k]) || LABEL[k]; lab.htmlFor = 'f_' + k;
      var inp = long ? document.createElement('textarea') : document.createElement('input');
      if (inp.tagName === 'INPUT') inp.type = 'text'; else inp.rows = 2;
      inp.id = 'f_' + k; inp.value = st.f[t.id][k] || '';
      inp.addEventListener('input', function () { st.f[t.id][k] = inp.value; render(); });
      wrapEl.appendChild(lab); wrapEl.appendChild(inp); box.appendChild(wrapEl);
    });
    $('#tabRow').hidden = !t.tabs;
  }
  function buildSwatches() {
    var box = $('#swatches'); box.textContent = '';
    COLORS.forEach(function (c) {
      var b = document.createElement('button');
      b.type = 'button'; b.setAttribute('role', 'radio'); b.setAttribute('aria-label', c[1]);
      b.setAttribute('aria-checked', String(c[0].toLowerCase() === st.color.toLowerCase()));
      b.style.background = c[0];
      b.addEventListener('click', function () { st.color = c[0]; buildSwatches(); render(); });
      box.appendChild(b);
    });
  }

  document.querySelectorAll('[data-tab]').forEach(function (b) {
    b.addEventListener('click', function () {
      st.tab = +b.getAttribute('data-tab');
      document.querySelectorAll('[data-tab]').forEach(function (o) { o.setAttribute('aria-pressed', String(o === b)); });
      render();
    });
  });
  ['zoom', 'px', 'py', 'dark', 'size'].forEach(function (k) {
    $('#' + k).addEventListener('input', function (e) { st[k] = +e.target.value; render(); });
  });
  $('#resetPhoto').addEventListener('click', function () {
    st.zoom = 1; st.px = 0; st.py = 0;
    $('#zoom').value = 1; $('#px').value = 0; $('#py').value = 0; render();
  });
  $('#file').addEventListener('change', function (e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var url = URL.createObjectURL(file), im = new Image();
    im.onload = function () {
      img = im; $('#hint').textContent = 'Fotomu sudah terpasang. Atur posisi dan teksnya.';
      $('#resetPhoto').click();
    };
    im.onerror = function () { $('#hint').textContent = 'Foto ini tidak bisa dibuka. Coba JPG atau PNG.'; };
    im.src = url;
  });

  var statusEl = $('#status');
  $('#save').addEventListener('click', function () {
    draw();
    statusEl.textContent = 'Menyiapkan gambar…';
    cv.toBlob(function (blob) {
      if (!blob) { statusEl.textContent = 'Gambar gagal dibuat. Coba lagi.'; return; }
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'typo-trail-' + st.tpl + '.png';
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(a.href); }, 4000);
      statusEl.textContent = 'Tersimpan: ' + a.download;
    }, 'image/png');
  });

  /* untuk uji: ?tpl=nama membuka gaya tertentu */
  try {
    var q = new URLSearchParams(location.search).get('tpl');
    if (q && DRAW[q]) { st.tpl = q; var tt = cur(); if (tt.c) st.color = tt.c; }
  } catch (e) {}

  buildTemplates(); buildFields(); buildSwatches();
  draw();
  if (document.fonts && document.fonts.load) {
    var fams = ['400 100px Anton', '300 100px Inter', '500 100px Inter', '600 100px Inter', '700 100px Inter', '800 100px Inter',
      '400 100px "Pinyon Script"', 'italic 700 100px "Playfair Display"', '400 100px "Space Mono"', '700 100px "Space Mono"'];
    Promise.all(fams.map(function (f) { return document.fonts.load(f, 'AaBb'); })).then(render, render);
    document.fonts.ready.then(render);
  }
})();
