import { api, getFlightsUrl } from '../shared/api/api';

class AirportsService {
  constructor($http, $q) {
    'ngInject';

    this._$http = $http;
    this._$q = $q;
  }

  getAirportsInfo() {
    const deferred = this._$q.defer();
    const URL = `${api.baseUrl}${api.paths.airports}`;

    this._$http
      .get(URL)
      .then(this._onGetAirportsSuccess.bind(this, deferred))
      .catch(this._onError);

    return deferred.promise;
  }

  getFilteredAirports(airports = [], limitedRoutes, filterTerm = '') {
    const areLimitedRoutesDefined = !!limitedRoutes && !!limitedRoutes.length;
    const availableAirports = areLimitedRoutesDefined ? 
      this._getAvailableAirports(airports, limitedRoutes) : airports;
    return this._getFilteredAirports(availableAirports, filterTerm);
  }

  getRoutesFromAirport(routes, selectedAirport) {
    const possibleRoutes = routes[selectedAirport.iataCode];
    return possibleRoutes.map(iataCode => {
      return allAirports.find(airport => {
        return airport.iataCode === iataCode;
      });
    });
  }

  setSelectedAirport(airport = {}) {
    this._selectedAirportCode = airport.iataCode;
    this._findMatchingAirports();
  }

  _getAvailableAirports(airports, routes) {
    return routes.map(iataCode => {
      return airports.find(airport => {
        return airport.iataCode === iataCode;
      })
    })
  }

  _getFilteredAirports(airports, filterTerm) {
    const filter = filterTerm.toUpperCase();
    return airports.filter(airport => {
      return airport.country.toUpperCase().includes(filter)
        || airport.iataCode.toUpperCase().includes(filter)
        || airport.name.toUpperCase().includes(filter);
    });
  }

  _onGetAirportsSuccess(deferred, response = {}) {
    let isResponseOk = response.data 
      && response.data.airports 
      && response.data.routes

    if (!isResponseOk) {
      deferred.reject('EMPTY_RESPONSE');
      return;
    }

    deferred.resolve({
      airports: this._getParsedAirports(response.data.airports),
      routes: this._routes = response.data.routes
    });
  }

  _onGetAirportsFail(response) {
    console.debug('fail', response);
  }

  _onError(error) {
    console.debug("There's a problem with request to server:", error);
  }

  _getParsedAirports(airports = []) {
    return airports.map(airport => {
      return {
        country: airport.country.name,
        iataCode: airport.iataCode,
        name: airport.name
      }
    });
  };
}

export default AirportsService