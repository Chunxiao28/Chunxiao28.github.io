(function () {
  const fig = document.getElementById('fig1');
  if (!fig) return;

  const viewport = fig.querySelector('.zoom-viewport');
  const img = fig.querySelector('img');

  // ---------- Zoom ----------
  let zoom = 1;
  const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
  const apply = () => {
    zoom = clamp(zoom, 1, 3);              // 1x–3x
    img.style.setProperty('--zoom', zoom);
  };

  fig.querySelectorAll('[data-zoom]').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.getAttribute('data-zoom');
      if (action === 'in') zoom *= 1.25;
      if (action === 'out') zoom /= 1.25;
      if (action === 'reset') zoom = 1;
      apply();
    });
  });

  // Ctrl + wheel 在图上缩放（可选）
  viewport.addEventListener('wheel', (e) => {
    if (!e.ctrlKey) return;
    e.preventDefault();
    zoom *= (e.deltaY < 0) ? 1.1 : (1 / 1.1);
    apply();
  }, { passive: false });

  apply();

  // ---------- Drag to pan ----------
  let isDown = false;
  let startX = 0, startY = 0;
  let startScrollLeft = 0, startScrollTop = 0;

  // 用 Pointer Events：鼠标/触摸都兼容
  viewport.addEventListener('pointerdown', (e) => {
    // 只在放大后才需要拖拽（可选：不想限制就删掉这句）
    if (zoom <= 1) return;

    isDown = true;
    viewport.classList.add('dragging');

    viewport.setPointerCapture(e.pointerId);
    startX = e.clientX;
    startY = e.clientY;
    startScrollLeft = viewport.scrollLeft;
    startScrollTop = viewport.scrollTop;
  });

  viewport.addEventListener('pointermove', (e) => {
    if (!isDown) return;
    e.preventDefault();

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 反向：鼠标往右拖，内容往左移动 => scrollLeft 减
    viewport.scrollLeft = startScrollLeft - dx;
    viewport.scrollTop = startScrollTop - dy;
  });

  const endDrag = () => {
    if (!isDown) return;
    isDown = false;
    viewport.classList.remove('dragging');
  };

  viewport.addEventListener('pointerup', endDrag);
  viewport.addEventListener('pointercancel', endDrag);
  viewport.addEventListener('pointerleave', endDrag);
})();
