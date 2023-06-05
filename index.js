//initializing variables
const formCreateAccount = document.querySelector('#form_create_account');
const emailId = document.querySelector('#email');
const userName = document.querySelector('#userName');
const lastName = document.querySelector('#lastName');

const validateName = () => {
    let isValid = false;
    const name = userName.value.trim();

    if (!isPresent(name)) {
        error(userName, 'Rellene este campo.');
    } else if (!isNameValid(name)) {
        error(userName, `El nombre solo puede contener texto.`)
    } else {
        success(userName);
        isValid = true;
    }
    return isValid;
};

const validateLastName = () => {
    let isValid = false;
    const surName = lastName.value.trim();

    if (!isPresent(surName)) {
        error(lastName, 'Rellene este campo.');
    } else if (!isNameValid(surName)) {
        error(lastName, `El apellido solo puede contener texto.`)
    } else {
        success(lastName);
        isValid = true;
    }
    return isValid;
};

const validateEmail = () => {
    let isValid = false;
    const email = emailId.value.trim();
    if (!isPresent(email)) {
        error(emailId, 'Rellene este campo.');
    } else if (!isEmailValid(email)) {
        error(emailId, 'Email inválido.')
    } else {
        success(emailId);
        isValid = true;
    }
    return isValid;
};


const isNameValid = (userName) => {
    const re = /^[a-zA-ZÀ-ÿ\s]{5,40}$/;
    return re.test(userName);
}

const isEmailValid = (email) => {
    const re = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    return re.test(email);
};

const isPresent = value => value === '' ? false : true;

const success = (input) => {
    const getField = input.parentElement;

    // remove the error class
    getField.classList.remove('error');
    getField.classList.add('success');
    getField.classList.add('field.success');
    
    // hide the error message
    const error = getField.querySelector('small');
    error.textContent = '';
}

const error = (input, message) => {
    const getField = input.parentElement;
    // add the error class
    getField.classList.remove('success');
    getField.classList.add('error');
    
    // show the error message
    const error = getField.querySelector('small');
    error.textContent = message;
};

formCreateAccount.addEventListener('submit', function (e) {
    e.preventDefault();

    // validate fields
    let isUsernameValid = validateName(),
        isLastNameValid = validateLastName(),
        isEmailValid = validateEmail();

    let isFormValid = isEmailValid &&
        isUsernameValid && 
        isLastNameValid;

    // submit form is ok
    if (isFormValid) {
        document.getElementById("form_create_account").submit();
        formCreateAccount.reset();
    }
});

const returned = (fn, delay = 500) => {
    let timeoutId;
    return (...args) => {
        // old timer
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        // new timer
        timeoutId = setTimeout(() => {
            fn.apply(null, args)
        }, delay);
    };
};

formCreateAccount.addEventListener('input', returned(function (e) {
    switch (e.target.id) {
        case 'email':
            validateEmail();
            break;
        case 'userName':
            validateName();
            break;
        case 'lastName':
            validateLastName();
            break;
    }
}));