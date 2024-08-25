function calculateAge() {
    const dobInput = document.getElementById('dob');
    const dob = dobInput.value;
    const errorDiv = document.getElementById('error');
    const resultDiv = document.getElementById('result');

    // Reset error and result messages
    errorDiv && errorDiv.remove();
    resultDiv.innerText = '';

    if (!dob) {
        showError('Enter a valid date of birth.');
        return;
    }

    const dobDate = new Date(dob);
    const now = new Date();

    // Validate that the date is not in the future
    if (dobDate > now) {
        showError('date of birth cannot be calculated.');
        return;
    }

    let ageYears = now.getFullYear() - dobDate.getFullYear();
    let ageMonths = now.getMonth() - dobDate.getMonth();
    let ageDays = now.getDate() - dobDate.getDate();

    if (ageDays < 0) {
        ageMonths--;
        ageDays += new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    }

    if (ageMonths < 0) {
        ageYears--;
        ageMonths += 12;
    }

    if (ageYears === 0 && ageMonths > 0) {
        resultDiv.innerText = `You are ${ageMonths} months and ${ageDays} days old.`;
    } else if (ageYears === 0 && ageMonths === 0 && ageDays > 0) {
        resultDiv.innerText = `You are ${ageDays} days old.`;
    } else if (ageYears > 0) {
        resultDiv.innerText = `You are ${ageYears} years, ${ageMonths} months, and ${ageDays} days old.`;
    } else {
        resultDiv.innerText = 'You are less than a day old.';
    }

    function showError(message) {
        const errorElement = document.createElement('div');
        errorElement.id = 'error';
        errorElement.innerText = message;
        dobInput.parentNode.insertBefore(errorElement, dobInput.nextSibling);
    }
}
