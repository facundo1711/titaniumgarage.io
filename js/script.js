
// script.js - extra scripts for the site
document.addEventListener('DOMContentLoaded', function () {
  // Enable Bootstrap tooltips if any
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  });
});
