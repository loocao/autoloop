var common = {};
/**
 * apply sytle.
 */
common.insertCSS = function(tabId,file,code){
	chrome.tabs.insertCSS(tabId, {
		"file" : file
	}, function(){
		if(code){
			chrome.tabs.insertCSS(tabId,code);
		}
	});
};
/**
 * execute javascripts.
 * @param tabId tab id
 * @param files javascript fiels.Array or string.
 * @param codes javascript codes.Array or string.
 */
common.executeScript = function(tabId,files,codes){
	if(typeof(files) != 'string' && files.length > 0){
		chrome.tabs.executeScript(tabId,{'file':files.shift()},function(){
			common.executeScript(tabId,files,codes);
		});
	}else if(typeof(files) == 'string'){
		chrome.tabs.executeScript(tabId,{'file':files},function(){
			common.executeScript(tabId,[],codes);
		});
	}else if(typeof(codes) != 'string' && codes.length > 0){
		chrome.tabs.executeScript(tabId,{'code':codes.shift()},function(){
			common.executeScript(tabId,files,codes);
		});
	}else if(typeof(codes) == 'string'){
		chrome.tabs.executeScript(tabId,{'code':codes},function(){
			common.executeScript(tabId,codes);
		});
	}
};