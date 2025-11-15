// script.js - extra scripts for the site

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  
  // 1. Inicialización de Tooltips (Si aplica)
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.forEach(function (tooltipTriggerEl) {
    new bootstrap.Tooltip(tooltipTriggerEl)
  });
  
  // No hay lógica de modal de bienvenida aquí para evitar conflictos.
});