import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

let sourceTableColumns = 'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, Volumne, Register Date'
let destinationTableColumns = 'myId, address, myName, Country, Depth, Marks, Percevt, mighty'

const options = {
	scorer: token_set_ratio
}

const renderSelect = (arr, defaultValue) => {
	let tmpHtml = ''

	arr.forEach((i) => {
		tmpHtml += `
			<option ${i == defaultValue ? 'selected' : ''}>${i}</option>
		`
	})

	return tmpHtml
}

const renderTable = (commaSepSource, commaSepDestination) => {
	const arr1 = commaSepSource.split(',')
	const arr2 = commaSepDestination.split(',')

	let tmpHtml = ''

	arr1.forEach((i) => {
		tmpHtml += `
			<tr>
				<td> ${i} </td>
				<td>
					<select>
						${renderSelect(arr2, extract(i, arr2, options)[0][0])}
					</select>
				</td>
			</tr>
		`
	})

	return tmpHtml
}

const renderApp = () => {
	document.querySelector('#app').innerHTML = `
		<h1>Hello!</h1>

		<div>
			Source: <br />
			<textarea id="source" rows="6">${sourceTableColumns}</textarea>
		</div>

		<br /><br />

		<div>
			Destination: <br />
			<textarea id="destination" rows="6">${destinationTableColumns}</textarea>
		</div>

		<input id="save" type="button" value="Save"/>

		<br /><br />

		<table border="1">
			${renderTable(sourceTableColumns, destinationTableColumns)}
		</table>
	`
	document.getElementById('save').addEventListener('click', () => {
		console.log('click')
		// console.log(document.getElementById('source').value)
		// console.log(document.getElementById('destination').value)
		sourceTableColumns = document.getElementById('source').value
		destinationTableColumns = document.getElementById('destination').value
		renderApp()
	})
}

renderApp()

// document.getElementById('save').addEventListener('click', () => {
// 	console.log('click')
// 	// console.log(document.getElementById('source').value)
// 	// console.log(document.getElementById('destination').value)
// 	sourceTableColumns = document.getElementById('source').value
// 	destinationTableColumns = document.getElementById('destination').value
// 	renderApp()
// })