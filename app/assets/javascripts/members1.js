
//FUNCTIONS GO UP HERE
//FUNCTION SECTION
//function for the carousel pictures
function carousel(id) {
	var bgimgs = [ 'http://www.bubblews.com/assets/images/news/521013543_1385596410.jpg', 'http://www.adogsdayout.com/wp-content/uploads/2012/07/Dogs1.jpg', 'http://pixabay.com/get/b1a161cc546e46018c9a/1395257917/dog-190056_1280.jpg?direct'];
	var color = bgimgs[id];
	var count = 3;
	$('.my_carousel')
	$('.my_carousel').css("background", 'url('+color+') center no-repeat');
	id = id + 1;
	if(id==count) id = 0;
	

	setTimeout('carousel('+id+')', 10000 );
}
	
function readURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#img_prev').attr('src', e.target.result).width(200).height(200);
		};
		reader.readAsDataURL(input.files[0]);
	}

}
function readwishURL(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			$('#img_preview').attr('src', e.target.result).width(200).height(200);
		};
		reader.readAsDataURL(input.files[0]);
	}

}

//END FUNCTION SECTION

$(document).ready(function() {
		carousel(0);


		//for the parallax display
	    $('section[data-type="background"]').each(function(){
	    	var $bgobj = $(this); // assigning the object
	 		$(window).scroll(function() {
				var yPos = -($(window).scrollTop() / $bgobj.data('speed')); 
 
				   // Put together our final background position
	            var coords = '50% '+ yPos + 'px';
	 
	            // Move the background
	            $bgobj.css({ backgroundPosition: coords });
				});
		});

	    //for the supply buttons
		//$('#supplies').hide();
		$('#supply').click(function(){
			$('#supplylist').css('background', 'rgba(255, 255, 250, 0.5)');
		});
		//$('#hidesupplies').click(function(){
		//	$('#supplies').fadeOut();
		//}); 

		//fer the wishes table
		//$('#wishes').hide();
		$('#wishes').click(function(){
			$('#wishlist').css('background', 'rgba(255, 255, 250, 0.5');
		});
		//$('#hidewishes').click(function(){
	//		$('#wishes').fadeOut();
	//	});

		//for the navbar
		$('.dropdown-toggle').dropdown();

		$('#endertab').removeClass('.active');

		$('#newwish').hide();

		$('#show_wish').click(function(){
			$('#newwish').slideDown();
		});

		$('#close_wish').click(function(){
			$('#newwish').slideUp();
		});

		$('#newsupply').hide();

		$('#show_supply').click(function(){
			$('#newsupply').slideDown();
		});

		$('#close_supply').click(function(){
			$('#newsupply').slideUp();
		});

		
});
// When the DOM is ready, run this function
$(document).ready(function() {
  //Set the carousel options
  $('#quote-carousel').carousel({
    pause: true,
    interval: 4000,
  });
});