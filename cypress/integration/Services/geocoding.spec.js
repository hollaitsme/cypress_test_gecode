describe("Test Google Geocoding API", () => {
    const apiKey = Cypress.env('GOOGLE_APIKEY')
    const location = "1600+Amphitheatre+Parkway,+Mountain + View, +CA "
    const urlDetails = Cypress.config("geocodeurl")

    // ERROR
    // INVALID_REQUEST
    // OK
    // OVER_QUERY_LIMIT
    // REQUEST_DENIED
    // UNKNOWN_ERROR
    // ZERO_RESULTS



    it("Verify the Geocoding API work with API Key when output format is JSON", () => {

        const outputFormat = "json"


        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.status, "successful geocoding API query when output format is JSON").to.equal(200)
        });

    })

    it("Verify the Geocoding API work with API Key when output format is XML", () => {
        const outputFormat = "xml"


        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query when output format is XML").to.equal(200)

            const xmlResponse = Cypress.$.parseXML(response.body)

            cy.log(response.body)
            console.log(xmlResponse)
            const geometryComponent = xmlResponse.getElementsByTagName('geometry')

            Cypress.$(geometryComponent).each(function () {
                cy.log(Cypress.$(this).find("location>lat").text())
            })

        });

    })


    it("Verify the Geocoding API work with API Key to validate Viewport biasing without Bounds parameter", () => {
        const outputFormat = "json"
        const location = "Winnetka"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate Viewport biasing").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("Winnetka, IL, USA")
        });

    })


    it("Verify the Geocoding API work with API Key to validate Viewport biasing with Bounds parameter", () => {

        const outputFormat = "json"
        const location = "Winnetka"
        const boundsDetails = "34.29934998585137, -118.45272565934661|34.280752392065224, -118.40480727225106"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, bounds: `${boundsDetails}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate Viewport biasing with Bounds parameter").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("Winnetka, Los Angeles, CA, USA")
        });

    })

    it("Verify the Geocoding API work with API Key to validate Region biasing default behvaior", () => {

        const outputFormat = "json"
        const location = "Toledo"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate Region biasing default behvaior").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("Toledo, OH, USA")
        });

    })

    it("Verify the Geocoding API work with API Key to validate Component Filtering", () => {

        const outputFormat = "json"
        const location = "High St, Hastings"
        const componentFilter = "country:GB"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, components: `${componentFilter}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate validate Component Filtering").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("High St, Hastings TN34, UK")
        });

    })

    it("Verify the Geocoding API work with API Key to validate Component Filtering", () => {

        const outputFormat = "json"
        const location = "High St, Hastings"
        const componentFilter = "country:GB"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { address: `${location}`, components: `${componentFilter}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate validate Component Filtering").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("High St, Hastings TN34, UK")
        });

    })

    it("Verify the Geocoding API work with API Key to validate Component Filtering with locality", () => {

        const outputFormat = "json"
        const componentFilter = "locality:santa+cruz|country:ES"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { components: `${componentFilter}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate validate Component Filtering with locality").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("Santa Cruz de Tenerife, Spain")
        });

    })

    it("Verify the Geocoding API work with API Key to validate Component Filtering  with response code ZERO_RESULTS", () => {

        const outputFormat = "json"
        const componentFilter = "administrative_area:TX|country:FR"

        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { components: `${componentFilter}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate validate Component Filtering with response code ZERO_RESULTS").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.status).to.eq("ZERO_RESULTS")
        });

    })
    it("Verify the Geocoding API work with API Key to validate Component Filtering without address field", () => {

        const outputFormat = "json"
        const componentFilter = "route:Annankatu|administrative_area:Helsinki|country:Finland"


        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { components: `${componentFilter}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful geocoding API query to validate Component Filtering without address field").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("Annankatu, Helsinki, Finland")
        });

    })

    it("Verify the Reverse Geocoding API work with API Key with locationType and resultType parameter", () => {

        const outputFormat = "json"
        const latlngValues = "40.714224,-73.961452"
        const locationTypeValue = "ROOFTOP"
        const resultTypeValue = "street_address"



        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { latlng: `${latlngValues}`, location_type: `${locationTypeValue}`, result_type: `${resultTypeValue}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successful Reverse Geocoding API work with API Key with locationType and resultType parameter").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("277 Bedford Ave, Brooklyn, NY 11211, USA")
        });

    })


    it("Verify the Retrieving an address for a Place ID", () => {

        const outputFormat = "json"
        const placeIDValue = "ChIJd8BlQ2BZwokRAFUEcm_qrcA"



        cy.request({
            method: 'GET',
            url: `${urlDetails}/${outputFormat}`,
            qs: { place_id: `${placeIDValue}`, key: `${apiKey}` },
        }).should((response) => {
            // all your assertions should be placed here!!
            expect(response.status, "successfully retrieving an address for a Place ID").to.equal(200)
            cy.log(JSON.stringify(response.body))
            expect(response.body).to.not.be.null
            expect(response.body.results[0].formatted_address).to.eq("277 Bedford Ave, Brooklyn, NY 11211, USA")
        });

    })

})