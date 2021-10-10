import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

const sourceTableColumns = 'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, Volumne, Register Date'
const destinationTableColumns = 'myId, address, myName, Country, Depth, Marks, Percevt, mighty'

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

document.querySelector('#app').innerHTML = `
	<h1>Hello!</h1>
	<div>
		Source: <br />
		${sourceTableColumns}
	</div>

	<br /><br />

	<div>
		Destination: <br />
		${destinationTableColumns}
	</div>

	<br /><br />
	
	<table border="1">
		${renderTable(sourceTableColumns, destinationTableColumns)}
	</table>
`