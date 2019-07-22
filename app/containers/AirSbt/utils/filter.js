

export default function filter(data,filterBy,filterKey){
    var filteredData = {};
    switch (filterBy) {
        case 'airline':
            filteredData = filterByAirLine(data,filterKey);
            break;
        case 'time':
            filteredData = filterByTime(data,filterKey);
            break;
        case 'stops':
            filteredData = filterByStops(data,filterKey);
            break;
        case 'price':
            filteredData = filterByPrice(data,filterKey);
            break;
    }
    return filteredData;
};



function filterByPrice(data,filterKey){
    var filterList = [];
    if(filterKey.length > 0){
        var filter = filterList[0].split("_");
        var minPrice = Number(filter[0]);
        var maxPrice = Number(filter[1]);
        for(var i=0;i<data.length;i++){
            var fareDetailsObj = data[i]['fareDetails'];
            var fareDetails = {}; 
            if (RETAIL in fareDetailsObj){
                fareDetails = fareDetailsObj[RETAIL];
            }else if (CORP in fareDetailsObj){
                fareDetails = fareDetailsObj[CORP];
            }

            if (fareDetails && fareDetails['total'] != undefined){	
				var total = fareDetails['total'];
                var formatPrice = total.trim();
                var price = formatPrice.split(" ");
                var value = price[1];
                if(value >= minPrice && value <= maxPrice)
                {
                    filterList.push(tempEntities[i]);
                }
            }
        }
    }
    return filterList;
}


function filterByAirLine(data,filterKey){
    var filterList = [];
    if(filterKey.length > 0){
        for(var i=0;i<data.length;i++){
            var airname = data[i]['direction'][0]['leg'][0]['flight_name'];
            for (var j = 0; j < filterKey.length; j++){
                if(filterKey[j] == airname){
                    filterList.push(data[i]);
                }
            } 
        }
    }
    return filterList;
}


function filterByStops(data,filterkey){
    var filterList = [];
    if(filterkey.length > 0 ){
        for(var i=0;i<data.length;i++){
            var stops = data[i]['direction'][0]['stops'];
            for (var j = 0; j < filterkey.length; j++) {
                if(filterkey[j] == stops){
                    filterList.push(data[i]);
                }
            }
        }
    }
    return filterList;
}


function filterByTime(data,filterKey){
    var filterList = [];
    if(filterKey.length>0){
        var lower = [];
        var higher = [];

        for(var i=0;i<filterKey.length;i++){
            var temp = filterKey[i].split("_");
            lower.push(parseInt(temp[0]));
            higher.push(parseInt(temp[1]));
        }

        for(var i=0;i<data.length;i++){
            var departTime = parseInt(data[i]['direction'][0]['leg'][0]['departure_time']);
			for (var j = 0; j < lower.length; j++) {
                if(departTime >= lower[j] && departTime <= higher[j] ){
                    filterList.push(data[i]);	
                    break;
                }
            }
        }
    }

    return filterList;
}



