
document.getElementById('reset-form-btn').addEventListener('click', () => {
    // Disable the submit button to prevent multiple submissions
    document.querySelector('button').disabled = true;
    $('#overlay-show').css('display', 'block')
    // Set a 3-second delay
    setTimeout(function() {
      $('#overlay-show').css('display', 'none')
      // Submit the form
       document.querySelector('#reset-form').submit();
       window.location.href = `./login.html`;
    }, 1000);
    
  });
  document.getElementById("home-icon").addEventListener('click', () => {
    window.location.href = '/';
  })
  $('#overlay-show').load('../../pages/shared/done-layout.html');