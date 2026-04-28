/* ================================================
   LEADS DEMO — Interactive Logic
   Features: Auto-qualification, Scenario switching,
   AI vs Traditional comparison, Kanban pipeline
   ================================================ */

(function () {
  'use strict';

  // ---- State ----
  var state = {
    currentScenario: 'inmobiliaria',
    demoMode: 'ai', // 'ai' or 'traditional'
    isAnimating: false,
    timeouts: [],
    columnCounts: { nuevo: 0, calificado: 0, listo: 0 }
  };

  // ---- Tag definitions ----
  var TAGS = {
    hot:      { label: '🔥 Hot',      class: 'tag-hot' },
    warm:     { label: '🌡️ Warm',     class: 'tag-warm' },
    cold:     { label: '❄️ Cold',     class: 'tag-cold' },
    whatsapp: { label: '💬 WhatsApp', class: 'tag-whatsapp' },
    web:      { label: '🌐 Web',      class: 'tag-web' },
    instagram:{ label: '📸 Instagram',class: 'tag-instagram' },
    form:     { label: '📝 Form',     class: 'tag-form' }
  };

  // ---- Scenario Datasets ----
  var SCENARIOS = {
    inmobiliaria: {
      emoji: '🏠',
      name: 'Inmobiliaria Raíces Sur',
      leads: [
        { name: 'Andrés K.', preview: 'Vi el departamento en Paicaví en su web. ¿Podría agendar una visita para este fin de semana?', source: 'web', score: 92, temp: 'hot', column: 'listo', time: '1m', tags: ['hot','web'] },
        { name: 'Valentina N.', preview: 'Hola, estoy buscando arriendo para estudiante cerca de la UdeC. ¿Tienen opciones?', source: 'whatsapp', score: 78, temp: 'warm', column: 'calificado', time: '4m', tags: ['warm','whatsapp'] },
        { name: 'Roberto M.', preview: 'Me interesa la casa en San Pedro. ¿Aceptan pie del 10%?', source: 'form', score: 85, temp: 'hot', column: 'calificado', time: '8m', tags: ['hot','form'] },
        { name: 'Camila S.', preview: 'Estoy cotizando en varias inmobiliarias. ¿Cuál es el precio final con gastos operacionales?', source: 'instagram', score: 45, temp: 'cold', column: 'nuevo', time: '12m', tags: ['cold','instagram'] },
        { name: 'Diego P.', preview: 'Necesito vender mi propiedad en Hualpén. ¿Hacen tasación gratuita?', source: 'whatsapp', score: 88, temp: 'hot', column: 'listo', time: '15m', tags: ['hot','whatsapp'] },
        { name: 'Javiera L.', preview: 'Vi su publicidad en Instagram. Me gustaría recibir el dossier de proyectos nuevos.', source: 'instagram', score: 55, temp: 'warm', column: 'nuevo', time: '22m', tags: ['warm','instagram'] }
      ]
    },
    automotriz: {
      emoji: '🚗',
      name: 'Automotriz Surmotors',
      leads: [
        { name: 'Felipe R.', preview: 'Quiero agendar test drive del SUV nuevo. Tengo la cotización de la competencia.', source: 'whatsapp', score: 95, temp: 'hot', column: 'listo', time: '2m', tags: ['hot','whatsapp'] },
        { name: 'María José T.', preview: '¿Tienen financiamiento para el sedan 2024? Cuota inicial de $2.000.000', source: 'form', score: 82, temp: 'warm', column: 'calificado', time: '5m', tags: ['warm','form'] },
        { name: 'Carlos H.', preview: 'Estoy comparando precios de mantención. ¿Tienen programa de servicio prepagado?', source: 'web', score: 40, temp: 'cold', column: 'nuevo', time: '9m', tags: ['cold','web'] },
        { name: 'Daniela V.', preview: 'Vi en Instagram que tienen bonificación. ¿Aplica para el modelo híbrido?', source: 'instagram', score: 76, temp: 'warm', column: 'calificado', time: '14m', tags: ['warm','instagram'] },
        { name: 'Hugo S.', preview: 'Necesito flota de 5 camionetas para mi empresa. ¿Tienen precio corporativo?', source: 'whatsapp', score: 90, temp: 'hot', column: 'listo', time: '18m', tags: ['hot','whatsapp'] },
        { name: 'Paula G.', preview: 'Mi auto tiene 3 años, ¿lo toman en parte de pago? Quiero cambiar a uno más grande.', source: 'web', score: 68, temp: 'warm', column: 'nuevo', time: '25m', tags: ['warm','web'] }
      ]
    },
    educacion: {
      emoji: '🎓',
      name: 'Instituto Eduka',
      leads: [
        { name: 'Laura M.', preview: 'Quiero matricularme en el diplomado de Marketing Digital. ¿Hay cupos para julio?', source: 'form', score: 94, temp: 'hot', column: 'listo', time: '1m', tags: ['hot','form'] },
        { name: 'Pedro A.', preview: '¿El curso de Programación tiene certificación? Y si trabajo, ¿hay horario vespertino?', source: 'whatsapp', score: 72, temp: 'warm', column: 'calificado', time: '6m', tags: ['warm','whatsapp'] },
        { name: 'Sofía C.', preview: 'Estoy cotizando entre 3 institutos. ¿Cuál es el valor con descuento por pago anticipado?', source: 'web', score: 48, temp: 'cold', column: 'nuevo', time: '10m', tags: ['cold','web'] },
        { name: 'Joaquín B.', preview: 'Vi su reel en Instagram. Me interesa el curso de Diseño UX. ¿Puedo pagar en cuotas?', source: 'instagram', score: 81, temp: 'warm', column: 'calificado', time: '13m', tags: ['warm','instagram'] },
        { name: 'Ana P.', preview: 'Soy egresada de otra carrera. ¿Puedo convalidar materias en el diplomado de Data?', source: 'form', score: 87, temp: 'hot', column: 'listo', time: '17m', tags: ['hot','form'] },
        { name: 'Tomás R.', preview: 'Me gustaría recibir el brochure completo de carreras técnicas. Gracias.', source: 'web', score: 35, temp: 'cold', column: 'nuevo', time: '24m', tags: ['cold','web'] }
      ]
    },
    dental: {
      emoji: '🦷',
      name: 'Dental Sonría',
      leads: [
        { name: 'Natalia F.', preview: 'Tengo mucho dolor de muela. ¿Tienen hora para hoy o mañana? Pago particular.', source: 'whatsapp', score: 96, temp: 'hot', column: 'listo', time: '1m', tags: ['hot','whatsapp'] },
        { name: 'Ricardo D.', preview: 'Necesito presupuesto para implantes. ¿Tienen convenio con Seguro Médico Plus?', source: 'form', score: 84, temp: 'warm', column: 'calificado', time: '5m', tags: ['warm','form'] },
        { name: 'Catalina M.', preview: 'Vi su promoción de blanqueamiento en Instagram. ¿Aún está vigente?', source: 'instagram', score: 58, temp: 'warm', column: 'nuevo', time: '11m', tags: ['warm','instagram'] },
        { name: 'Luis O.', preview: 'Quiero agendar limpieza dental para toda mi familia (4 personas). ¿Hay descuento grupal?', source: 'whatsapp', score: 79, temp: 'warm', column: 'calificado', time: '16m', tags: ['warm','whatsapp'] },
        { name: 'Fernanda F.', preview: 'Me duele la encía desde ayer. ¿Es urgencia? ¿Cuánto cuesta la consulta?', source: 'web', score: 91, temp: 'hot', column: 'listo', time: '19m', tags: ['hot','web'] },
        { name: 'Miguel Ángel', preview: 'Solo consultando precios de ortodoncia invisible. Aún estoy decidiendo.', source: 'web', score: 42, temp: 'cold', column: 'nuevo', time: '28m', tags: ['cold','web'] }
      ]
    },
    muebles: {
      emoji: '🛋️',
      name: 'Muebles El Roble',
      leads: [
        { name: 'Patricia S.', preview: 'Quiero comprar el comedor de 8 sillas. ¿Tienen stock? Necesito entrega para el sábado.', source: 'whatsapp', score: 93, temp: 'hot', column: 'listo', time: '2m', tags: ['hot','whatsapp'] },
        { name: 'Esteban W.', preview: '¿Hacen muebles a medida? Necesito un closet empotrado de 3.20m de ancho.', source: 'form', score: 80, temp: 'warm', column: 'calificado', time: '7m', tags: ['warm','form'] },
        { name: 'Daniela C.', preview: 'Estoy viendo opciones de sofá cama. ¿Tienen catálogo completo en PDF?', source: 'web', score: 50, temp: 'cold', column: 'nuevo', time: '11m', tags: ['cold','web'] },
        { name: 'Alejandro N.', preview: 'Vi su publicación en Instagram del juego de terraza. ¿Aplica despacho gratis a San Pedro?', source: 'instagram', score: 74, temp: 'warm', column: 'calificado', time: '15m', tags: ['warm','instagram'] },
        { name: 'Victoria P.', preview: 'Necesito amoblar un departamento completo. ¿Tienen asesoría de interiorismo?', source: 'whatsapp', score: 89, temp: 'hot', column: 'listo', time: '20m', tags: ['hot','whatsapp'] },
        { name: 'Bruno K.', preview: 'Solo cotizando precios por ahora. Me contactaré en un par de meses.', source: 'web', score: 30, temp: 'cold', column: 'nuevo', time: '26m', tags: ['cold','web'] }
      ]
    }
  };

  // ---- Traditional mode system messages ----
  var TRADITIONAL_MESSAGES = [
    { name: 'Sistema', preview: 'Tienes 14 leads sin clasificar. 6 mensajes de WhatsApp no fueron respondidos.', isSystem: true, time: 'ahora' },
    { name: 'Sistema', preview: 'Lead "Andrés K. — visita fin de semana" lleva 3 días sin seguimiento asignado.', isSystem: true, time: 'ahora' }
  ];

  // ---- DOM refs ----
  var scenarioTabs = document.querySelectorAll('.demo-scenario');
  var leadsBoard = document.getElementById('leadsBoard');
  var leadsList = document.getElementById('leadsList');
  var colNuevo = document.getElementById('colNuevo');
  var colCalificado = document.getElementById('colCalificado');
  var colListo = document.getElementById('colListo');
  var countNuevo = document.getElementById('countNuevo');
  var countCalificado = document.getElementById('countCalificado');
  var countListo = document.getElementById('countListo');
  var leadsStatusText = document.getElementById('leadsStatusText');
  var leadsProgressWrap = document.getElementById('leadsProgressWrap');
  var leadsProgressBar = document.getElementById('leadsProgressBar');
  var demoModeBtns = document.querySelectorAll('.demo-mode-btn');

  var stats = {
    leads: document.getElementById('statLeads'),
    leadsLabel: document.getElementById('statLeadsLabel'),
    leadsIcon: document.getElementById('statLeadsIcon'),
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

  function resetAnimationState() {
    clearAllTimeouts();
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
  function getScoreClass(score) {
    if (score >= 80) return 'score-high';
    if (score >= 50) return 'score-mid';
    return 'score-low';
  }

  function updateColumnCounts(counts) {
    if (countNuevo) countNuevo.textContent = counts.nuevo || 0;
    if (countCalificado) countCalificado.textContent = counts.calificado || 0;
    if (countListo) countListo.textContent = counts.listo || 0;
  }

  function countColumns(leads) {
    var counts = { nuevo: 0, calificado: 0, listo: 0 };
    leads.forEach(function(lead) {
      if (lead.column && counts[lead.column] !== undefined) {
        counts[lead.column]++;
      }
    });
    return counts;
  }

  function updateStats() {
    if (state.demoMode === 'ai') {
      if (stats.leads) stats.leads.textContent = '+32';
      if (stats.leadsLabel) stats.leadsLabel.textContent = 'leads capturados hoy';
      if (stats.leadsIcon) stats.leadsIcon.textContent = '🎯';
      if (stats.responseTime) stats.responseTime.textContent = '<5s';
      if (stats.missedValue) stats.missedValue.textContent = '0';
      if (stats.missedLabel) stats.missedLabel.textContent = 'leads perdidos';
      if (stats.missedIcon) stats.missedIcon.textContent = '✅';
    } else {
      if (stats.leads) stats.leads.textContent = '14';
      if (stats.leadsLabel) stats.leadsLabel.textContent = 'leads sin clasificar';
      if (stats.leadsIcon) stats.leadsIcon.textContent = '⚠️';
      if (stats.responseTime) stats.responseTime.textContent = '48h';
      if (stats.missedValue) stats.missedValue.textContent = '5';
      if (stats.missedLabel) stats.missedLabel.textContent = 'leads perdidos';
      if (stats.missedIcon) stats.missedIcon.textContent = '❌';
    }
  }

  function createTag(tagKey) {
    var def = TAGS[tagKey];
    if (!def) return null;
    var span = document.createElement('span');
    span.className = 'lead-tag ' + def.class;
    span.textContent = def.label;
    return span;
  }

  function createAnalyzingIndicator() {
    var div = document.createElement('div');
    div.className = 'lead-analyzing';
    div.innerHTML = '<span>Analizando intención</span><div class="lead-analyzing-dots"><span></span><span></span><span></span></div>';
    return div;
  }

  function createLeadCard(lead, index) {
    var card = document.createElement('div');
    card.className = 'lead-card' + (lead.isSystem ? ' lead-card--system' : '');
    card.style.transitionDelay = '0ms';

    var header = document.createElement('div');
    header.className = 'lead-card-header';

    var name = document.createElement('div');
    name.className = 'lead-card-name';
    name.textContent = lead.name;

    var time = document.createElement('div');
    time.className = 'lead-card-time';
    time.textContent = lead.time;

    header.appendChild(name);
    header.appendChild(time);

    var preview = document.createElement('div');
    preview.className = 'lead-card-preview';
    preview.textContent = lead.preview;

    card.appendChild(header);
    card.appendChild(preview);

    // AI mode only: score + tags
    if (!lead.isSystem && state.demoMode === 'ai') {
      var footer = document.createElement('div');
      footer.className = 'lead-card-footer';

      // Score
      var scoreWrap = document.createElement('div');
      scoreWrap.className = 'lead-score ' + getScoreClass(lead.score);
      var scoreLabel = document.createElement('span');
      scoreLabel.textContent = 'Score';
      var scoreBar = document.createElement('div');
      scoreBar.className = 'lead-score-bar';
      var scoreFill = document.createElement('div');
      scoreFill.className = 'lead-score-fill';
      scoreFill.style.width = '0%';
      scoreBar.appendChild(scoreFill);
      var scoreNum = document.createElement('span');
      scoreNum.textContent = lead.score;
      scoreWrap.appendChild(scoreLabel);
      scoreWrap.appendChild(scoreBar);
      scoreWrap.appendChild(scoreNum);

      // Tags container
      var tagsContainer = document.createElement('div');
      tagsContainer.className = 'lead-tags';

      footer.appendChild(scoreWrap);
      footer.appendChild(tagsContainer);
      card.appendChild(footer);

      return { card: card, tagsContainer: tagsContainer, scoreFill: scoreFill };
    }

    return { card: card, tagsContainer: null, scoreFill: null };
  }

  function animateCardIn(card) {
    // Force reflow
    void card.offsetHeight;
    card.classList.add('is-visible');
  }

  function animateTags(tagsContainer, tags) {
    if (!tagsContainer || !tags || tags.length === 0) return;

    tags.forEach(function(tagKey, i) {
      var tagEl = createTag(tagKey);
      if (!tagEl) return;
      tagsContainer.appendChild(tagEl);

      scheduleTimeout(function() {
        tagEl.classList.add('is-visible');
      }, i * 120);
    });
  }

  function scrollColumnToBottom(columnEl) {
    if (columnEl) {
      columnEl.scrollTop = columnEl.scrollHeight;
    }
  }

  // ---- Main render ----
  function renderPipeline(scenarioKey, options) {
    options = options || {};
    resetAnimationState();

    var scenario = SCENARIOS[scenarioKey];
    if (!scenario) return;

    state.currentScenario = scenarioKey;
    state.isAnimating = true;

    // Clear columns and list
    if (colNuevo) colNuevo.innerHTML = '';
    if (colCalificado) colCalificado.innerHTML = '';
    if (colListo) colListo.innerHTML = '';
    if (leadsList) leadsList.innerHTML = '';

    // Show/hide appropriate view
    var isTraditional = state.demoMode === 'traditional';
    if (leadsBoard) leadsBoard.classList.toggle('is-hidden', isTraditional);
    if (leadsList) leadsList.classList.toggle('is-active', isTraditional);

    // Update progress
    if (leadsProgressWrap) leadsProgressWrap.classList.add('is-visible');
    if (leadsProgressBar) leadsProgressBar.style.width = '0%';

    // Update status
    if (leadsStatusText) {
      leadsStatusText.textContent = isTraditional ? 'Leads sin clasificar...' : 'Recibiendo leads...';
      leadsStatusText.className = 'leads-status-text';
    }

    var leads = scenario.leads;

    // Update column counts (AI mode)
    if (!isTraditional) {
      state.columnCounts = countColumns(leads);
      updateColumnCounts(state.columnCounts);
    } else {
      updateColumnCounts({ nuevo: 0, calificado: 0, listo: 0 });
    }

    // In traditional mode, prepend system messages
    var displayLeads = isTraditional ? TRADITIONAL_MESSAGES.concat(leads) : leads;
    var total = displayLeads.length;

    // Show leads sequentially
    var delay = 300;

    displayLeads.forEach(function(lead, index) {
      scheduleTimeout(function() {
        if (!state.isAnimating) return;

        var built = createLeadCard(lead, index);
        var card = built.card;
        var tagsContainer = built.tagsContainer;
        var scoreFill = built.scoreFill;

        // Append to correct container
        if (isTraditional) {
          if (leadsList) {
            leadsList.appendChild(card);
            animateCardIn(card);
            leadsList.scrollTop = leadsList.scrollHeight;
          }
        } else {
          var targetCol = colNuevo;
          if (lead.column === 'calificado') targetCol = colCalificado;
          if (lead.column === 'listo') targetCol = colListo;

          if (targetCol) {
            targetCol.appendChild(card);
            animateCardIn(card);
            scrollColumnToBottom(targetCol);
          }
        }

        // Update progress bar
        if (leadsProgressBar) {
          leadsProgressBar.style.width = Math.round(((index + 1) / total) * 100) + '%';
        }

        if (isTraditional || lead.isSystem) {
          // No tags in traditional or system mode
          return;
        }

        // AI mode: show analyzing then reveal score + tags
        if (lead.tags && lead.tags.length > 0) {
          card.classList.add('is-analyzing');
          var analyzing = createAnalyzingIndicator();
          // Insert analyzing before footer
          var footerEl = card.querySelector('.lead-card-footer');
          if (footerEl) {
            card.insertBefore(analyzing, footerEl);
          }

          scheduleTimeout(function() {
            // Check if card still in DOM
            var inDom = card.parentNode !== null;
            if (!inDom) return;

            card.classList.remove('is-analyzing');
            if (analyzing.parentNode) analyzing.parentNode.removeChild(analyzing);

            // Animate score fill
            if (scoreFill) {
              scoreFill.style.width = lead.score + '%';
            }

            // Animate tags
            animateTags(tagsContainer, lead.tags);
          }, 700 + Math.random() * 300);
        }

        // Update status on last lead
        if (index === total - 1) {
          scheduleTimeout(function() {
            if (leadsStatusText) {
              if (isTraditional) {
                leadsStatusText.textContent = '❌ ' + total + ' leads sin clasificar. 5 oportunidades perdidas.';
                leadsStatusText.className = 'leads-status-text is-danger';
              } else {
                var hotCount = leads.filter(function(l) { return l.temp === 'hot'; }).length;
                leadsStatusText.textContent = '✅ ' + total + ' leads calificados. ' + hotCount + ' hot leads listos para cerrar.';
                leadsStatusText.className = 'leads-status-text is-success';
              }
            }
            if (leadsProgressWrap) leadsProgressWrap.classList.remove('is-visible');
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

      renderPipeline(scenario);
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
      renderPipeline(state.currentScenario);
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
  if ('IntersectionObserver' in window && leadsBoard) {
    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          renderPipeline('inmobiliaria');
          observer.disconnect();
        }
      });
    }, { threshold: 0.2 });
    observer.observe(document.querySelector('.demo-leads-wrap'));
  } else {
    renderPipeline('inmobiliaria');
  }

})();
