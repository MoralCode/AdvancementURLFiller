# URLFiller

This project is a simple webpage that fetches data from a Google Sheets document, displays the data in a dropdown menu, and generates a URL based on the selected dropdown value.

The site was built to help simplify the formerly-manual process for fundraising ambassadors to easily build links both to firect donors to give to specific groups, as well as to associate those gifts with their fundraising efforts.


## Features

- Fetches data from a specified Google Sheets document using the Sheets API.
- Populates a dropdown menu with values from the sheet.
- Generates a URL based on the selected dropdown value.
- Includes unit tests to ensure critical parts of the code are correct


**Note**: Currently the code has a few things that are still hard-coded for one particular usecase. It may require some additional modifications to use for other purposes



## Getting Started with development

To get started, follow the steps below to set up and run the project locally.

### Prerequisites

- **Google Sheets API Key**: To fetch data from Google Sheets, you'll need your own API key as the one on the production site is locked to certain domains.
  - To get an API key youll need a project on google cloud.
  - Enable the **Google Sheets API** in the Google Cloud Console.
  - Create an API key Credential (you do not need to set up OAuth).
  - (Optional, STRONGLY recommended) Limit your API key to only the sheets API and only the domains you plan to use.
  - Follow [Google's Documentation](https://developers.google.com/workspace/guides/get-started) for more information
- A basic local server setup (for example, Python's `http.server` module) is recommended to avoid CORS issues while testing locally.

### Project Setup

1. Clone the Repository

2. Edit API key and base URL
   - Open `main.mjs`.
   - Replace the values on and around the line that starts with `export function buildURL(` with ones appropriate for your usecase. See the [Sheets API documentation](https://developers.google.com/sheets/api/guides/concepts) for more details.
     - the google sheet ID is the long random-looking value in the URL when you visit the google sheet
     - the range is the tab name and cell range
     - the key is your API key

3. **Run Locally**:
   - To run the app locally with a simple HTTP server Using Python 3:
	```bash
	python -m http.server 8000
	```
	Then, navigate to `http://localhost:8000` in your browser


## Running Tests

This project uses [Jasmine](https://jasmine.github.io/) for unit testing.

To set up testing, run `npm install`

If your API key is restricted to a certain domain, you may need to create a new one for testing.

To run the tests, run: `TEST_KEY="[YOUR TEST KEY]" npm test`
