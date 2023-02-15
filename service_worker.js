chrome.runtime.onInstalled.addListener(() => {
	chrome.contextMenus.create({
	id: 'copy-link-text',
	title: 'Copy link text',
	contexts: ['link']
	})
})

chrome.contextMenus.onClicked.addListener(openMenu)

function openMenu(info, tab){
	if(info.menuItemId == 'copy-link-text'){
		chrome.tabs.sendMessage(tab.id, { type: 'link' }, { frameId: info.frameId })
	}
}