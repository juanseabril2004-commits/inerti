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
          { side: 'out', text: 'Hola, ¿tienen silicona transparente?' },
          { side: 'in', text: 'Sí 🙂 Nos quedan 12 unidades. Está a $2.990. ¿Cuántas necesitas?' },
          { side: 'out', text: '2' },
          { side: 'in', text: 'Perfecto. Te las reservo hasta las 19:00. ¿Vienes hoy?' },
          { side: 'out', text: 'Sí, como a las 6' },
          { side: 'in', text: 'Buenísimo. Quedan a tu nombre. Si quieres, también te muestro la negra.' }
        ]
      },
      veterinaria: {
        avatar: '🐾',
        name: 'Veterinaria Huellitas Sur',
        status: 'Agenda automática',
        messages: [
          { side: 'out', text: 'Hola, ¿tienen hora para vacuna mañana?' },
          { side: 'in', text: 'Sí 🐾 Tenemos 11:00 o 16:30. ¿Cuál te sirve?' },
          { side: 'out', text: '16:30' },
          { side: 'in', text: 'Listo. Te agendé para mañana 16:30. ¿Nombre del paciente?' },
          { side: 'out', text: 'Luna' },
          { side: 'in', text: 'Perfecto. Luna queda agendada 🐶 Si quieres, te mando ubicación.' }
        ]
      },
      taller: {
        avatar: '🔧',
        name: 'Taller El Volante',
        status: 'Cotiza sin soltar la herramienta',
        messages: [
          { side: 'out', text: 'Hola, ¿cuánto sale el cambio de pastillas?' },
          { side: 'in', text: 'Depende del modelo. ¿Qué auto es (marca/año)?' },
          { side: 'out', text: 'Hyundai Accent 2018' },
          { side: 'in', text: 'Aprox $45.000 + mano de obra. Si quieres, te agendo diagnóstico.' },
          { side: 'out', text: '¿Para mañana tienen hora?' },
          { side: 'in', text: 'Sí, mañana tenemos en la tarde. Si quieres, te reservo una revisión.' }
        ]
      },
      restaurante: {
        avatar: '🍽',
        name: 'Cocinería La Esquina',
        status: 'Menú y delivery rápido',
        messages: [
          { side: 'out', text: 'Hola, ¿tienen menú del día?' },
          { side: 'in', text: 'Sí 🍽️ Hoy hay pollo al jugo o lentejas. Incluye bebida. $5.500.' },
          { side: 'out', text: '¿Hacen delivery?' },
          { side: 'in', text: 'Sí, en Concepción centro. ¿A qué dirección te lo envío?' },
          { side: 'out', text: 'Barros Arana con Aníbal Pinto' },
          { side: 'in', text: 'Sí, llegamos ahí. El despacho demora aprox 30–40 min.' }
        ]
      }
    };

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

    function createMessage(message) {
      var item = document.createElement('div');
      var bubble = document.createElement('div');

      item.className = 'wa-msg wa-msg--' + message.side;
      bubble.className = 'wa-bubble';
      bubble.textContent = message.text;
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
        conversation.messages.forEach(function (message) {
          demoBody.appendChild(createMessage(message));
        });
        scrollDemoToBottom();
        return;
      }

      conversation.messages.forEach(function (message) {
        if (message.side === 'out') {
          demoState.timeouts.push(window.setTimeout(function () {
            demoBody.appendChild(createMessage(message));
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
            demoBody.appendChild(createMessage(message));
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
  // ---- Fade-in on scroll (IntersectionObserver) ----
  var fadeTargets = document.querySelectorAll(
    '.section, .card, .wa-mockup, .wa-demo, .pricing-card, .step'
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
})();




