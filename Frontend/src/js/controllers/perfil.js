document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    if (usuario) {
        // Mostrar la información en la página
        const name = document.querySelector('.profile-table tr:nth-child(1) td:nth-child(2)');
        const lastname = document.querySelector('.profile-table tr:nth-child(2) td:nth-child(2)');
        const email = document.querySelector('.form-group p:nth-child(2)');
        const phone = document.querySelector('.form-group p:nth-child(4)');
        const location = document.querySelector('.form-group p:nth-child(6)');
        const summary = document.querySelector('.form-group p:nth-child(8)');

        if (name) name.textContent = usuario.nombre || 'Nombre no disponible';
        if (lastname) lastname.textContent = usuario.apellidos || 'Apellidos no disponibles';
        if (email) email.textContent = usuario.correo || 'Correo no disponible';
        if (phone) phone.textContent = usuario.telefono || 'Número de teléfono no disponible';
        if (location) location.textContent = usuario.ubicacion || 'Ubicación no disponible';
        if (summary) summary.textContent = usuario.resumen || 'Resumen no disponible';
    } else {
        alert('Usuario no encontrado. Por favor inicia sesión nuevamente.');
        window.location.href = 'login.html'; // o donde corresponda
    }

    // Manejo de pestañas de perfil
    const profileTabs = document.querySelectorAll('.profile-tab');
    if (profileTabs.length > 0) {
        profileTabs.forEach(tab => {
            tab.addEventListener('click', function(e) {
                e.preventDefault();
                
                profileTabs.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                
                // Aquí iría la lógica para cargar el contenido de cada pestaña
                console.log('Cambiando a pestaña:', this.textContent.trim());
            });
        });
    }
});
