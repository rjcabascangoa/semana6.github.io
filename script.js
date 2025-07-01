document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const nombreInput = document.getElementById('nombre');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const edadInput = document.getElementById('edad');
    const submitBtn = document.getElementById('submitBtn');
    const resetBtn = document.getElementById('resetBtn');

    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Expresión regular para validar contraseña (mínimo 8 caracteres, al menos un número y un carácter especial)
    const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,}$/;

    // Validación en tiempo real para cada campo
    nombreInput.addEventListener('input', validateNombre);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    edadInput.addEventListener('input', validateEdad);
    
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
        
        if (nombre.length < 3) {
            showError(nombreInput, errorElement, 'El nombre debe tener al menos 3 caracteres');
            return false;
        } else {
            showSuccess(nombreInput, errorElement);
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
});