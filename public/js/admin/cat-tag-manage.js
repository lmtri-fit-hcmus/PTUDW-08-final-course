document.addEventListener('DOMContentLoaded',()=>{
    // Get a reference to the div element you want to add the HTML to
    var parentDivs = document.getElementsByClassName('user');
    var parentDivsArray = Array.from(parentDivs);
    parentDivsArray.forEach(function(parentDiv) {
         // Create a new XMLHttpRequest object
        var xhr = new XMLHttpRequest();

        // Set the URL of the file you want to load
        xhr.open('GET', '../../pages/admin/user-detail.html');

        // Set the response type to 'text'
        xhr.responseType = 'text';

        // Add an event listener to handle the response
        xhr.addEventListener('load', function() {
        // Create a new div element
        var newDiv = document.createElement('div');

        // Set the innerHTML of the div to the contents of the file
        newDiv.innerHTML = xhr.response;

        // Add the new div to the parent div
        parentDiv.appendChild(newDiv);
        });

        // Send the request
        xhr.send();
      });
    
});

document.getElementById("admin-profile").addEventListener('click', ()=>{
    window.location.href = '../admin/profile.html';
})

//hanldle sign out
document.getElementById('signout-btn').addEventListener('click', function() {
    // Clear any state of the previous page here
    localStorage.clear(); // Clear local storage
    sessionStorage.clear(); // Clear session storage
    window.location.href = '../authentication/login.html';
  });

document.getElementById('tag-option').addEventListener('click', () => {
    document.getElementById('tag-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> Tag"
    document.getElementById('tag-option').style.color = "#357C4D"
    document.getElementById('cate-option').innerHTML = "Category"
    document.getElementById('cate-option').style.color = "black"
    document.getElementById("tag").style.display = "block"
    document.getElementById("cate").style.display = "none"
})

document.getElementById('cate-option').addEventListener('click', () => {
    document.getElementById('cate-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> Category"
    document.getElementById('cate-option').style.color = "#357C4D"
    document.getElementById('tag-option').innerHTML = "Tag"
    document.getElementById('tag-option').style.color = "black"
    document.getElementById("cate").style.display = "block"
    document.getElementById("tag").style.display = "none"
})

document.getElementById('view-list-option').addEventListener('click', () => {
    document.getElementById('view-list-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> List paper"
    document.getElementById('view-list-option').style.color = "#357C4D"
    document.getElementById('list-pending-option').innerHTML = "Pending review"
    document.getElementById('list-pending-option').style.color = "black"
    document.getElementById("view-list").style.display = "block"
    document.getElementById("list-pending").style.display = "none"
})

document.getElementById('list-pending-option').addEventListener('click', () => {
    document.getElementById('list-pending-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> Pending review"
    document.getElementById('list-pending-option').style.color = "#357C4D"
    document.getElementById('view-list-option').innerHTML = "List paper"
    document.getElementById('view-list-option').style.color = "black"
    document.getElementById("list-pending").style.display = "block"
    document.getElementById("view-list").style.display = "none"
})

document.getElementById('list-user-option').addEventListener('click', () => {
    document.getElementById('list-user-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> List user"
    document.getElementById('list-user-option').style.color = "#357C4D"
    document.getElementById('assign-cat-option').innerHTML = "Assign category"
    document.getElementById('assign-cat-option').style.color = "black"
    document.getElementById('renew-acc-option').innerHTML = "Renew account"
    document.getElementById('renew-acc-option').style.color = "black"
    document.getElementById("list-user").style.display = "block"
    document.getElementById("assign-cat").style.display = "none"
    document.getElementById("renew-acc").style.display = "none"
})

document.getElementById('assign-cat-option').addEventListener('click', () => {
    document.getElementById('assign-cat-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> Assign category"
    document.getElementById('assign-cat-option').style.color = "#357C4D"
    document.getElementById('list-user-option').innerHTML = "List user"
    document.getElementById('list-user-option').style.color = "black"
    document.getElementById('renew-acc-option').innerHTML = "Renew account"
    document.getElementById('renew-acc-option').style.color = "black"
    document.getElementById("list-user").style.display = "none"
    document.getElementById("assign-cat").style.display = "block"
    document.getElementById("renew-acc").style.display = "none"
})

document.getElementById('renew-acc-option').addEventListener('click', () => {
    document.getElementById('renew-acc-option').innerHTML = "<i class='fa-solid fa-caret-right' style='color: #21ab51;'></i> Renew account"
    document.getElementById('renew-acc-option').style.color = "#357C4D"
    document.getElementById('list-user-option').innerHTML = "List user"
    document.getElementById('list-user-option').style.color = "black"
    document.getElementById('assign-cat-option').innerHTML = "Asign category"
    document.getElementById('assign-cat-option').style.color = "black"
    document.getElementById("list-user").style.display = "none"
    document.getElementById("assign-cat").style.display = "none"
    document.getElementById("renew-acc").style.display = "block"
})



document.getElementById('btn-paper-management').addEventListener('click', () => {
    const elements = Array.from(document.getElementsByClassName("nav-option"));
    elements.forEach((element) => {
        element.style.backgroundColor = "#212529";
        element.style.color = "white";
    });
    document.getElementById('btn-paper-management').style.backgroundColor = "#357C4D"
    document.getElementById('cat-tag-management').style.display = "none";
    document.getElementById('role-management').style.display = "none";
    document.getElementById('paper-management').style.display = "flex";
})

document.getElementById('btn-role-management').addEventListener('click', () => {
    const elements = Array.from(document.getElementsByClassName("nav-option"));
    elements.forEach((element) => {
        element.style.backgroundColor = "#212529";
        element.style.color = "white";
    });
    document.getElementById('btn-role-management').style.backgroundColor = "#357C4D"
    document.getElementById('cat-tag-management').style.display = "none";
    document.getElementById('role-management').style.display = "flex";
    document.getElementById('paper-management').style.display = "none";
})

document.getElementById('btn-home').addEventListener('click', () => {
    const elements = Array.from(document.getElementsByClassName("nav-option"));
    elements.forEach((element) => {
        element.style.backgroundColor = "#212529";
        element.style.color = "white";
    });
    document.getElementById('btn-home').style.backgroundColor = "#357C4D"
    document.getElementById('cat-tag-management').style.display = "flex";
    document.getElementById('role-management').style.display = "none";
    document.getElementById('paper-management').style.display = "none";
})

document.getElementById("cat-name").addEventListener('input', () => {
    document.getElementById("category-demo-field").innerHTML = document.getElementById("cat-name").value;
    document.getElementById("category-demo-field").style.backgroundColor = document.getElementById("cat-color").value;
    document.getElementById("category-demo-field").style.color = "white"
})

document.getElementById("cat-name-add").addEventListener('input', () => {
    document.getElementById("category-demo-field1").innerHTML = document.getElementById("cat-name-add").value;
    document.getElementById("category-demo-field1").style.backgroundColor = document.getElementById("cat-color").value;
    document.getElementById("category-demo-field1").style.color = "white"
})

document.getElementById("cat-color").addEventListener('input', () => {
    document.getElementById("category-demo-field").innerHTML = document.getElementById("cat-name").value;
    document.getElementById("category-demo-field").style.backgroundColor = document.getElementById("cat-color").value;
    document.getElementById("category-demo-field").style.color = "white"
})

document.getElementById("cat-color-add").addEventListener('input', () => {
    document.getElementById("category-demo-field1").innerHTML = document.getElementById("cat-name-add").value;
    document.getElementById("category-demo-field1").style.backgroundColor = document.getElementById("cat-color").value;
    document.getElementById("category-demo-field1").style.color = "white"
})

document.getElementById("tag-name").addEventListener('input', () => {
    document.getElementById("tag-demo-field").innerHTML = "#" + document.getElementById("tag-name").value;
})

document.getElementById("tag-name-add").addEventListener('input', () => {
    document.getElementById("tag-demo-field1").innerHTML = "#" + document.getElementById("tag-name-add").value;
})
$(document).ready(function() {
    $('.dropdown-item').click(function() {
      var selectedValue = $(this).data('value');
      $('#assign-cat-btn').text(selectedValue);
    });
  });


document.getElementById('renew-btn').addEventListener('click', () => {

    $('#overlay-show').css('display', 'block')
    // Set a 3-second delay
    setTimeout(function() {
        $('#overlay-show').css('display', 'none')
        // Submit the form
        document.querySelector('#reset-form').submit();
    }, 1000);
    document.getElementById("renew-btn").style.display = "none"
    document.getElementById("tmp-expire-day").innerHTML = "Expire in 7 days"
});
document.querySelectorAll('.title').forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `./detail.html?`;
    });
});
document.querySelectorAll('.review-title').forEach(item => {
    item.addEventListener('click', (e) => {
        window.location.href = `./review.html?`;
    });
});
$('#overlay-show').load('../../pages/shared/done-layout.html');
$(".user-detail").load('../../pages/admin/user-detail.html')

//agriculture