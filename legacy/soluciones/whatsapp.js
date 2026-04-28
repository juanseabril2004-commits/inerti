/* ================================================
   WHATSAPP DEMO — Interactive Logic v3
   Features: Compare Mode, Live Stats
   ================================================ */

(function () {
  'use strict';

  // ---- State Management ----
  var state = {
    currentRubro: 'ferreteria',
    tryMode: false,
    demoMode: 'ai', // 'ai' or 'traditional'
    isAnimating: false,
    timeouts: [],
    gsapTweens: [],
  };

  // ---- Traditional Mode Messages (Sin IA) ----
  var TRADITIONAL_MESSAGES = {
    ferreteria: [
      { type: 'out', text: '¿Tienen silicona transparente?' },
      { type: 'in', text: '* Mensaje enviado fuera de horario. El negocio responderá mañana a partir de las 9:00 AM *', isSystem: true },
      { type: 'out', text: 'Hola, ¿me pueden responder?' },
      { type: 'in', text: '* Sin respuesta. El negocio está cerrado *', isSystem: true }
    ],
    veterinaria: [
      { type: 'out', text: 'Hola, necesito una hora para mi perro 🐕' },
      { type: 'in', text: '* Llamar durante horario de atención: Lunes a Viernes 9:00-18:00 *', isSystem: true },
      { type: 'out', text: 'Es urgente 😟' },
      { type: 'in', text: '* No hay respuesta automática. Espere a ser atendido *', isSystem: true }
    ],
    taller: [
      { type: 'out', text: 'Hola, ¿cuánto sale el cambio de aceite?' },
      { type: 'in', text: '* Mensaje no leído. El mecánico está ocupado *', isSystem: true },
      { type: 'out', text: '¿Hola?' },
      { type: 'in', text: '* Sin confirmación de lectura *', isSystem: true }
    ],
    restaurante: [
      { type: 'out', text: '¿Cuál es el menú de hoy?' },
      { type: 'in', text: '* Cocina cerrada. Horario: 12:00-16:00 *', isSystem: true },
      { type: 'out', text: 'Quiero hacer un pedido' },
      { type: 'in', text: '* No hay sistema de pedidos automático *', isSystem: true }
    ],
    dental: [
      { type: 'out', text: 'Hola, quiero pedir una hora' },
      { type: 'in', text: '* Para agendar llame al +56 9 XXXX XXXX en horario hábil *', isSystem: true },
      { type: 'out', text: '¿Puedo agendar por aquí?' },
      { type: 'in', text: '* No hay atención fuera de horario *', isSystem: true }
    ],
    inmobiliaria: [
      { type: 'out', text: 'Hola, busco depa de 2 dormitorios' },
      { type: 'in', text: '* El corredor responderá en breve (usualmente 24-48 hrs) *', isSystem: true },
      { type: 'out', text: '¿Hay disponibilidad?' },
      { type: 'in', text: '* Esperando respuesta... *', isSystem: true }
    ]
  };

  // ---- Conversation Data (6 rubros) ----
  var RUBROS = {
    ferreteria: {
      emoji: '🔩',
      name: 'Ferretería Don Pato',
      status: 'Precio + stock en segundos',
      messages: [
        { type: 'out', text: '¿Tienen silicona transparente?' },
        { type: 'in',  text: 'Sí, quedan 12 unidades a $2.990 🙂\n¿Cuántas necesitas?' },
        { type: 'out', text: '2, voy hoy a las 6' },
        { type: 'in',  text: 'Perfecto, te las reservo hasta las 19:00 ✅' }
      ],
      chips: [
        { label: '💲 Precio de un producto', q: '¿Cuánto sale la silicona transparente?', a: 'La silicona transparente está a $2.990. Quedan 12 unidades 🙂 ¿Necesitas algo más?' },
        { label: '📦 Consultar stock', q: '¿Tienen clavos de 2 pulgadas?', a: 'Sí, tenemos clavos de 2" en cajas de 100 ($1.490) y de 500 ($5.990). ¿Cuántos necesitas?' },
        { label: '🕐 Horario de atención', q: '¿A qué hora abren?', a: 'Lunes a viernes de 9:00 a 19:00, sábados de 9:00 a 14:00. Domingos cerrado.' },
        { label: '📍 Ubicación', q: '¿Dónde están ubicados?', a: 'Estamos en Av. Los Carrera 1250, Concepción. Te esperamos 📍' }
      ]
    },
    veterinaria: {
      emoji: '🐾',
      name: 'Veterinaria Huellitas Sur',
      status: 'Agenda automática',
      messages: [
        { type: 'out', text: 'Hola, necesito una hora para mi perro 🐕' },
        { type: 'in',  text: '¡Hola! Claro, tenemos horas disponibles mañana:\n\n🕐 10:00\n🕑 11:30\n🕓 16:00\n\n¿Cuál te acomoda?' },
        { type: 'out', text: 'La de las 10' },
        { type: 'in',  text: 'Listo, agendado para mañana a las 10:00 ✅\nTe enviaremos un recordatorio 1 hora antes. ¡Nos vemos!' }
      ],
      chips: [
        { label: '📅 Agendar hora', q: 'Quiero pedir una hora para mi gato', a: 'Tenemos horas disponibles mañana a las 10:00, 11:30 y 16:00. ¿Cuál te acomoda? 🐱' },
        { label: '💉 Vacunas disponibles', q: '¿Qué vacunas tienen?', a: 'Tenemos: Séxtuple ($18.990), Antirrábica ($12.990), Triple Felina ($15.990). ¿Agendamos?' },
        { label: '💲 Precio consulta', q: '¿Cuánto sale la consulta?', a: 'La consulta general es $15.990. Si necesitas vacunas o exámenes, el valor se suma aparte.' },
        { label: '🆘 Urgencia', q: 'Mi perro está vomitando, ¿atienden urgencias?', a: 'Sí, atendemos urgencias de lunes a sábado hasta las 20:00. Ven directamente, te atendemos sin hora previa 🏥' }
      ]
    },
    taller: {
      emoji: '🔧',
      name: 'Taller El Volante',
      status: 'Cotiza sin soltar la herramienta',
      messages: [
        { type: 'out', text: 'Hola, ¿cuánto sale el cambio de aceite para un Suzuki Swift 2018?' },
        { type: 'in',  text: 'Hola, el cambio de aceite para tu Swift sale $32.990, incluye filtro + aceite 5W-30 🛢\n¿Te agendo una hora?' },
        { type: 'out', text: 'Sí, ¿tienen para el sábado?' },
        { type: 'in',  text: 'Sábado tengo disponible a las 9:00 y 11:00. ¿Cuál te queda mejor?' }
      ],
      chips: [
        { label: '🛢 Cambio de aceite', q: '¿Cuánto sale el cambio de aceite?', a: 'Depende del modelo. Para autos pequeños parte en $29.990 (incluye filtro + aceite). ¿Cuál es tu vehículo?' },
        { label: '🔧 Cotizar servicio', q: 'Necesito revisar los frenos', a: 'La revisión de frenos tiene un valor de $15.990. Si hay que cambiar pastillas, te cotizamos con repuesto incluido. ¿Agendamos?' },
        { label: '📅 Agendar hora', q: '¿Tienen hora para el sábado?', a: 'Sábado tenemos disponible a las 9:00 y 11:00. ¿Cuál te queda mejor?' },
        { label: '🕐 Horario', q: '¿Cuál es el horario del taller?', a: 'Lunes a viernes 8:30 a 18:30, sábados 9:00 a 13:00. ¡Te esperamos!' }
      ]
    },
    restaurante: {
      emoji: '🍽',
      name: 'Cocinería La Esquina',
      status: 'Menú y delivery rápido',
      messages: [
        { type: 'out', text: '¿Cuál es el menú de hoy?' },
        { type: 'in',  text: 'Hoy tenemos:\n\n🍗 Pollo asado + arroz + ensalada — $4.990\n🐟 Pescado frito + puré — $5.490\n🥘 Cazuela de vacuno — $4.490\n\n¿Te preparo algo?' },
        { type: 'out', text: 'El pollo asado para llevar' },
        { type: 'in',  text: 'Perfecto, tu pollo asado estará listo en 15 min 🍗\nDirección de retiro: Av. Los Carrera 320. ¡Te esperamos!' }
      ],
      chips: [
        { label: '📋 Ver menú del día', q: '¿Qué hay de menú hoy?', a: 'Hoy tenemos:\n🍗 Pollo asado + arroz — $4.990\n🐟 Pescado frito + puré — $5.490\n🥘 Cazuela — $4.490\n¿Cuál te tinca?' },
        { label: '🛵 Pedir delivery', q: '¿Hacen delivery?', a: 'Sí, hacemos delivery en un radio de 3 km. Pedido mínimo $8.000. ¿Qué te preparo?' },
        { label: '🕐 Horario', q: '¿A qué hora abren?', a: 'Lunes a sábado: 12:00 a 16:00 y 19:00 a 22:00. ¡Te esperamos!' },
        { label: '🥤 Bebidas', q: '¿Qué bebidas tienen?', a: 'Coca-Cola, Fanta, Sprite ($1.200), Jugo natural ($1.990), Agua mineral ($900). ¿Agregamos algo?' }
      ]
    },
    dental: {
      emoji: '🦷',
      name: 'Dental Sonría',
      status: 'Horas sin llamar',
      messages: [
        { type: 'out', text: 'Hola, quiero pedir una hora para limpieza dental' },
        { type: 'in',  text: '¡Hola! Claro, la limpieza dental tiene un valor de $25.990.\n\nHoras disponibles esta semana:\n📅 Miércoles 15:00\n📅 Jueves 10:00\n📅 Viernes 12:00\n\n¿Cuál prefieres?' },
        { type: 'out', text: 'Jueves a las 10 por favor' },
        { type: 'in',  text: 'Listo, quedas agendado para el jueves a las 10:00 ✅\nRecuerda: no comer nada 2 horas antes. ¡Te esperamos!' }
      ],
      chips: [
        { label: '🦷 Agendar limpieza', q: 'Quiero una limpieza dental', a: 'La limpieza dental vale $25.990. Horas disponibles: Mié 15:00, Jue 10:00, Vie 12:00. ¿Cuál te acomoda?' },
        { label: '✨ Blanqueamiento', q: '¿Hacen blanqueamiento?', a: 'Sí, el blanqueamiento láser tiene un valor de $89.990 (2 sesiones). ¿Te agendo una evaluación?' },
        { label: '💲 Precios', q: '¿Cuánto sale la consulta?', a: 'Consulta general $15.990, Limpieza $25.990, Blanqueamiento $89.990, Ortodoncia desde $450.000. ¿Qué necesitas?' },
        { label: '🆘 Dolor de muela', q: 'Tengo dolor de muela urgente', a: 'Atendemos urgencias de lunes a sábado. Ven directamente a O\'Higgins 850 y te atendemos lo antes posible 🏥' }
      ]
    },
    inmobiliaria: {
      emoji: '🏠',
      name: 'Inmobiliaria Raíces Sur',
      status: 'Arriendos y visitas al instante',
      messages: [
        { type: 'out', text: 'Hola, busco depa de 2 dormitorios en el centro' },
        { type: 'in',  text: 'Hola, tenemos 3 opciones disponibles:\n\n🏢 Barros Arana — 2D/1B — $420.000\n🏢 O\'Higgins — 2D/2B — $480.000\n🏢 Paicaví — 2D/1B — $390.000\n\n¿Quieres agendar una visita?' },
        { type: 'out', text: 'El de Paicaví, ¿puedo ir mañana?' },
        { type: 'in',  text: 'Claro, te agendo visita para mañana a las 11:00 en Paicaví 📍\nTe enviaré la dirección exacta y datos del corredor. ¡Nos vemos!' }
      ],
      chips: [
        { label: '🏢 Ver arriendos', q: 'Busco depa de 2 dormitorios', a: 'Tenemos 3 opciones en el centro:\n🏢 Barros Arana — 2D/1B — $420.000\n🏢 O\'Higgins — 2D/2B — $480.000\n🏢 Paicaví — 2D/1B — $390.000\n¿Quieres agendar visita?' },
        { label: '📅 Agendar visita', q: '¿Puedo agendar una visita?', a: 'Claro, ¿qué propiedad te interesa y qué día te acomoda? Tenemos disponibilidad esta semana.' },
        { label: '💲 Rango de precios', q: '¿Cuánto es lo más barato?', a: 'Los arriendos parten desde $350.000 (1D/1B). Para 2 dormitorios, desde $390.000. ¿Qué presupuesto manejas?' },
        { label: '📋 Requisitos', q: '¿Qué necesito para arrendar?', a: 'Necesitas: cédula de identidad, últimas 3 liquidaciones de sueldo y un aval. Nosotros te guiamos en todo el proceso 📝' }
      ]
    }
  };

  // ---- DOM ----
  var tabs = document.querySelectorAll('.demo-rubro');
  var waBody = document.getElementById('waBody');
  var waAvatar = document.getElementById('waAvatar');
  var waName = document.getElementById('waName');
  var waStatus = document.getElementById('waStatus');
  var waChipsBar = document.getElementById('waChipsBar');
  var tryModeBtn = document.getElementById('tryModeBtn');
  var waInputVisual = document.querySelector('.wa-input--visual');
  var demoModeBtns = document.querySelectorAll('.demo-mode-btn');

  // ---- Cleanup Functions ----
  function clearAllTimeouts() {
    state.timeouts.forEach(function(id) { clearTimeout(id); });
    state.timeouts = [];
  }

  function killAllGsapAnimations() {
    if (typeof gsap !== 'undefined') {
      state.gsapTweens.forEach(function(tween) { 
        if (tween && tween.kill) tween.kill(); 
      });
      state.gsapTweens = [];
      gsap.killTweensOf(waBody);
      gsap.killTweensOf('.wa-msg');
    }
  }

  function resetAnimationState() {
    clearAllTimeouts();
    killAllGsapAnimations();
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
  function getTime() {
    var d = new Date();
    return d.getHours() + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function createBubble(type, text, isSystem) {
    var msg = document.createElement('div');
    msg.className = 'wa-msg wa-msg--' + type;
    if (isSystem) msg.classList.add('wa-msg--system');
    
    var bubble = document.createElement('div');
    bubble.className = 'wa-bubble';
    if (isSystem) bubble.classList.add('wa-bubble--system');
    bubble.textContent = text;
    
    if (!isSystem) {
      var time = document.createElement('span');
      time.className = 'wa-meta';
      time.textContent = getTime();
      bubble.appendChild(time);
    }
    
    msg.appendChild(bubble);
    return msg;
  }

  function createTyping() {
    var msg = document.createElement('div');
    msg.className = 'wa-msg wa-msg--in';
    var bubble = document.createElement('div');
    bubble.className = 'wa-bubble wa-typing';
    bubble.innerHTML = '<span></span><span></span><span></span>';
    msg.appendChild(bubble);
    return msg;
  }

  function scrollToBottom() {
    if (waBody) {
      waBody.scrollTop = waBody.scrollHeight;
    }
  }

  function animateBubble(el) {
    if (typeof gsap !== 'undefined') {
      var tween = gsap.fromTo(el, 
        { opacity: 0, y: 16, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' }
      );
      state.gsapTweens.push(tween);
    } else {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    }
  }

  // ---- Render auto conversation ----
  function renderConversation(rubroKey, options) {
    options = options || {};
    
    resetAnimationState();
    
    var rubro = RUBROS[rubroKey];
    if (!rubro) return;
    
    state.currentRubro = rubroKey;
    state.isAnimating = true;
    
    // Update header
    if (waAvatar) waAvatar.textContent = rubro.emoji;
    if (waName) waName.textContent = rubro.name;
    if (waStatus) waStatus.textContent = state.demoMode === 'ai' ? rubro.status : 'Fuera de horario';
    hideChips();

    function startNewConversation() {
      if (waBody) {
        waBody.innerHTML = '';
        waBody.style.opacity = '1';
      }
      
      var messages = state.demoMode === 'ai' ? rubro.messages : TRADITIONAL_MESSAGES[rubroKey];
      showMessages(messages, 0);
    }

    if (typeof gsap !== 'undefined' && waBody && !options.instant) {
      var fadeOut = gsap.to(waBody, { 
        opacity: 0, 
        duration: 0.15, 
        onComplete: startNewConversation 
      });
      state.gsapTweens.push(fadeOut);
    } else {
      startNewConversation();
    }
  }

  function showMessages(messages, index) {
    if (!messages || index >= messages.length) {
      state.isAnimating = false;
      return;
    }
    
    var msg = messages[index];
    var baseDelay = index === 0 ? 300 : (msg.type === 'in' ? (state.demoMode === 'ai' ? 1200 : 2000) : 600);
    var delay = baseDelay + (Math.random() * 100 - 50);

    scheduleTimeout(function () {
      if (!state.isAnimating && index > 0) return;
      
      if (msg.type === 'in' && state.demoMode === 'ai') {
        var typing = createTyping();
        if (waBody) waBody.appendChild(typing);
        animateBubble(typing);
        scrollToBottom();
        
        scheduleTimeout(function () {
          if (!waBody) return;
          if (typing.parentNode === waBody) {
            waBody.removeChild(typing);
          }
          var bubble = createBubble(msg.type, msg.text, msg.isSystem);
          waBody.appendChild(bubble);
          animateBubble(bubble);
          scrollToBottom();
          showMessages(messages, index + 1);
        }, 800 + Math.random() * 300);
      } else {
        if (!waBody) return;
        var bubble = createBubble(msg.type, msg.text, msg.isSystem);
        waBody.appendChild(bubble);
        animateBubble(bubble);
        scrollToBottom();
        showMessages(messages, index + 1);
      }
    }, Math.max(0, delay));
  }

  // ---- Chips ----
  function showChips() {
    if (state.demoMode !== 'ai') return;
    
    var rubro = RUBROS[state.currentRubro];
    if (!rubro || !waChipsBar) return;
    
    waChipsBar.innerHTML = '';
    rubro.chips.forEach(function(chip) {
      var btn = document.createElement('button');
      btn.className = 'wa-chip';
      btn.type = 'button';
      btn.textContent = chip.label;
      btn.addEventListener('click', function () { handleChipClick(chip); });
      waChipsBar.appendChild(btn);
    });
    waChipsBar.classList.add('is-visible');
    
    if (typeof gsap !== 'undefined') {
      var chips = waChipsBar.querySelectorAll('.wa-chip');
      var tween = gsap.fromTo(chips, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.3, stagger: 0.05, ease: 'power2.out' }
      );
      state.gsapTweens.push(tween);
    }
  }

  function hideChips() {
    if (waChipsBar) {
      waChipsBar.classList.remove('is-visible');
      waChipsBar.innerHTML = '';
    }
  }

  function handleChipClick(chip) {
    if (state.isAnimating) return;
    state.isAnimating = true;

    hideChips();

    if (waBody) {
      var userBubble = createBubble('out', chip.q);
      waBody.appendChild(userBubble);
      animateBubble(userBubble);
      scrollToBottom();
    }

    scheduleTimeout(function () {
      if (!waBody) return;
      var typing = createTyping();
      waBody.appendChild(typing);
      animateBubble(typing);
      scrollToBottom();

      scheduleTimeout(function () {
        if (!waBody) return;
        var typingIndicators = waBody.querySelectorAll('.wa-typing');
        typingIndicators.forEach(function(t) {
          if (t.parentNode && t.parentNode.parentNode === waBody) {
            waBody.removeChild(t.parentNode);
          }
        });
        
        var botBubble = createBubble('in', chip.a);
        waBody.appendChild(botBubble);
        animateBubble(botBubble);
        scrollToBottom();
        
        state.isAnimating = false;
        scheduleTimeout(showChips, 400);
      }, 900 + Math.random() * 400);
    }, 300);
  }

  // ---- Demo Mode Toggle (AI vs Traditional) ----
  demoModeBtns.forEach(function(btn) {
    btn.addEventListener('click', function() {
      var mode = btn.getAttribute('data-mode');
      if (mode === state.demoMode) return;
      
      state.demoMode = mode;
      
      demoModeBtns.forEach(function(b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
      
      // Disable try mode button in traditional mode
      if (tryModeBtn) {
        tryModeBtn.disabled = mode === 'traditional';
        tryModeBtn.style.opacity = mode === 'traditional' ? '0.5' : '1';
      }
      
      // Exit try mode if active
      if (state.tryMode && mode === 'traditional') {
        toggleTryMode();
      }
      
      renderConversation(state.currentRubro);
      updateLiveStats();
    });
  });

  // ---- Tab Switching ----
  tabs.forEach(function(tab) {
    tab.addEventListener('click', function () {
      var rubro = tab.getAttribute('data-rubro');
      if (rubro === state.currentRubro && !state.tryMode) return;
      
      tabs.forEach(function(t) {
        t.classList.remove('active');
        t.setAttribute('aria-selected', 'false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected', 'true');
      
      if (state.tryMode) {
        toggleTryMode();
      }
      
      renderConversation(rubro);
    });
  });

  // ---- Try Mode Toggle ----
  function toggleTryMode() {
    if (state.demoMode === 'traditional') return;
    
    state.tryMode = !state.tryMode;
    if (tryModeBtn) {
      tryModeBtn.classList.toggle('is-active', state.tryMode);
    }

    if (state.tryMode) {
      if (tryModeBtn) {
        tryModeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6L6 18"/><path d="M6 6l12 12"/></svg> Salir del modo prueba';
      }
      if (waInputVisual) waInputVisual.classList.add('is-visible');
      resetAnimationState();
      if (waBody) waBody.innerHTML = '';
      
      var rubro = RUBROS[state.currentRubro];
      if (rubro && waBody) {
        var welcome = createBubble('in', '¡Hola! Soy el asistente de ' + rubro.name + '. Elige una pregunta y mira cómo respondo 😊');
        waBody.appendChild(welcome);
        animateBubble(welcome);
        scheduleTimeout(showChips, 500);
      }
    } else {
      if (tryModeBtn) {
        tryModeBtn.innerHTML = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z"/></svg> Pruébalo tú mismo';
      }
      if (waInputVisual) waInputVisual.classList.remove('is-visible');
      hideChips();
      renderConversation(state.currentRubro);
    }
  }

  if (tryModeBtn) {
    tryModeBtn.addEventListener('click', toggleTryMode);
  }

  // ---- Live Stats ----
  function updateLiveStats() {
    var conversations = document.getElementById('statConversations');
    var conversationsLabel = document.getElementById('statConversationsLabel');
    var conversationsWrap = document.getElementById('statConversationsWrap');
    var responseTime = document.getElementById('statResponseTime');
    var availabilityIcon = document.getElementById('statAvailabilityIcon');
    var availabilityValue = document.getElementById('statAvailabilityValue');
    var availabilityLabel = document.getElementById('statAvailabilityLabel');

    if (state.demoMode === 'ai') {
      if (conversations) conversations.textContent = '+1,200';
      if (conversationsLabel) conversationsLabel.textContent = 'conversaciones hoy';
      if (conversationsWrap) conversationsWrap.classList.remove('demo-stat--alert');
      if (responseTime) responseTime.textContent = '<2s';
      if (availabilityIcon) availabilityIcon.textContent = '🟢';
      if (availabilityValue) availabilityValue.textContent = '24/7';
      if (availabilityLabel) availabilityLabel.textContent = 'siempre disponible';
    } else {
      if (conversations) conversations.textContent = '⚠️ 30 sin respuesta';
      if (conversationsLabel) conversationsLabel.textContent = '';
      if (conversationsWrap) conversationsWrap.classList.add('demo-stat--alert');
      if (responseTime) responseTime.textContent = '24-48h';
      if (availabilityIcon) availabilityIcon.textContent = '🔴';
      if (availabilityValue) availabilityValue.textContent = 'Fuera de horario';
      if (availabilityLabel) availabilityLabel.textContent = '';
    }
  }

  updateLiveStats();

  // ---- Hamburger ----
  var hamburger = document.getElementById('hamburger');
  var navLinks = document.getElementById('nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      hamburger.classList.toggle('is-active', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });
    navLinks.querySelectorAll('.nav-link').forEach(function(link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        hamburger.classList.remove('is-active');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ---- Navbar scroll ----
  var navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', function () {
      navbar.classList.toggle('navbar--scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ---- Visibility API ----
  document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
      if (typeof gsap !== 'undefined') {
        gsap.globalTimeline.pause();
      }
    } else {
      if (typeof gsap !== 'undefined') {
        gsap.globalTimeline.resume();
      }
    }
  });

  // ---- Init ----
  renderConversation('ferreteria');

})();
