document.querySelectorAll('#title').forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `./detail.html?`;
    });
});

// document.getElementById('save-btn').addEventListener('click', () => {
//     // Disable the submit button to prevent multiple submissions
//     $('#overlay-show').css('display', 'block')
//     // Set a 3-second delay
//     setTimeout(function () {
//         $('#overlay-show').css('display', 'none')
//         // Submit the form
//     }, 1000);

// });


// document.getElementById('confirm-btn').addEventListener('click', () => {
//     // Disable the submit button to prevent multiple submissions
//     $('#overlay-show').css('display', 'block')
//     // Set a 3-second delay
//     setTimeout(function () {
//         $('#overlay-show').css('display', 'none')
//         // Submit the form
//     }, 1000);

// });

// $('#overlay-show').load('../../pages/shared/done-layout.html');



// document.getElementById('profile-item').addEventListener('click', () => {
//     document.getElementById('profile-item').innerHTML = "<i class='fa-solid fa-caret-right' style='color:#357C4D;'></i> Profile"
//     document.getElementById('profile-item').style.color = "#357C4D"
//     document.getElementById('change-pwd-item').innerHTML = "Change Password"
//     document.getElementById('change-pwd-item').style.color = "black"
//     document.getElementById("profile").style.display = "block"
//     document.getElementById("change-pwd").style.display = "none"
// })




// document.getElementById('change-pwd-item').addEventListener('click', () => {
//     document.getElementById('change-pwd-item').innerHTML = "<i class='fa-solid fa-caret-right' style='color:#357C4D;'></i> Change Password"
//     document.getElementById('change-pwd-item').style.color = "#357C4D"
//     document.getElementById('profile-item').innerHTML = "Profile"
//     document.getElementById('profile-item').style.color = "black"
//     document.getElementById("change-pwd").style.display = "block"
//     document.getElementById("profile").style.display = "none"
// })

// function validatePassword() {
//     let password = document.getElementById('new-pwd');
//     let confirmPassword = document.getElementById('confirm-pwd');
//     if (password.value != confirmPassword.value) {
//         confirmPassword.setCustomValidity('Password must match');
//         confirmPassword.reportValidity();
//     }
//     else {
//         confirmPassword.setCustomValidity('');
//     }
// }




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

