import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

const sourceTableColumns = ['Id', 'Uuid', 'Name', 'Street', 'City', 'PIN', 'Age', 'Score', 'Percentage', 'Height', 'Weight', 'Volumne']
const destinationTableColumns = ['myId', 'address', 'myName', 'Country', 'Depth', 'Marks', 'Percevt', 'mighty']

const options = {
	scorer: token_set_ratio
}

const renderArray = (arr) => {
	let tmpHtml = '';
	arr.forEach((i) => {
		tmpHtml += `<span> ${i} </span>`
	})

	return tmpHtml
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

const renderTable = (source, destination) => {
	let tmpHtml = ''

	sourceTableColumns.forEach((i) => {
		tmpHtml += `
			<tr>
				<td> ${i} </td>
				<td>
					<select>
						${renderSelect(destinationTableColumns, extract(i, destinationTableColumns, options)[0][0])}
					</select>
				</td>
			</tr>
		`
	})

	return tmpHtml
}

document.querySelector('#app').innerHTML = `
	<h1>Hello!</h1>
	<div>
		Source: <br />
		${renderArray(sourceTableColumns)}
	</div>

	<br /><br />

	<div>
		Destination: <br />
		${renderArray(destinationTableColumns)}
	</div>

	<br /><br />
	
	<table>
		${renderTable(sourceTableColumns, destinationTableColumns)}
	</table>
`