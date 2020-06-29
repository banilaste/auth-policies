async function update() {
	let activeTab = await browser.tabs.query({ active: true, currentWindow: true });

	if (activeTab[0]) {
		const hostName = new URL(activeTab[0].url).hostname;
		
		const data = await browser.storage.sync.get(hostName);
		const result = {};
		if (data[hostName] == true) {
			result[hostName] = false;
		} else {
			result[hostName] = true;
		}
		await browser.storage.sync.set(result)
		
		const background = await browser.runtime.getBackgroundPage();
		background.updateForActiveTab()
	}
}

document.getElementById("updater").onclick = update;