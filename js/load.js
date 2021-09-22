// jQuery
const $openModalButtons = $('#open-modal');
const $closeModalButtons = $('#close-modal');
const $overlay = $('#overlay');

$openModalButtons.on('click', () => {
  $('.modal').addClass('active');
  $overlay.addClass('active');

})

$closeModalButtons.on('click', () => {
  $('.modal').removeClass('active');
  $overlay.removeClass('active');
})



