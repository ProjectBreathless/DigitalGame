$('.nav :not(nav-head-sub_item)').on('click', function(e) {
    console.log('Menu'); 
	if (!$('.game-wrap').hasClass("game_wrap_tilt")) {
		if(e.target !== e.currentTarget) return;
		$('.game_wrap').toggleClass("game_wrap_tilt"); //you can list several class names 
		  e.preventDefault();
	}
    });

$('.nav-head-sub_controls').on('click', function(e) {
	console.log('Conrols');
	$('.about').removeClass("tab-active");
    $('.controls').addClass("tab-active");
	
	$('.game_wrap').addClass("tab-lower");
	$('.game_wrap').removeClass("game_wrap_tilt");
    e.preventDefault();
	e.stopPropagation();
    });

$('.nav-head-sub_play').on('click', function(e) {
	console.log('Play');
	$('.controls').removeClass("tab-active");
	$('.about').removeClass("tab-active");
	  
	$('.game_wrap').removeClass("game_wrap_tilt");
	$('.game_wrap').removeClass("tab-lower");
    e.preventDefault();
	e.stopPropagation();
});


$('.nav-head-sub_about').on('click', function(e) {
	console.log('About');
	$('.controls').removeClass("tab-active");
    $('.about').addClass("tab-active");
	
	$('.game_wrap').addClass("tab-lower");
	$('.game_wrap').removeClass("game_wrap_tilt");
    e.preventDefault();
	e.stopPropagation();
});