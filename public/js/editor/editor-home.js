document.querySelectorAll('#title').forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `./detail.html?`;
    });
});

// document.querySelectorAll('#accept-btn').forEach(item => {
//     item.addEventListener('click', (e) => {
//         $('#accept-overlay').css('display', 'block')
//         $('#background').css('display', 'block')
//     });
// });

// document.querySelectorAll('#reject-btn').forEach(item => {
//     item.addEventListener('click', (e) => {
//         $('#reject-overlay').css('display', 'block')
//         $('#background').css('display', 'block')
//     });
// });

// document.querySelectorAll('#save-btn').forEach(item => {
//     item.addEventListener('click', (e) => {
//         $('#accept-overlay').css('display', 'none')
//         $('#reject-overlay').css('display', 'none')
//         $('#background').css('display', 'none')
//     });
// });


// document.querySelectorAll('#cancel-btn').forEach(item => {
//     item.addEventListener('click', (e) => {
//         $('#accept-overlay').css('display', 'none')
//         $('#reject-overlay').css('display', 'none')
//         $('#background').css('display', 'none')
//     });
// });

$('#overlay-show').load('../../pages/shared/done-layout.html');
