// ================================================
// INERTI — Landing Page Scripts
// FAQ accordion · smooth scroll · scroll animations
// ================================================

(function () {
  'use strict';

  // ---- FAQ Accordion ----
  // Only one FAQ item open at a time (optional UX improvement).
  // Uses native <details> for accessibility; JS adds single-open behavior.
  var faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(function (item) {
    item.addEventListener('toggle', function () {
      if (item.open) {
        faqItems.forEach(function (other) {
          if (other !== item && other.open) {
            other.open = false;
          }
        });
      }
    });
  });

  // ---- Smooth scroll for anchor links ----
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;

    var targetId = link.getAttribute('href');
    if (targetId === '#') return;

    var target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    var navbarHeight = document.getElementById('navbar').offsetHeight;
    var targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 16;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });

  // ---- Navbar scroll state ----
  var navbar = document.getElementById('navbar');
  var scrollThreshold = 20;

  function updateNavbar() {
    if (window.pageYOffset > scrollThreshold) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  }

  window.addEventListener('scroll', updateNavbar, { passive: true });
  updateNavbar();

  // ---- WhatsApp demo by category ----
  var demoSection = document.querySelector('.rubro-demo');

  if (demoSection) {
    var demoTabs = demoSection.querySelectorAll('.demo-tab');
    var demoPanel = demoSection.querySelector('.wa-demo');
    var demoBody = demoSection.querySelector('[data-demo-body]');
    var demoAvatar = demoSection.querySelector('[data-demo-avatar]');
    var demoName = demoSection.querySelector('[data-demo-name]');
    var demoStatus = demoSection.querySelector('[data-demo-status]');
    var reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    var demoState = {
      activeId: 'ferreteria',
      hasEnteredViewport: false,
      timeouts: []
    };
    var conversations = {
      ferreteria: {
        avatar: '🔩',
        name: 'Ferretería Don Pato',
        status: 'Precio + stock en segundos',
        messages: [
          { side: 'out', text: 'Buenas, necesito materiales para hacer una terraza de madera' },
          { side: 'in',  text: 'Hola 👋 Con gusto te ayudo. ¿Cuántos m² tiene la terraza aproximadamente?' },
          { side: 'out', text: 'Como 20 metros cuadrados' },
          { side: 'in',  text: 'Para 20 m² te recomiendo:\n– Tablas pino cepillado 2x6": $4.200 c/u (necesitarías ~28 unidades)\n– Tornillos galvanizados 3": $3.500 la caja de 100\n– Impermeabilizante Sika 4L: $18.900\n\nTotal estimado: ~$160.000. ¿Quieres que reserve los materiales?' },
          { side: 'out', text: 'Sí, y ¿tienen servicio de corte?' },
          { side: 'in',  text: 'Sí 🪚 El corte tiene un valor de $500 por corte. ¿Para cuándo necesitas los materiales?' },
          { side: 'out', text: 'Para el sábado' },
          { side: 'in',  text: 'Perfecto. Reservo los materiales a tu nombre hasta el sábado a las 13:00. ¿A qué nombre queda la reserva?' },
          { side: 'out', text: 'A nombre de Carlos Muñoz' },
          { side: 'in',  text: '✅ Listo Carlos. Reserva confirmada para el sábado. Pregunta por los materiales en mesón al llegar. ¿Algo más en lo que pueda ayudarte?' }
        ]
      },
      veterinaria: {
        avatar: '🐾',
        name: 'Veterinaria Huellitas Sur',
        status: 'Agenda automática',
        messages: [
          { side: 'out', text: 'Hola, mi perro está rascándose mucho, ¿puede ser alergia?' },
          { side: 'in',  text: 'Hola 🐶 El rascado frecuente puede tener varias causas: alergias, hongos, parásitos externos o dermatitis. Lo mejor es una revisión presencial para que el veterinario evalúe bien. ¿Quieres agendar una consulta?' },
          { side: 'out', text: 'Sí, ¿cuánto sale la consulta?' },
          { side: 'in',  text: 'La consulta de dermatología vale $18.000. Si viene con muestra de pelo o costra, el análisis adicional es $12.000. ¿Qué raza y edad tiene tu perro?' },
          { side: 'out', text: 'Es un golden de 3 años, se llama Bruno' },
          { side: 'in',  text: 'Perfecto 🐕 Tenemos hora disponible mañana jueves 10:30 o el viernes a las 16:00. ¿Cuál te acomoda más?' },
          { side: 'out', text: 'El viernes 16:00' },
          { side: 'in',  text: '✅ Bruno queda agendado el viernes a las 16:00 con la Dra. Campos. Te mando la dirección por acá. ¿Necesitas algo más?' },
          { side: 'out', text: 'Muchas gracias' },
          { side: 'in',  text: 'Con gusto 😊 Si Bruno empeora antes del viernes, escríbenos y buscamos hora de urgencia. ¡Hasta el viernes!' }
        ]
      },
      taller: {
        avatar: '🔧',
        name: 'Taller El Volante',
        status: 'Cotiza sin soltar la herramienta',
        messages: [
          { side: 'out', text: 'Hola, mi auto hace un ruido raro al frenar, como si raspara' },
          { side: 'in',  text: 'Ese sonido suele ser desgaste de pastillas de freno o disco rayado. Puede ser peligroso ignorarlo. ¿Qué auto tienes (marca, modelo y año)?' },
          { side: 'out', text: 'Toyota Corolla 2019' },
          { side: 'in',  text: 'Para un Corolla 2019:\n– Cambio pastillas delanteras: $45.000–$65.000\n– Si los discos están rayados, reemplazo: $90.000–$130.000\n\nPara saber qué necesita exactamente hay que revisarlo. ¿Cuándo puedes traerlo?' },
          { side: 'out', text: '¿Mañana está bien?' },
          { side: 'in',  text: 'Sí 🔧 Mañana tenemos a las 10:00 y a las 14:30. ¿Cuál te sirve?' },
          { side: 'out', text: 'A las 10 mejor' },
          { side: 'in',  text: '✅ Reservado para mañana a las 10:00. La revisión de frenos no tiene costo. Si hay que hacer trabajo, te presupuestamos antes de tocar nada. ¿A qué nombre queda?' },
          { side: 'out', text: 'Miguel Soto' },
          { side: 'in',  text: 'Listo Miguel 👍 Mañana a las 10:00 en Taller El Volante. Te esperamos.' }
        ]
      },
      restaurante: {
        avatar: '🍽',
        name: 'Cocinería La Esquina',
        status: 'Menú y delivery rápido',
        messages: [
          { side: 'out', text: '¿Hacen delivery para 4 personas para el almuerzo?' },
          { side: 'in',  text: 'Hola 👋 Sí hacemos delivery al mediodía. ¿A qué sector de Concepción? Así te confirmo si llegamos y el tiempo estimado.' },
          { side: 'out', text: 'Barros Arana con Aníbal Pinto' },
          { side: 'in',  text: 'Sí llegamos ahí, en aprox 35–45 min 🛵 El menú de hoy es:\n– Cazuela de vacuno: $5.500\n– Pollo al jugo con arroz: $5.200\n– Pastel de choclo: $5.800\nTodos incluyen ensalada y bebida.' },
          { side: 'out', text: '¿Tienen opciones vegetarianas?' },
          { side: 'in',  text: 'Sí 🥗 Hoy tenemos lentejas guisadas con arroz a $4.800 y ensalada completa (tomate, lechuga, palta) a $3.200. ¿Te mando los 4 menús o mezclan opciones?' },
          { side: 'out', text: '3 pollo al jugo y 1 lentejas' },
          { side: 'in',  text: 'Anotado ✅ 3 pollo al jugo + 1 lentejas = $20.800 total. ¿Pagan contra entrega en efectivo o transferencia?' },
          { side: 'out', text: 'Transferencia' },
          { side: 'in',  text: 'Perfecto. Te mando los datos bancarios ahora. El pedido sale en 20 min y llega en ~40 min 🕐 ¿Confirmas la dirección exacta?' }
        ]
      },
      dental: {
        avatar: '🦷',
        name: 'Dental Sonría',
        status: 'Horas sin llamar',
        messages: [
          { side: 'out', text: 'Hola, quiero agendar una limpieza dental' },
          { side: 'in',  text: 'Hola 😊 Con gusto. ¿Es tu primera vez con nosotros o ya eres paciente?' },
          { side: 'out', text: 'Primera vez' },
          { side: 'in',  text: 'Bienvenido 🦷 Para pacientes nuevos hacemos primero una evaluación inicial ($15.000) donde el dentista revisa y diseña tu plan de tratamiento. La limpieza viene después. ¿Te parece?' },
          { side: 'out', text: 'Perfecto, ¿cuándo tienen hora?' },
          { side: 'in',  text: 'Esta semana tenemos el jueves 11:00 y el viernes 15:30. ¿Cuál prefieres?' },
          { side: 'out', text: 'El jueves 11' },
          { side: 'in',  text: '✅ Agendado para el jueves a las 11:00. ¿A qué nombre? Te mandamos recordatorio 24 horas antes.' },
          { side: 'out', text: 'Ana Pérez' },
          { side: 'in',  text: 'Listo Ana 👍 Te esperamos el jueves. Recuerda venir con tu carnet. ¡Hasta pronto!' }
        ]
      },
      inmobiliaria: {
        avatar: '🏠',
        name: 'Inmobiliaria Raíces Sur',
        status: 'Arriendos y visitas al instante',
        messages: [
          { side: 'out', text: 'Hola, busco un depto en arriendo en el centro de Concepción' },
          { side: 'in',  text: 'Hola 👋 Con gusto te ayudo. ¿Cuántos dormitorios necesitas y cuál es tu presupuesto mensual aproximado?' },
          { side: 'out', text: '2 dormitorios, máximo $450.000' },
          { side: 'in',  text: 'Tenemos 3 opciones disponibles en esa zona:\n– Depto Barros Arana 540: 2D/1B, 55 m², $420.000/mes\n– Depto Caupolicán 312: 2D/2B, 62 m², $445.000/mes\n– Depto O\'Higgins 890: 2D/1B, 48 m², $380.000/mes\n\nTodos incluyen estacionamiento. ¿Te interesa agendar una visita?' },
          { side: 'out', text: 'El de Caupolicán se ve bien, ¿puedo verlo?' },
          { side: 'in',  text: 'Claro 🏠 Tenemos disponibilidad para visita mañana a las 11:00 o el sábado a las 10:30. ¿Cuál te acomoda?' },
          { side: 'out', text: 'El sábado a las 10:30' },
          { side: 'in',  text: '✅ Visita agendada para el sábado a las 10:30 en Caupolicán 312. Te mando la ubicación exacta por acá. ¿A qué nombre queda?' },
          { side: 'out', text: 'Camila Rojas' },
          { side: 'in',  text: 'Perfecto Camila 👍 Te esperamos el sábado. Lleva tu carnet y si tienes liquidaciones de sueldo, tráelas por si decides avanzar. ¡Nos vemos!' }
        ]
      }
    };

    // Simulated timestamps for messages
    var timeTemplates = [
      '10:21', '10:21', '10:22', '10:22', '10:23',
      '10:23', '10:24', '10:24', '10:25', '10:25'
    ];

    function clearDemoTimeouts() {
      demoState.timeouts.forEach(function (timeoutId) {
        window.clearTimeout(timeoutId);
      });
      demoState.timeouts = [];
    }

    function isReducedMotion() {
      return reducedMotionQuery.matches;
    }

    function scrollDemoToBottom() {
      demoBody.scrollTop = demoBody.scrollHeight;
    }

    function createMessage(message, index) {
      var item = document.createElement('div');
      var bubble = document.createElement('div');

      item.className = 'wa-msg wa-msg--' + message.side;
      bubble.className = 'wa-bubble';
      bubble.textContent = message.text;

      // Add timestamp
      var timeSpan = document.createElement('span');
      timeSpan.className = 'wa-time';
      var timeIndex = Math.min(index, timeTemplates.length - 1);
      if (message.side === 'out') {
        timeSpan.textContent = timeTemplates[timeIndex] + ' ✓✓';
      } else {
        timeSpan.textContent = timeTemplates[timeIndex];
      }
      bubble.appendChild(timeSpan);

      item.appendChild(bubble);

      return item;
    }

    function createTypingMessage() {
      var item = document.createElement('div');
      var bubble = document.createElement('div');

      item.className = 'wa-msg wa-msg--in';
      bubble.className = 'wa-bubble wa-typing';
      bubble.innerHTML = '<span></span><span></span><span></span>';
      item.appendChild(bubble);

      return item;
    }

    function syncDemoHeader(demoId) {
      var conversation = conversations[demoId];

      demoAvatar.textContent = conversation.avatar;
      demoName.textContent = conversation.name;
      demoStatus.textContent = conversation.status;
    }

    function syncActiveTab(demoId) {
      demoTabs.forEach(function (tab) {
        var isActive = tab.getAttribute('data-demo') === demoId;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', isActive ? 'true' : 'false');

        // Set emoji data attribute on title for active tab CSS ::before
        var titleEl = tab.querySelector('.demo-tab-title');
        if (titleEl) {
          titleEl.setAttribute('data-tab-emoji', tab.getAttribute('data-demo-emoji') || '');
        }

        if (isActive) {
          demoPanel.setAttribute('aria-labelledby', tab.id);
        }
      });
    }

    function renderConversation(demoId, instant) {
      var conversation = conversations[demoId];
      var delay = 180;

      clearDemoTimeouts();
      demoBody.innerHTML = '';
      syncDemoHeader(demoId);
      syncActiveTab(demoId);

      if (instant) {
        conversation.messages.forEach(function (message, index) {
          demoBody.appendChild(createMessage(message, index));
        });
        scrollDemoToBottom();
        return;
      }

      conversation.messages.forEach(function (message, index) {
        if (message.side === 'out') {
          demoState.timeouts.push(window.setTimeout(function () {
            demoBody.appendChild(createMessage(message, index));
            scrollDemoToBottom();
          }, delay));
          delay += 900;
          return;
        }

        demoState.timeouts.push(window.setTimeout(function () {
          var typingMessage = createTypingMessage();

          demoBody.appendChild(typingMessage);
          scrollDemoToBottom();

          demoState.timeouts.push(window.setTimeout(function () {
            typingMessage.remove();
            demoBody.appendChild(createMessage(message, index));
            scrollDemoToBottom();
          }, 780));
        }, delay));
        delay += 1680;
      });
    }

    function activateDemo(demoId, options) {
      var shouldRenderInstantly = options && options.instant;

      demoState.activeId = demoId;
      renderConversation(demoId, shouldRenderInstantly || isReducedMotion());
    }

    demoTabs.forEach(function (tab) {
      tab.addEventListener('click', function () {
        var demoId = tab.getAttribute('data-demo');

        if (!demoState.hasEnteredViewport) {
          demoState.hasEnteredViewport = true;
        }

        activateDemo(demoId);
      });
    });

    if (typeof reducedMotionQuery.addEventListener === 'function') {
      reducedMotionQuery.addEventListener('change', function () {
        activateDemo(demoState.activeId, { instant: isReducedMotion() });
      });
    }

    syncDemoHeader(demoState.activeId);
    syncActiveTab(demoState.activeId);

    if ('IntersectionObserver' in window) {
      var demoObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting || demoState.hasEnteredViewport) return;

          demoState.hasEnteredViewport = true;
          activateDemo(demoState.activeId);
          demoObserver.unobserve(entry.target);
        });
      }, {
        threshold: 0.35
      });

      demoObserver.observe(demoSection);
    } else {
      demoState.hasEnteredViewport = true;
      activateDemo(demoState.activeId, { instant: isReducedMotion() });
    }
  }
  // ---- Hamburger menu ----
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close menu when a link is clicked
    navLinks.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ---- Proof bar count-up animation ----
  var proofValues = document.querySelectorAll('.proof-value');

  if (proofValues.length && 'IntersectionObserver' in window) {
    var proofObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        proofValues.forEach(function (el) {
          var text = el.textContent.trim();
          el.style.opacity = '0';
          el.style.transform = 'translateY(8px)';
          el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';

          setTimeout(function () {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, Array.prototype.indexOf.call(proofValues, el) * 150);
        });

        proofObserver.unobserve(entry.target);
      });
    }, { threshold: 0.5 });

    var proofBar = document.querySelector('.proof-bar');
    if (proofBar) proofObserver.observe(proofBar);
  }

  // ---- Fade-in on scroll (IntersectionObserver) ----
  var fadeTargets = document.querySelectorAll(
    '.section, .card, .wa-mockup, .wa-demo, .pricing-card, .step, .trust-card'
  );

  // Add the fade-in class to all targets
  fadeTargets.forEach(function (el) {
    el.classList.add('fade-in');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    fadeTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show everything if IntersectionObserver not supported
    fadeTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
  // ---- Pricing carousel drag-to-scroll ----
  var pricingGrid = document.querySelector('.pricing-grid');
  if (pricingGrid) {
    var isDown = false, startX, scrollLeft;
    pricingGrid.addEventListener('mousedown', function (e) {
      isDown = true;
      startX = e.pageX - pricingGrid.offsetLeft;
      scrollLeft = pricingGrid.scrollLeft;
    });
    pricingGrid.addEventListener('mouseleave', function () { isDown = false; });
    pricingGrid.addEventListener('mouseup', function () { isDown = false; });
    pricingGrid.addEventListener('mousemove', function (e) {
      if (!isDown) return;
      e.preventDefault();
      var x = e.pageX - pricingGrid.offsetLeft;
      pricingGrid.scrollLeft = scrollLeft - (x - startX);
    });
  }
})();
