document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const nombreInput = document.getElementById('nombre');
    const apellidoInput = document.getElementById('apellido');
    const ciudadInput = document.getElementById('ciudad');          
    const postalInput = document.getElementById('postal');
    const cedulaInput = document.getElementById('cedula');
    const telefonoInput = document.getElementById('telefono');
    const fechaNacimientoInput = document.getElementById('fechaNacimiento');    
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const edadInput = document.getElementById('edad');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    

    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Expresión regular para validar contraseña (mínimo 8 caracteres, al menos un número y un carácter especial)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Validación en tiempo real para cada campo
    nombreInput.addEventListener('input', validateNombre);
    apellidoInput.addEventListener('input', validateApellido);
    ciudadInput.addEventListener('input', function() {
        const ciudad = ciudadInput.value.trim();
        const errorElement = document.getElementById('ciudadError');
        if (ciudad.length < 3) {
            showError(ciudadInput, errorElement, 'La ciudad debe tener al menos 3 caracteres');
        } else {
            showSuccess(ciudadInput, errorElement);
        }
    });

    emailInput.addEventListener('input', validateEmail);
    cedulaInput.addEventListener('input', validatecedula);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    edadInput.addEventListener('input', validateEdad);
    postalInput.addEventListener('input',validateNombre);
    // Botón de reinicio
    resetBtn.addEventListener('click', resetForm);
    
    // Envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            alert('¡Formulario enviado con éxito!');
            form.reset();
            submitBtn.disabled = true;
        }
    });


    function validateNombre() {
    const nombre = nombreInput.value.trim();
    const errorElement = document.getElementById('nombreError');
    const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/; // Regex para letras (incluye acentos y espacios)

    if (nombre.length < 2) {
        showError(nombreInput, errorElement, 'El nombre debe tener al menos 5 caracteres');
        return false;
    } else if (!soloLetras.test(nombre)) {
        showError(nombreInput, errorElement, 'Solo se permiten letras (sin números ni caracteres especiales)');
        return false;
    } else {
        showSuccess(nombreInput, errorElement);
        return true;
    }
}
    function validateApellido() {
        const apellido = apellidoInput.value.trim();        
        const errorElement = document.getElementById('apellidoError');
        const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÜüÑñ\s]+$/; // Regex para letras (incluye acentos y espacios)
        if (apellido.length < 2) {
            showError(apellidoInput, errorElement, 'El apellido debe tener al menos 3 caracteres');
            return false;                   
        } else if (!soloLetras.test(apellido)) {
            showError(apellidoInput, errorElement, 'Solo se permiten letras (sin números ni caracteres especiales)');
            return false;
        } else {
            showSuccess(apellidoInput, errorElement);
            return true;
        }
    }
    function validateEdad() {
        const edad = parseInt(edadInput.value);
        const errorElement = document.getElementById('edadError');
        if (isNaN(edad) || edad < 18) {
            showError(edadInput, errorElement, 'Debes ser mayor de 18 años');
            return false;
        } else {
            showSuccess(edadInput, errorElement);
            return true;
        }
    }

    function validateEmail() {
        const email = emailInput.value.trim();
        const errorElement = document.getElementById('emailError');
        
        if (!emailRegex.test(email)) {
            showError(emailInput, errorElement, 'Por favor ingresa un correo electrónico válido');
            return false;
        } else {
            showSuccess(emailInput, errorElement);
            return true;
        }
    }

    function validatePassword() {
        const password = passwordInput.value;
        const errorElement = document.getElementById('passwordError');
        
        if (!passwordRegex.test(password)) {
            showError(passwordInput, errorElement, 'La contraseña debe tener al menos 8 caracteres, un número y un carácter especial');
            return false;
        } else {
            showSuccess(passwordInput, errorElement);
            return true;
        }
    }

    function validateConfirmPassword() {
        const password = passwordInput.value;
        const confirmPassword = confirmPasswordInput.value;
        const errorElement = document.getElementById('confirmPasswordError');
        
        if (password !== confirmPassword) {
            showError(confirmPasswordInput, errorElement, 'Las contraseñas no coinciden');
            return false;
        } else if (confirmPassword === '') {
            showError(confirmPasswordInput, errorElement, 'Por favor confirma tu contraseña');
            return false;
        } else {
            showSuccess(confirmPasswordInput, errorElement);
            return true;
        }
    }

    function validateEdad() {
    const edad = edadInput.value;
    const errorElement = document.getElementById('edadError');
    
    if (edad === '') {
        showError(edadInput, errorElement, 'Ingrese su edad');
        return false;
    }
    
    const edadNum = parseInt(edad);
    if (edadNum < 18) {
        showError(edadInput, errorElement, 'Debes ser mayor de 18 años');
        return false;
    }
    
    showSuccess(edadInput, errorElement);
    return true;
}


    function validateForm() {
        const isNombreValid = validateNombre();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        const isConfirmPasswordValid = validateConfirmPassword();
        const isEdadValid = validateEdad();
        
        return isNombreValid && isEmailValid && isPasswordValid && isConfirmPasswordValid && isEdadValid;
    }

    function showError(input, errorElement, message) {
        input.classList.add('invalid');
        input.classList.remove('valid');
        errorElement.textContent = message;
        checkFormValidity();
    }

    function showSuccess(input, errorElement) {
        input.classList.add('valid');
        input.classList.remove('invalid');
        errorElement.textContent = '';
        checkFormValidity();
    }

    function checkFormValidity() {
        submitBtn.disabled = !validateForm();
    }

    function resetForm() {
        form.reset();
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('valid', 'invalid');
        });
        submitBtn.disabled = true;
    }
    function validatecedula() {
        const cedula = cedulaInput.value.trim();
        const errorElement = document.getElementById('cedulaError');
        const soloNumeros = /^[0-9]+$/; // Regex para números

        if (cedula.length < 3) {
            showError(cedulaInput, errorElement, 'La cédula debe tener al menos 3 caracteres');
            return false;
        } else if (!soloNumeros.test(cedula)) {
            showError(cedulaInput, errorElement, 'Solo se permiten números');
            return false;
        } else {
            showSuccess(cedulaInput, errorElement);
            return true;
        }
    }
});