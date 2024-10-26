import {fetchData, buildURL, extractGivingID} from '../main.mjs';
// import pkg from '../main.js';
// const {buildURL} = pkg;


describe("buildURL function", () => {
	it("should be able to generate identical urls to the original sheet", async () => {
		const inputs = await fetchData(undefined,  process.env.TEST_KEY).then(r => r.map(input => `${buildURL(input[0])}&`))

		const outputs = await fetchData("'Direct Giving Links'!B2:B500",process.env.TEST_KEY).then(r => r.map(row => row[0]))
						
		expect(inputs).toEqual(outputs)

	});
});

describe("extractGivingID function", () => {
	it("should be able to extract a number", async () => {
		expect(extractGivingID("12345")).toBe("12345")
	})

	it("should be able to extract the a parameter from a URL", async () => {
        expect(extractGivingID("https://give.rit.edu/campaigns/52069/donations/new?a=12345")).toBe("12345")
    })

	it("should fail on simple strings", async () => {
		expect(extractGivingID("abcd")).toBeUndefined()
	})

	it("should  strip spaces", async () => {
		expect(extractGivingID("12 34")).toEqual("1234")
	})

	it("should handle blanks", async () => {
		expect(extractGivingID("")).toEqual("")
	})

	it("should handle undefined", async () => {
		expect(extractGivingID(undefined)).toEqual("")
	})

	it("should handle null", async () => {
		expect(extractGivingID(null)).toEqual("")
	})
});