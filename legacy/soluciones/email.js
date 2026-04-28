/* ================================================
   EMAIL DEMO — Interactive Logic
   Features: Auto-classification, Scenario switching,
   AI vs Traditional comparison
   ================================================ */

(function () {
  'use strict';

  // ---- State ----
  var state = {
    currentScenario: 'ecommerce',
    demoMode: 'ai', // 'ai' or 'traditional'
    isAnimating: false,
    timeouts: [],
    gsapTweens: [],
    tagCounts: { all: 0, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 },
    activeFilter: 'all'
  };

  // ---- Tag definitions ----
  var TAGS = {
    urgent:     { label: 'Urgente',     class: 'tag-urgent' },
    client:     { label: 'Cliente',     class: 'tag-client' },
    provider:   { label: 'Proveedor',   class: 'tag-provider' },
    internal:   { label: 'Interno',     class: 'tag-internal' },
    spam:       { label: 'Spam',        class: 'tag-spam' },
    billing:    { label: 'Facturación', class: 'tag-billing' },
    support:    { label: 'Soporte',     class: 'tag-support' },
    quote:      { label: 'Cotización',  class: 'tag-quote' }
  };

  // ---- Scenario Datasets ----
  var SCENARIOS = {
    ecommerce: {
      emoji: '🛒',
      name: 'Tienda Online',
      emails: [
        { sender: 'Carla M.', initials: 'CM', subject: 'Mi pedido #8832 no llegó', preview: 'Hola, hace 5 días que hice mi pedido y aún no llega. El tracking no muestra movimiento. Necesito una solución urgente.', time: '2m', tags: ['urgent','client'] },
        { sender: 'DistriTextil S.A.', initials: 'DT', subject: 'Factura mensual disponible', preview: 'Adjuntamos la factura correspondiente al mes de abril. Fecha de vencimiento: 15 de mayo.', time: '5m', tags: ['provider','billing'] },
        { sender: 'Marketing', initials: 'MK', subject: 'Campaña fin de semana lista', preview: 'El equipo creativo ya tiene los banners aprobados. Revisa los adjuntos y confirmá para publicar.', time: '8m', tags: ['internal'] },
        { sender: 'sorpresagratis.com', initials: 'SG', subject: '¡GANASTE un iPhone 15!!!', preview: 'Felicidades, fuiste seleccionado. Hacé clic acá para reclamar tu premio ahora mismo.', time: '12m', tags: ['spam'] },
        { sender: 'Juan P.', initials: 'JP', subject: '¿Tienen talla M en stock?', preview: 'Estoy buscando el polerón negro que vi en Instagram. ¿Tienen disponible en talla M?', time: '15m', tags: ['client'] },
        { sender: 'Soporte Web', initials: 'SW', subject: 'Error en checkout reportado', preview: 'Tres clientes reportaron que el botón de pago no funciona en Safari. Revisar con urgencia.', time: '18m', tags: ['urgent','internal','support'] },
        { sender: 'ProveedorZap', initials: 'PZ', subject: 'Nuevo catálogo zapatos', preview: 'Te enviamos el PDF con los nuevos modelos de la temporada primavera/verano con precios mayoristas.', time: '25m', tags: ['provider'] }
      ]
    },
    consultora: {
      emoji: '💼',
      name: 'Consultora',
      emails: [
        { sender: 'Rodrigo S.', initials: 'RS', subject: 'Cotización auditoría externa', preview: 'Necesitamos una cotización para auditoría de procesos ISO 9001. ¿Podemos reunirnos esta semana?', time: '3m', tags: ['client','quote'] },
        { sender: 'Contabilidad', initials: 'CT', subject: 'Declaración IVA vence viernes', preview: 'Recordatorio: la declaración de IVA de este período vence el viernes a las 23:59. Faltan 3 facturas por cargar.', time: '6m', tags: ['urgent','internal','billing'] },
        { sender: 'Laura G.', initials: 'LG', subject: 'Agendar reunión próxima semana', preview: 'Hola, quiero coordinar una reunión para revisar los avances del proyecto. ¿Tenés disponibilidad el martes o miércoles?', time: '9m', tags: ['client'] },
        { sender: 'Capacitaciones Online', initials: 'CO', subject: '50% OFF en cursos Excel', preview: 'Aprovechá esta super oferta por tiempo limitado. Más de 200 cursos disponibles con certificación.', time: '14m', tags: ['spam'] },
        { sender: 'Socio A.', initials: 'SA', subject: 'Revisar contrato nuevo cliente', preview: 'El contrato con InnovaTech está listo para firmar. Por favor revisá las cláusulas 4 y 7 antes del cierre.', time: '17m', tags: ['urgent','internal'] },
        { sender: 'Felipe M.', initials: 'FM', subject: 'Consulta consultoría procesos', preview: 'Me interesa el servicio de optimización de procesos que ofrecen. ¿Podemos agendar una llamada introductoria?', time: '22m', tags: ['client','quote'] }
      ]
    },
    dental: {
      emoji: '🦷',
      name: 'Clínica Dental',
      emails: [
        { sender: 'María J.', initials: 'MJ', subject: 'Dolor después de extracción', preview: 'Buenas, me extrajeron una muela ayer y hoy tengo mucho dolor e hinchazón. ¿Es normal? ¿Debo ir de urgencia?', time: '1m', tags: ['urgent','client'] },
        { sender: 'Laboratorio Dental Sur', initials: 'LD', subject: 'Coronas listas para retiro', preview: 'Las coronas del paciente Muñoz están listas. Factura adjunta por $145.000. Pueden retirar en horario de atención.', time: '7m', tags: ['provider','billing'] },
        { sender: 'Dra. Rojas', initials: 'DR', subject: 'Reunión equipo médico jueves', preview: 'Reunión de equipo este jueves a las 15:00. Tema: nuevos protocolos de esterilización. Confirmar asistencia.', time: '11m', tags: ['internal'] },
        { sender: 'Ganá Ya', initials: 'GY', subject: '¡Tratamiento dental gratis!', preview: 'Sos el afortunado ganador de un blanqueamiento dental valorado en $300.000. Reclamá tu premio ahora.', time: '16m', tags: ['spam'] },
        { sender: 'Pedro A.', initials: 'PA', subject: 'Agendar hora limpieza dental', preview: 'Hola, quiero pedir hora para limpieza dental de rutina. Preferiblemente en la mañana. ¿Qué días tienen?', time: '19m', tags: ['client'] },
        { sender: 'Seguro Médico Plus', initials: 'SM', subject: 'Pago reembolso procedimientos', preview: 'Los reembolsos de los procedimientos realizados en marzo ya fueron procesados. Detalle adjunto.', time: '28m', tags: ['provider','billing'] }
      ]
    },
    restaurante: {
      emoji: '🍽️',
      name: 'Restaurante',
      emails: [
        { sender: 'Camila R.', initials: 'CR', subject: 'Pedido delivery llegó incompleto', preview: 'Pedí un menú familiar y llegó sin las bebidas. Además la comida estaba fría. Quiero el reembolso o un nuevo envío.', time: '2m', tags: ['urgent','client'] },
        { sender: 'DistriAlimentos', initials: 'DA', subject: 'Factura semanal y nuevos precios', preview: 'Adjuntamos factura de insumos semanales. A partir de mayo habrá un ajuste del 8% en carnes y lácteos.', time: '6m', tags: ['provider','billing'] },
        { sender: 'Chef Marco', initials: 'CM', subject: 'Menú fin de semana listo', preview: 'Ya diseñé las entradas y principales del menú de fin de semana. Necesito que revises los costos antes del viernes.', time: '10m', tags: ['internal'] },
        { sender: 'GanaPremios', initials: 'GP', subject: '¡Ganaste una parrilla nueva!', preview: 'Felicidades, fuiste seleccionado entre nuestros suscriptores. Ingresá tus datos para recibir tu premio.', time: '13m', tags: ['spam'] },
        { sender: 'Reservas Web', initials: 'RW', subject: 'Nueva reserva: mesa 8 personas', preview: 'Confirmación de reserva para el sábado a las 21:00. Solicitan mesa en terraza y menú vegetariano para 2.', time: '17m', tags: ['client'] },
        { sender: 'Proveedor Carnes', initials: 'PC', subject: 'Lomo vetado disponible mañana', preview: 'Tenemos stock de lomo vetado importado. Precio por kg: $18.900. ¿Reservamos 10kg como siempre?', time: '24m', tags: ['provider'] }
      ]
    },
    inmobiliaria: {
      emoji: '🏠',
      name: 'Inmobiliaria',
      emails: [
        { sender: 'Andrés K.', initials: 'AK', subject: 'Cañería rota en depto arrendado', preview: 'Se rompió la cañería del baño principal y hay filtración al departamento de abajo. Necesitamos un gasfiter YA.', time: '1m', tags: ['urgent','client'] },
        { sender: 'Notaría Pérez', initials: 'NP', subject: 'Escritura lista para firma', preview: 'La escritura de la propiedad Barros Arana 540 ya está lista. Revisen los documentos adjuntos antes de la firma.', time: '8m', tags: ['provider'] },
        { sender: 'Gerente Regional', initials: 'GR', subject: 'Informe de ventas mensual', preview: 'Se requiere el informe de ventas y arriendos de abril para la reunión de directorio de mañana a las 9:00.', time: '12m', tags: ['urgent','internal'] },
        { sender: 'SorteosExpress', initials: 'SE', subject: '¡Ganaste un depto en Miami!', preview: 'Sos el ganador del sorteo internacional. Solo necesitás pagar el impuesto de traspaso para reclamar tu propiedad.', time: '15m', tags: ['spam'] },
        { sender: 'Valentina N.', initials: 'VN', subject: 'Agendar visita depto Paicaví', preview: 'Hola, vi el departamento en Paicaví en su web. ¿Podría agendar una visita para este fin de semana? Gracias.', time: '20m', tags: ['client'] },
        { sender: 'Constructora Sur', initials: 'CS', subject: 'Cotización reparación fachada', preview: 'Adjuntamos la cotización para la reparación de la fachada del edificio O\'Higgins. Plazo estimado: 15 días hábiles.', time: '26m', tags: ['provider','quote'] }
      ]
    }
  };

  // ---- Traditional mode system messages ----
  var TRADITIONAL_MESSAGES = [
    { sender: 'Sistema', initials: 'SY', subject: 'Bandeja de entrada saturada', preview: 'Tienes 47 emails sin leer. 8 mensajes tienen más de 3 días sin respuesta.', time: 'ahora', isSystem: true },
    { sender: 'Sistema', initials: 'SY', subject: 'Email urgente sin leer hace 2 días', preview: 'El mensaje de "Andrés K. — Cañería rota" lleva 48 horas sin ser abierto.', time: 'ahora', isSystem: true }
  ];

  // ---- DOM refs ----
  var scenarioTabs = document.querySelectorAll('.demo-scenario');
  var emailList = document.getElementById('emailList');
  var emailStatusText = document.getElementById('emailStatusText');
  var emailProgressWrap = document.getElementById('emailProgressWrap');
  var emailProgressBar = document.getElementById('emailProgressBar');
  var demoModeBtns = document.querySelectorAll('.demo-mode-btn');
  var filterEls = document.querySelectorAll('.email-filter');
  var filtersContainer = document.getElementById('emailFilters');

  var filterCounts = {
    all: document.getElementById('filterCountAll'),
    urgent: document.getElementById('filterCountUrgent'),
    client: document.getElementById('filterCountClient'),
    provider: document.getElementById('filterCountProvider'),
    internal: document.getElementById('filterCountInternal'),
    spam: document.getElementById('filterCountSpam')
  };

  var stats = {
    emails: document.getElementById('statEmails'),
    emailsLabel: document.getElementById('statEmailsLabel'),
    emailsIcon: document.getElementById('statEmailsIcon'),
    responseTime: document.getElementById('statResponseTime'),
    missedValue: document.getElementById('statMissedValue'),
    missedLabel: document.getElementById('statMissedLabel'),
    missedIcon: document.getElementById('statMissedIcon')
  };

  // ---- Cleanup ----
  function clearAllTimeouts() {
    state.timeouts.forEach(function(id) { clearTimeout(id); });
    state.timeouts = [];
  }

  function killAllGsap() {
    if (typeof gsap !== 'undefined') {
      state.gsapTweens.forEach(function(t) { if (t && t.kill) t.kill(); });
      state.gsapTweens = [];
    }
  }

  function resetAnimationState() {
    clearAllTimeouts();
    killAllGsap();
    state.isAnimating = false;
  }

  function scheduleTimeout(fn, delay) {
    var id = setTimeout(function() {
      var idx = state.timeouts.indexOf(id);
      if (idx > -1) state.timeouts.splice(idx, 1);
      fn();
    }, delay);
    state.timeouts.push(id);
    return id;
  }

  // ---- Helpers ----
  function countTags(emails) {
    var counts = { all: emails.length, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 };
    emails.forEach(function(email) {
      if (!email.tags) return;
      email.tags.forEach(function(tagKey) {
        if (tagKey === 'urgent') counts.urgent++;
        if (tagKey === 'client') counts.client++;
        if (tagKey === 'provider') counts.provider++;
        if (tagKey === 'internal') counts.internal++;
        if (tagKey === 'spam') counts.spam++;
      });
    });
    return counts;
  }

  function updateFilterCounts(counts) {
    Object.keys(filterCounts).forEach(function(key) {
      if (filterCounts[key]) {
        filterCounts[key].textContent = counts[key] || 0;
      }
    });
  }

  function applyFilter(filterKey) {
    state.activeFilter = filterKey;

    // Update active state on filter buttons
    filterEls.forEach(function(el) {
      var elFilter = el.getAttribute('data-filter');
      el.classList.toggle('active', elFilter === filterKey);
    });

    // Show/hide rows
    if (!emailList) return;
    var rows = emailList.querySelectorAll('.email-row');
    rows.forEach(function(row) {
      if (filterKey === 'all') {
        row.classList.remove('is-hidden');
      } else {
        var tags = row.getAttribute('data-tags') || '';
        if (tags.indexOf(filterKey) !== -1) {
          row.classList.remove('is-hidden');
        } else {
          row.classList.add('is-hidden');
        }
      }
    });
  }

  function updateFiltersDisabled() {
    if (!filtersContainer) return;
    if (state.demoMode === 'traditional') {
      filtersContainer.classList.add('is-disabled');
      applyFilter('all');
    } else {
      filtersContainer.classList.remove('is-disabled');
    }
  }

  function updateStats() {
    if (state.demoMode === 'ai') {
      if (stats.emails) stats.emails.textContent = '+847';
      if (stats.emailsLabel) stats.emailsLabel.textContent = 'emails clasificados hoy';
      if (stats.emailsIcon) stats.emailsIcon.textContent = '📨';
      if (stats.responseTime) stats.responseTime.textContent = '<3s';
      if (stats.missedValue) stats.missedValue.textContent = '0';
      if (stats.missedLabel) stats.missedLabel.textContent = 'urgencias perdidas';
      if (stats.missedIcon) stats.missedIcon.textContent = '🎯';
    } else {
      if (stats.emails) stats.emails.textContent = '47';
      if (stats.emailsLabel) stats.emailsLabel.textContent = 'emails sin leer';
      if (stats.emailsIcon) stats.emailsIcon.textContent = '⚠️';
      if (stats.responseTime) stats.responseTime.textContent = '24h';
      if (stats.missedValue) stats.missedValue.textContent = '8';
      if (stats.missedLabel) stats.missedLabel.textContent = 'urgencias perdidas';
      if (stats.missedIcon) stats.missedIcon.textContent = '❌';
    }
  }

  function createAvatar(initials, isSystem) {
    var div = document.createElement('div');
    div.className = 'email-avatar' + (isSystem ? ' email-avatar--system' : '');
    div.textContent = initials;
    return div;
  }

  function createTag(tagKey) {
    var def = TAGS[tagKey];
    if (!def) return null;
    var span = document.createElement('span');
    span.className = 'email-tag ' + def.class;
    span.textContent = def.label;
    return span;
  }

  function createAnalyzingIndicator() {
    var div = document.createElement('div');
    div.className = 'email-analyzing';
    div.innerHTML = '<span>Analizando contenido</span><div class="email-analyzing-dots"><span></span><span></span><span></span></div>';
    return div;
  }

  function createEmailRow(email, index) {
    var row = document.createElement('div');
    row.className = 'email-row' + (email.isSystem ? ' email-row--system' : '') + (state.demoMode === 'traditional' && !email.isSystem ? ' is-unread' : '');
    row.style.transitionDelay = '0ms';
    if (email.tags && email.tags.length > 0) {
      row.setAttribute('data-tags', email.tags.join(' '));
    }

    var avatar = createAvatar(email.initials, email.isSystem);

    var content = document.createElement('div');
    content.className = 'email-content';

    var headerRow = document.createElement('div');
    headerRow.className = 'email-header-row';

    var sender = document.createElement('div');
    sender.className = 'email-sender';
    sender.textContent = email.sender;

    var time = document.createElement('div');
    time.className = 'email-time';
    time.textContent = email.time;

    headerRow.appendChild(sender);
    headerRow.appendChild(time);

    var subject = document.createElement('div');
    subject.className = 'email-subject';
    subject.textContent = email.subject;

    var preview = document.createElement('div');
    preview.className = 'email-preview';
    preview.textContent = email.preview;

    content.appendChild(headerRow);
    content.appendChild(subject);
    content.appendChild(preview);

    // Tags container (always present for layout stability)
    var tagsContainer = document.createElement('div');
    tagsContainer.className = 'email-tags';
    content.appendChild(tagsContainer);

    row.appendChild(avatar);
    row.appendChild(content);

    return { row: row, tagsContainer: tagsContainer };
  }

  function animateRowIn(row) {
    if (typeof gsap !== 'undefined') {
      var tween = gsap.fromTo(row,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
      );
      state.gsapTweens.push(tween);
    } else {
      // Force reflow then add class
      void row.offsetHeight;
      row.classList.add('is-visible');
    }
  }

  function animateTags(tagsContainer, tags) {
    if (!tags || tags.length === 0) return;

    tags.forEach(function(tagKey, i) {
      var tagEl = createTag(tagKey);
      if (!tagEl) return;
      tagsContainer.appendChild(tagEl);

      scheduleTimeout(function() {
        if (typeof gsap !== 'undefined') {
          var tween = gsap.fromTo(tagEl,
            { opacity: 0, scale: 0.6 },
            { opacity: 1, scale: 1, duration: 0.3, ease: 'back.out(2)' }
          );
          state.gsapTweens.push(tween);
        } else {
          tagEl.classList.add('is-visible');
        }
      }, i * 120);
    });
  }

  function scrollListToBottom() {
    if (emailList) {
      emailList.scrollTop = emailList.scrollHeight;
    }
  }

  // ---- Main render ----
  function renderInbox(scenarioKey, options) {
    options = options || {};
    resetAnimationState();

    var scenario = SCENARIOS[scenarioKey];
    if (!scenario) return;

    state.currentScenario = scenarioKey;
    state.isAnimating = true;
    state.activeFilter = 'all';

    // Update filters UI state
    updateFiltersDisabled();
    filterEls.forEach(function(el) {
      el.classList.toggle('active', el.getAttribute('data-filter') === 'all');
    });

    // Clear list
    if (emailList) {
      emailList.innerHTML = '';
    }

    // Update progress
    if (emailProgressWrap) emailProgressWrap.classList.add('is-visible');
    if (emailProgressBar) emailProgressBar.style.width = '0%';

    // Update status
    if (emailStatusText) {
      emailStatusText.textContent = state.demoMode === 'ai' ? 'Recibiendo correos...' : 'Bandeja sin clasificar...';
      emailStatusText.className = 'email-status-text';
    }

    var emails = scenario.emails;
    var isTraditional = state.demoMode === 'traditional';

    // In traditional mode, prepend system messages
    var displayEmails = isTraditional ? TRADITIONAL_MESSAGES.concat(emails) : emails;

    // Update filter counts
    if (!isTraditional) {
      state.tagCounts = countTags(emails);
      updateFilterCounts(state.tagCounts);
    } else {
      updateFilterCounts({ all: displayEmails.length, urgent: 0, client: 0, provider: 0, internal: 0, spam: 0 });
    }

    // Show emails sequentially
    var delay = 300;
    var total = displayEmails.length;

    displayEmails.forEach(function(email, index) {
      scheduleTimeout(function() {
        if (!state.isAnimating) return;

        var built = createEmailRow(email, index);
        var row = built.row;
        var tagsContainer = built.tagsContainer;

        if (emailList) {
          emailList.appendChild(row);
          animateRowIn(row);
          scrollListToBottom();
          applyFilter(state.activeFilter);
        }

        // Update progress bar
        if (emailProgressBar) {
          emailProgressBar.style.width = Math.round(((index + 1) / total) * 100) + '%';
        }

        if (isTraditional) {
          // No tags in traditional mode
          return;
        }

        // AI mode: show analyzing then tags
        if (email.tags && email.tags.length > 0) {
          row.classList.add('is-analyzing');
          var analyzing = createAnalyzingIndicator();
          tagsContainer.appendChild(analyzing);

          scheduleTimeout(function() {
            // Check if row is still in DOM (user may have switched scenario)
            if (!emailList || !emailList.contains(row)) return;
            row.classList.remove('is-analyzing');
            if (analyzing.parentNode) analyzing.parentNode.removeChild(analyzing);
            animateTags(tagsContainer, email.tags);
          }, 700 + Math.random() * 300);
        }

        // Update status on last email
        if (index === total - 1) {
          scheduleTimeout(function() {
            if (emailStatusText) {
              if (isTraditional) {
                emailStatusText.textContent = '❌ ' + total + ' emails sin clasificar. 8 urgentes perdidos.';
                emailStatusText.className = 'email-status-text is-danger';
              } else {
                emailStatusText.textContent = '✅ ' + total + ' emails clasificados. ' + state.tagCounts.urgent + ' urgentes priorizados.';
                emailStatusText.className = 'email-status-text is-success';
              }
            }
            if (emailProgressWrap) emailProgressWrap.classList.remove('is-visible');
            state.isAnimating = false;
          }, 900);
        }

      }, delay);

      delay += 1100;
    });
  }

  // ---- Tab switching ----
  scenarioTabs.forEach(function(tab) {
    tab.addEventListener('click', function() {
      var scenario = tab.getAttribute('data-scenario');
      if (scenario === state.currentScenario && !state.isAnimating) return;

      scenarioTabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');

      renderInbox(scenario);
    });
  });

  // ---- Filter clicks ----
  filterEls.forEach(function(filterEl) {
    filterEl.addEventListener('click', function() {
      if (state.demoMode === 'traditional') return;
      var filter = filterEl.getAttribute('data-filter');
      applyFilter(filter);
    });
  });

  // ---- Mode toggle ----
  demoModeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mode = btn.getAttribute('data-mode');
      if (mode === state.demoMode) return;

      state.demoMode = mode;

      demoModeBtns.forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');

      updateStats();
      renderInbox(state.currentScenario);
    });
  });

  // ---- Hamburger ----
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function() {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function() {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Navbar scroll ----
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function() {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---- Init ----
  updateStats();

  // Auto-start first scenario when visible
  if ('IntersectionObserver' in window && emailList) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          renderInbox('ecommerce');
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(document.querySelector('.demo-email-wrap'));
  } else {
    renderInbox('ecommerce');
  }

})();
