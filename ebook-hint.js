(function() {
  document.querySelectorAll('.book-card').forEach(function(card) {
    var format = card.querySelector('.book-format');
    if (!format) return;
    var text = format.textContent || '';
    if (text.indexOf('PDF') === -1 && text.toLowerCase().indexOf('ebook') === -1) return;
    var tag = document.createElement('span');
    tag.className = 'ebook-tag';
    tag.textContent = 'E-Book ✓';
    format.appendChild(tag);
  });
})();
