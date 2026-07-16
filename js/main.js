// 台灣微光希望關懷協會 官方網站 — 共用互動
(function () {
  'use strict';

  // 行動版導覽開合
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.focus();
      }
    });
  }

  // 捲動顯示
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // 展覽倒數（首頁通告列，開展後自動改顯示展期中）
  var cd = document.getElementById('expo-countdown');
  if (cd) {
    var opening = new Date('2026-08-01T14:00:00+08:00');
    var closing = new Date('2026-08-27T18:00:00+08:00');
    var now = new Date();
    if (now < opening) {
      var days = Math.ceil((opening - now) / 86400000);
      cd.textContent = '開幕倒數 ' + days + ' 天';
    } else if (now <= closing) {
      cd.textContent = '展覽進行中';
    } else {
      cd.textContent = '展覽已圓滿落幕';
    }
  }

  // 頁尾年份
  var y = document.getElementById('year');
  if (y) { y.textContent = new Date().getFullYear(); }

  // 活動集錦：燈箱
  var shots = Array.prototype.slice.call(document.querySelectorAll('.gallery .shot[data-full]'));
  var lb = document.getElementById('lightbox');
  if (shots.length && lb) {
    var lbImg = lb.querySelector('.lb-img');
    var lbCap = lb.querySelector('.lb-cap');
    var current = 0;
    var lastFocus = null;

    function show(i) {
      current = (i + shots.length) % shots.length;
      var s = shots[current];
      lbImg.src = s.getAttribute('data-full');
      lbImg.alt = s.getAttribute('data-cap') || '';
      lbCap.textContent = s.getAttribute('data-cap') || '';
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      lb.setAttribute('aria-hidden', 'false');
      lb.querySelector('.lb-close').focus();
    }
    function close() {
      lb.classList.remove('open');
      lb.setAttribute('aria-hidden', 'true');
      lbImg.src = '';
      if (lastFocus) { lastFocus.focus(); }
    }
    shots.forEach(function (s, i) {
      s.addEventListener('click', function () { open(i); });
    });
    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(current - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(current + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) { close(); } });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) { return; }
      if (e.key === 'Escape') { close(); }
      else if (e.key === 'ArrowLeft') { show(current - 1); }
      else if (e.key === 'ArrowRight') { show(current + 1); }
    });
  }
})();
