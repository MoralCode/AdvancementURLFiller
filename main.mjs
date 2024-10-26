// Google Sheets API URL (replace with your sheet's ID and range)
// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// https://docs.google.com/spreadsheets/d/e/2PACX-1vSAomwWPDZwgj-AIooKULhoeoAGfIJH4ufo2cPX8R0_i23Kf6xwyTUYUftFM8UVQw1DTZFP0_fDzqj9/pubhtml


// Fetch data from Google Sheets
export async function fetchData(cellref = "'Direct Giving Links'!A2:A500", key = "AIzaSyAJOC5ss6cLfe9i-X4J2u-qzE_ZP8n3Ubk") {
	var sheetID = "1UfYzv9pCvi-8h8b3yWIFH1DT1rXiPF7oIChlKXW-mvU"
	var googleSheetURL = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${cellref}?key=${key}`;
	try {
		const response = await fetch(googleSheetURL);
		if (response.status != 200) {
			throw new Error(`HTTP error! status: ${response.status}, ${response.statusText}, ${await response.text()}`);
        }
		const data = await response.json();
		return data.values.slice(1)
	} catch (error) {
		console.error('Error fetching data:', error);
	}
}

export function nameToURL(orgName) {
	let tempName = orgName.valueOf()
	const charsToRemove = " .()-@',&:/;";
	for ( let char of charsToRemove) {
		tempName = tempName.replaceAll(char, '')
	}
	return tempName
}

// Build URL based on selected value
export function buildURL(orgName="", givingID="", baseURL= "https://give.rit.edu/campaigns/52069/donations/new", defaultMessage = "Please enter a value in one or both of the inputs above") {
	const data = {};
	if ( orgName != ""){
		data.designation = nameToURL(orgName);
	}
	if ( givingID != ""){
		data.a = givingID;
	}
	const searchParams = new URLSearchParams(data);
	const res = `${baseURL}?${searchParams}`;
	if (res == baseURL) {
		return defaultMessage;
	}
	return res
}

export function extractGivingID(input) {
	// if givingidval is numerical
	const num = Number.parseInt(input)

	if (!isNaN(num)) {
		return input
	} else {
		
		// attempt to parse as a url
		try {
			const url = new URL(input);
			
			// extract the a parameter
			let aparam = url.searchParams.get('a');
			let aparamID = extractGivingID(aparam)
			if (aparamID)
				return aparamID
		} catch (error) {
			// Invalid URL, do nothing
			console.error("Error parsing attribution value: ", error);
			
		}
	}
}