/*!
 * Metal Gear Solid Codec.
 * (c) 2013 Chris Tabor <dxdstudio@gmail.com>
 * See license for more information
 * <3
 * https://github.com/christabor/metal-gear-codec/
 */

function initMgsCodec(options) {
	var defaults = {
		interval_speed: 300,
		animation_timeout: 1500,
		transcription: '.transcription p'
	};

	var opts = Object.assign({}, defaults, options);

	var codecEl = document.getElementById('mgs-codec');
	if (!codecEl) return;
	var notesEls = codecEl.querySelectorAll(opts.transcription);
var imgEls = codecEl.querySelectorAll('img.img-left, img.img-right');
	var volumeIndicator = codecEl.querySelector('#svg-volume-indicator-total');
	var current_note = 0;
	var max_volume = volumeIndicator ? volumeIndicator.offsetHeight : 0;

	notesEls.forEach(function(note) {
		note.style.opacity = '0';
		note.style.display = 'none';
	});

	imgEls.forEach(function(img) {
		img.style.opacity = '0';
		img.style.display = 'none';
	});

	function fadeIn(elem, duration) {
		elem.style.display = 'block';
		var opacity = 0;
		var start = Date.now();
		var interval = setInterval(function() {
			var elapsed = Date.now() - start;
			opacity = Math.min(elapsed / duration, 1);
			elem.style.opacity = opacity;
			if (opacity === 1) clearInterval(interval);
		}, 10);
	}

	function fadeOut(elem, duration) {
		var opacity = 1;
		var start = Date.now();
		var interval = setInterval(function() {
			var elapsed = Date.now() - start;
			opacity = Math.max(1 - (elapsed / duration), 0);
			elem.style.opacity = opacity;
			if (opacity === 0) {
				elem.style.display = 'none';
				clearInterval(interval);
			}
		}, 10);
	}

	function triggerClick() {
		// advance dialogue to next note
		if (current_note < notesEls.length) {
			fadeIn(notesEls[current_note], 200);

			// hide previous notes
			for (var i = 0; i < current_note; i++) {
				fadeOut(notesEls[i], 100);
			}

			// increment forward
			current_note += 1;
		}
	}

	function animateCodecBar() {
		// randomize the height of the bar to simulate volume
		volumeIndicator.style.height = (Math.random() * max_volume) + 'px';
	}

	function init() {
		// Fade in all images
		imgEls.forEach(function(img) {
			fadeIn(img, 400);
		});

		// show first note
		if (notesEls.length > 0) {
			fadeIn(notesEls[0], 200);
			current_note = 1;
		}

		// Add click listener
		codecEl.addEventListener('click', triggerClick);

		// Start animating the volume indicator
		setTimeout(function(){
			setInterval(animateCodecBar, opts.interval_speed);
		}, opts.animation_timeout);
	}

	// Start with fade in effect
	var initialOpacity = 0;
	var start2 = Date.now();
	var interval2 = setInterval(function() {
		var elapsed = Date.now() - start2;
		initialOpacity = Math.min(elapsed / 200, 1);
		codecEl.style.opacity = initialOpacity;
		if (initialOpacity >= 1) {
			clearInterval(interval2);
			setTimeout(init, 50);
		}
	}, 10);
}
