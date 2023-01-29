const button = document.querySelector('.item-for-button')
const modalList = document.querySelector('.offcanvas-body')
const buttonbuy = document.querySelector('.modal-button-buy')


button.addEventListener('click', 
function () {
		const productInfo = {
			imgSrc: document.querySelector('.item-photo').getAttribute('src'),
			title: document.querySelector('.item-title').innerText,
			brand: document.querySelector('.item-brand').innerText,
			priceafter: document.querySelector('.for-item-card-price-after').innerText,
			pricebefore: document.querySelector('.for-item-price-before').innerText,
		};
			const cartItemHTML = `<div class="modal-back">
<img src="${productInfo.imgSrc}" alt="${productInfo.title}" class="modal-img">
<h2 class="modal-title">${productInfo.title}</h2>
<p class="modal-price"><span class="modal-price-after">${productInfo.priceafter}</span><span class="modal-price-before">${productInfo.pricebefore}</span></p>
</div>`;
			modalList.insertAdjacentHTML('beforeend', cartItemHTML);
		toggleCartStatus();
		calcCartPriceAndDelivery();

	}
);

buttonbuy.addEventListener('click', function(){

	var stripe = Stripe('sk_test_51MUpMtBSPJRhNXeRAihpxIhap30rWU0au3uK89Ea2idcAs6dD81cB8k4V66N8s4Ajq83GFSXmhPtE3ukMjQWDUNI00gOwsi9S3');
	var elements = stripe.elements();
	var cardNumber = elements.create('cardNumber');
	cardNumber.mount('#card-number');
	var cardExpiry = elements.create('cardExpiry');
	cardExpiry.mount('#card-expiry');
	var cardCvc = elements.create('cardCvc');
	cardCvc.mount('#card-cvc');
  
	var form = document.getElementById('payment-form');
	form.addEventListener('submit', function(event) {
	  event.preventDefault();
  
	  stripe.createToken(cardNumber).then(function(result) {
		if (result.error) {
		  // Inform the customer that there was an error
		  console.log(result.error.message);
		} else {
		  // Send the token to your server
		  stripeTokenHandler(result.token);
		}
	  });
	});
  
	function stripeTokenHandler(token) {
	  // Insert the token ID into the form so it gets submitted to the server
	  var form = document.getElementById('payment-form');
	  var hiddenInput = document.createElement('input');
	  hiddenInput.setAttribute('type', 'hidden');
	  hiddenInput.setAttribute('name', 'stripeToken');
	  hiddenInput.setAttribute('value', token.id);
	  form.appendChild(hiddenInput);
  
	  // Submit the form
	  form.submit();
	}








	
})
