
document.getElementById('forgot-pwd-text').addEventListener('click', () => {
    window.location.href = `./forgot-pwd`;
  });

document.getElementById('signup').addEventListener('click', () => {
  window.location.href = `signup`;
})

document.getElementById("home-icon").addEventListener('click', () => {
  // Make an AJAX request to the server
  fetch('/')
    .then(response => response.text())
    .then(html => {
      // Update the page content with the new HTML received from the server
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error('Error:', error);
    });
})