// Función para reportar acumulación
function reportAccumulation() {
    // Simular obtener ubicación
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                alert(`Iniciando reporte en ubicación: ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
                // Aquí implementarías la lógica para abrir la cámara y crear el reporte
            },
            (error) => {
                alert('No se pudo obtener la ubicación. Usando ubicación por defecto.');
                console.log('Error de geolocalización:', error);
            }
        );
    } else {
        alert('Geolocalización no soportada en este navegador.');
    }
}

// Función para ver reportes
function viewReports() {
    
window.location.href = 'reporte.html';    // Aquí implementarías la navegación a la página de reportes
}

// Función para cambiar pestaña activa
function setActiveTab(tab) {
    // Remover clase active de todos los elementos
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Agregar clase active al elemento clickeado
    event.currentTarget.classList.add('active');
    
    // Simular navegación
    console.log(`Navegando a: ${tab}`);
    
    // Aquí implementarías la lógica de navegación real
    switch(tab) {
        case 'inicio':
            // Ya estamos en inicio
            break;
        case 'reportes':
            alert('Navegando a Reportes...');
            break;
        case 'historial':
            alert('Navegando a Historial...');
            break;
        case 'cuenta':
            alert('Navegando a Cuenta...');
            break;
    }
}

// Animación sutil para el camión
function animateTruck() {
    const truck = document.querySelector('.truck');
    if (truck) {
        truck.style.transform = 'translateX(5px)';
        setTimeout(() => {
            truck.style.transform = 'translateX(0)';
        }, 1000);
    }
}

// Función para inicializar la aplicación
function initializeApp() {
    // Animar el camión cada 3 segundos
    setInterval(animateTruck, 3000);

    // Agregar efectos hover para mejorar la interactividad
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Agregar efecto de click para mejor feedback
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'translateY(0) scale(0.98)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1)';
            }, 100);
        });
    });
}

// Función para mostrar información del usuario
function showUserInfo() {
    const userInfo = {
        name: 'Juan',
        totalReports: 15,
        resolvedReports: 12,
        pendingReports: 3
    };
    
    console.log('Información del usuario:', userInfo);
}

// Función para obtener ubicación actual
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocalización no soportada'));
        }
    });
}

// Función para manejar errores de geolocalización
function handleLocationError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('Permiso de ubicación denegado. Por favor, habilita la geolocalización.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Información de ubicación no disponible.');
            break;
        case error.TIMEOUT:
            alert('La solicitud de ubicación ha caducado.');
            break;
        default:
            alert('Error desconocido al obtener la ubicación.');
            break;
    }
}

// Función para formatear fecha
function formatDate(date) {
    const options = { 
        year: 'numeric', 
        month: '2-digit', 
        day: '2-digit' 
    };
    return new Date(date).toLocaleDateString('es-ES', options);
}

// Función para simular carga de datos
function loadUserData() {
    // Simular carga de datos del usuario
    setTimeout(() => {
        console.log('Datos del usuario cargados exitosamente');
        showUserInfo();
    }, 1000);
}

// Función para validar formulario de reporte
function validateReportForm(data) {
    const errors = [];
    
    if (!data.location) {
        errors.push('Ubicación requerida');
    }
    
    if (!data.description || data.description.trim().length < 10) {
        errors.push('Descripción debe tener al menos 10 caracteres');
    }
    
    if (!data.photo) {
        errors.push('Foto requerida');
    }
    
    return errors;
}

// Función para enviar reporte
function submitReport(reportData) {
    const errors = validateReportForm(reportData);
    
    if (errors.length > 0) {
        alert('Errores en el formulario:\n' + errors.join('\n'));
        return false;
    }
    
    // Simular envío del reporte
    console.log('Enviando reporte:', reportData);
    alert('Reporte enviado exitosamente');
    return true;
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadUserData();
    
    // Agregar listener para el botón de perfil
    const profileIcon = document.querySelector('.profile-icon');
    if (profileIcon) {
        profileIcon.addEventListener('click', function() {
            alert('Abriendo perfil de usuario...');
            showUserInfo();
        });
    }
});

// Función para manejar el redimensionamiento de la ventana
window.addEventListener('resize', function() {
    // Ajustar elementos si es necesario en el redimensionamiento
    console.log('Ventana redimensionada');
});

// Función para manejar cuando la página se va a cerrar
window.addEventListener('beforeunload', function(event) {
    // Guardar datos importantes antes de cerrar
    console.log('Guardando datos antes de cerrar...');
});

// Exportar funciones para uso en otros archivos (si es necesario)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        reportAccumulation,
        viewReports,
        setActiveTab,
        getCurrentLocation,
        submitReport,
        validateReportForm
    };
}