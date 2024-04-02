


// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {

	const url = document.getElementById('url').value;
	const form = document.getElementById('generateForm');
	const urlInput = document.getElementById('url');
	const qrcodeContainer = document.getElementById('card');

	form.addEventListener('submit', function (event) {

		// TODO: Handle QR Codes with add and remove elements instead of clearing

		// Prevent the form from submitting and refreshing the page
		event.preventDefault();

		const url = urlInput.value.trim();
		const formattedUrl = formatUrl(url);

		if (qrcodeContainer.innerHTML != '') {
			console.log('QR not Empty, resetting now');

			// Clear existing QR code
			qrcodeContainer.innerHTML = '';
		}
		// calculates the relative size of the qr code in the container
		const size = Math.min(qrcodeContainer.offsetWidth, qrcodeContainer.offsetHeight);

		const qrcode = new QRCode(qrcodeContainer, {
			text: formattedUrl,
			width: size,
			height: size,
		});
		console.log('New QR Generated');
	});
});

function formatUrl(url) {

	// Check if the URL starts with http://, https://, or www.
	if (!url.match(/^(https?:\/\/|www\.)/i)) {
		alert('Please enter a valid URL starting with http://, https://, or www.');
		return '';
	}
	// If the URL doesn't start with http:// or https://, add http:// by default
	else if (!url.match(/^https?:\/\//i)) {
		// Check if the URL starts with www.
		if (!url.match(/^www\./i)) {
			// If not, add www. by default
			url = 'www.' + url;
		}
		return 'http://' + url;
	}

	return url;
}
