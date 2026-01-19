document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.gallery').forEach(gallery => {
    const figures = gallery.querySelectorAll('figure');
    gallery.classList.toggle('is-single', figures.length <= 1);
  });
});
