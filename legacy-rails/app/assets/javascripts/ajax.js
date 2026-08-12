$(document).ready(function(){

	$('#newsuppform').submit(function(){
		$.post($(this).attr('action'),
		 $(this).serialize(),
		  function(data){
			},
		'json')
		return false
	});

	$('#newwishform').submit(function(){
		$.post($(this).attr('action'),
		 $(this).serialize(),
		  function(data){
		  	 },
		  "json")
		return false
	})
})
