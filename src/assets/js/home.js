var anim = null;
var curritem = 1;
var previtem = null;
var lw = null;
var lh = null;
var rw = null;
var rh = null;
var startcretch = false;
var coin_x = null;
var coin_y = null;
var startd = null;
var coind = null;
var owls = [];

var hash = window.location.hash.substr(1);

var topMenuHeight = 140,
menuItems = $(".header__menu a"),
scrollItems = menuItems.map(function(){
	if ($(this).attr("href").substring(0, 1)=='#')
	{
		//$('#main-navigation-toggle').attr('checked', 'false');
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	}            
});

function openPopup()
{
	$('.popup-container').css('display', 'flex');
	$('.popup-container').animate({opacity: 1}, 300);
}
function closePopup()
{	
	$('.popup-container').animate({opacity: 0}, { duration: 300, complete: function() {
		$('.popup-container').css('display', 'none');
	}});
}

function openPPopup(url)
{
	$.ajax({
		type: 'POST',
		url: url,
		data: 'popup=1'
	}).done(function(data) {
		var obj = $.parseJSON(data);			
		$('#popup-cnt').html(obj.html);
		openPopup();
	});	
}

function openSubscribe(id, type)
{
	$('#popup-cnt').html("<a href=\"javascript:closePopup();\" class=\"popup__close\">\n\t<img src=\"\.\/assets\/images\/home\/close.svg\" \/>\n<\/a>\n<div class=\"popup__coin air--bg\">\n\t<img src=\"\.\/assets\/images\/logo.png\" \/>\n<\/div>\n<div class=\"popup__title\">Sign up and be the first in the line!<\/div>\n<div class=\"popup__desc\"><\/div>\n<form class=\"popup__subscribe sbrequest-form\" data-id=\"0682bcf05c9e4599c55dd6d89982d023\" onsubmit=\"return submitSbRequestForm('0682bcf05c9e4599c55dd6d89982d023');\">\n\t<input type=\"hidden\" name=\"itemcode\" value=\"coin\" \/>\n\t<input type=\"email\" name=\"email\" placeholder=\"Enter your e-mail address\" data-required=\"1\" \/>\n\t<button type=\"submit\">Subscribe<\/button>\t\t\t\n<\/form>\n\n<div class=\"sb-form__report-container\" >\n\t\n<\/div>\n\n<div class=\"sb-form__loading-container\">\n\t<div class=\"spinner\">\n\t\t<div class=\"bounce1\"><\/div>\n\t\t<div class=\"bounce2\"><\/div>\n\t\t<div class=\"bounce3\"><\/div>\n\t<\/div>\n<\/div>\n<div class=\"popup__social\">\n\t\t<a href=\"https:\/\/twitter.com\/Aircoinreal\" target=\"_blank\"><img src=\"\.\/assets\/images\/home\/53ce9664fdcc5f570ff022c6745b72e9.svg\" \/><\/a>\n\t\t<a href=\"https:\/\/t.me\/aircoinrealchannel\" target=\"_blank\"><img src=\"\.\/assets\/images\/home\/bc734b64ed80bb774a10fbb1d64c5dfc.svg\" \/><\/a>\n\t\t<a href=\"https:\/\/t.me\/aircoinreal\" target=\"_blank\"><img src=\"\.\/assets\/images\/home\/3d982eaa1e71b9696e74ad08bb000f12.svg\" \/><\/a>\n\t\t<a href=\"https:\/\/github.com\/Aircoin-official\" target=\"_blank\"><img src=\"\.\/assets\/images\/icon-github-black.svg\" \/><\/a>\n\t<\/div>");
	openPopup();
}

function submitSbRequestForm(id)
{
	let form = $('form[data-id="'+id+'"]');
	console.log(form);
	form.hide();
	form.closest('div.popup').find('.sb-form__loading-container').show();
	var fs = 1;
	if (fs==1)
	{
		$.ajax({
			type: 'POST',
			url: '/'+lang+'/api/subscribe/'+form.attr('data-id')+'/send',
			data: form.serialize()
		}).done(function(data) {
			var obj = $.parseJSON(data);			
			form.closest('div.popup').find('.sb-form__loading-container').hide();
			form.closest('div.popup').find('.sb-form__report-container').html(obj.text);
			form.closest('div.popup').find('.sb-form__report-container').show();
			if (obj.error=='1')
			{
				setTimeout(function() {
					form.closest('div.popup').find('.sb-form__report-container').hide();
					form.fadeIn('fast');
				}, 3000);
			}			
		});	
	}
	return false;
}

function initCoins()
{
	// $('.header').css('width', $(document).width()+'px');
	// $('.header').css('z-index', '150');
	// $('.coin').css('overflow', 'hidden');
	// $('.coin__information').css('overflow', 'hidden');

	// lw = $('.coin__advantages-list').eq(curritem-1).width();
	// lh = $('.coin__advantages-list').eq(curritem-1).height();
	// rw = $('.coin__information').eq(curritem-1).width();
	// rh = $('.coin__information').eq(curritem-1).height();
	
	// $('.coin__information--full').css({
	// 	'width': rw+'px'
	// });
	
	// initMouseWheel();
	// $('.coin__item').hide();
	// $('.coin__item').eq(curritem-1).show();
	// $('.coin__coin').removeClass('sameusd--bg');
	// $('.coin__coin').removeClass('samecoin--bg');
	// $('.coin__coin').removeClass('sameeuro--bg');
	// $('.coin__coin').addClass('same'+$('.coin__item').eq(curritem-1).attr('data-type')+'--bg');
	// showCoinImage();

	// coin_x = parseInt($('.coin__coin')[0].offsetLeft + $('.coin__coin')[0].offsetWidth / 2);
	// coin_y = parseInt($('.coin__coin')[0].offsetTop + $('.coin__coin')[0].offsetHeight / 2);
	// console.log(coin_x + ' ' + coin_y);

	// $('.coin__item, .coin__coin').css({'opacity': '1', 'transition': '0.5s'});
}

function initOwlCarousel() 
{
	$('.owl').each(function () {
		let ob = $(this);
		if ($(document).width()<=1100)
		{
			if (!ob.hasClass('owl-carousel'))
			{
				ob.addClass('owl-carousel');
				var opt = eval(atob($(ob).attr('data-options')));
				owls.push(ob.owlCarousel(opt[0]));
			}
		}
		else
		{
			for (var i in owls)
			{
				owls[i].trigger('destroy.owl.carousel');				
			}
			$('.owl.owl-carousel').removeClass('owl-carousel');
		}
	});	
}

function initOwlCarouselSection(ob) {
  let cob = ob;
  var opt = eval(atob($(ob).attr('data-options')));
  ob.owlCarousel(opt[0]);
}

function owlLoaded(ob) {
  if (ob.hasClass('inst-catalogue')) {
    //convSvg();
    ob.fadeIn('fast');
  }
}

$(document).ready(function () {	

	initOwlCarousel();

	if ($('.coin__coin').length>0)
	{
		
		

		$('.coin__coin').mousedown(function(e) {
			startcretch = true;
			var radians = Math.atan2(e.clientX - coin_x, e.clientY - coin_y);
			startd = (radians * (180 / Math.PI) * -1) + 180; 
		});
		$('.coin__coin').mousemove(function(e) {
			if (startcretch)
			{
				var radians = Math.atan2(e.clientX - coin_x, e.clientY - coin_y);
				var degree = (radians * (180 / Math.PI) * -1) + 180; 
				coind = startd - degree;
				console.log(coind);
			}		
		});
		$('.coin__coin').click(function() {
			startcretch = false;
			console.log('mose click');
		});

		if (hash!='')
		{
			if ($('.coin__item[data-type="'+hash+'"]').length>0)
			{
				curritem = $('.coin__item').index($('.coin__item[data-type="'+hash+'"]')) + 1;
				$('.coin__item').hide();
				$('.coin__item').css({'z-index': '5'});
				$('.coin__item').eq(curritem-1).css({'z-index': '10'});
				$('.coin__item').eq(curritem-1).show();

				$('.coin__coin').removeClass('sameusd--bg');
				$('.coin__coin').removeClass('samecoin--bg');
				$('.coin__coin').removeClass('sameeuro--bg');
				$('.coin__coin').addClass('same'+$('.coin__item').eq(curritem-1).attr('data-type')+'--bg');
			}
		}

		initCoins();
	}

	$('a[href^="#"]').click(function(event) {        
		if ($('#main-navigation-toggle').is(':checked'))
		{
			$('#main-navigation-toggle').prop('checked', false);
		}
		mid = $(this).attr("href");
		if ($(mid).length>0)
		{
			var offset = topMenuHeight;
			var target = $(mid).offset().top - offset;
			$('html, body').animate({scrollTop:target}, 500, function() { 
				//
			});
		}		
		//event.preventDefault();
	});

	window.addEventListener('load', function() {
		
		if (hash!='' )
		{
			mid = '#'+hash;
			if (mid!='#about')
			{
				console.log(mid);
				if ($(mid).length>0)
				{
					var offset = topMenuHeight;
					if (mid=='#team')
					{
						offset = offset;
						console.log(offset);
					}
					var target = $(mid).offset().top - offset;
					$('html, body').animate({scrollTop:target}, 500, function() { 
						//
					});
					menuItems
					.removeClass("current")
					.filter("[href='"+mid+"']").addClass("current");
				}	
			}			
		}

	});

	window.addEventListener('scroll', function() {
		
		checkScroll();

	});

	window.addEventListener('resize', function() {
		
		initCoins();
		initOwlCarousel();

	});
});

function checkScroll()
{
	var fromTop = $(window).scrollTop()+topMenuHeight+50;

	var cur = scrollItems.map(function(){
		if ($(this).offset().top < fromTop || ( $(this).attr('id')=='contacts' && $(this).offset().top < fromTop + 300 ) )
			return this;
	});
	cur = cur[cur.length-1];
	var id = cur && cur.length ? cur[0].id : "";
	menuItems
	.removeClass("current")
	.filter("[href='#"+id+"']").addClass("current");
}

function showCoinImage()
{
	$('.coin__coin img').hide();
	$('.coin__coin img[data-type="'+$('.coin__item').eq(curritem-1).attr('data-type')+'"]').show();					
}

function showSame(p)
{
	var num = $('.coin__item').index($('.coin__item[data-type="'+p+'"]'));
	num = num + 1;
	if (num!=curritem)
	{
		previtem = curritem;
		curritem = num;
		if (curritem>previtem)
		{
			showCoinsDown();
		}
		else
		{
			showCoinsUp();			
		}
	}
}

function showCoinsUp()
{
	$('.coin__item').hide();
	$('.coin__item').css({'z-index': '5'});
	$('.coin__item').eq(curritem-1).css({'z-index': '10'});
	$('.coin__item').eq(previtem-1).css({'z-index': '7'});
	$('.coin__item').eq(curritem-1).show();
	$('.coin__item').eq(previtem-1).show();				
	$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'width' : lw + 'px' });
	$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': lw+'px' });

	var rww = rw + rw;
	$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'width' : rw + 'px' });
	$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'left': '-'+rw+'px' });

	$('.coin__coin').removeClass('sameusd--bg');
	$('.coin__coin').removeClass('samecoin--bg');
	$('.coin__coin').removeClass('sameeuro--bg');
	$('.coin__coin').addClass('same'+$('.coin__item').eq(curritem-1).attr('data-type')+'--bg');
	
	showCoinImage();

	anim = $({deg: 0}).animate(
		{deg: -360}, 
		{
			duration: 500,
			step: function(now, fx) {
				$(".coin__coin img").css({							
					transform: "rotate(" + now + "deg)"
				});						

				var dlw = Math.ceil((lw/360)*now*-1);
				var tdlw = ( ( 100 / 360 ) * now * -1 ) / 100;
				var bdlw = ( ( 10 / 360 ) * now * -1 );
				var tdlwm = 1 - tdlw;
				var bdlwm = 10 - bdlw;
				var ddlw = lw - dlw;
				console.log(ddlw + ' ' + lw + ' ' + dlw + ' ' + tdlw);

				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'left': '-'+dlw+'px' });
				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'filter': 'blur('+bdlw+'px)' });
				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'opacity': tdlwm });

				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'left': dlw+'px' });
				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'filter': 'blur('+bdlw+'px)' });
				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'opacity': tdlwm });

				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': ddlw+'px' });
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'filter': 'blur('+bdlwm+'px)' });
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'opacity': tdlw });

				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'left': '-'+ddlw+'px' });
				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'filter': 'blur('+bdlwm+'px)' });
				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'opacity': tdlw });
			},
			complete: function() {
				anim = null;
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': '0px' });
				$(".coin__coin").removeClass('coin__coin--scale');
				$(".coin__coin img").css({							
					transform: "rotate(0deg)"								
				});
			}
		}
	);
}

function showCoinsDown()
{
	$('.coin__item').hide();
	$('.coin__item').css({'z-index': '5'});
	$('.coin__item').eq(curritem-1).css({'z-index': '10'});
	$('.coin__item').eq(previtem-1).css({'z-index': '7'});
	$('.coin__item').eq(curritem-1).show();
	$('.coin__item').eq(previtem-1).show();				
	$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'width' : lw + 'px' });
	$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': '-'+lw+'px' });

	var rww = rw + rw;
	$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'width' : rw + 'px' });
	$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'left': rww+'px' });

	$('.coin__coin').removeClass('sameusd--bg');
	$('.coin__coin').removeClass('samecoin--bg');
	$('.coin__coin').removeClass('sameeuro--bg');
	$('.coin__coin').addClass('same'+$('.coin__item').eq(curritem-1).attr('data-type')+'--bg');
	
	showCoinImage();

	anim = $({deg: 0}).animate(
		{deg: 360}, 
		{
			duration: 500,
			step: function(now, fx) {
				$(".coin__coin img").css({							
					transform: "rotate(" + now + "deg)"								
				});				

				var dlw = Math.ceil((lw/360)*now);
				var tdlw = ( ( 100 / 360 ) * now ) / 100;
				var bdlw = ( ( 10 / 360 ) * now );
				var tdlwm = 1 - tdlw;
				var bdlwm = 10 - bdlw;
				var ddlw = lw - dlw;

				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'left': dlw+'px' });
				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'filter': 'blur('+bdlw+'px)' });
				$('.coin__item').eq(previtem-1).find('.coin__advantages-list').css({ 'opacity': tdlwm });

				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'left': '-'+dlw+'px' });
				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'filter': 'blur('+bdlw+'px)' });
				$('.coin__item').eq(previtem-1).find('.coin__information--full').css({ 'opacity': tdlwm });

				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': '-'+ddlw+'px' });
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'filter': 'blur('+bdlwm+'px)' });
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'opacity': tdlw });

				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'left': ddlw+'px' });
				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'filter': 'blur('+bdlwm+'px)' });
				$('.coin__item').eq(curritem-1).find('.coin__information--full').css({ 'opacity': tdlw });
			},
			complete: function() {
				anim = null;
				$('.coin__item').eq(curritem-1).find('.coin__advantages-list').css({ 'left': '0px' });
				$(".coin__coin").removeClass('coin__coin--scale');
				$(".coin__coin img").css({							
					transform: "rotate(0deg)"								
				});
			}
		}
	);
}

function initMouseWheel()
{
	$('body').on('mousewheel', function(event) {
		//console.log(event.deltaX, parseInt(event.deltaY), event.deltaFactor);
		if ($(document).width() <= 1100)
		{
			return;
		}
		$(".coin__coin").css({
			//transform: 'rotate(0deg)'
		});
		if (anim == null)
		{
			//alert('anmim');
			$(".coin__coin").addClass('coin__coin--scale');

			if (parseInt(event.deltaY)<0)
			{	
				
				previtem = curritem;
				curritem = curritem + 1;
				if (curritem>3)
				{
					curritem = 1;
				}

				showCoinsDown();				
				
			}
			if (parseInt(event.deltaY)>0)
			{

				previtem = curritem;
				curritem = curritem - 1;
				if (curritem<1)
				{
					curritem = 3;
				}

				showCoinsUp();
		
			}
		}
	});
}

jQuery.fn.rotate = function(degrees) {
    $(this).css({
		'transform' : 'rotate('+ degrees +'deg)',
		'transition': '0.5s'
	});
    return $(this);
};