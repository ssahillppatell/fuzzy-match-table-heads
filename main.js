import './style.css'
import {extract, ratio, token_set_ratio} from 'fuzzball'

// let sourceTableColumns = 'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo'
// let destinationTableColumns = 'myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid'

let sourceTableColumns = 'iid, ccid, mmid, fff, awo'
let destinationTableColumns = 'awer, mid, id, jjid'

let sourceArr = []
let destinationArr = []

const options = {
	scorer: token_set_ratio
}

let fuzzyConstraint = 20

let myMap = {}
let visitedSource = {}
let visitedDestination = {}

let change = true

const filterMyMap = () => {
	// while(change) {
	// 	change = false
		Object.entries(myMap).map(([key, value]) => {
			// console.log(key, value)
			if(Object.hasOwn(visitedSource, value[0][0])) {
				console.log(value[0][0], visitedSource[value[0][0]])

				if(visitedSource[value[0][0]]['score'] < value[0][1]) {
					myMap[visitedSource[value[0][0]]['dest']].shift()
					visitedSource[value[0][0]] = {
						dest: key,
						score: value[0][1]
					}
				} else {
					myMap[key].shift()
					visitedSource[myMap[key][0][0]] = {
						dest: myMap[key][0][0],
						score: myMap[key][0][1]
					}
					console.log(myMap, myMap[key], myMap[key][0][0], visitedSource[myMap[key][0][0]])
				}
			} else {
				visitedSource[value[0][0]] = {
					dest: key,
					score: value[0][1]
				}
			}
		})
	// }

}

const hydrateMap = () => {
	sourceArr = sourceTableColumns.split(',').map(i => i.trim())
	destinationArr = destinationTableColumns.split(',').map(i => i.trim())
	destinationArr.forEach((i) => {
		myMap[i] = extract(i, sourceArr, options)
	})

	// filterMyMap()

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
							if(tempListOfDestinVisitedSource[key] < i[1]) {
								tempListOfDestinVisitedSource[key] = i[1]
							}
						} else{
							tempListOfDestinVisitedSource[key] = i[1]
						}
					}
				} else {
					visitedSource[i[0]] = {
						dest: key,
						score: i[1]
					}
					if(tempListOfDestinVisitedSource[key]) {
						if(tempListOfDestinVisitedSource[key] < i[1]) {
							tempListOfDestinVisitedSource[key] = i[1]
						}
					} else{
						tempListOfDestinVisitedSource[key] = i[1]
					}
				}

			}
		})
	})

	// const listOfDestinVisitedSource = tempListOfDestinVisitedSource.filter((x, y) => tempListOfDestinVisitedSource.indexOf(x) == y)
	console.log(tempListOfDestinVisitedSource)

	Object.entries(visitedSource).forEach(([key, value]) => {
		if(Object.hasOwn(tempListOfDestinVisitedSource, value['dest']) && (value['score'] != tempListOfDestinVisitedSource[value['dest']])) {
			console.log(key, value['dest'])
			delete visitedSource[key]
		}
		// visitedDestination[value['dest']] = key
	})
	// delete visitedSource['cid']


	Object.entries(visitedSource).forEach(([key, value]) => {
		visitedDestination[value['dest']] = key
	})

	// destinationArr.forEach((i) => {
	// 	Object.entries(visitedSource).forEach(([key, value]) => {
	// 		// console.log(value['dest']);
	// 		visitedDestination[i] = value['dest']
	// 	})
	// })

	console.log(myMap, visitedSource, visitedDestination)
}

hydrateMap()
// console.log(myMap)

const renderSelect = (currValue) => {
	let isCheckReq = myMap[currValue][0][1] > fuzzyConstraint
	let tmpHtml = `<option ${!isCheckReq ? 'selected' : ''} disabled>Please Select</option>`

	sourceArr.forEach((i, index) => {
		tmpHtml += `
			<option ${(i == myMap[currValue][0][0]) && isCheckReq ? 'selected' : ''}>${i}</option>
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
		console.log('click');
		sourceTableColumns = document.getElementById('source').value
		destinationTableColumns = document.getElementById('destination').value
		fuzzyConstraint = document.getElementById('myRange').value
		myMap = {}
		visitedSource = {}
		hydrateMap()
		console.log(myMap)
		renderApp()
	})
}

renderApp()
