import * as R from "./r.js";
import * as Py from "./py.js"; // uncomment this for pyodide

const statusMessage = document.getElementById("status-message")

statusMessage.innerHTML = `🔵 WebR — <code>${await webR.evalRString("R.version.string")}</code> — Loaded (+ pypdide)!`

const rButton = document.getElementById("r-button")
rButton.disabled = false
rButton.onclick = async () => {
	const output = document.getElementById("r-output")
	const res = await webR.evalR("sample(100, 5)")
	const val = await res.toArray()
	output.innerText = JSON.stringify(val)
};

const pyButton = document.getElementById("py-button")
pyButton.disabled = false
pyButton.onclick = async () => {
	await webPy.runPython(`
import random
import json
import js # lets us use the JS env and do things like maniuplate the actual DOM

output = js.document.getElementById("py-output")
output.innerText = json.dumps(random.sample(range(1, 101), 5))
`)
};

const rpyButton = document.getElementById("rpy-button")
rpyButton.disabled = false
rpyButton.onclick = async () => {
	const output = document.getElementById("rpy-output")
	await webPy.runPython(`pyRange = list(range(1, 101))`)
	const val = await webR.evalR(`sample(pyRange, 5)`, {
		env: {
			pyRange: webPy.globals.get(`pyRange`).toJs()
		}
	})
	output.innerText = JSON.stringify(await val.toArray())
};



