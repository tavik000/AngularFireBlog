'use strict';

console.clear();

var dee = document.getElementById('waddleDee');
var deeBottom = dee.getBoundingClientRect().height + dee.getBoundingClientRect().top;
var ground = document.getElementById('ground');
var groundPos = ground.getBoundingClientRect().top + window.pageYOffset;
var offset = 50; // px on the ground

window.addEventListener('scroll', handleScroll);

function handleScroll() {
	var pos = window.pageYOffset;

	if (pos > groundPos - deeBottom + offset) {
		if (!dee.classList.contains('is-sitting')) {
			dee.classList.add('is-sitting');
			dee.style.top = pos + dee.getBoundingClientRect().height + offset * 2 + 'px';
		}
	} else {
		dee.classList.remove('is-sitting');
		dee.style.top = null;
	}
}

// Blog App

// $(document).ready(function(){
//     $(".dropdown-toggle").hover(function(){
//         $("dropdown-menu").show();
//     });
//     // $("#show").click(function(){
//     //     $("p").show();
//     // });
// });
