// jQuery version

const $openModalButtons = $('#open-modal');
const $closeModalButtons = $('#close-modal');
const $openBoardButtons = $('#open-board');
const $closeBoardButtons = $('#close-board');
const $overlay = $('#overlay');

$openModalButtons.on('click', () => {
  $('.modal').addClass('active');
  $overlay.addClass('active');

})

$closeModalButtons.on('click', () => {
   $('.modal').removeClass('active');
    $overlay.removeClass('active');
  })

$openBoardButtons.on('click', () => {
    $('.leaderboard').addClass('active');
    $overlay.addClass('active');
  
})

$closeBoardButtons.on('click', () => {
  $('.leaderboard').removeClass('active');
   $overlay.removeClass('active');
 })

const bombAudio = () => {
  $('#boom-audio').prop('volume', 0.1);
  $('#boom-audio').trigger('play');
}

const typeAudio = () => {
  $('#type-audio').prop('volume', 0.1);
  $('#type-audio').trigger('play');
}
 

const replay = () => {
  location.reload()
  $('#endScreen').css("display", "none")
}

let finalScore = [];

const EndScreen = () => {
    $('#endScreen').css({"display":"block"})
    $('#txtEndMessage').text(`Your score is ${finalScore[0]}`); 
    $('#scoreboard').css("display", "block");
  }