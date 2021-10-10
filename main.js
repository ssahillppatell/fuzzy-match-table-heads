import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

let sourceTableColumns = 'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo'
let destinationTableColumns = 'myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid'

// let sourceTableColumns = 'iid, ccid, mmid, fff, awo'
// let destinationTableColumns = 'awer, mid, id, jjid'

let sourceArr = []
let destinationArr = []

const options = {
	scorer: token_set_ratio
}

let fuzzyConstraint = 70

let myMap = {}
let visitedSource = {}
let visitedDestination = {}

const hydrateMap = () => {
	sourceArr = sourceTableColumns.split(',').map(i => i.trim())
	destinationArr = destinationTableColumns.split(',').map(i => i.trim())
	destinationArr.forEach((i) => {
		myMap[i] = extract(i, sourceArr, options)
	})

	const tempListOfDestinVisitedSource = {}

	Object.entries(myMap).forEach(([key, value]) => {
		value.forEach((i) => {
			if(i[1] > 0) {
				if(Object.hasOwn(visitedSource, i[0])) {
					if(visitedSource[i[0]]['score'] < i[1]) {
						visitedSource[i[0]] = {
							dest: key,
							score: i[1]
						}

						if(tempListOfDestinVisitedSource[key]) {
							if(tempListOfDestinVisitedSource[key] < i[1] && i[1] > fuzzyConstraint) {
								tempListOfDestinVisitedSource[key] = i[1]
							}
						} else{
							if(i[1] > fuzzyConstraint) {
								tempListOfDestinVisitedSource[key] = i[1]
							}
						}
					}
				} else {
					visitedSource[i[0]] = {
						dest: key,
						score: i[1]
					}

					if(tempListOfDestinVisitedSource[key]) {
						if(tempListOfDestinVisitedSource[key] < i[1] && i[1] > fuzzyConstraint) {
							tempListOfDestinVisitedSource[key] = i[1]
						}
					} else{
						if(i[1] > fuzzyConstraint) {
							tempListOfDestinVisitedSource[key] = i[1]
						}
					}
				}

			}
		})
	})

	console.log(tempListOfDestinVisitedSource)

	Object.entries(visitedSource).forEach(([key, value]) => {
		if(Object.hasOwn(tempListOfDestinVisitedSource, value['dest']) && (value['score'] != tempListOfDestinVisitedSource[value['dest']])) {
			console.log(key, value['dest'])
			delete visitedSource[key]
		}

		if(!Object.hasOwn(tempListOfDestinVisitedSource, value['dest'])) {
			delete visitedSource[key]
		}
	})

	console.log(visitedSource);

	Object.entries(visitedSource).forEach(([key, value]) => {
		visitedDestination[value['dest']] = key
	})

	console.log(myMap, visitedSource, visitedDestination)
}

hydrateMap()

const renderSelect = (currValue) => {
	let tmpHtml = Object.hasOwn(visitedDestination, currValue) ? `<option disabled> Please Select </option>` : `<option selected disabled> Please Select </option>`

	sourceArr.forEach((i, index) => {
		tmpHtml += `
			<option ${i == visitedDestination[currValue] ? 'selected' : ''}> ${i} </option>
		`
	})

	return tmpHtml
}

const renderTable = () => {
	let tmpHtml = ''

	destinationArr.forEach((i) => {
		tmpHtml += `
			<tr>
				<td> ${i} </td>
				<td>
					<select>
						${renderSelect(i)}
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

		<br /><br />

		Select Fuzzy Score: <input type="range" min="1" max="100" value="${fuzzyConstraint}" id="myRange" oninput="this.nextElementSibling.value = this.value">
		<output>${fuzzyConstraint}</output>

		<br /><br />

		<input id="save" type="button" value="Save"/>

		<br /><br />
		<br /><br />

		<table border="1">
			${renderTable()}
		</table>
	`
	document.getElementById('save').addEventListener('click', () => {
		sourceTableColumns = document.getElementById('source').value
		destinationTableColumns = document.getElementById('destination').value
		fuzzyConstraint = document.getElementById('myRange').value
		myMap = {}
		visitedSource = {}
		visitedDestination = {}
		hydrateMap()
		renderApp()
	})
}

renderApp()
