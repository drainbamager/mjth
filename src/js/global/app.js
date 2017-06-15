Amplitude.init({
			"songs": [
				{
					"name": "Jubilee Song 1",
					"artist": "Jubilee Artist 1",
					"album": "Jubilee Album: A Golden Sunrise",
					"url": "songs/song1.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
				},
				{
					"name": "Jubilee Song 2",
					"artist": "Jubilee Artist 2",
					"album": "Jubilee Album: A Golden Sunrise",
					"url": "songs/song2.mp3",
					"cover_art_url": "https://521dimensions.com/img/open-source/amplitudejs/album-art/we-are-to-answer.jpg"
				}

			]
		});
$(document).ready(function(){
			adjustPlayerHeights();

			$(window).on('resize', function(){
				adjustPlayerHeights();
			});

			$('.bandcamp-link').on('click', function( e ){

				e.stopPropagation();
			});

			jQuery('.song').on('mouseover', function(){
				jQuery(this).css('background-color', '#00A0FF');
				jQuery(this).find('.song-meta-data .song-title').css('color', '#FFFFFF');
				jQuery(this).find('.song-meta-data .song-artist').css('color', '#FFFFFF');
				if( !jQuery(this).hasClass('amplitude-active-song-container') ){
					jQuery(this).find('.play-button-container').css('display', 'block');
				}
				jQuery(this).find('img.bandcamp-grey').css('display', 'none');
				jQuery(this).find('img.bandcamp-white').css('display', 'block');
				jQuery(this).find('.song-duration').css('color', '#FFFFFF');
			});

			jQuery('.song').on('mouseout', function(){
				jQuery(this).css('background-color', '#FFFFFF');
				jQuery(this).find('.song-meta-data .song-title').css('color', '#272726');
				jQuery(this).find('.song-meta-data .song-artist').css('color', '#607D8B');
				jQuery(this).find('.play-button-container').css('display', 'none');
				jQuery(this).find('img.bandcamp-grey').css('display', 'block');
				jQuery(this).find('img.bandcamp-white').css('display', 'none');
				jQuery(this).find('.song-duration').css('color', '#607D8B');
			});

			jQuery('.song').on('click', function(){
				jQuery(this).find('.play-button-container').css('display', 'none');
			});
		});

		function adjustPlayerHeights(){
			if( Foundation.MediaQuery.atLeast('medium') ) {
				$('#amplitude-right').css('max-height', $('#amplitude-left').height()+'px');
			}else{
				$('#amplitude-right').css('max-height', 'initial' );
			}
		}