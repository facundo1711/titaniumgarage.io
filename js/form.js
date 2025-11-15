// form.js - Validación + lógica del formulario unificado + modales mejorados

document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // =========================================================
  // 1. MODAL DE BIENVENIDA (sólo para index.html)
  // =========================================================
  const modalBienvenidaElement = document.getElementById('modalBienvenida');
  if (modalBienvenidaElement) {
    // Verificar si ya se mostró en esta sesión
    if (!sessionStorage.getItem('modalBienvenidaMostrado')) {
      const modalBienvenida = new bootstrap.Modal(modalBienvenidaElement);
      modalBienvenida.show();
      sessionStorage.setItem('modalBienvenidaMostrado', 'true');
    }
  }

  // =========================================================
  // 2. LÓGICA DEL FORMULARIO UNIFICADO (Sacar Turnos)
  // =========================================================
  const formUnificado = document.getElementById('form-unificado');
  const tipoConsulta = document.getElementById('tipoConsulta');
  const contenedorTurno = document.getElementById('contenedor-turno');
  const fechaInput = document.getElementById('fecha');
  const horaInput = document.getElementById('hora');
  const btnEnviar = document.getElementById('btnEnviar');

  // Configurar fecha mínima (hoy) - no permitir fechas pasadas
  if (fechaInput) {
    const hoy = new Date().toISOString().split('T')[0];
    fechaInput.setAttribute('min', hoy);
  }

  // Mostrar/ocultar campos de turno según el tipo de consulta
  if (tipoConsulta && contenedorTurno) {
    tipoConsulta.addEventListener('change', function() {
      const valor = this.value;
      
      // Mostrar campos de turno solo si se selecciona un servicio (no mensaje general)
      if (valor !== 'mensaje' && valor !== '') {
        contenedorTurno.style.display = 'block';
        fechaInput.setAttribute('required', 'required');
        horaInput.setAttribute('required', 'required');
        btnEnviar.textContent = 'Reservar turno';
      } else {
        contenedorTurno.style.display = 'none';
        fechaInput.removeAttribute('required');
        horaInput.removeAttribute('required');
        fechaInput.value = '';
        horaInput.value = '';
        btnEnviar.textContent = 'Enviar mensaje';
      }
    });
  }

  // Validación y envío del formulario unificado
  if (formUnificado) {
    formUnificado.addEventListener('submit', function(e) {
      e.preventDefault();
      
      if (formUnificado.checkValidity()) {
        const tipoSeleccionado = tipoConsulta.value;
        const modalIcono = document.getElementById('modalIcono');
        const modalMensajePrincipal = document.getElementById('modalMensajePrincipal');
        const modalMensajeSecundario = document.getElementById('modalMensajeSecundario');
        const modalTitulo = document.getElementById('modalFormularioEnviadoLabel');
        
        // Personalizar modal según el tipo de consulta
        if (tipoSeleccionado === 'mensaje') {
          modalIcono.textContent = '📧';
          modalTitulo.textContent = '¡Mensaje Recibido!';
          modalMensajePrincipal.textContent = 'Gracias por contactarnos.';
          modalMensajeSecundario.textContent = 'Hemos recibido tu mensaje y nos comunicaremos contigo en breve. Nuestro equipo está aquí para ayudarte.';
        } else {
          modalIcono.textContent = '✓';
          modalTitulo.textContent = '¡Turno Reservado Exitosamente!';
          modalMensajePrincipal.textContent = 'Tu turno ha sido confirmado.';
          modalMensajeSecundario.textContent = 'Recibirás un correo de confirmación con todos los detalles. Te esperamos en Titanium Garage.';
        }
        
        // Mostrar modal
        const modal = new bootstrap.Modal(document.getElementById('modalFormularioEnviado'));
        modal.show();
        
        // Resetear formulario
        formUnificado.reset();
        formUnificado.classList.remove('was-validated');
        contenedorTurno.style.display = 'none';
        btnEnviar.textContent = 'Enviar formulario';
        
      } else {
        formUnificado.classList.add('was-validated');
      }
    });
  }

  // =========================================================
  // 3. FORMULARIO DE CONTACTO (contacto.html)
  // =========================================================
  const formContacto = document.getElementById('form-contacto');
  
  if (formContacto) {
    formContacto.addEventListener('submit', function(event) {
      event.preventDefault();
      event.stopPropagation();

      if (formContacto.checkValidity()) {
        const modalElement = document.getElementById('modalMensajeEnviado');
        
        if (modalElement) {
          const modalInstance = new bootstrap.Modal(modalElement);
          modalInstance.show();
        }
        
        // Resetear formulario
        formContacto.reset();
        formContacto.classList.remove('was-validated');
        
      } else {
        formContacto.classList.add('was-validated');
      }
    });
  }

  // =========================================================
  // 4. VALIDACIÓN EN TIEMPO REAL PARA TODOS LOS FORMULARIOS
  // =========================================================
  const todosLosFormularios = document.querySelectorAll('.needs-validation');
  
  todosLosFormularios.forEach(function(form) {
    // Validación en tiempo real para inputs
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(function(input) {
      input.addEventListener('blur', function() {
        if (form.classList.contains('was-validated')) {
          if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
          }
        }
      });
      
      input.addEventListener('input', function() {
        if (form.classList.contains('was-validated')) {
          if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
          }
        }
      });
    });
  });

  // =========================================================
  // 5. FUNCIONES AUXILIARES
  // =========================================================
  
  // Función para formatear teléfono (opcional)
  const telefonoInputs = document.querySelectorAll('input[type="tel"]');
  telefonoInputs.forEach(function(input) {
    input.addEventListener('input', function(e) {
      // Permitir solo números, + y espacios
      let valor = e.target.value.replace(/[^\d\+\s]/g, '');
      e.target.value = valor;
    });
  });

  // Validación de hora dentro del rango permitido (09:00 - 19:00)
  if (horaInput) {
    horaInput.addEventListener('change', function() {
      const hora = this.value;
      if (hora) {
        const [horas, minutos] = hora.split(':').map(Number);
        const horaMinutos = horas * 60 + minutos;
        const horaMinima = 9 * 60; // 09:00
        const horaMaxima = 19 * 60; // 19:00
        
        if (horaMinutos < horaMinima || horaMinutos > horaMaxima) {
          this.setCustomValidity('La hora debe estar entre 09:00 y 19:00');
        } else {
          this.setCustomValidity('');
        }
      }
    });
  }

  // =========================================================
  // 6. ANIMACIONES Y EFECTOS ADICIONALES
  // =========================================================
  
  // Animación suave al mostrar el contenedor de turno
  if (contenedorTurno) {
    const observer = new MutationObserver(function(mutations) {
      mutations.forEach(function(mutation) {
        if (mutation.attributeName === 'style') {
          if (contenedorTurno.style.display === 'block') {
            contenedorTurno.classList.add('fade-in');
          } else {
            contenedorTurno.classList.remove('fade-in');
          }
        }
      });
    });
    
    observer.observe(contenedorTurno, { attributes: true });
  }

  // Log para debugging (eliminar en producción si lo deseas)
  console.log('✅ form.js cargado correctamente');
  console.log('📋 Formularios encontrados:', todosLosFormularios.length);
});