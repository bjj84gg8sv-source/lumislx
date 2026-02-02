// Magic Grid CDN loader for Photography page
(function() {
  if (window.MagicGrid) return;
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/magic-grid@3.1.2/dist/magic-grid.min.js';
  script.async = true;
  document.head.appendChild(script);
})();
