function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const emailInput = document.getElementById('email');
    const telefonInput = document.getElementById('telefon');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorEmail = document.getElementById('errorEmail');
    const errorTelefon = document.getElementById('errorTelefon');

    const errorSummary = document.getElementById('errorsSummary')

    resetErrors([firstNameInput, lastNameInput, emailInput, telefonInput], [errorFirstName, errorLastName, errorEmail, errorTelefon], errorSummary);

    let valid = true;

    // Walidacja dla pola "Imię"
    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(firstNameInput.value, 2, 60)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // Walidacja dla pola "Nazwisko"
    if (!checkRequired(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(lastNameInput.value, 2, 60)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // Walidacja dla pola "Email"
    if (!checkRequired(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(emailInput.value, 5, 60)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać od 5 do 60 znaków";
    } else if (!checkEmail(emailInput.value)) {
        valid = false;
        emailInput.classList.add("error-input");
        errorEmail.innerText = "Pole powinno zawierać prawidłowy adres email";
    }

    // Walidacja dla pola "Telefon"
    if (!checkRequired(telefonInput.value)) {
        valid = false;
        telefonInput.classList.add("error-input");
        errorTelefon.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(telefonInput.value, 9, 12)) {
        valid = false;
        telefonInput.classList.add("error-input");
        errorTelefon.innerText = "Pole powinno zawierać od 9 do 12 znaków";
    } else if (!checkTelefon(telefonInput.value)) {
        valid = false;
        telefonInput.classList.add("error-input");
        errorTelefon.innerText = "Pole powinno zawierać prawidłowy format numeru telefonu";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}