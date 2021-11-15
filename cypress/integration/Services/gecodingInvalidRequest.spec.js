describe("Test Google Geocoding API", () => {
    const apiKey = Cypress.env('GOOGLE_APIKEY')
    const urlDetails = Cypress.config("geocodeurl")
    it("Verify the Geocoding API work with API Key when output format is JSON without address parameter", () => {

        const outputFormat = "json"


        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { key: `${apiKey}` },
            failOnStatusCode: false
        }).should((response) => {
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.status, "successful geocoding API query when output format is JSON").to.equal(400)
        });

    })
})