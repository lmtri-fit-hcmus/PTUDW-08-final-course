
let fileUpload = document.getElementById('fileUpload');
let chosenImg = document.getElementById('chosen-img');

fileUpload.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(fileUpload.files[0]);
    console.log(fileUpload.files[0]);
    reader.onload = () => {
        chosenImg.setAttribute('src', reader.result);
        console.log(reader.result);
    }
}




function checkPasswordConfirm(formId) {
    let password = document.querySelector(`#${formId} [name=newPwd]`);
    let confirmPassword = document.querySelector(`#${formId} [name=confirmPwd]`);
    if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity('Password not match!');
        confirmPassword.reportValidity();
    }
    else {
        confirmPassword.setCustomValidity('');
    }
}
