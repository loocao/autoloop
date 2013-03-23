// DOM 2 Events
var dispatchMouseEvent = function(target, var_args) {
	var t = target;
	if(typeof(target) == 'string'){
		t = document.getElementById(target);
	}
	var e = document.createEvent("MouseEvents");
	// If you need clientX, clientY, etc., you can call
	// initMouseEvent instead of initEvent
	e.initEvent.apply(e, Array.prototype.slice.call(arguments, 1));
	t.dispatchEvent(e);
};

var sendMessage = function(message){
	if(message != ''){
		document.getElementById('word').value = message;
		dispatchMouseEvent('submit','click',true,true);
	}
};

var isCurrentDJMyself = function(){
	var result = false;
	// current user
	var rma = $('#room_me_avatar').attr('onclick');
	var user_id = rma.substring(rma.indexOf('(') + 1,rma.indexOf(')'));
	// DJ list
	var djs = $('#stage_table > .is_dj');
	var dj_count = djs.size();
	djs.each(function(i,dom){
		// current DJ player
		if($(this).find('.playing').size() > 0){
			// if DJ is current user,then alert next song title
			if($(this).attr('rel') == user_id){
				result = true;
			}
		}
	});
	return result;
};

var isNextDJMyself = function(){
	var result = false;
	// current user
	var rma = $('#room_me_avatar').attr('onclick');
	var user_id = rma.substring(rma.indexOf('(') + 1,rma.indexOf(')'));
	// DJ list
	var djs = $('#stage_table > .is_dj');
	var dj_count = djs.size();
	djs.each(function(i,dom){
		// current DJ player
		if($(this).find('.playing').size() > 0){
			// next DJ
            var nextDJ = (i == (dj_count - 1)?djs.eq(0):$(this).next());
			// if next DJ is current user,then alert next song title
			if(nextDJ.attr('rel') == user_id){
				result = true;
			}
		}
	});
	return result;
};

var loop = function(message){
	// If current DJ is myself,don't grab and send message
	if(!isCurrentDJMyself()){
		dispatchMouseEvent(document.getElementById('rank_plus').lastChild, 'click', true, true);
		sendMessage(message);
	}
};

var alertNextSong = function(isAlert){
	if(isAlert){
		if(isNextDJMyself()){
			var info = $('#playlist_song > li[class!="item active"]:eq(0) > .playlist_info');
			var name = info.children('.name').children('a').text();
			var artist = info.children('.artist').children('a').text();
			sendMessage('\u4e0b\u4e00\u9996: ' + name + ' - ' + artist);
		}
	}
};
