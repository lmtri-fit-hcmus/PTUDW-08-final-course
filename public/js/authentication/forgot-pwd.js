const getEmailBtn = document.getElementById('set-email');
const form = document.getElementById('form2');

getEmailBtn.addEventListener('click', () => {
    var email = document.getElementById('email').value
    document.getElementById('form1').style.display = 'none' 
    document.getElementById('mail').value = email
    document.getElementById('form2').style.display = 'block'
});

form.addEventListener('submit', () => {
    event.preventDefault();
    const email = document.getElementById('mail').value;
    const code = document.getElementById('code').value;
    window.location.href = `./reset-pwd.html?name=${email}&code=${code}`;
  });
document.getElementById("home-icon").addEventListener('click', () => {
    window.location.href = '/';
  })