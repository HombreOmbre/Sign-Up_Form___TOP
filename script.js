const divForInputs = document.querySelectorAll('.input');

// styling label
divForInputs.forEach(div => div.querySelector('input').addEventListener('click', () => {
    const label = div.querySelector('label');
    label.style.transform = "translateX(0)";
}));

// start validation for all inputs
divForInputs.forEach(div => div.querySelector('input').addEventListener('blur', checkActiveInput)); 

function checkActiveInput() {
        this.removeEventListener('blur', checkActiveInput);
        this.addEventListener('input', checkActiveInput);
        const id = this.id;
        let value = this.value;
        const div = this.parentElement;

        switch (id) {
            case 'userName':
                checkUserName(value, div);
            break;
            case 'email':
                checkEmail(value, div);
            break;
            case 'password':
                checkPassword(value, div);
            break;
            case 'secpassword':
                checkSecondPassword(value, div);
            break;
        }
};

// Validation user first name
function checkUserName(value, div) {
    let validUserName = validateUserName(value);
    let userNameLength = value.length;

    if (validUserName) {
        showUserNameInfo(validUserName, div, userNameLength);
    } else {
        showUserNameInfo(validUserName, div, userNameLength);
    };
};

function validateUserName(name) {
    let firstNameRegex = /^[A-Za-z0-9_]{3,15}$/;

    return firstNameRegex.test(name);
};

function showUserNameInfo(boolean, div, length) {
    let userNameLabel = div.querySelector('label');
    let userNameInput = div.querySelector('#userName');
    let userNameInfo = div.querySelector('.userName_info');

    if (boolean) {
        // if userName is valid
        userNameLabel.classList.remove('invalid');
        userNameInput.classList.remove('invalid');
        userNameLabel.classList.add('valid');
        userNameInput.classList.add('valid');
        userNameInfo.innerHTML = '';
        userNameLabel.innerHTML = `<span class='icon'>✅</span> First Name`;
    } else {
        // if userName is invalid
        userNameLabel.classList.remove('valid');
        userNameInput.classList.remove('valid'); 
        userNameLabel.classList.add('invalid');
        userNameInput.classList.add('invalid');
        userNameLabel.textContent = 'First Name';
        userNameInfo.innerHTML = `
            <p class='invalid'>❌ The name must have at least 3 characters and must be shorter than 20 characters</p>    
        `;
    }
};

// Validation user email
function checkEmail(value, div) {
    let validEmail = validateEmail(value);
    let userEmail = value.length;

    if (validEmail) {
        showEmailInfo(validEmail, div, userEmail);
    } else {
        showEmailInfo(validEmail, div, userEmail);
    };
};

function validateEmail(email) {
    let emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return emailRegex.test(email);
};

function showEmailInfo(boolean, div, length) {
    let emailLabel = div.querySelector('label');
    let emailInput = div.querySelector('#email');
    let emailInfo = div.querySelector('.email_info');

    if (boolean) {
        // if email is valid
        emailLabel.classList.remove('invalid');
        emailInput.classList.remove('invalid');
        emailLabel.classList.add('valid');
        emailInput.classList.add('valid');
        emailInfo.innerHTML = '';
        emailLabel.innerHTML = `<span class='icon'>✅</span> Email`;
    } else {
        // if email is invalid
        emailLabel.classList.remove('valid');
        emailInput.classList.remove('valid'); 
        emailLabel.classList.add('invalid');
        emailInput.classList.add('invalid');
        emailInfo.innerHTML = `
            <p class='invalid'>❌ Your email should look like this: <b>example@example.com</b></p>
        `;
    }
};

// Validate password
function checkPassword(value, div) {
    let validPassword = validatePassword(value);
    let userPassword = value;

    if (validPassword) {
        showPasswordInfo(validPassword, div, userPassword);
    } else {
        showPasswordInfo(validPassword, div, userPassword);
    };
};

function validatePassword(password) {
    let passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;

    return passwordRegex.test(password);
};

function showPasswordInfo(boolean, div, psw) {
    let passwordLabel = div.querySelector('label');
    let passwordInput = div.querySelector('#password');
    let passwordInfo = div.querySelector('.psw_info');

    let upperCase = psw.search(/[A-Z]/) >= 0 ? `<li class='valid'><span class='icon2'>✅ </span> Contain at least one upper case letter</li>` : `<li class='invalid'><span class='icon2'>❌ </span> Contain at least one upper case letter</li>`;

    let lowerCase = psw.search(/[a-z]/) >= 0 ? `<li class='valid'><span class='icon2'>✅ </span> Contain at least one lower case letter</li>` : `<li class='invalid'><span class='icon2'>❌ </span> Contain at least one lower case letter</li>`;

    let specialCharNum = psw.search(/[^A-Za-z]/) >= 0 ? `<li class='valid'><span class='icon2'>✅ </span> Contain at least one number or special character</li>` : `<li class='invalid'><span class='icon2'>❌ </span> Contain at least one number or special character</li>`;
    
    let pswNum = psw.length >= 8 ? `<li class='valid'><span class='icon2'>✅ </span> Minimum length must contain 8 characters</li>` : `<li class='invalid'><span class='icon2'>❌ </span> Minimum length must contain 8 characters</li>`;

    if (boolean) {
        // if email is valid
        passwordLabel.classList.remove('invalid');
        passwordInput.classList.remove('invalid');
        passwordLabel.classList.add('valid');
        passwordInput.classList.add('valid');
        passwordInfo.innerHTML = '';
        passwordLabel.innerHTML = `<span class='icon'>✅</span> Password`;
    } else {
        // if email is invalid
        passwordLabel.classList.remove('valid');
        passwordInput.classList.remove('valid'); 
        passwordLabel.classList.add('invalid');
        passwordInput.classList.add('invalid');
        passwordInfo.innerHTML = `
            <p class='invalid'>Password must:</p>
            <ul>
                ${upperCase}
                ${lowerCase}
                ${specialCharNum}
                ${pswNum}
            <ul>
        `;
    }
};

// Validate confirm password
function checkSecondPassword(value, div) {
    let validSecPassword = validateSecPassword(value, div);
    let userSecPassword = value;

    if (validSecPassword) {
        showSecPasswordInfo(validSecPassword, div);
    } else {
        showSecPasswordInfo(validSecPassword, div);
    };
};

function validateSecPassword(password, div) {
    const mainPassword = div.previousSibling.previousSibling.querySelector('input').value;
    return password === mainPassword;
};

function showSecPasswordInfo(boolean, div, psw) {
    let secPasswordLabel = div.querySelector('label');
    let secPasswordInput = div.querySelector('#secpassword');
    let secPasswordInfo = div.querySelector('.conpsw_info');

    if (boolean) {
        // if email is valid
        secPasswordLabel.classList.remove('invalid');
        secPasswordInput.classList.remove('invalid');
        secPasswordLabel.classList.add('valid');
        secPasswordInput.classList.add('valid');
        secPasswordInfo.innerHTML = '';
        secPasswordLabel.innerHTML = `<span class='icon'>✅</span> Confirm Password`;
    } else {
        // if email is invalid
        secPasswordLabel.classList.remove('valid');
        secPasswordInput.classList.remove('valid'); 
        secPasswordLabel.classList.add('invalid');
        secPasswordInput.classList.add('invalid');
        secPasswordInfo.innerHTML = `
            <p class='invalid'>❌ Passwords must be identical</p>
        `;
    }
};