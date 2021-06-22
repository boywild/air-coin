function openPopup() {
  $(".popup-container").css("display", "flex");
  $(".popup-container").animate({ opacity: 1 }, 300);
}
function closePopup() {
  $(".popup-container").animate(
    { opacity: 0 },
    {
      duration: 300,
      complete: function () {
        $(".popup-container").css("display", "none");
      },
    }
  );
}

function openSubscribe(id, type) {
  $("#popup-cnt").html(
    '<a href="javascript:closePopup();" class="popup__close">\n\t<img src="./assets/images/close.svg" />\n</a>\n<div class="popup__coin air--bg">\n\t<img src="./assets/images/logo.png" />\n</div>\n<div class="popup__title">Sign up and be the first in the line!</div>\n<div class="popup__desc"></div>\n<form class="popup__subscribe sbrequest-form" data-id="0682bcf05c9e4599c55dd6d89982d023" onsubmit="return submitSbRequestForm(\'0682bcf05c9e4599c55dd6d89982d023\');">\n\t<input type="hidden" name="itemcode" value="coin" />\n\t<input type="email" name="email" placeholder="Enter your e-mail address" data-required="1" />\n\t<button type="button" onclick="closePopup()">Subscribe</button>\t\t\t\n</form>\n\n<div class="sb-form__report-container" >\n\t\n</div>\n\n<div class="sb-form__loading-container">\n\t<div class="spinner">\n\t\t<div class="bounce1"></div>\n\t\t<div class="bounce2"></div>\n\t\t<div class="bounce3"></div>\n\t</div>\n</div>\n<div class="popup__social">\n\t\t<a href="https://twitter.com/Aircoinreal" target="_blank"><img src="./assets/images/53ce9664fdcc5f570ff022c6745b72e9.svg" /></a>\n\t\t<a href="https://t.me/aircoinrealchannel" target="_blank"><img src="./assets/images/bc734b64ed80bb774a10fbb1d64c5dfc.svg" /></a>\n\t\t<a href="https://t.me/aircoinreal" target="_blank"><img src="./assets/images/3d982eaa1e71b9696e74ad08bb000f12.svg" /></a>\n\t\t<a href="https://github.com/Aircoin-official" target="_blank"><img src="./assets/images/icon-github-black.svg" /></a>\n\t</div>'
  );
  openPopup();
}
