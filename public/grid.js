// grid.js — draws labels on a 10px grid for layout aid
(function () {
  const overlay = document.getElementById('gridOverlay');
  const toggle = document.getElementById('gridToggle');
  if (!overlay || !toggle) return;

  function clearLabels() {
    overlay.querySelectorAll('.grid-label').forEach(el => el.remove());
  }

  function drawLabels() {
    clearLabels();
    const step = 100; // label every 100px for readability
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    // horizontal labels (x positions)
    for (let x = 0; x <= vw; x += step) {
      const el = document.createElement('div');
      el.className = 'grid-label';
      el.textContent = x + 'px';
      el.style.left = (x + 4) + 'px';
      el.style.top = '4px';
      overlay.appendChild(el);
    }

    // vertical labels (y positions)
    for (let y = 0; y <= vh; y += step) {
      const el = document.createElement('div');
      el.className = 'grid-label';
      el.textContent = y + 'px';
      el.style.left = '4px';
      el.style.top = (y + 4) + 'px';
      overlay.appendChild(el);
    }
  }

  function showGrid(show) {
    if (show) {
      overlay.classList.remove('hidden');
      drawLabels();
    } else {
      overlay.classList.add('hidden');
      clearLabels();
    }
  }

  // toggle state persisted in memory during session
  let visible = false;
  toggle.addEventListener('click', () => {
    visible = !visible;
    showGrid(visible);
  });

  // update labels on resize while visible
  let resizeTimer = null;
  window.addEventListener('resize', () => {
    if (!visible) return;
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawLabels, 150);
  });
})();
