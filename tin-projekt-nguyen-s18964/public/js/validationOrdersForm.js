function validateForm() {
    const klientInput = document.getElementById('client');
    const serwisantInput = document.getElementById('serviceTechnician');
    const opisInput = document.getElementById('opis');
    const dataZleceniaInput = document.getElementById('dataZlecenia');
    const kosztInput = document.getElementById('koszt');

    const errorKlient = document.getElementById('errorKlient');
    const errorSerwisant = document.getElementById('errorSerwisant');
    const errorOpis = document.getElementById('errorOpis');
    const errorDataZlecenia = document.getElementById('errorDataZlecenia');
    const errorKoszt = document.getElementById('errorKoszt');

    const errorSummary = document.getElementById('errorsSummary')

    resetErrors([klientInput, serwisantInput, opisInput, dataZleceniaInput, kosztInput], [errorKlient, errorSerwisant, errorOpis, errorDataZlecenia, errorKoszt], errorSummary);

    let valid = true;

    // Walidacja dla pola "Klient"
    if (!checkRequired(klientInput.value)) {
        valid = false;
        klientInput.classList.add("error-input");
        errorKlient.innerText = "Pole jest wymagane";
    }

    // Walidacja dla pola "Serwisant"
    if (!checkRequired(serwisantInput.value)) {
        valid = false;
        serwisantInput.classList.add("error-input");
        errorSerwisant.innerText = "Pole jest wymagane";
    }

    // Walidacja dla pola "Opis"
    if (!checkRequired(opisInput.value)) {
        valid = false;
        opisInput.classList.add("error-input");
        errorOpis.innerText = "Pole jest wymagane";
    } else if (!checkTextLengthRange(opisInput.value, 2, 150)) {
        valid = false;
        opisInput.classList.add("error-input");
        errorOpis.innerText = "Pole powinno zawierać od 2 do 150 znaków";
    }

    // Walidacja dla pola "Data zlecenia"
    let nowDate = new Date(),
        month = '' + (nowDate.getMonth() + 1),
        day = '' + nowDate.getDate(),
        year = nowDate.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    const nowString = [year, month, day].join('-');

    if (!checkRequired(dataZleceniaInput.value)) {
        valid = false;
        dataZleceniaInput.classList.add("error-input");
        errorDataZlecenia.innerText = "Pole jest wymagane";
    } else if (!checkDate(dataZleceniaInput.value)) {
        valid = false;
        dataZleceniaInput.classList.add("error-input");
        errorDataZlecenia.innerText = "Pole powinno zawierać datę w formacie yyyy-MM-dd (np. 2000-01-01)";
    } else if (checkDateIfAfter(dataZleceniaInput.value, nowString)) {
        valid = false;
        dataZleceniaInput.classList.add("error-input");
        errorDataZlecenia.innerText = "Data nie może być z przyszłości";
    } else if (checkNumber(kosztInput)) {
        valid = false;
        kosztInput.classList.add("error-input");
        errorKoszt.innerText = "Pole powinno być liczbą";
    }

    if (!valid) {
        errorsSummary.innerText = "Formularz zawiera błędy";
    }

    return valid;
}