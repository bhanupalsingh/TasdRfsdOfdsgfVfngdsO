import {getFare} from './core';

const CORP = 'CORP';
const RETAIL = 'RETAIL';
//import { CORP , RETAIL } from '../constants';

export const  checkMissedSavingValue = (ruleObj,ruleName,isOnSubmit,_selection,alert_level_map,data) => {
    try{
        var alertLevel = ruleObj[ruleName]["alertLevel"];
        if(alert_level_map && !alert_level_map[alertLevel]){
            alert_level_map[alertLevel] = {};
        }
        
        var message = "";
        var corpRateSelected = true;
        
        for (var key in _selection) {	
            var currentEntity = _selection[key];			 			 	
            var missedSavingArr = currentEntity['missedSavingArr'];

            if (currentEntity["selected_fare"] !== "corp"){
                corpRateSelected = false;			 		
            }

            if (missedSavingArr){
                var selectedFare = 0;
                if (currentEntity["selected_fare"] == "corp"){
                    selectedFare = getFare(currentEntity['fareDetails'],CORP);
                }else if (currentEntity["selected_fare"] == "base"){
                    selectedFare = getFare(currentEntity['fareDetails'],RETAIL)
                }else if (currentEntity["selected_fare"].indexOf("SP") !== -1){					
                    selectedFare = getFare(currentEntity['fareDetails'],currentEntity["selected_fare"]);
                }

                var directionType = currentEntity['direction_type'];
                var missedArrFare=0.00;
                selectedFare = Number(selectedFare.split(" ")[1]);						
                for(var i=0;i<missedSavingArr.length;i++){
                    if(i==0){
                        if (currentEntity["selected_fare"] == "corp"){
                            missedArrFare = Number(missedSavingArr[i]["corpRate"]);
                        }else if(currentEntity["selected_fare"] == "base"){
                            missedArrFare = Number(missedSavingArr[i]["ratailRate"]);
                        }
                    }
                    else{
                        if(missedArrFare > 0){
                            if (currentEntity["selected_fare"] == "corp"){
                                var curFare = Number(missedSavingArr[i]["corpRate"]);
                                if(curFare > 0){
                                    if(curFare < missedArrFare){
                                        missedArrFare = curFare;
                                    }
                                }
                            }else if(currentEntity["selected_fare"] == "base"){
                                var curFare = Number(missedSavingArr[i]["ratailRate"]);
                                if(curFare > 0){
                                    if(curFare < missedArrFare){
                                        missedArrFare = curFare;
                                    }
                                }
                            }
                        }else{
                            if (currentEntity["selected_fare"] == "corp"){
                                missedArrFare = Number(missedSavingArr[i]["corpRate"]);
                            }else if(currentEntity["selected_fare"] == "base"){
                                missedArrFare = Number(missedSavingArr[i]["ratailRate"]);
                            }
                        }
                    }
                }

                if(Number(missedArrFare) >0 && Number(missedArrFare)<selectedFare ){
                    if(data && data.gv_FlightType && data.gv_FlightType ==='multi-city'){
                        if(currentEntity['depart_city_code'] && currentEntity['arrive_city_code']){
                            var segKey = currentEntity['depart_city_code'] + "-" + currentEntity['arrive_city_code'];
                            message += "<div style='color:#7B7A7A'><i class='fa fa-plane p-r-5' aria-hidden='true'></i><i class='fa fa-long-arrow-up p-r-5' aria-hidden='true'></i><b>" + segKey + "</b></div>";
                        }
                    }
                    else{
                        if (directionType =="O"){
                            message += "<div style='color:#7B7A7A'><i class='fa fa-plane p-r-5' aria-hidden='true'></i><i class='fa fa-long-arrow-up p-r-5' aria-hidden='true'></i><b>Onward</b></div>"; 											
                        }

                        if (directionType =="R"){
                            message += "<div style='color:#7B7A7A'><i class='fa fa-plane p-r-5' aria-hidden='true'></i><i class='fa fa-long-arrow-down p-r-5' aria-hidden='true'></i><b>Return</b></div>"; 											
                        }
                    }
                    var diffamount;
                    diffamount = (Number(selectedFare)-Number(missedArrFare));
                    var truncateamount = "0.00";
                    if (diffamount!= null && diffamount !="undefined" && (parseFloat(diffamount) > 0)){
                        truncateamount = parseFloat(diffamount.toFixed(2));
                    }
                    var currencyType = "INR";
                    if(currentEntity && currentEntity["currency_type"] !== "" && currentEntity["currency_type"] !== "undefined" && currentEntity["currency_type"] !== "null" && currentEntity["currency_type"] !== null){
                        currencyType = currentEntity["currency_type"];
                    }
                    
                    message += "<div> There is a cheaper flight avialable for "+currencyType+"  " + missedArrFare + 
                    " within " + ruleObj[ruleName]["mins"] + " mins </div><div> Missed savings is " +
                    "<span style='color: #EC5B5B;font-weight: bold;'>"+currencyType+"  " + truncateamount + 
                    "</span></div>";
                    //break;
                }
            }
        }
                
                            
            
        
        
        alert_level_map[alertLevel][ruleName] = {};
        if (message !=""){
            if (data && data._corpId == 271){
                message += "<br/><select id = 'missed_saving_comments'>";
                message += "<option value='Missed savings due to schedule constraints'>Missed savings due to schedule constraints</option>";
                message += "<option value='Missed savings due to supplier preference'>Missed savings due to supplier preference</option>";				 
                message += "</select>";
                
            }else{				
                
                message += "<br/><select id = 'missed_saving_comments'>";
                message += "<option value='RR'>Traveling with Colleague</option>";
                message += "<option value='OP'>Traveling with Client</option>";
                message += "<option value='TA'>Long layover for connecting flight</option>";
                message += "<option value='FR'>Non-availability of preferred time slot</option>";
                message += "</select>";

            }		
            
                alert_level_map[alertLevel][ruleName]["onSubmit"] = true;
                alert_level_map[alertLevel][ruleName]["status"] = "ERR";
                alert_level_map[alertLevel][ruleName]["type"] = "message"
                alert_level_map[alertLevel][ruleName]["message"] = ruleObj[ruleName]["message"] + "<br/>"+ message;
                alert_level_map[alertLevel][ruleName]["deviationMessage"] = null;
                alert_level_map[alertLevel][ruleName]["ruleId"] = ruleObj[ruleName]["id"];
    
        }     
    }catch(err){
        //specRate = false;
        console.log(err);    
    } 

    return alert_level_map;
}






