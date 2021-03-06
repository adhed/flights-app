import { getFlightsUrl } from './api'

describe('Api', () => {
    describe('getFlightsPath()', () => {
        it('should return correct url for correct params', () => {
            const EXPECTED_URL = 'https://murmuring-ocean-10826.herokuapp.com/en/api/2/flights/from/DUB/to/STN/2014-12-02/2015-02-02/250/unique/?limit=15&offset-0';
            const params = {
                airportsCodes: {
                    departure: 'DUB',
                    destination: 'STN'
                },
                dates: {
                    start: '2014-12-02',
                    end: '2015-02-02'
                },
                limit: 15
            };
            expect(getFlightsUrl(params)).equal(EXPECTED_URL);
        });
    });
});