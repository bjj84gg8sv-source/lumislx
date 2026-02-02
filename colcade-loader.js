// Colcade CDN loader for Photography page
(function() {
  if (window.Colcade) return;
  var script = document.createElement('script');
  script.src = 'https://unpkg.com/colcade@0/colcade.js';
  script.async = true;
  document.head.appendChild(script);
})();
