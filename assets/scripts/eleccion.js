// Función para manejar la selección de rol
function selectRole(role) {
    const button = event.target;
    
    // Efecto visual de selección
    button.style.transform = 'scale(0.95)';
    setTimeout(() => {
        button.style.transform = 'scale(1)';
    }, 150);
    
    // Validar rol antes de procesar
    if (!validateRole(role)) {
        handleError(new Error('Rol inválido'), 'selectRole');
        return;
    }
    
    // Log de la selección
    logEvent('ROLE_SELECTED', { role: role });
    
    // Aquí puedes agregar la lógica para redirigir o procesar la selección
    console.log(`Rol seleccionado: ${role}`);
    
    // Mostrar mensaje de confirmación
    showConfirmation(role);
    
    // Redireccionar al login específico después de mostrar la confirmación
    handleRedirect(role);
}

// Función para mostrar confirmación
function showConfirmation(role) {
    const roleText = role === 'ciudadano' ? 'Ciudadano' : 'Empresa';
    
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #4CAF50;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(76, 175, 80, 0.3);
    `;
    notification.textContent = `Accediendo como ${roleText}...`;
    
    document.body.appendChild(notification);
    
    // Remover notificación después de 2 segundos
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 2000);
}

// Función para hacer la aplicación más interactiva
function addInteractivity() {
    const container = document.querySelector('.container');
    
    if (container) {
        // Efecto parallax sutil en el scroll
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            container.style.transform = `translateY(${rate}px)`;
        });
        
        // Efecto de inclinación en el hover del container
        container.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * 5;
            const rotateY = (centerX - x) / centerX * 5;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        container.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
        });
    }
}

// Función para agregar efectos de hover adicionales a los botones
function setupButtonEffects() {
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Función para manejar redirecciones a diferentes páginas de login
function handleRedirect(role) {
    let loginUrl;
    
    // Determinar la URL de login según el rol
    switch(role) {
        case 'ciudadano':
            loginUrl = 'login-ciudadano.html';
            break;
        case 'empresa':
            loginUrl = 'login-empresa.html';
            break;
        default:
            // Fallback a login genérico si el rol no es reconocido
            loginUrl = 'login.html';
            console.warn('Rol no reconocido, usando login genérico');
    }
    
    // Log del evento de redirección
    logEvent('REDIRECT_INITIATED', { 
        role: role, 
        targetUrl: loginUrl,
        timestamp: new Date().toISOString()
    });
    
    // Simular tiempo de carga y redirigir
    setTimeout(() => {
        try {
            window.location.href = loginUrl;
        } catch (error) {
            handleError(error, 'handleRedirect');
            // Intentar redirección alternativa
            window.location.href = 'login.html';
        }
    }, 1500);
}

// Función para validar rol antes de procesar
function validateRole(role) {
    const validRoles = ['ciudadano', 'empresa'];
    return validRoles.includes(role);
}

// Función para logging de eventos
function logEvent(eventType, data) {
    console.log(`[${new Date().toISOString()}] ${eventType}:`, data);
}

// Función para manejar errores
function handleError(error, context) {
    console.error(`Error en ${context}:`, error);
    
    // Mostrar notificación de error
    const errorNotification = document.createElement('div');
    errorNotification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #f44336;
        color: white;
        padding: 15px 20px;
        border-radius: 10px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        box-shadow: 0 4px 15px rgba(244, 67, 54, 0.3);
    `;
    errorNotification.textContent = 'Ha ocurrido un error. Por favor, inténtalo de nuevo.';
    
    document.body.appendChild(errorNotification);
    
    // Remover notificación después de 3 segundos
    setTimeout(() => {
        errorNotification.style.animation = 'slideOutRight 0.3s ease-out forwards';
        setTimeout(() => {
            if (document.body.contains(errorNotification)) {
                document.body.removeChild(errorNotification);
            }
        }, 300);
    }, 3000);
}

// Función para manejar el logo
function setupLogo() {
    const logo = document.querySelector('.logo');
    
    if (logo) {
        // Manejar error de carga de imagen
        logo.addEventListener('error', function() {
            // Crear elemento de fallback
            const fallback = document.createElement('span');
            fallback.className = 'logo-fallback';
            
            // Reemplazar la imagen con el fallback
            this.parentNode.replaceChild(fallback, this);
            
            logEvent('LOGO_LOAD_ERROR', { src: this.src });
        });
        
        // Manejar carga exitosa
        logo.addEventListener('load', function() {
            logEvent('LOGO_LOADED', { src: this.src });
        });
    }
}

// Inicializar la aplicación cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    try {
        console.log('Waste Wise Routes cargado correctamente');
        
        // Configurar logo
        setupLogo();
        
        // Configurar efectos de botones
        setupButtonEffects();
        
        // Configurar eventos de los botones de rol
        setupRoleButtons();
        
        // Log del evento de carga
        logEvent('APP_LOADED', { timestamp: new Date().toISOString() });
        
    } catch (error) {
        handleError(error, 'DOMContentLoaded');
    }
});

// Función para configurar los eventos de los botones de rol
function setupRoleButtons() {
    // Buscar botones por diferentes selectores posibles
    const citizenButton = document.querySelector('[onclick*="ciudadano"]') || 
                         document.querySelector('.btn:contains("Ciudadano")') ||
                         document.getElementById('btn-ciudadano');
    
    const companyButton = document.querySelector('[onclick*="empresa"]') || 
                         document.querySelector('.btn:contains("Empresa")') ||
                         document.getElementById('btn-empresa');
    
    // Configurar evento para botón ciudadano
    if (citizenButton) {
        citizenButton.addEventListener('click', function(e) {
            e.preventDefault();
            selectRole('ciudadano');
        });
        logEvent('CITIZEN_BUTTON_CONFIGURED', { element: citizenButton });
    }
    
    // Configurar evento para botón empresa
    if (companyButton) {
        companyButton.addEventListener('click', function(e) {
            e.preventDefault();
            selectRole('empresa');
        });
        logEvent('COMPANY_BUTTON_CONFIGURED', { element: companyButton });
    }
    
    // Si no se encontraron botones, intentar configuración genérica
    if (!citizenButton && !companyButton) {
        const allButtons = document.querySelectorAll('.btn');
        allButtons.forEach((button, index) => {
            if (button.textContent.toLowerCase().includes('ciudadano')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    selectRole('ciudadano');
                });
            } else if (button.textContent.toLowerCase().includes('empresa')) {
                button.addEventListener('click', function(e) {
                    e.preventDefault();
                    selectRole('empresa');
                });
            }
        });
    }
}

// Llamar a la función de interactividad después de que la página cargue
window.addEventListener('load', function() {
    try {
        addInteractivity();
        logEvent('INTERACTIVITY_LOADED', { timestamp: new Date().toISOString() });
    } catch (error) {
        handleError(error, 'window.load');
    }
});

// Manejar errores globales
window.addEventListener('error', function(event) {
    handleError(event.error, 'Global Error');
});

// Función para dispositivos móviles
function setupMobileOptimizations() {
    // Detectar si es dispositivo móvil
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // Agregar clase para optimizaciones móviles
        document.body.classList.add('mobile-device');
        
        // Optimizar eventos touch
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(button => {
            button.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.95)';
            });
            
            button.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            });
        });
        
        logEvent('MOBILE_OPTIMIZATIONS_APPLIED', { userAgent: navigator.userAgent });
    }
}

// Aplicar optimizaciones móviles
setupMobileOptimizations();

// Función para analytics (opcional)
function trackUserInteraction(action, details) {
    // Aquí puedes integrar con Google Analytics, Mixpanel, etc.
    logEvent('USER_INTERACTION', { action, details, timestamp: new Date().toISOString() });
}

// Función para precargar recursos (opcional)
function preloadResources() {
    // Precargar las páginas de login
    const resourcesToPreload = [
        'login-ciudadano.html',
        'login-empresa.html',
        'login.html' // fallback
    ];
    
    resourcesToPreload.forEach(url => {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    });
    
    logEvent('RESOURCES_PRELOADED', { resources: resourcesToPreload });
}

// Precargar recursos al cargar la página
preloadResources();

// Función para limpiar recursos al salir de la página
window.addEventListener('beforeunload', function() {
    // Limpiar timers, eventos, etc.
    logEvent('PAGE_UNLOAD', { timestamp: new Date().toISOString() });
});

// Exportar funciones para uso en otros archivos (si es necesario)
window.WasteWiseRoutes = {
    selectRole,
    showConfirmation,
    handleRedirect,
    validateRole,
    logEvent,
    handleError,
    trackUserInteraction,
    setupRoleButtons
};