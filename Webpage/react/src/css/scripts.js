/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function myFunction() {
	document.getElementById("myDropdown").classList.toggle("show");
}

/* When the user clicks on the dropdown list, 
go to the corresponding question and change the button text */
function gotoFunction() {
    document.getElementById("dropbtn").innerHTML="Question x of 5 ▼";
}

// Close the dropdown if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('#dropbtn')) {

    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

var dropdown = document.querySelectorAll('.dropdown-list'),
    dropdownArray = Array.prototype.slice.call(dropdown, 0);

dropdownArray.forEach(function(el) {
  var button = el.querySelector('a[dropdown-prop="title"]'),
      menu   = el.querySelector('.dropdown-list-items'),
      icon   = button.querySelector('i.dropdown-icon'),
     
      toggleDropdown = function() {
        classie.toggleClass(menu, 'dropdown-list-open');
        classie.toggleClass(icon, 'dropdown-icon-open');
      };
  
      button.addEventListener('click', toggleDropdown);
});
