// Google Sheets API URL (replace with your sheet's ID and range)
// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// Fetch data from Google Sheets
export async function fetchData(cellref = "'Direct Giving Links'!A2:A500", key = "AIzaSyAJOC5ss6cLfe9i-X4J2u-qzE_ZP8n3Ubk") {
	var googleSheetURL = `https://sheets.googleapis.com/v4/spreadsheets/1UfYzv9pCvi-8h8b3yWIFH1DT1rXiPF7oIChlKXW-mvU/values/${cellref}?key=${key}`;
	try {
		const response = await fetch(googleSheetURL);
		const data = await response.json();
		return data.values.slice(1)
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

export function nameToURL(orgName) {
	let tempName = orgName.valueOf()
	const charsToRemove = " .()-@',&:";
	for ( let char of charsToRemove) {
		tempName = tempName.replaceAll(char, '')
	}
	return tempName
}

// Build URL based on selected value
export function buildURL(selectedValue) {
	const orgName = nameToURL(selectedValue)
	return `https://give.rit.edu/campaigns/52069/donations/new?designation=${orgName}`;
}

function updateURL(event) {
	const selectedValue = event.target.value;
	const url = buildURL(selectedValue);
	document.getElementById("url").textContent = `Generated URL: ${url}`;
}