(function(){
/**
 * new song request.
 */
chrome.webRequest.onCompleted.addListener(function(details){
	console.log("Auto loop: " + details.url);
	var message = localStorage.getItem("message") || '';
	var delaytime = localStorage.getItem("delaytime");
	console.log("Current message is \"" + message + "\"");
	common.executeScript(details.tabId,
		[
			'jquery.min.js',
			'content_script.js'
		],[
			"setTimeout('loop(\"" + message.replace(/\'/g,"\\'").replace(/\"/g,'\\"') + "\");'," + delaytime * 1000 + ");",
			"setTimeout('alertNextSong(" + localStorage.getItem('next_song_message') + ");',15000);"
		]
	);
},
{urls: ["http://loop.xiami.com/loop/getsong?id=*"]},
["responseHeaders"]);

/**
 * show tab icon.
 */
function showTabIcon(tab){
	if(/^http:\/\/loop.xiami.com\/room\/\d{5}$/.test(tab.url)){
		console.log("Updated tab url is " + tab.url);
		chrome.pageAction.show(tab.id);
		console.log("show icon in " + tab.url);
		// apply the style
		if(localStorage.getItem("optimize_widescreen") == 'true'){
			var file = "css/" + localStorage.getItem("radioScreenOptimized") + '.css';
			console.log('insert css to ' + tab.url + ' and css file is ' +file);
			common.insertCSS(tab.id,file);
		}
		// Show a message when entered the room.
		var show_message = localStorage.getItem('show_message');
		if(show_message && show_message!=''){
			common.executeScript(tab.id,[
				'jquery.min.js','content_script.js'
			],[
				'$(function(){sendMessage("' + show_message + '");});'
			]);
		}
	}
};
/**
 * when tab created.
 */
chrome.tabs.onCreated.addListener(showTabIcon);
/**
 * when tab url updated.
 */
chrome.tabs.onUpdated.addListener(function(tabId,changeInfo,tab){
	if(changeInfo.status == 'loading'){
		showTabIcon(tab);
	}
});

/**
 * init localStorate.
 */
if(localStorage.getItem('delaytime') == null){
	localStorage.setItem('delaytime','5');
	localStorage.setItem('message','Good!');
	localStorage.setItem('next_song_message','true');
	localStorage.setItem("optimize_widescreen",'false');
	localStorage.setItem("radioScreenOptimized",'screen_1366_768_nobookmarkbar');
}
localStorage.setItem('show_message',localStorage.getItem('show_message') == null?'天空一声闷响，老子闪亮登场！':localStorage.getItem('show_message'));
})();
