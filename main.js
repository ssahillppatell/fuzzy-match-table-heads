import './style.css';
import { extract, ratio, token_set_ratio } from 'fuzzball';

let sourceTableColumns =
    'Id, Uuid, Name, Street, City, PIN, Age, Score, Percentage, Height, Weight, helper, Volumne, Register Date, Mark, iid, ccid, mmid, fff, awo';
let destinationTableColumns =
    'myId, address, myName, Country, Depth, Marks, Percevt, mighty, help, awer, mid, id, jjid';

// let sourceTableColumns = 'id';
// let destinationTableColumns = 'mid, id';

let sourceArr = [];
let destinationArr = [];

const options = {
    scorer: ratio,
};

let fuzzyConstraint = 60;

let myMapDS = {};

let tmpMap = {};

const checkVal = (currVal, score) => {
    let check = true;

    Object.entries(myMapDS).forEach(([key, value]) => {
        value.forEach((i) => {
            if (i[0] == currVal && i[1] > score) {
                check = false;
            }
        });
    });

    if (!Object.hasOwn(tmpMap, currVal)) {
        // check = true;
        Object.entries(tmpMap).forEach(([key, value]) => {
            if (value == currVal) {
                check = false;
            }
        });
    }

    return check;
};

const logMap = () => {
    Object.entries(myMapDS).forEach(([key, value]) => {
        value.forEach((i) => {
            if (i[1] > fuzzyConstraint && checkVal(i[0], i[1])) {
                if (Object.hasOwn(tmpMap, key)) {
                    // if(checkVal(tmpMap[key], i[1])) {
                    // 	tmpMap[key] = i[0]
                    // }
                } else {
                    tmpMap[key] = i[0];
                }
            }
        });
    });
};

const hydrateMap = () => {
    sourceArr = sourceTableColumns.split(',').map((i) => i.trim());
    destinationArr = destinationTableColumns.split(',').map((i) => i.trim());
    destinationArr.forEach((i) => {
        myMapDS[i] = extract(i, sourceArr, options);
    });
    console.log(myMapDS);

    logMap();
    console.log(tmpMap);
};

hydrateMap();

const renderSelect = (currValue) => {
    let tmpHtml = Object.hasOwn(tmpMap, currValue)
        ? `<option disabled> Please Select </option>`
        : `<option selected disabled> Please Select </option>`;

    sourceArr.forEach((i, index) => {
        tmpHtml += `
			<option ${i == tmpMap[currValue] ? 'selected' : ''}> ${i} </option>
		`;
    });

    return tmpHtml;
};

const renderTable = () => {
    let tmpHtml = '';

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
		`;
    });

    return tmpHtml;
};

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
	`;
    document.getElementById('save').addEventListener('click', () => {
        sourceTableColumns = document.getElementById('source').value;
        destinationTableColumns = document.getElementById('destination').value;
        fuzzyConstraint = document.getElementById('myRange').value;
        myMapDS = {};
        tmpMap = {};
        hydrateMap();
        renderApp();
    });
};

renderApp();
