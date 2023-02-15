let link = null, target = null

function checkShortcut(keyboardEvent) {
    if (keyboardEvent.repeat) return
    if(!window.getSelection().isCollapsed){
        return
    }
    if (keyboardEvent.ctrlKey && keyboardEvent.code === 'KeyC') {
        if(keyboardEvent.altKey){
			navigator.clipboard.writeText(link.innerText.trim())
        }
		else{
			navigator.clipboard.writeText(link.href)
		}
    }
}

function checkLink(){
	link = this
    document.addEventListener('keydown', checkShortcut)
}

function uncheckLink(){
	link = null
	document.removeEventListener('keydown', checkShortcut)
}

$(function() {
    $("html a").mouseenter(checkLink).mouseleave(uncheckLink)
})

document.addEventListener('contextmenu', (e) => {
  target = e.target
})

chrome.runtime.onMessage.addListener((e) => {
	if(e.type == 'link'){
		toClipboard(target.closest('a').innerText.trim())
	}
})

function toClipboard(text){
  navigator.clipboard.writeText(text).then(() => {})
}
