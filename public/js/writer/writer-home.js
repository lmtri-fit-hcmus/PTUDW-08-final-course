document.querySelectorAll('#title').forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `./detail.html?`;
    });
});



document.querySelectorAll('#edit-btn').forEach(item => {
    item.addEventListener('click', (e) => {
        $('#edit-form').css('display', 'block')
        $('#background').css('display', 'block')
    });
});


document.querySelectorAll('#save-btn').forEach(item => {
    item.addEventListener('click', (e) => {
        $('#edit-form').css('display', 'none')
        $('#background').css('display', 'none')
    });
});

document.querySelectorAll('#edit-btn1').forEach(item => {
    item.addEventListener('click', (e) => {
        $('#edit-form1').css('display', 'block')
        $('#background').css('display', 'block')
    });
});


document.querySelectorAll('#save-btn').forEach(item => {
    item.addEventListener('click', (e) => {
        $('#edit-form1').css('display', 'none')
        $('#background').css('display', 'none')
    });
});


document.querySelectorAll('#delete-btn').forEach(item => {
    item.addEventListener('click', (e) => {
        e.target.parentNode.parentNode.parentNode.remove();

    });
});






// document.getElementById('create-new-post-item').addEventListener('click', () => {
//     document.getElementById('create-new-post-item').style.color = "#357C4D"
//     document.getElementById("create-new-post").style.display = "block"

//     document.getElementById('my-paper-item').style.color = "black"
//     document.getElementById("my-paper-body").style.display = "none"

//     document.getElementById("published").style.display = "none"
//     document.getElementById("accepted").style.display = "none"
//     document.getElementById("rejected").style.display = "none"
//     document.getElementById("submited").style.display = "none"
// })

// document.getElementById('my-paper-item').addEventListener('click', () => {
//     document.getElementById("my-paper-body").style.display = "block"

//     document.getElementById('create-new-post-item').style.color = "black"
//     document.getElementById('create-new-post').style.display = "none"

//     document.getElementById('published-item').style.color = "#357C4D"
//     document.getElementById("accepted-item").style.color = "black"
//     document.getElementById("rejected-item").style.color = "black"
//     document.getElementById("submited-item").style.color = "black"

//     document.getElementById("published").style.display = "block"
//     document.getElementById("accepted").style.display = "none"
//     document.getElementById("rejected").style.display = "none"
//     document.getElementById("submited").style.display = "none"
// })


// document.getElementById('published-item').addEventListener('click', () => {
//     document.getElementById("my-paper-body").style.display = "block"

//     document.getElementById('create-new-post-item').style.color = "black"

//     document.getElementById('published-item').style.color = "#357C4D"
//     document.getElementById("accepted-item").style.color = "black"
//     document.getElementById("rejected-item").style.color = "black"
//     document.getElementById("submited-item").style.color = "black"

//     document.getElementById("published").style.display = "block"
//     document.getElementById("accepted").style.display = "none"
//     document.getElementById("rejected").style.display = "none"
//     document.getElementById("submited").style.display = "none"
// })


// document.getElementById('accepted-item').addEventListener('click', () => {
//     document.getElementById("my-paper-body").style.display = "block"

//     document.getElementById('create-new-post-item').style.color = "black"

//     document.getElementById('published-item').style.color = "black"
//     document.getElementById("accepted-item").style.color = "#357C4D"
//     document.getElementById("rejected-item").style.color = "black"
//     document.getElementById("submited-item").style.color = "black"

//     document.getElementById("published").style.display = "none"
//     document.getElementById("accepted").style.display = "block"
//     document.getElementById("rejected").style.display = "none"
//     document.getElementById("submited").style.display = "none"
// })

// document.getElementById('rejected-item').addEventListener('click', () => {
//     document.getElementById("my-paper-body").style.display = "block"
//     document.getElementById('create-new-post-item').style.color = "black"

//     document.getElementById('published-item').style.color = "black"
//     document.getElementById("accepted-item").style.color = "black"
//     document.getElementById("rejected-item").style.color = "#357C4D"
//     document.getElementById("submited-item").style.color = "black"

//     document.getElementById("published").style.display = "none"
//     document.getElementById("accepted").style.display = "none"
//     document.getElementById("rejected").style.display = "block"
//     document.getElementById("submited").style.display = "none"
// })


// document.getElementById('submited-item').addEventListener('click', () => {
//     document.getElementById("my-paper-body").style.display = "block"
//     document.getElementById('create-new-post-item').style.color = "black"

//     document.getElementById('published-item').style.color = "black"
//     document.getElementById("accepted-item").style.color = "black"
//     document.getElementById("rejected-item").style.color = "black"
//     document.getElementById("submited-item").style.color = "#357C4D"

//     document.getElementById("published").style.display = "none"
//     document.getElementById("accepted").style.display = "none"
//     document.getElementById("rejected").style.display = "none"
//     document.getElementById("submited").style.display = "block"
// })


let fileUploadPaper = document.getElementById('fileUploadPaper');
let chosenImgPaper = document.getElementById('chosen-img-paper');

fileUploadPaper.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(fileUploadPaper.files[0]);
    console.log(fileUploadPaper.files[0]);
    reader.onload = () => {
        chosenImgPaper.setAttribute('src', reader.result);
        console.log(reader.result);
    }
}
