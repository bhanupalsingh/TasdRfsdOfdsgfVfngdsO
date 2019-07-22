/**
 *
 * AirSbt
 *
 */

import React from 'react';
import {injectIntl} from 'react-intl';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectAirSbt from './selectors';
import reducer from './reducer';
import saga from './saga';


import {tempData} from './utils/test';
import sort from './utils/sort';
import filter from './utils/filter';
import {addMissedSavingsArray} from './utils/core';
import {checkMissedSavingValue} from './utils/sbtRules';
//import Core from './utils/core';

import {getFlight,getFareRules,getSbtRules} from './actions';


class AirSbt extends React.Component {



  constructor(props) {
    super(props);
    this.searchFlight = this.searchFlight.bind(this);
    this.fetchFareRules = this.fetchFareRules.bind(this);
    this.sortByPrice = this.sortByPrice.bind(this);
    this.sortByTime = this.sortByTime.bind(this);
    this.filterByTime = this.filterByTime.bind(this);
    this.filterByAirline = this.filterByAirline.bind(this);
    this.filterByStop = this.filterByStop.bind(this);
    this.checkMissedSaving = this.checkMissedSaving.bind(this);
    this.fetchSbtRules = this.fetchSbtRules.bind(this);
  }


  sortByPrice(){
    var temp = sort(tempData,'price','ASC');
    for(var i=0;i<temp.length;i++){
      console.log(temp[i]['fareDetails']['RETAIL']['total']);
    }
  }


  sortByTime(){
    var temp = sort(tempData,'time','DESC');
    for(var i=0;i<temp.length;i++){
      console.log(temp[i]['direction'][0]['leg'][0]['departure_time']);
    }
  }

  filterByTime(){
    var temp = filter(tempData,'time',['7_8']);
    for(var i=0;i<temp.length;i++){
      console.log(temp[i]['direction'][0]['leg'][0]['departure_time']);
    }
  }

  filterByAirline(){
    var temp = filter(tempData,'airline',['SpiceJet','AirAsia']);
    for(var i=0;i<temp.length;i++){
      console.log(temp[i]['direction'][0]['leg'][0]['flight_name']);
    }
  }


  filterByStop(){
    var temp = filter(tempData,'stops' , [0,1]);
    for(var i=0;i<temp.length;i++){
      console.log(temp[i]['direction'][0]['stops']);
    }
  }

  checkMissedSaving(){
    const rule_object_map = {"bookButtonDisableAndTextChange":{"bookButtonDisableAndTextChange":{"desc":"","uiElementIds":["sbtbook","sbt_book_"],"sbtbook":"sbtselect","exceptionalBandList":["14","15","16"],"exceptionalUserType":["T"],"label":"Select Flight","alertMsg":"As per policy, you are not allowed to call back","deviationMsg":"As per policy, you are not allowed to call back","checkOnLoad":true,"alertLevel":"YELLOW","rule_id":""}},"missedSavingRules":{"missedSavingRules":{"message":" ","shouldAlertDeviation":true,"checkOnChange":true,"desc":" ","isApprover":false,"checkOnSubmit":true,"alertMsg":" ","uiElementId":"","alertLevel":"YELLOW","mins":"60","fareVariance":"80","isShowAllBtn":true,"numOfResults":"20","enableMissedSaving":true,"enableCorpFilter":true,"isDeviation":false,"rule_id":""}}};
    console.log("state",this.state);
    console.log("props",this.props);
    const globalEntities = { 'BLR_MAA_09-08-2019': {
      "entities": [
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "fareKey": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 983.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1921",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 1749.0",
              "bookingClass": "U",
              "fareBasicCode": "USAVER",
              "surcharges": [
                {
                  "total": "INR 766.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1749,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "fareKey": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 1071.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1922",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "aFEG1WY7EQk=|mqUR/wcIEiaA1hn7Vos2ufIRQ4RoR+mZoxJ5keXvNnmy77qaBaI0jp4jf5n8uAiZIpk0zx4cAPMReJGeO2eoWnSw2c43vKjilssgPvDH3rowFpK8ElHL3lZy9GUU2VOr73p+pLebG0Y=",
              "total": "INR 1841.0",
              "bookingClass": "U",
              "fareBasicCode": "UCORP",
              "surcharges": [
                {
                  "total": "INR 770.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1841,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "SG~3302~ ~~BLR~08/09/2019 07:40~MAA~08/09/2019 08:40~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "M52q/NdfJWA=|OyWyzAwu2wTE1Kf8M/zlkpqmEO6aex8QQ8Af8T8EBWrCbKSOMww5F5fOyaC8xSEJuvO/5I/L3XCy4w9P6LSalCymKL5YW0HoovMHt4DwL4ANwnPrD4Liu3+7sPFyF6irnmywBAu+DvA=",
          "to_city_country_id": "100",
          "from_city_country_id": "100",
          "trip_type": "onward",
          "provider": "SPICEJET",
          "isInternational": false,
          "currency_type": "INR",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "07:40",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": "1",
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "08:40",
                  "flight_image": "./images/flight-images/SG.png",
                  "flight_number": "3302",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T07:40:00",
                  "duration": "1h 0m",
                  "flight_code": "SG",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "SpiceJet",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T08:40:00",
                  "departure_time": "07:40"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "fareKey": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 983.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1921",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 1749.0",
              "bookingClass": "U",
              "fareBasicCode": "USAVER",
              "surcharges": [
                {
                  "total": "INR 766.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1749,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "fareKey": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 1071.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1922",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "aFEG1WY7EQk=|mqUR/wcIEiaA1hn7Vos2ufIRQ4RoR+mZoxJ5keXvNnmy77qaBaI0jp4jf5n8uAiZIpk0zx4cAPMReJGeO2eoWnSw2c43vKjilssgPvDH3rowFpK8ElHL3lZy9GUU2VOr73p+pLebG0Y=",
              "total": "INR 1841.0",
              "bookingClass": "U",
              "fareBasicCode": "UCORP",
              "surcharges": [
                {
                  "total": "INR 770.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1841,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "SG~1233~ ~~BLR~08/09/2019 18:15~MAA~08/09/2019 19:20~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "M52q/NdfJWA=|OyWyzAwu2wTE1Kf8M/zlkpqmEO6aex8QQ8Af8T8EBWrCbKSOMww5F5fOyaC8xSEJuvO/5I/L3XCy4w9P6LSalCymKL5YW0HoovMHt4DwL4ANwnPrD4Liu3+7sPFyF6irnmywBAu+DvA=",
          "to_city_country_id": "100",
          "from_city_country_id": "100",
          "trip_type": "onward",
          "provider": "SPICEJET",
          "isInternational": false,
          "currency_type": "INR",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "18:15",
          "direction": [
            {
              "duration": "1h 5m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": "1",
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "19:20",
                  "flight_image": "./images/flight-images/SG.png",
                  "flight_number": "1233",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T18:15:00",
                  "duration": "1h 5m",
                  "flight_code": "SG",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "SpiceJet",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T19:20:00",
                  "departure_time": "18:15"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "fareKey": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 983.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1921",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 1749.0",
              "bookingClass": "U",
              "fareBasicCode": "USAVER",
              "surcharges": [
                {
                  "total": "INR 766.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1749,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "fareKey": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 1071.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1922",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "aFEG1WY7EQk=|mqUR/wcIEiaA1hn7Vos2ufIRQ4RoR+mZoxJ5keXvNnmy77qaBaI0jp4jf5n8uAiZIpk0zx4cAPMReJGeO2eoWnSw2c43vKjilssgPvDH3rowFpK8ElHL3lZy9GUU2VOr73p+pLebG0Y=",
              "total": "INR 1841.0",
              "bookingClass": "U",
              "fareBasicCode": "UCORP",
              "surcharges": [
                {
                  "total": "INR 770.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1841,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "SG~3318~ ~~BLR~08/09/2019 21:50~MAA~08/09/2019 23:00~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "M52q/NdfJWA=|OyWyzAwu2wTE1Kf8M/zlkpqmEO6aex8QQ8Af8T8EBWrCbKSOMww5F5fOyaC8xSEJuvO/5I/L3XCy4w9P6LSalCymKL5YW0HoovMHt4DwL4ANwnPrD4Liu3+7sPFyF6irnmywBAu+DvA=",
          "to_city_country_id": "100",
          "from_city_country_id": "100",
          "trip_type": "onward",
          "provider": "SPICEJET",
          "isInternational": false,
          "currency_type": "INR",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "21:50",
          "direction": [
            {
              "duration": "1h 10m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": "1",
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "23:00",
                  "flight_image": "./images/flight-images/SG.png",
                  "flight_number": "3318",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T21:50:00",
                  "duration": "1h 10m",
                  "flight_code": "SG",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "SpiceJet",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T23:00:00",
                  "departure_time": "21:50"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "fareKey": "0~U~ ~SG~USAVER~1921~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 983.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1921",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 1749.0",
              "bookingClass": "U",
              "fareBasicCode": "USAVER",
              "surcharges": [
                {
                  "total": "INR 766.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1749,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "fareKey": "0~U~ ~SG~UCORP~1922~~0~20~~X",
              "BaseFare": [
                {
                  "total": "INR 1071.0",
                  "type": "BaseFare"
                }
              ],
              "rule_no": "1922",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "aFEG1WY7EQk=|mqUR/wcIEiaA1hn7Vos2ufIRQ4RoR+mZoxJ5keXvNnmy77qaBaI0jp4jf5n8uAiZIpk0zx4cAPMReJGeO2eoWnSw2c43vKjilssgPvDH3rowFpK8ElHL3lZy9GUU2VOr73p+pLebG0Y=",
              "total": "INR 1841.0",
              "bookingClass": "U",
              "fareBasicCode": "UCORP",
              "surcharges": [
                {
                  "total": "INR 770.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 1841,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "SG~3310~ ~~BLR~08/09/2019 22:40~MAA~08/09/2019 23:50~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "M52q/NdfJWA=|OyWyzAwu2wTE1Kf8M/zlkpqmEO6aex8QQ8Af8T8EBWrCbKSOMww5F5fOyaC8xSEJuvO/5I/L3XCy4w9P6LSalCymKL5YW0HoovMHt4DwL4ANwnPrD4Liu3+7sPFyF6irnmywBAu+DvA=",
          "to_city_country_id": "100",
          "from_city_country_id": "100",
          "trip_type": "onward",
          "provider": "SPICEJET",
          "isInternational": false,
          "currency_type": "INR",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "22:40",
          "direction": [
            {
              "duration": "1h 10m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": "1",
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "23:50",
                  "flight_image": "./images/flight-images/SG.png",
                  "flight_number": "3310",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T22:40:00",
                  "duration": "1h 10m",
                  "flight_code": "SG",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "SpiceJet",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T23:50:00",
                  "departure_time": "22:40"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2389~ ~~BLR~08/09/2019 07:25~MAA~08/09/2019 08:25~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>MAA</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-09T08:25:00</STA><STD>2019-08-09T07:25:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2389</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>4</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2780.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2780.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~4~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>MAA</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-09T08:25:00</STA><STD>2019-08-09T07:25:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2389</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-09T08:25:00</PaxSTA><PaxSTD>2019-08-09T07:25:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5578706</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2389~ ~~BLR~08/09/2019 07:25~MAA~08/09/2019 08:25~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "07:25",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "08:25",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2389",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T07:25:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T08:25:00",
                  "departure_time": "07:25"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2385~ ~~BLR~08/09/2019 14:35~MAA~08/09/2019 15:35~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>MAA</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-09T15:35:00</STA><STD>2019-08-09T14:35:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2385</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>4</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2780.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2780.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~4~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>MAA</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-09T15:35:00</STA><STD>2019-08-09T14:35:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2385</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-09T15:35:00</PaxSTA><PaxSTD>2019-08-09T14:35:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5578702</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2385~ ~~BLR~08/09/2019 14:35~MAA~08/09/2019 15:35~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "14:35",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "15:35",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2385",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T14:35:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T15:35:00",
                  "departure_time": "14:35"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~4~~X",
              "BaseFare": [
                {
                  "total": "INR 2780.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3641.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "4",
              "surcharges": [
                {
                  "total": "INR 861.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3641,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2383~ ~~BLR~08/09/2019 17:30~MAA~08/09/2019 18:30~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>MAA</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-09T18:30:00</STA><STD>2019-08-09T17:30:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2383</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>4</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2780.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2780.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~4~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>MAA</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-09T18:30:00</STA><STD>2019-08-09T17:30:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2383</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-09T18:30:00</PaxSTA><PaxSTD>2019-08-09T17:30:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5578700</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2383~ ~~BLR~08/09/2019 17:30~MAA~08/09/2019 18:30~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_MAA",
          "trip_code": "D",
          "arrive_city_code": "MAA",
          "segment_id": "BLR_MAA",
          "departure_time": "17:30",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "BLR_MAA",
              "stops": 0,
              "segment_id": "BLR_MAA",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "09/08/2019",
                  "arrival_time": "18:30",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2383",
                  "departure_date": "09/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-09T17:30:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "09/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "MAA",
                  "arrival_date": "09/08/2019",
                  "arrDt": "2019-08-09T18:30:00",
                  "departure_time": "17:30"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2386~ ~~MAA~08/15/2019 13:10~BLR~08/15/2019 14:05~~",
          "isGenericProvider": true,
          "depart_city_code": "MAA",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>BLR</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>MAA</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-15T14:05:00</STA><STD>2019-08-15T13:10:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2386</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>3111.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>3111.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>45.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>45.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>82.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>82.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>9</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>BLR</ArrivalStation><DepartureStation>MAA</DepartureStation><STA>2019-08-15T14:05:00</STA><STD>2019-08-15T13:10:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2386</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-15T14:05:00</PaxSTA><PaxSTD>2019-08-15T13:10:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5579418</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2386~ ~~MAA~08/15/2019 13:10~BLR~08/15/2019 14:05~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "MAA_BLR",
          "trip_code": "D",
          "arrive_city_code": "BLR",
          "segment_id": "MAA_BLR",
          "departure_time": "13:10",
          "direction": [
            {
              "duration": "0h 55m",
              "segment": "MAA_BLR",
              "stops": 0,
              "segment_id": "MAA_BLR",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "15/08/2019",
                  "arrival_time": "14:05",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2386",
                  "departure_date": "15/08/2019",
                  "source_city_code": "MAA",
                  "type": "Leg",
                  "depDt": "2019-08-15T13:10:00",
                  "duration": "0h 55m",
                  "flight_code": "I5",
                  "org_arrival_date": "15/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "BLR",
                  "arrival_date": "15/08/2019",
                  "arrDt": "2019-08-15T14:05:00",
                  "departure_time": "13:10"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2384~ ~~MAA~08/15/2019 16:05~BLR~08/15/2019 17:05~~",
          "isGenericProvider": true,
          "depart_city_code": "MAA",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>BLR</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>MAA</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-15T17:05:00</STA><STD>2019-08-15T16:05:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2384</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>3111.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>3111.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>45.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>45.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>82.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>82.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>9</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>BLR</ArrivalStation><DepartureStation>MAA</DepartureStation><STA>2019-08-15T17:05:00</STA><STD>2019-08-15T16:05:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2384</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-15T17:05:00</PaxSTA><PaxSTD>2019-08-15T16:05:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5579416</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2384~ ~~MAA~08/15/2019 16:05~BLR~08/15/2019 17:05~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "MAA_BLR",
          "trip_code": "D",
          "arrive_city_code": "BLR",
          "segment_id": "MAA_BLR",
          "departure_time": "16:05",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "MAA_BLR",
              "stops": 0,
              "segment_id": "MAA_BLR",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "15/08/2019",
                  "arrival_time": "17:05",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2384",
                  "departure_date": "15/08/2019",
                  "source_city_code": "MAA",
                  "type": "Leg",
                  "depDt": "2019-08-15T16:05:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "15/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "BLR",
                  "arrival_date": "15/08/2019",
                  "arrDt": "2019-08-15T17:05:00",
                  "departure_time": "16:05"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "fareKey": "0~A~~AK~A01H00H~AAB1~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 3111.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3677.0",
              "bookingClass": "A",
              "fareBasicCode": "A01H00H",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 566.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3677,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2380~ ~~MAA~08/15/2019 23:35~BLR~08/16/2019 00:35~~",
          "isGenericProvider": true,
          "depart_city_code": "MAA",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>BLR</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>MAA</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-16T00:35:00</STA><STD>2019-08-15T23:35:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2380</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>3111.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>3111.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>45.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>45.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>82.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>82.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>81.00000</Amount><ChargeDetail>MAA-BLR</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>81.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>9</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>BLR</ArrivalStation><DepartureStation>MAA</DepartureStation><STA>2019-08-16T00:35:00</STA><STD>2019-08-15T23:35:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2380</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-16T00:35:00</PaxSTA><PaxSTD>2019-08-15T23:35:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5579412</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2380~ ~~MAA~08/15/2019 23:35~BLR~08/16/2019 00:35~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "MAA_BLR",
          "trip_code": "D",
          "arrive_city_code": "BLR",
          "segment_id": "MAA_BLR",
          "departure_time": "23:35",
          "direction": [
            {
              "duration": "1h 0m",
              "segment": "MAA_BLR",
              "stops": 0,
              "segment_id": "MAA_BLR",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "15/08/2019",
                  "arrival_time": "00:35",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2380",
                  "departure_date": "15/08/2019",
                  "source_city_code": "MAA",
                  "type": "Leg",
                  "depDt": "2019-08-15T23:35:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "16/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "BLR",
                  "arrival_date": "16/08/2019",
                  "arrDt": "2019-08-16T00:35:00",
                  "departure_time": "23:35"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~ 592~ ~~BLR~08/21/2019 22:55~CCU~08/22/2019 01:40~~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-22T01:40:00</STA><STD>2019-08-21T22:55:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 592</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>INDM</RuleNumber><FareBasisCode>Z01H00</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2242.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2242.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~Z~~AK~Z01H00~INDM~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>29</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-22T01:40:00</STA><STD>2019-08-21T22:55:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 592</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-22T01:40:00</PaxSTA><PaxSTD>2019-08-21T22:55:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>1</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5726660</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~ 592~ ~~BLR~08/21/2019 22:55~CCU~08/22/2019 01:40~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "22:55",
          "direction": [
            {
              "duration": "2h 45m",
              "segment": "BLR_CCU",
              "stops": 0,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "01:40",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 592",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T22:55:00",
                  "duration": "2h 45m",
                  "flight_code": "I5",
                  "org_arrival_date": "22/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "22/08/2019",
                  "arrDt": "2019-08-22T01:40:00",
                  "departure_time": "22:55"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2678~ ~~BLR~08/21/2019 05:45~CCU~08/21/2019 09:55~NAG~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T09:55:00</STA><STD>2019-08-21T05:45:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2678</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>INDM</RuleNumber><FareBasisCode>Z01H00</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2242.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2242.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~Z~~AK~Z01H00~INDM~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>27</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>NAG</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-21T07:35:00</STA><STD>2019-08-21T05:45:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2678</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T07:35:00</PaxSTA><PaxSTD>2019-08-21T05:45:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5726673</InventoryLegID></Leg><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>NAG</DepartureStation><STA>2019-08-21T09:55:00</STA><STD>2019-08-21T08:00:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2678</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T09:55:00</PaxSTA><PaxSTD>2019-08-21T08:00:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5726674</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2678~ ~~BLR~08/21/2019 05:45~CCU~08/21/2019 09:55~NAG~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "05:45",
          "direction": [
            {
              "duration": "4h 10m",
              "segment": "BLR_CCU",
              "stops": 1,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "07:35",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2678",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T05:45:00",
                  "duration": "1h 50m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "NAG",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T07:35:00",
                  "departure_time": "05:45"
                },
                {
                  "no_of_stops": 1,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "09:55",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2678",
                  "departure_date": "21/08/2019",
                  "source_city_code": "NAG",
                  "type": "Leg",
                  "depDt": "2019-08-21T08:00:00",
                  "duration": "1h 55m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T09:55:00",
                  "departure_time": "08:00"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~ 536~ ~~BLR~08/21/2019 11:00~CCU~08/21/2019 14:40~BBI~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T14:40:00</STA><STD>2019-08-21T11:00:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 536</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>INDM</RuleNumber><FareBasisCode>Z01H00</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2242.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2242.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~Z~~AK~Z01H00~INDM~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>19</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>BBI</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-21T13:00:00</STA><STD>2019-08-21T11:00:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 536</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T13:00:00</PaxSTA><PaxSTD>2019-08-21T11:00:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>1</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580020</InventoryLegID></Leg><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>BBI</DepartureStation><STA>2019-08-21T14:40:00</STA><STD>2019-08-21T13:25:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 536</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T14:40:00</PaxSTA><PaxSTD>2019-08-21T13:25:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>1</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580019</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~ 536~ ~~BLR~08/21/2019 11:00~CCU~08/21/2019 14:40~BBI~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "11:00",
          "direction": [
            {
              "duration": "3h 40m",
              "segment": "BLR_CCU",
              "stops": 1,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "13:00",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 536",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T11:00:00",
                  "duration": "2h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "BBI",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T13:00:00",
                  "departure_time": "11:00"
                },
                {
                  "no_of_stops": 1,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "14:40",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 536",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BBI",
                  "type": "Leg",
                  "depDt": "2019-08-21T13:25:00",
                  "duration": "1h 15m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T14:40:00",
                  "departure_time": "13:25"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "fareKey": "0~Z~~AK~Z01H00~INDM~~0~3~~X",
              "BaseFare": [
                {
                  "total": "INR 2242.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "INDM",
              "fareApplicationType": "Route",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 3075.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H00",
              "FareSequence": "3",
              "surcharges": [
                {
                  "total": "INR 833.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 3075,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~1562~ ~~BLR~08/21/2019 15:50~CCU~08/21/2019 19:30~BBI~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T19:30:00</STA><STD>2019-08-21T15:50:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>1562</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>INDM</RuleNumber><FareBasisCode>Z01H00</FareBasisCode><FareSequence>3</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2242.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2242.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>60.0000</Amount><ChargeDetail>BLR-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>60.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~Z~~AK~Z01H00~INDM~~0~3~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>20</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>BBI</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-21T17:50:00</STA><STD>2019-08-21T15:50:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>1562</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T17:50:00</PaxSTA><PaxSTD>2019-08-21T15:50:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580101</InventoryLegID></Leg><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>BBI</DepartureStation><STA>2019-08-21T19:30:00</STA><STD>2019-08-21T18:15:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>1562</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T19:30:00</PaxSTA><PaxSTD>2019-08-21T18:15:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580100</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~1562~ ~~BLR~08/21/2019 15:50~CCU~08/21/2019 19:30~BBI~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "15:50",
          "direction": [
            {
              "duration": "3h 40m",
              "segment": "BLR_CCU",
              "stops": 1,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "17:50",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "1562",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T15:50:00",
                  "duration": "2h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "BBI",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T17:50:00",
                  "departure_time": "15:50"
                },
                {
                  "no_of_stops": 1,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "19:30",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "1562",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BBI",
                  "type": "Leg",
                  "depDt": "2019-08-21T18:15:00",
                  "duration": "1h 15m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T19:30:00",
                  "departure_time": "18:15"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "fareKey": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "BaseFare": [
                {
                  "total": "INR 7585.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Governing",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 8792.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H02",
              "FareSequence": "6",
              "surcharges": [
                {
                  "total": "INR 1207.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 8792,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "fareKey": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "BaseFare": [
                {
                  "total": "INR 7585.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Governing",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 8792.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H02",
              "FareSequence": "6",
              "surcharges": [
                {
                  "total": "INR 1207.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 8792,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~ 722~ ~~BLR~08/21/2019 03:55~DEL~08/21/2019 06:45~~^I5~ 545~ ~~DEL~08/21/2019 11:30~CCU~08/21/2019 14:45~IXR~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>DEL</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T06:45:00</STA><STD>2019-08-21T03:55:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 722</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>E</ClassOfService><ClassType/><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>IND1</RuleNumber><FareBasisCode>E01H00</FareBasisCode><FareSequence>1</FareSequence><FareClassOfService>E</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Sector</FareApplicationType><OriginalClassOfService>E</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>1200.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>1200.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>ConnectionAdjustmentAmount</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>1300.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>1300.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>DEL-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>197.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>197.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>197.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>197.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EP</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>1~E~~AK~E01H00~IND1~~0~1~~</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>DEL</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-21T06:45:00</STA><STD>2019-08-21T03:55:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 722</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T06:45:00</PaxSTA><PaxSTD>2019-08-21T03:55:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580038</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~ 722~ ~~BLR~08/21/2019 03:55~DEL~08/21/2019 06:45~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>DEL</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T14:45:00</STA><STD>2019-08-21T11:30:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType/><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>Z01H02</FareBasisCode><FareSequence>6</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Governing</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>5085.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>5085.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>2~Z~~AK~Z01H02~AAB1~~0~6~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>IXR</ArrivalStation><DepartureStation>DEL</DepartureStation><STA>2019-08-21T13:20:00</STA><STD>2019-08-21T11:30:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T13:20:00</PaxSTA><PaxSTD>2019-08-21T11:30:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580023</InventoryLegID></Leg><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>IXR</DepartureStation><STA>2019-08-21T14:45:00</STA><STD>2019-08-21T13:45:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T14:45:00</PaxSTA><PaxSTD>2019-08-21T13:45:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580024</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~ 545~ ~~DEL~08/21/2019 11:30~CCU~08/21/2019 14:45~IXR~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "11:30",
          "direction": [
            {
              "duration": "3h 15m",
              "segment": "BLR_CCU",
              "stops": 2,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "06:45",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 722",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T03:55:00",
                  "duration": "2h 50m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "DEL",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T06:45:00",
                  "departure_time": "03:55"
                },
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "13:20",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 545",
                  "departure_date": "21/08/2019",
                  "source_city_code": "DEL",
                  "type": "Leg",
                  "depDt": "2019-08-21T11:30:00",
                  "duration": "1h 50m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "IXR",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T13:20:00",
                  "departure_time": "11:30"
                },
                {
                  "no_of_stops": 1,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "14:45",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 545",
                  "departure_date": "21/08/2019",
                  "source_city_code": "IXR",
                  "type": "Leg",
                  "depDt": "2019-08-21T13:45:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T14:45:00",
                  "departure_time": "13:45"
                }
              ]
            }
          ]
        },
        {
          "fareDetails": {
            "RETAIL": {
              "fare_sell_key": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "fareKey": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "BaseFare": [
                {
                  "total": "INR 7585.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Governing",
              "corpRate": false,
              "comboCode": "",
              "type": "total",
              "total": "INR 8792.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H02",
              "FareSequence": "6",
              "surcharges": [
                {
                  "total": "INR 1207.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 8792,
              "refundable": ""
            },
            "CORP": {
              "fare_sell_key": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "fareKey": "2~Z~~AK~Z01H02~AAB1~~0~6~~X",
              "BaseFare": [
                {
                  "total": "INR 7585.0",
                  "type": "BaseFare"
                }
              ],
              "discount": [
                {
                  "total": "INR 0.0",
                  "type": "Discount"
                }
              ],
              "rule_no": "AAB1",
              "fareApplicationType": "Governing",
              "corpRate": "",
              "comboCode": "",
              "type": "total",
              "securityToken": "jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=",
              "total": "INR 8792.0",
              "bookingClass": "Z",
              "fareBasicCode": "Z01H02",
              "FareSequence": "6",
              "surcharges": [
                {
                  "total": "INR 1207.0",
                  "type": "Surcharges"
                }
              ],
              "tot": 8792,
              "refundable": ""
            },
            "type": "Fare"
          },
          "journey_sell_key": "I5~2878~ ~~BLR~08/21/2019 04:50~DEL~08/21/2019 07:35~~^I5~ 545~ ~~DEL~08/21/2019 11:30~CCU~08/21/2019 14:45~IXR~",
          "isGenericProvider": true,
          "depart_city_code": "BLR",
          "sellCurrency": "INR",
          "type": "Air",
          "direction_type": "O",
          "securityToken": "oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=",
          "trip_type": "multi",
          "provider": "AIRASIA",
          "isInternational": false,
          "currency_type": "INR",
          "segmentsXml": "<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>DEL</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T07:35:00</STA><STD>2019-08-21T04:50:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2878</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>E</ClassOfService><ClassType/><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>IND1</RuleNumber><FareBasisCode>E01H00</FareBasisCode><FareSequence>1</FareSequence><FareClassOfService>E</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Sector</FareApplicationType><OriginalClassOfService>E</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>1200.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>1200.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>ConnectionAdjustmentAmount</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>1300.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>1300.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>DEL-CCU</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>197.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>197.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>197.00000</Amount><ChargeDetail>BLR-DEL</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>197.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EP</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>1~E~~AK~E01H00~IND1~~0~1~~</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>10</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>DEL</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-21T07:35:00</STA><STD>2019-08-21T04:50:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2878</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T07:35:00</PaxSTA><PaxSTD>2019-08-21T04:50:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5726676</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2878~ ~~BLR~08/21/2019 04:50~DEL~08/21/2019 07:35~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>CCU</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>DEL</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-21T14:45:00</STA><STD>2019-08-21T11:30:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>Z</ClassOfService><ClassType/><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>Z01H02</FareBasisCode><FareSequence>6</FareSequence><FareClassOfService>Z</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Governing</FareApplicationType><OriginalClassOfService>Z</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>5085.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>5085.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>2~Z~~AK~Z01H02~AAB1~~0~6~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>10</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>IXR</ArrivalStation><DepartureStation>DEL</DepartureStation><STA>2019-08-21T13:20:00</STA><STD>2019-08-21T11:30:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T13:20:00</PaxSTA><PaxSTD>2019-08-21T11:30:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580023</InventoryLegID></Leg><Leg><State>Clean</State><ArrivalStation>CCU</ArrivalStation><DepartureStation>IXR</DepartureStation><STA>2019-08-21T14:45:00</STA><STD>2019-08-21T13:45:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber> 545</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-21T14:45:00</PaxSTA><PaxSTD>2019-08-21T13:45:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5580024</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~ 545~ ~~DEL~08/21/2019 11:30~CCU~08/21/2019 14:45~IXR~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>",
          "segment": "BLR_CCU",
          "trip_code": "D",
          "arrive_city_code": "CCU",
          "segment_id": "BLR_CCU",
          "departure_time": "11:30",
          "direction": [
            {
              "duration": "3h 15m",
              "segment": "BLR_CCU",
              "stops": 2,
              "segment_id": "BLR_CCU",
              "type": "Air",
              "leg": [
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "07:35",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": "2878",
                  "departure_date": "21/08/2019",
                  "source_city_code": "BLR",
                  "type": "Leg",
                  "depDt": "2019-08-21T04:50:00",
                  "duration": "2h 45m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "DEL",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T07:35:00",
                  "departure_time": "04:50"
                },
                {
                  "no_of_stops": 0,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "13:20",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 545",
                  "departure_date": "21/08/2019",
                  "source_city_code": "DEL",
                  "type": "Leg",
                  "depDt": "2019-08-21T11:30:00",
                  "duration": "1h 50m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "IXR",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T13:20:00",
                  "departure_time": "11:30"
                },
                {
                  "no_of_stops": 1,
                  "org_depart_date": "21/08/2019",
                  "arrival_time": "14:45",
                  "flight_image": "./images/flight-images/I5.png",
                  "flight_number": " 545",
                  "departure_date": "21/08/2019",
                  "source_city_code": "IXR",
                  "type": "Leg",
                  "depDt": "2019-08-21T13:45:00",
                  "duration": "1h 0m",
                  "flight_code": "I5",
                  "org_arrival_date": "21/08/2019",
                  "flight_name": "Air Asia",
                  "destination_city_code": "CCU",
                  "arrival_date": "21/08/2019",
                  "arrDt": "2019-08-21T14:45:00",
                  "departure_time": "13:45"
                }
              ]
            }
          ]
        }
      ],
      "config": {}
    }};
    
    const selectedEntity = {"fareDetails":{"RETAIL":{"fare_sell_key":"0~A~~AK~A01H00H~AAB1~~0~4~~X","fareKey":"0~A~~AK~A01H00H~AAB1~~0~4~~X","BaseFare":[{"total":"INR 2780.0","type":"BaseFare"}],"discount":[{"total":"INR 0.0","type":"Discount"}],"rule_no":"AAB1","fareApplicationType":"Route","corpRate":false,"comboCode":"","type":"total","total":"INR 3641.0","bookingClass":"A","fareBasicCode":"A01H00H","FareSequence":"4","surcharges":[{"total":"INR 861.0","type":"Surcharges"}],"tot":3641,"refundable":""},"CORP":{"fare_sell_key":"0~A~~AK~A01H00H~AAB1~~0~4~~X","fareKey":"0~A~~AK~A01H00H~AAB1~~0~4~~X","BaseFare":[{"total":"INR 2780.0","type":"BaseFare"}],"discount":[{"total":"INR 0.0","type":"Discount"}],"rule_no":"AAB1","fareApplicationType":"Route","corpRate":"","comboCode":"","type":"total","securityToken":"jOReHHFXGg4=|8j2nBjgk5gQ0NhAYUW58a/Jis0EmfYNy4/gZ1tdO25O5pznI+5x7BmEss4AlkAoEATO6uu4s3ZJ0Cepq8nORBll0I1dY6ZDIqunKK+Cqtam2bxBcZ/Hv9XKZQJWmo/taRSpROHHo6Mk=","total":"INR 3641.0","bookingClass":"A","fareBasicCode":"A01H00H","FareSequence":"4","surcharges":[{"total":"INR 861.0","type":"Surcharges"}],"tot":3641,"refundable":""},"type":"Fare"},"journey_sell_key":"I5~2389~ ~~BLR~08/09/2019 07:25~MAA~08/09/2019 08:25~~","isGenericProvider":true,"depart_city_code":"BLR","sellCurrency":"INR","type":"Air","direction_type":"O","securityToken":"oIQCYdHfA0w=|nrosVSwcf/AiOJdkY1BJ9fKCl7RfZ+/ESNgBQqx44/YzlIgRFUjcGNah4XsmxHZBZ6BHfuSikWohLUIhKW0or2ONDBtOz5T0tVdsk4ZdMhLoSZcLl202SEARwN/xJ369b8hV+z+A+wo=","trip_type":"multi","provider":"AIRASIA","isInternational":false,"currency_type":"INR","segmentsXml":"<Segments xmlns=\"http://tempuri.org/\"><Segment><State>Clean</State><ActionStatusCode/><ArrivalStation>MAA</ArrivalStation><CabinOfService> </CabinOfService><ChangeReasonCode/><DepartureStation>BLR</DepartureStation><PriorityCode/><SegmentType/><STA>2019-08-09T08:25:00</STA><STD>2019-08-09T07:25:00</STD><International>false</International><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2389</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><XrefFlightDesignator><State>New</State><CarrierCode/><FlightNumber/><OpSuffix> </OpSuffix></XrefFlightDesignator><Fares><Fare><State>New</State><ClassOfService>A</ClassOfService><ClassType> </ClassType><RuleTariff/><CarrierCode>AK</CarrierCode><RuleNumber>AAB1</RuleNumber><FareBasisCode>A01H00H</FareBasisCode><FareSequence>4</FareSequence><FareClassOfService>A</FareClassOfService><FareStatus>Default</FareStatus><FareApplicationType>Route</FareApplicationType><OriginalClassOfService>A</OriginalClassOfService><XrefClassOfService/><PaxFares><PaxFare><State>New</State><PaxType>ADT</PaxType><PaxDiscountCode/><FareDiscountCode/><ServiceCharges><BookingServiceCharge><ChargeType>FarePrice</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode/><TicketCode/><CurrencyCode>INR</CurrencyCode><Amount>2780.0000</Amount><ChargeDetail/><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>2780.0000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CUTE</ChargeCode><TicketCode>CUT</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>75.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>75.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGI</ChargeCode><TicketCode>SGI</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>100.000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>100.000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>ASF</ChargeCode><TicketCode>ASF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>177.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>177.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>TravelFee</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>UDF</ChargeCode><TicketCode>UDF</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>361.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>361.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>CGST</ChargeCode><TicketCode>CST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge><BookingServiceCharge><ChargeType>Tax</ChargeType><CollectType>SellerChargeable</CollectType><ChargeCode>SGST</ChargeCode><TicketCode>SST</TicketCode><CurrencyCode>INR</CurrencyCode><Amount>74.00000</Amount><ChargeDetail>BLR-MAA</ChargeDetail><ForeignCurrencyCode>INR</ForeignCurrencyCode><ForeignAmount>74.00000</ForeignAmount><BaseAmount>0</BaseAmount></BookingServiceCharge></ServiceCharges></PaxFare></PaxFares><ProductClass>EC</ProductClass><IsAllotmentMarketFare>false</IsAllotmentMarketFare><TravelClassCode> </TravelClassCode><FareSellKey>0~A~~AK~A01H00H~AAB1~~0~4~~X</FareSellKey><InboundOutbound>Both</InboundOutbound><AvailableCount>7</AvailableCount><Status>Active</Status><SSRIndexes/></Fare></Fares><Legs><Leg><State>Clean</State><ArrivalStation>MAA</ArrivalStation><DepartureStation>BLR</DepartureStation><STA>2019-08-09T08:25:00</STA><STD>2019-08-09T07:25:00</STD><FlightDesignator><State>New</State><CarrierCode>I5</CarrierCode><FlightNumber>2389</FlightNumber><OpSuffix> </OpSuffix></FlightDesignator><LegInfo><State>Clean</State><AdjustedCapacity>180</AdjustedCapacity><EquipmentType>320</EquipmentType><EquipmentTypeSuffix>F</EquipmentTypeSuffix><ArrivalTerminal/><ArrvLTV>330</ArrvLTV><Capacity>180</Capacity><CodeShareIndicator> </CodeShareIndicator><DepartureTerminal/><DeptLTV>330</DeptLTV><ETicket>true</ETicket><FlifoUpdated>false</FlifoUpdated><IROP>false</IROP><Status>Normal</Status><Lid>180</Lid><OnTime> </OnTime><PaxSTA>2019-08-09T08:25:00</PaxSTA><PaxSTD>2019-08-09T07:25:00</PaxSTD><PRBCCode>I5Y180</PRBCCode><ScheduleServiceType>J</ScheduleServiceType><Sold>0</Sold><OutMoveDays>0</OutMoveDays><BackMoveDays>0</BackMoveDays><LegSSRs><LegSSR><State>New</State><SSRNestCode>GUNS</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>INFT</SSRNestCode><SSRLid>10</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>LNGE</SSRNestCode><SSRLid>3</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>ME18</SSRNestCode><SSRLid>0</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>MEI5</SSRNestCode><SSRLid>1500</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>PCMK</SSRNestCode><SSRLid>1000</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SMI5</SSRNestCode><SSRLid>5</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHL</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR><LegSSR><State>New</State><SSRNestCode>SPHQ</SSRNestCode><SSRLid>2</SSRLid><SSRSold>0</SSRSold><SSRValueSold>0</SSRValueSold></LegSSR></LegSSRs><OperatingFlightNumber>    </OperatingFlightNumber><OperatedByText/><OperatingCarrier/><OperatingOpSuffix> </OperatingOpSuffix><SubjectToGovtApproval>false</SubjectToGovtApproval><MarketingCode/><ChangeOfDirection>false</ChangeOfDirection><MarketingOverride>false</MarketingOverride></LegInfo><InventoryLegID>5578706</InventoryLegID></Leg></Legs><SalesDate>9999-12-31T00:00:00Z</SalesDate><SegmentSellKey>I5~2389~ ~~BLR~08/09/2019 07:25~MAA~08/09/2019 08:25~~</SegmentSellKey><ChannelType>Default</ChannelType></Segment></Segments>","segment":"BLR_MAA","trip_code":"D","arrive_city_code":"MAA","segment_id":"BLR_MAA","departure_time":"07:25","direction":[{"duration":"1h 0m","segment":"BLR_MAA","stops":0,"segment_id":"BLR_MAA","type":"Air","leg":[{"no_of_stops":0,"org_depart_date":"09/08/2019","arrival_time":"08:25","flight_image":"./images/flight-images/I5.png","flight_number":"2389","departure_date":"09/08/2019","source_city_code":"BLR","type":"Leg","depDt":"2019-08-09T07:25:00","duration":"1h 0m","flight_code":"I5","org_arrival_date":"09/08/2019","flight_name":"Air Asia","destination_city_code":"MAA","arrival_date":"09/08/2019","arrDt":"2019-08-09T08:25:00","departure_time":"07:25"}]}],"paymentType":"D","isBookable":"Y","isSelectable":"Y","isMultiSelect":"N","razorPayApiCharges":"2.0","pgGstcharge":"18","id":"AIRASIA_0","selected_fare":"base","segHighFare":3641,"segLowFare":1841,"missedSavingArr":[{"departureDate":"2019-08-09","departureTime":"07:40","arrivalDate":"2019-08-09","arrivalTime":"08:40","departureCityCode":"BLR","arrivalCityCode":"MAA","corpRate":"1841.0","ratailRate":"1749.0","flightName":"SpiceJet","flightNumber":"3302"},{"departureDate":"2019-08-09","departureTime":"07:25","arrivalDate":"2019-08-09","arrivalTime":"08:25","departureCityCode":"BLR","arrivalCityCode":"MAA","corpRate":"3641.0","ratailRate":"3641.0","flightName":"Air Asia","flightNumber":"2389"}]};
    const sectorMulticity = '{"2019-08-09_BLR_MAA":{"end_date":"2019-08-09","drop_point":"","city_destination_airport_long":"","from_city_lon":"77.70629900000","city_origin_iata_code":"BLR","last_modified_date":"","created_at":"2019-07-19 15:38:33.0","to_city":"Chennai, Tamil Nadu, India","type":"CITY","option_mail_send_status":"","sector_destination_city":"","work_location":"","from_city_country_id":"100","to_city_lon":"80.16929626465","city_origin_airport_lat":"","city_destination_airport_lat":"","city_origin_airport_long":"","preferred_time_cout":"","id":"141886","modified_at":"","origin_city_id":"1173","destination_city_id":"1170","start_date":"2019-08-09","merged_sector_data":"","from_city":"Bangalore, Karnataka, India","to_city_lat":"12.99000549316","city_destination_iata_code":"MAA","from_city_lat":"13.19790000000","to_city_country_id":"100","boarding_point":"","preferred_time":"06:15","merged_sector_id":"","is_sector_available":"true","service_leg_id":"","confirmed_by":"","modified_by":"","created_date":"","request_id":"98609","is_modified":"N","city_id":"98609","status":"A"},"2019-08-15_MAA_BLR":{"end_date":"2019-08-15","drop_point":"","city_destination_airport_long":"","from_city_lon":"80.16929626465","city_origin_iata_code":"MAA","last_modified_date":"","created_at":"2019-07-19 15:38:33.0","to_city":"Bangalore, Karnataka, India","type":"CITY","option_mail_send_status":"","sector_destination_city":"","work_location":"","from_city_country_id":"100","to_city_lon":"77.70629900000","city_origin_airport_lat":"","city_destination_airport_lat":"","city_origin_airport_long":"","preferred_time_cout":"","id":"141887","modified_at":"","origin_city_id":"1170","destination_city_id":"1173","start_date":"2019-08-15","merged_sector_data":"","from_city":"Chennai, Tamil Nadu, India","to_city_lat":"13.19790000000","city_destination_iata_code":"BLR","from_city_lat":"12.99000549316","to_city_country_id":"100","boarding_point":"","preferred_time":"06:15","merged_sector_id":"","is_sector_available":"true","service_leg_id":"","confirmed_by":"","modified_by":"","created_date":"","request_id":"98609","is_modified":"N","city_id":"98609","status":"A"},"2019-08-21_BLR_CCU":{"end_date":"2019-08-21","drop_point":"","city_destination_airport_long":"","from_city_lon":"77.70629900000","city_origin_iata_code":"BLR","last_modified_date":"","created_at":"2019-07-19 15:38:33.0","to_city":"Kolkata, West Bengal, India","type":"CITY","option_mail_send_status":"","sector_destination_city":"","work_location":"","from_city_country_id":"100","to_city_lon":"88.44670104980","city_origin_airport_lat":"","city_destination_airport_lat":"","city_origin_airport_long":"","preferred_time_cout":"","id":"141888","modified_at":"","origin_city_id":"1173","destination_city_id":"5792","start_date":"2019-08-21","merged_sector_data":"","from_city":"Bangalore, Karnataka, India","to_city_lat":"22.65469932556","city_destination_iata_code":"CCU","from_city_lat":"13.19790000000","to_city_country_id":"100","boarding_point":"","preferred_time":"06:30","merged_sector_id":"","is_sector_available":"true","service_leg_id":"","confirmed_by":"","modified_by":"","created_date":"","request_id":"98609","is_modified":"N","city_id":"98609","status":"A"}}';
    const sectorMultiCityMappingInfo = JSON.parse(sectorMulticity);
    const currentEntity = addMissedSavingsArray(selectedEntity,rule_object_map,globalEntities,sectorMultiCityMappingInfo);
    

    const _selection = {"2019-08-09_BLR_MAA" : currentEntity};
    var alert_level_map = {};
    alert_level_map = checkMissedSavingValue(rule_object_map['missedSavingRules'],'missedSavingRules',true,_selection,alert_level_map);
    console.log(alert_level_map);
  }


  searchFlight(){
   
    const searchString = [{"adult_count":"1","children_count":"0","depart_date":"08/14/2019","depart_city_code":"BLR","arrive_city_code":"MAA","segment":"BLR_MAA","class_type":"economy","preferred_time":"07:00","trip_request_id":"7788","segment-name":"Bangalore (BLR)_Chennai (MAA)","from_city_country_id":"","to_city_country_id":"","user_country_id":"100"}];
    const searchBody = {
      'searchData' : JSON.stringify(searchString),
      'gvFlightType' : 'one-way',
      'providerId' : 'TRAFORM',
      'corpId' : '467',
      'corpGroupId' : '247',
      'userId' : '189252'
    }
   
    this.props.getFlight(searchBody);
  }



  fetchSbtRules(){
    const qryParams =  {'corp_group_id':247};
    this.props.getSbtRules(qryParams);
  }



  fetchFareRules(selectedEntity){

    var selectedEntity = '{"fareDetails":{"RETAIL":{"fare_sell_key":"0~U~ ~SG~USAVER~1921~~0~13~~X","fareKey":"0~U~ ~SG~USAVER~1921~~0~13~~X","BaseFare":[{"total":"INR 1173.0","type":"BaseFare"}],"rule_no":"1921","corpRate":false,"comboCode":"","type":"total","total":"INR 1648.0","bookingClass":"U","fareBasicCode":"USAVER","surcharges":[{"total":"INR 475.0","type":"Surcharges"}],"tot":1648,"refundable":""},"CORP":{"fare_sell_key":"0~U~ ~SG~UCORP~1922~~0~14~~X","fareKey":"0~U~ ~SG~UCORP~1922~~0~14~~X","BaseFare":[{"total":"INR 1279.0","type":"BaseFare"}],"rule_no":"1922","corpRate":"","comboCode":"","type":"total","securityToken":"4htAJzSTm6w=|ol9DmiM3Tz4mU5q+svyaQnPDfs8EQbv/Fw7jTnBHJOrnQaIIIaG+IjNKzcwylcCkSi361DX1rZwrf6EgSZRhmXA1RvfMcwR9LUdV8rmZDDYr0VuEZJ0J2xTXmS6BvIQfXyvb2VyRcrc=","total":"INR 1760.0","bookingClass":"U","fareBasicCode":"UCORP","surcharges":[{"total":"INR 481.0","type":"Surcharges"}],"tot":1760,"refundable":""},"type":"Fare"},"journey_sell_key":"SG~1063~ ~~MAA~08/22/2019 07:20~HYD~08/22/2019 10:10~BLR~","isGenericProvider":true,"depart_city_code":"MAA","sellCurrency":"INR","type":"Air","direction_type":"O","securityToken":"BWSELIRp4cM=|NWZiYGPcXstjr+blmEB960ehMCoE/NLN68pEYPUPNDIMluI9ZGRG8916jffLQTL2CV+zjhPRJt34IakB+r73V4jQDXKCe/5e26p7RbXsbVbMM9WbGtDspYiLDq2ZX/dTF4bv5EV1DOQ=","to_city_country_id":"","from_city_country_id":"","trip_type":"onward","provider":"SPICEJET","isInternational":false,"currency_type":"INR","segment":"MAA_HYD","trip_code":"D","arrive_city_code":"HYD","segment_id":"MAA_HYD","departure_time":"07:20","direction":[{"duration":"2h 50m","segment":"MAA_HYD","stops":1,"segment_id":"MAA_HYD","type":"Air","leg":[{"no_of_stops":"1","org_depart_date":"22/08/2019","arrival_time":"08:25","flight_image":"./images/flight-images/SG.png","flight_number":"1063","departure_date":"22/08/2019","source_city_code":"MAA","type":"Leg","depDt":"2019-08-22T07:20:00","duration":"1h 5m","flight_code":"SG","org_arrival_date":"22/08/2019","flight_name":"SpiceJet","destination_city_code":"BLR","arrival_date":"22/08/2019","arrDt":"2019-08-22T08:25:00","departure_time":"07:20"},{"no_of_stops":"1","org_depart_date":"22/08/2019","arrival_time":"10:10","flight_image":"./images/flight-images/SG.png","flight_number":"1063","departure_date":"22/08/2019","source_city_code":"BLR","type":"Leg","depDt":"2019-08-22T09:00:00","duration":"1h 10m","flight_code":"SG","org_arrival_date":"22/08/2019","flight_name":"SpiceJet","destination_city_code":"HYD","arrival_date":"22/08/2019","arrDt":"2019-08-22T10:10:00","departure_time":"09:00"}]}],"paymentType":"D","isBookable":"Y","isSelectable":"Y","isMultiSelect":"N","razorPayApiCharges":"2.0","pgGstcharge":"18","id":"SPICEJET_0","selected_fare":"base"}';
    var tempData = {
      'no_of_adultls':'1',
      '_corpGroupId':'247'
    }
    const {no_of_adultls , _corpGroupId} = tempData;
    selectedEntity = JSON.parse(selectedEntity);
    var direction = selectedEntity['direction'][0];
    var leg = direction['leg'][0];
    var fare_basis_code = "";
    var booking_class = "";
    var ruleNumber = "";
    var securityToken = selectedEntity['securityToken'];

    var priceType = selectedEntity['selected_fare'];
    var priceValue = "";


    if(priceType.indexOf('SP') !== -1 ){
    	if(section['provider'] && section['provider'] == 'RIYA' && section['fareDetails'] && section['fareDetails'][section['selected_fare']] ){
			var fareObj = section['fareDetails'][section['selected_fare']];
        if(fareObj['directionArr']){
          direction = fareObj['directionArr'][0];
          leg = direction['leg'][0];
        }
		  }
    	

      if(priceType in selectedEntity['fareDetails']){
        var morePriceObj = selectedEntity['fareDetails'][priceType]; 
        
        if(morePriceObj){
          fare_basis_code = morePriceObj['fareBasicCode'];
          booking_class = morePriceObj['bookingClass'];
          if(morePriceObj['directionArr']){
            direction = morePriceObj['directionArr'][0];
            leg = direction['leg'][0];
          }
        }
      }
    }else if(priceType === 'corp' || priceType === 'base' || priceType === 'special'){
      if(priceType === 'corp'){
        priceValue = "CORP";
      }else if(priceType === 'base'){
        priceValue = "RETAIL";
      }else if(priceType === 'special'){
        priceValue = "SPECIAL";
      }

      if(selectedEntity['provider'] && (selectedEntity['provider'] == 'RIYA' || selectedEntity['provider'] == 'INDIGO') && selectedEntity['fareDetails'] && selectedEntity['fareDetails'][priceValue] ){
        var fareObj = selectedEntity['fareDetails'][priceValue];
        if(fareObj['directionArr']){
          direction = fareObj['directionArr'][0];
          leg = direction['leg'][0];
        }
      }
      
      var selectedData = selectedEntity['fareDetails'][priceValue];
      fare_basis_code = selectedData['fareBasicCode'];
      booking_class = selectedData['bookingClass'];
      if(selectedData['rule_no']){
        ruleNumber = selectedData['rule_no'];
      }
      if(selectedData['securityToken']){
        securityToken = selectedData['securityToken'];
      }


    }

    var data = {}; 
    data['airline'] = leg['flight_code'];//"AI";
    data['fare_basis_code'] = fare_basis_code;//"SAP90";
    data['booking_class'] = booking_class;//"S";
    data['air_booking_type'] = selectedEntity['trip_code'];//"D";
    data['provider'] =  selectedEntity['provider'];//"cleartrip";
    data['cancellationCharges'] =  selectedEntity['cancellationCharges'];
    data['selected_fare'] = selectedEntity['selected_fare'];
    data['corp_group_id'] = _corpGroupId;
    data['direction'] = direction;
    data['no_of_adultls'] = no_of_adultls;
    data['ruleNumber'] = ruleNumber;
    data['securityToken'] = securityToken;
    if(leg['flightId'] && selectedEntity['provider'] == 'RIYA'){
      data['flight_id'] = leg['flightId'];
      data['booking_class'] = leg['segmentClass'];
    }
    if(selectedEntity['searchId'] && selectedEntity['provider'] == 'RIYA'){
      if( selectedEntity['selected_fare'] != 'corp' && selectedEntity['selected_fare'] != 'special'){
        data['track_id'] = selectedEntity['searchId'];
      }else{
        if(selectedEntity['fareDetails'] && selectedEntity['fareDetails']['CORP'] && selectedEntity['fareDetails']['CORP']['searchId'] && selectedEntity['selected_fare'] == "corp"){
          data['track_id'] = selectedEntity['fareDetails']['CORP']['searchId'];
        }else if(selectedEntity['fareDetails'] && selectedEntity['fareDetails']['SPECIAL'] && selectedEntity['fareDetails']['SPECIAL']['searchId'] && selectedEntity['selected_fare'] == "special"){
          data['track_id'] = selectedEntity['fareDetails']['SPECIAL']['searchId'];
        }
      }
    }

      
    var dataString = JSON.stringify(data);
  
    this.props.getFareRules(dataString);        
  }


  

  
  render(){
    return (
      <div>
        <Helmet>
          <title>AirSbt</title>
          <meta name="description" content="Description of AirSbt" />
        </Helmet>
        <div>
          <div>
            {this.props.globalEntities['sdsdfdsf']}
            <button onClick={this.searchFlight}>
              getFlight value
            </button>
          </div>

          <div>
            <button onClick={this.fetchFareRules}>
              getFare Rules
            </button>
          </div>

          <div>
            <button onClick={this.sortByPrice}>
              sort by price
            </button>
          </div>

          <div>
            <button onClick={this.sortByTime}>
              sort by time
            </button>
          </div>


          <div>
            <button onClick={this.filterByStop}>
              filter By stop
            </button>
          </div>

          <div>
            <button onClick={this.filterByTime}>
              filter By Time
            </button>
          </div>


          <div>
            <button onClick={this.filterByAirline}>
              filter By airline
            </button>
          </div>


          <div>
            <button onClick={this.checkMissedSaving}>
              Calling MissedSaving
            </button>
          </div>


          <div>
            <button onClick={this.fetchSbtRules}>
              Calling Rule Api
            </button>
          </div>


        </div>
      </div>

    );
  }
  

  

}

// AirSbt.propTypes = {
//   getFlight: PropTypes.func.isRequired,
// };

const mapStateToProps = (state) => ({
  globalEntities: state.airSbt.globalEntities,
  // filterEntries: state.airSbt.filterEntries,
  // corpId : state.airSbt.corpId,
  // corpGroupId : state.airSbt.corpGroupId
});


const mapDispatchToProps = (dispatch) => ({
  getFlight: (data) => dispatch(getFlight(data)),
  getFareRules : (data) => dispatch(getFareRules(data)),
  getSbtRules : (data) => dispatch(getSbtRules(data))
})

// const withReducer = useInjectReducer({ key: "airSbt", reducer });
// const withSaga = useInjectSaga({ key: "airSbt", saga });


//const withReducer = injectReducer({ key: 'airSbt', reducer });
//const withSaga = injectSaga({ key: 'airSbt', saga });


// const withConnect = ;

//export default compose(withConnect)(AirSbt);
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AirSbt)



