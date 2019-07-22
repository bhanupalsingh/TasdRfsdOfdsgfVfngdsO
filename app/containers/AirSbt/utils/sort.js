const RETAIL = 'RETAIL';
const CORP = 'CORP';
const SP = 'SP';
const SPECIAL = 'SPECIAL';
const ASC = 'ASC';
const DESC = 'DESC';



export default function sort(data,sortBy,order){
    var sortedData = {};
    switch (sortBy) {
        case 'price':
            sortedData = sortByPrice(data,order);
            break;
        case 'time':
            sortedData = sortByTime(data,order);
            break;
    }

    return sortedData;
};



function sortByPrice(data,order){
        var sortedListCR = data.sort(function (a, b) {
		var contentA = "0";
        var contentB = "0";
        var data_priceA = getAmount(a['fareDetails'],RETAIL);
        if(data_priceA)
            contentA = parseInt(getPriceData(data_priceA));
        
        
        if(!data_priceA){
            var corp_priceA = getAmount(a['fareDetails'],CORP);
            if(corp_priceA)
                contentA = parseInt(getPriceData(corp_priceA));
        }
        
        
        var data_priceB = getAmount(b['fareDetails'],RETAIL);
        if(data_priceB)
            contentB = parseInt(getPriceData(data_priceB));
        
        if(!data_priceB){
            var corp_priceB = getAmount(b['fareDetails'],CORP);
            if(corp_priceB)
                contentB = parseInt(getPriceData(corp_priceB));
        }
        
        if(order === ASC){
            return (contentA < contentB) ? -1 :  1 ;
        }else{
            return (contentA < contentB) ? 1 :  -1 ;
        }
        
    })

    return sortedListCR;
}


function sortByTime(data,order){
    var sortedListCR = data.sort(function (a, b) {
		var A_direction = a['direction'][0];
        var A_legs = A_direction['leg'];
        
        var B_direction = b['direction'][0];
        var B_legs = B_direction['leg'];

        var contentA =getTotalMinute(A_legs[0]['departure_time']);
        var contentB =getTotalMinute(B_legs[0]['departure_time']);
        
        if(order === ASC){
            return (contentA < contentB) ? -1 :  1 ;
        }else{
            return (contentA < contentB) ? 1 :  -1 ;
        }
    });

    return sortedListCR;
}





function getAmount(entity,type){
    var fare = "";
    if(type in entity){
        fare = entity[type]['total'];
    }

    return fare;
}

function getPriceData(price){
	var priceArray = price.split(" ");
	var priceData = priceArray[1];
	priceData = priceData.replace(/,/g, "");
	return priceData;
}


function getTotalMinute(time) {
    var timearr = time.split(":");
    var hr = timearr[0];
    var min = timearr[1];

    var totMin = parseInt(hr) * 60 + parseInt(min);
    return totMin;
}	