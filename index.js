async function updateForActiveTab() {
	let activeTab = await browser.tabs.query({ active: true, currentWindow: true });

	if (activeTab[0]) {
		const hostName = new URL(activeTab[0].url).hostname;
		
		const data = await browser.storage.sync.get(hostName);
		if (data[hostName] == true) {
			browser.browserAction.setIcon({
				path: {
					48: "icons/okay.jpg"
				}
			})
		} else if (data[hostName] == false) {
			browser.browserAction.setIcon({
				path: {
					48: "icons/not_okay.jpg"
				}
			})
		} else {
			browser.browserAction.setIcon({
				path: {
					48: "icons/unknow.jpg"
				}
			})
		}
	}
}

[
	browser.windows.onFocusChanged, // Window switch
	browser.tabs.onUpdated, // URL change
	browser.tabs.onActivated // Tab change
].forEach(it => it.addListener(updateForActiveTab));

updateForActiveTab();