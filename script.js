let link = null, target = null

function checkShortcut(keyboardEvent) {
    if (keyboardEvent.repeat) return
    if(!window.getSelection().isCollapsed){
        return
    }
    if (keyboardEvent.ctrlKey && keyboardEvent.code === 'KeyC') {
        if(keyboardEvent.altKey){
			toClipboard(link.innerText)
        }
		else{
			toClipboard(link.href)
		}
    }
}

function checkLink(e){
	link = e.target.closest('a')
    document.addEventListener('keydown', checkShortcut)
}

function uncheckLink(){
	link = null
	document.removeEventListener('keydown', checkShortcut)
}

$(function() {
    $("html").on('mouseenter', 'a', checkLink).on('mouseleave', 'a', uncheckLink).on('contextmenu', 'a', getLink)
})

function getLink(e){
	target = e.target
}

chrome.runtime.onMessage.addListener((e) => {
	if(e.type == 'link'){
		toClipboard(target.closest('a').innerText)
	}
})

function toClipboard(text){
	if(text && text.trim() != '')
	{
		navigator.clipboard.writeText(text.trim()).then(() => {})
	}
}
