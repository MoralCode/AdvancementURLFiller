// Google Sheets API URL (replace with your sheet's ID and range)
// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// Fetch data from Google Sheets
async function fetchData(cellref = "'Direct Giving Links'!A2:A500") {
	var googleSheetURL = `https://sheets.googleapis.com/v4/spreadsheets/1UfYzv9pCvi-8h8b3yWIFH1DT1rXiPF7oIChlKXW-mvU/values/${cellref}?key=AIzaSyAJOC5ss6cLfe9i-X4J2u-qzE_ZP8n3Ubk`;
	try {
		const response = await fetch(googleSheetURL);
		const data = await response.json();
		console.log(data);
		// Populate the dropdown
		const dropdown = document.getElementById("dropdown");
		data.values.slice(1).forEach(row => {
			const option = document.createElement("option");
			option.value = row[0];  // Assume the value you want is in the first column
			option.textContent = row[0];
			dropdown.appendChild(option);
		});
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

function nameToURL(orgName) {
	let tempName = orgName.valueOf()
	const charsToRemove = " .()-@',&";
	for ( let char of charsToRemove) {
		tempName = tempName.replaceAll(char, '')
	}
	return tempName
}

// Build URL based on selected value
function buildURL(event) {
	const selectedValue = event.target.value;
	const orgName = nameToURL(selectedValue)
	const url = `https://give.rit.edu/campaigns/52069/donations/new?designation=${encodeURIComponent(orgName)}`;
	document.getElementById("url").textContent = `Generated URL: ${url}`;
}

// Load data on page load
window.onload = fetchData;