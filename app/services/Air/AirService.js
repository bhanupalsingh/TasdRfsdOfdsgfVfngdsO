import AxiosClient from '../axiosClient';


import {fareRuleUrl,getFlightUrl,getData} from '../client';


export default class AirService {
    static getFareRules(payload) {
      return AxiosClient.post({
        url: fareRuleUrl,
        data: payload.data,
      });
    }

    static getFlight(payload){
      const {providerId , searchData , gvFlightType , corpId , userId , corpGroupId }  = payload.data;
      const searchDataEncoded = encodeURIComponent(searchData);
      const currentTimestamp = new Date().getTime();
      const reactFlow = "true";
      const requestUrl = `${getFlightUrl}?providerId=${providerId}&searchData=${searchDataEncoded}&flightType=${gvFlightType}&reactFlow=${reactFlow}&userId=${userId}&corpId=${corpId}&corpGroupId=${corpGroupId}&provider=${providerId}&timeStamp=${currentTimestamp}`;

      return AxiosClient.ajax({
        url: requestUrl,
        method : 'GET'
      })
    }

    static getData(payload){
      const qryName = payload.qryName;
      const qryParams = encodeURIComponent(payload.qryParams);
      const currentTimestamp = new Date().getTime();
      const requestUrl = `${getData}?qryName=${qryName}&qryParams=${qryParams}&ts=${currentTimestamp}`
      return AxiosClient.ajax({
        url:requestUrl,
        method : 'GET'
      });
    }






}
  