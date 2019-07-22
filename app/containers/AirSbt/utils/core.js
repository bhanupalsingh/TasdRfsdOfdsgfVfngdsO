const CORP = 'CORP';
const RETAIL = 'RETAIL';






function corpFilterRuleValidate (currentEntity,minsToAdd,missedSavingSelection,selection,sectorMultiCityMappingInfo){
    var directionType = currentEntity['direction_type'];	
    var directionArr = currentEntity['direction']
    var mins = "";
    var tempDate =  currentEntity.direction[0].leg[0].departure_date.split("/");
    var sector = tempDate[2]+"-"+tempDate[1]+"-"+tempDate[0] + "_" + currentEntity['depart_city_code'] + "_" + currentEntity['arrive_city_code'];
    if (sectorMultiCityMappingInfo && sectorMultiCityMappingInfo[sector]){
        var multiCityObj = sectorMultiCityMappingInfo[sector];
        if(multiCityObj['preferred_time']){
            mins = multiCityObj['preferred_time'];
        }	
    }

    if(missedSavingSelection  && missedSavingSelection !== undefined  && selection && selection["departure_time"]		
    ){
        mins = selection["departure_time"];
    }	
    
    
    
    var directionObj = directionArr[0];	
    var legArr = directionObj['leg'];																
    var depDateArr = legArr[0]['departure_date'].split("/");	
    var startDate = legArr[0]['departure_date'] +" "+ legArr[0]['departure_time'];

    var startDateTemp = legArr[0]['departure_date'] + " " + mins;
    
    
    var timeStart =new Date(moment(startDate,"YYYY-MM-DD HH:mm").format("YYYY/MM/DD HH:mm")).getTime();
    var timeEnd = new Date(moment(startDateTemp,"YYYY-MM-DD HH:mm").format("YYYY/MM/DD HH:mm")).getTime();
    var hourDiff = timeEnd - timeStart; //in ms
    var minDiff = hourDiff / 60 / 1000; //in minutes		
     
    if (Math.abs(minDiff - 0) <= Number(minsToAdd) ) {			
            return true;
    }	
};


function getSelectedEntityBasedOnFareType(entity,type){
    if(type in entity){
        return  entity[type];
    }
    return {};    
}


function filterByTimeFromRuleWithOutCheck(tempEntities,corpFilterObj,missedSavingSelection,selection,sectorMultiCityMappingInfo){
        
    try{								
        if(corpFilterObj && typeof corpFilterObj != 'undefined' && 'enableCorpFilter' in corpFilterObj && corpFilterObj['enableCorpFilter']) {
            var minsToAdd = corpFilterObj['mins'];
            var noOfResults  = Number(corpFilterObj['numOfResults']);
            var fareVariance =  Number(corpFilterObj['fareVariance']);
            var cnt = 0;
            var lowestPrice  = 0;
            if (corpFilterObj['enableCorpFilter'] === true && 'mins' in corpFilterObj){
                for(var i=0;i<tempEntities.lenght;i++){
                    //if (cnt < noOfResults){
                    if (corpFilterRuleValidate(tempEntities[i],minsToAdd,missedSavingSelection,selection,sectorMultiCityMappingInfo)){
                            return tempEntities[i];
                    }
                    //}  
                }																																		
            }
                
        }
    }catch(er){
        console.log(er)
    }
    return tempEntities;
};


export function getFare(entity,type){
    var fare = "";
    if (type in entity){
        fare = entity[type]['total']; 
    }	
    return fare;	
}




export const addMissedSavingsArray = (currentEntity,rule_object_map,globalEntities,sectorMultiCityMappingInfo) =>{
    try{
        if (rule_object_map && rule_object_map['missedSavingRules']){
            var selectedFare = "";
            if (currentEntity['selected_fare']){
                selectedFare = currentEntity['selected_fare'];
            }
            var corpFilterObj = rule_object_map['missedSavingRules'];
            var mins = rule_object_map["missedSavingRules"]["missedSavingRules"]["mins"];
            var missedSavingArr = [];
            var directionType = currentEntity['direction_type'];	
            
            var directionArr = currentEntity['direction']
            var directionObj = directionArr[0];
            
            var legArr = directionObj['leg'];
            
            var depDateArr = legArr[0]['departure_date'].split("/");		
            var startDate = depDateArr[2] + "-" + depDateArr[1] + "-"  + depDateArr[0]  + " " + legArr[0]['departure_time'];
            

            var arrivalTime = "";
            var arrialDate = "";
            var endDate = "";
            for(var j = 0 ; j< legArr.length; j++){
                if (j == legArr.length -1 ){
                    var legObj = legArr[j];						
                    arrivalTime = legObj['arrival_time']
                    arrialDate = legObj['arrival_date']							
                }
            }
            if (arrivalTime != "" && arrialDate !=""){			
                var arrDateArr = arrialDate.split("/");					
                var arrDt = arrDateArr[2] + "-" + arrDateArr[1] + "-"  + arrDateArr[0];
                endDate = arrDt  + " " + arrivalTime;
            }					
            
            
            var tempSegmentArr = [];
            
            var segKey = currentEntity['segment']+ "_" + depDateArr[0] + "-" + depDateArr[1] + "-"  + depDateArr[2];
            tempSegmentArr = globalEntities[segKey]['entities'];

            var tempEntities = filterByTimeFromRuleWithOutCheck(tempSegmentArr,corpFilterObj,undefined,undefined , sectorMultiCityMappingInfo);
            
            var tempHighFare = 0;
            var highFare = 0;
            var lowFare = 0;
            var tempLowFare = 0;
            var entityCnt = 0;
            var isSelectedAvailable = false;
            
            if(tempEntities.length === 0){
                var missBySelection = true;
                var selection = currentEntity;
                
                tempEntities = filterByTimeFromRuleWithOutCheck(tempSegmentArr,corpFilterObj,missBySelection,selection,sectorMultiCityMappingInfo);
            }
            
            for (var s = 0; s < tempEntities.length; s++) {
                var isAvailable = true;
                var tempEntity = tempEntities[s];		

                if (tempEntity['id'] == currentEntity['id']){
                    isSelectedAvailable = true;
                }

                var tempDirectionArr = tempEntity['direction']			
                if (tempDirectionArr.length > 0 ){

                    var tempDirectionObj = tempDirectionArr[0];		
                    var legArray = tempDirectionObj['leg'];


                    var tempDateDepArr = legArray[0]['departure_date'].split("/");						
                    var tempDepartDate = tempDateDepArr[2] + "-" + tempDateDepArr[1] + "-"  + tempDateDepArr[0];
                    var startDateTemp = tempDepartDate  + " " + legArray[0]['departure_time'];



                    var timeStart =new Date(startDate).getTime();
                    var timeEnd = new Date(startDateTemp).getTime();
                    var hourDiff = timeEnd - timeStart; //in ms
                    var minDiff = hourDiff / 60 / 1000; //in minutes		 	


                    var tempArrialTime = "";
                    var tempArrivalDate = "";
                    var endDateTemp = "";	
                    var tempArrDt = "";
                    for(var j = 0 ; j< legArray.length; j++){

                        if (j == legArray.length -1 ){

                            var legObj = legArray[j];														
                            tempArrialTime = legObj['arrival_time']
                            tempArrivalDate = legObj['arrival_date']							
                        }

                    }					
                    if (tempArrialTime != "" && tempArrivalDate !=""){

                        var tempArrDateArr = tempArrivalDate.split("/");							
                        tempArrDt = tempArrDateArr[2] + "-" + tempArrDateArr[1] + "-"  + tempArrDateArr[0];
                        endDateTemp = tempArrDt  + " " + tempArrialTime;
                    }

                    if (endDateTemp != "" &&  endDate !=""){

                        var timeStartArrival =new Date(endDate).getTime();
                        var timeEndArrival = new Date(endDateTemp).getTime();
                        var hourDiffArrival = timeEndArrival - timeStartArrival; //in ms
                        var minDiffArrival = hourDiffArrival / 60 / 1000; //in minutes		
//						if (Math.abs(minDiff - 0) <= Number(mins) && Math.abs(minDiffArrival - 0 ) <= Number(mins) ) {													 								

                        //if (Math.abs(minDiff - 0) <= Number(mins) ) {													 								


                        var missedSavingObj = {};
                        missedSavingObj['departureDate'] = tempDepartDate;
                        missedSavingObj['departureTime'] = legArray[0]['departure_time'];
                        missedSavingObj['arrivalDate'] = tempArrDt;
                        missedSavingObj['arrivalTime'] = tempArrialTime;	
                        missedSavingObj['departureCityCode'] = tempEntity['depart_city_code'];
                        missedSavingObj['arrivalCityCode'] = tempEntity['arrive_city_code'];

                        var tempCorpRate = getFare(tempEntity['fareDetails'],CORP);
                        var tempRetailRate = getFare(tempEntity['fareDetails'],RETAIL) ;



                        var rateToCompare = 0;
                        if (tempCorpRate != "" && selectedFare =="corp"){
                            rateToCompare = Number(tempCorpRate.split(" ")[1]);
                        }
                        if (tempRetailRate != "" && selectedFare =="base"){
                            rateToCompare = Number(tempRetailRate.split(" ")[1]);
                        }


                        if(rateToCompare > 0){	
                            if (entityCnt == 0){

                                highFare = rateToCompare;	
                                lowFare = rateToCompare;

                            }else{

                                if(highFare > 0 &&  lowFare > 0){

                                    if (rateToCompare >  highFare){

                                        highFare = rateToCompare
                                    }										
                                    if (rateToCompare <  lowFare){

                                        lowFare = rateToCompare
                                    }
                                }else{
                                    highFare = rateToCompare;	
                                    lowFare = rateToCompare;
                                }
                            }
                        }

                        var fareDetailsObj = tempEntity['fareDetails'];									
                        for (var property in fareDetailsObj) {
                            if (fareDetailsObj.hasOwnProperty(property)) {

                                if (property.indexOf("SP_") !== -1){									    		
                                    var otherRate = getOtherRate(tempEntity['fareDetails'],property);
                                    missedSavingObj[property] = (otherRate !="") ? otherRate.split(" ")[1] : "0"
                                }									    	
                            }
                        }

                        missedSavingObj['corpRate'] = (tempCorpRate !="") ? tempCorpRate.split(" ")[1] : "0"
                            missedSavingObj['ratailRate'] = (tempRetailRate !="") ? tempRetailRate.split(" ")[1] : "0"							
                                missedSavingObj['flightName'] = legArray[0]['flight_name'];
                            missedSavingObj['flightNumber'] = legArray[0]['flight_number'];									
                            missedSavingArr.push(missedSavingObj) ;
                            entityCnt++;
                            //}

                    }				

                }
                //}			
            }
            
            
            
            if(isSelectedAvailable == false){
                var tempCorpRate = getFare(currentEntity['fareDetails'],CORP);
                var tempRetailRate = getFare(currentEntity['fareDetails'],RETAIL) ;



                var rateToCompare = 0;
                if (tempCorpRate != "" && selectedFare =="corp"){
                    rateToCompare = Number(tempCorpRate.split(" ")[1]);
                }
                if (tempRetailRate != "" && selectedFare =="base"){
                    rateToCompare = Number(tempRetailRate.split(" ")[1]);
                }

                if(rateToCompare > 0){
                    if (rateToCompare >  highFare){

                        highFare = rateToCompare
                    }										
                    if (rateToCompare <  lowFare){

                        lowFare = rateToCompare
                    }
                }
                
                missedSavingArr = addMissedSavingObj(currentEntity, missedSavingArr);
            }
            
            currentEntity["segHighFare"] = highFare;
            currentEntity["segLowFare"] = lowFare;

            if (missedSavingArr.length > 0){
                currentEntity['missedSavingArr'] = missedSavingArr;
            }
        }				
    
    }catch(err){
        console.log(err);
    }

    return currentEntity;

}
    

    
    
function addMissedSavingObj (currentEntity, missedSavingArr){
        var tempDirectionArr = currentEntity['direction'];
        if (tempDirectionArr.length > 0 ){
            var tempDirectionObj = tempDirectionArr[0];		
            var legArray = tempDirectionObj['leg'];
    
            var tempDateDepArr = legArray[0]['departure_date'].split("/");						
            var tempDepartDate = tempDateDepArr[2] + "-" + tempDateDepArr[1] + "-"  + tempDateDepArr[0];
            var startDateTemp = tempDepartDate  + " " + legArray[0]['departure_time'];
    
            var tempArrialTime = "";
            var tempArrivalDate = "";
            var endDateTemp = "";	
            var tempArrDt = "";
            for(var j = 0 ; j< legArray.length; j++){
    
                if (j == legArray.length -1 ){
    
                    var legObj = legArray[j];														
                    tempArrialTime = legObj['arrival_time']
                    tempArrivalDate = legObj['arrival_date']							
                }
    
            }					
            if (tempArrialTime != "" && tempArrivalDate !=""){
    
                var tempArrDateArr = tempArrivalDate.split("/");							
                tempArrDt = tempArrDateArr[2] + "-" + tempArrDateArr[1] + "-"  + tempArrDateArr[0];
                endDateTemp = tempArrDt  + " " + tempArrialTime;
            }
    
            var tempCorpRate = getFare(currentEntity['fareDetails'],CORP);
            var tempRetailRate = getFare(currentEntity['fareDetails'],RETAIL) ;
    
    
            var missedSavingObj = {};
            missedSavingObj['departureDate'] = tempDepartDate;
            missedSavingObj['departureTime'] = legArray[0]['departure_time'];
            missedSavingObj['arrivalDate'] = tempArrDt;
            missedSavingObj['arrivalTime'] = tempArrialTime;	
            missedSavingObj['departureCityCode'] = currentEntity['depart_city_code'];
            missedSavingObj['arrivalCityCode'] = currentEntity['arrive_city_code'];
    
            var fareDetailsObj = currentEntity['fareDetails'];									
            for (var property in fareDetailsObj) {
                if (fareDetailsObj.hasOwnProperty(property)) {
    
                    if (property.indexOf("SP_") !== -1){									    		
                        var otherRate = getOtherRate(currentEntity['fareDetails'],property);
                        missedSavingObj[property] = (otherRate !="") ? otherRate.split(" ")[1] : "0"
                    }									    	
                }
            }
    
            missedSavingObj['corpRate'] = (tempCorpRate !="") ? tempCorpRate.split(" ")[1] : "0"
            missedSavingObj['ratailRate'] = (tempRetailRate !="") ? tempRetailRate.split(" ")[1] : "0"							
            missedSavingObj['flightName'] = legArray[0]['flight_name'];
            missedSavingObj['flightNumber'] = legArray[0]['flight_number'];									
            missedSavingArr.push(missedSavingObj) ;
    
        }
        
        return missedSavingArr;
    }



