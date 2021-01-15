//DO POPRAWY
function validateForm() {
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const specializationInput = document.getElementById('specialization');
    const dataZatrudnieniaInput = document.getElementById('dateHire');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorSpecialization = document.getElementById('errorSpecialization');
    const errorDataZatrudnienia = document.getElementById('errorDataZatrudnienia');

    const errorSummary = document.getElementById('errorsSummary')

    resetErrors([firstNameInput, lastNameInput, specializationInput, dataZatrudnieniaInput], [errorFirstName, errorLastName, errorSpecialization, errorDataZatrudnienia], errorSummary);

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

    // Walidacja dla pola "Specjalizacja"
    if (!checkRequired(specializationInput.value)) {
        valid = false;
        specializationInput.classList.add("error-input");
        errorSpecialization.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(specializationInput.value, 2, 60)) {
        valid = false;
        specializationInput.classList.add("error-input");
        errorLastName.innerText = "Pole powinno zawierać od 2 do 60 znaków";
    }

    // Walidacja dla pola "Data zatrudnienia"
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataZatrudnieniaInput.value)) {
        valid = false;
        dataZatrudnieniaInput.classList.add("error-input");
        errorDataZatrudnienia.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataZatrudnieniaInput.value)) {
        valid = false;
        dataZatrudnieniaInput.classList.add("error-input");
        errorDataZatrudnienia.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dataZatrudnieniaInput.value, nowString)) {
        valid = false;
        dataZatrudnieniaInput.classList.add("error-input");
        errorDataZatrudnienia.innerText = "Data nie może być z przyszłości";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}