let link = null

function checkShortcut(keyboardEvent) {
    if (keyboardEvent.repeat) return
    if(!window.getSelection().isCollapsed){
        return
    }
    if (keyboardEvent.ctrlKey && keyboardEvent.code === 'KeyC') {
        if(keyboardEvent.altKey){
			navigator.clipboard.writeText(link.innerText)
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
    $("html").on("mouseenter", "a", checkLink).on("mouseleave", "a", uncheckLink)
})
