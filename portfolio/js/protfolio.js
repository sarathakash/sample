
$(document).ready(function(){
    "use strict";
   document.getElementById('m-icon').onclick=function(){
       document.getElementById('icon-menu').classList.toggle('fa-bars');
       document.getElementById('icon-menu').classList.toggle('fa-times');
        document.getElementsByClassName('menu-content')[0].classList.toggle("show");
    }
});