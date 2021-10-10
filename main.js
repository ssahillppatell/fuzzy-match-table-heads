import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

let destinationTableColumns = 'myId, address, myName, Country, Depth, Marks, Percevt, mighty, help'
let sourceTableColumns = 'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark'

// let destinationTableColumns = 'hiii'
// let sourceTableColumns = 'hello, hi, Velociraptor'

const options = {
	scorer: token_set_ratio
}

let fuzzyConstraint = 50

const renderSelect = (arr, fuzzyScores) => {
	// console.log(fuzzyScores, fuzzyScores[0]);

	let isCheckReq = fuzzyScores[0][1] > fuzzyConstraint
	let tmpHtml = `<option ${!isCheckReq ? 'selected' : ''} disabled>Please Select</option>`

	arr.forEach((i, index) => {
		// console.log(i, fuzzyScores[index])
		tmpHtml += `
			<option ${(i == fuzzyScores[0][0]) && isCheckReq ? 'selected' : ''}>${i}</option>
		`
	})

	return tmpHtml
}

const renderTable = (commaSepSource, commaSepDestination) => {
	let arr1 = commaSepSource.split(',').map(i => i.trim())
	let arr2 = commaSepDestination.split(',').map(i => i.trim())

	let tmpHtml = ''

	arr1.forEach((i) => {
		tmpHtml += `
			<tr>
				<td> ${i} </td>
				<td>
					<select>
						${renderSelect(arr2, extract(i, arr2, options))}
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
			${renderTable(destinationTableColumns, sourceTableColumns)}
		</table>
	`
	document.getElementById('save').addEventListener('click', () => {
		console.log('click')
		sourceTableColumns = document.getElementById('source').value
		destinationTableColumns = document.getElementById('destination').value
		renderApp()
	})
}

renderApp()
