var Utilities = (function () {
  
  function getCurrentMonthNumber(){
    return new Date().getMonth()+1;
  }
  function getYearNumber(){
      return new Date().getFullYear();
  }

  function getMonthName(monthNumber){
      
      var monthNamesArray=['January','February','March','April','May','June','July','August','September','October','December','December'];
      var currentMonthName = monthNamesArray[monthNumber-1];
      return currentMonthName;
  }
    

  function getDatesInCurrentMonth(currentYear,currentMonthNumber){        
      var dateCount;  //could this all be in the return statement.
      
      dateCount = new Date(currentYear, currentMonthNumber, null).getDate();
      console.log("dates in Month",dateCount);
      
      return dateCount;
  }
  function findTodaysDate(){
      var today = new Date().getDate();
    return today;
  }

  function createGoogleMap(latitude,longitude,mapContainerId){
        var map = new google.maps.Map(document.getElementById("mapTaskEntry"), {
                                  zoom: 10,
                                  center: new google.maps.LatLng(latitude,longitude),
                                  mapTypeId: google.maps.MapTypeId.ROADMAP
                                });
        return map;
  }

  function createMapMarker(latitude,longitude,map){
        var marker = new google.maps.Marker({
                            position:{lat:latitude,lng:longitude},
                            map: map,
                            title: 'Your task is here!',
                          }); 
    }

  function validateTaskEntry(taskText){
    if (taskText===""){
          return ('Hey, enter something before you leave - or press Cancel');   
        }
    return null;
}
  
  return {
    getCurrentMonthNumber: getCurrentMonthNumber,
    getYearNumber:getYearNumber,
    getMonthName:getMonthName,
    getDatesInCurrentMonth:getDatesInCurrentMonth,
    findTodaysDate:findTodaysDate,
    createGoogleMap:createGoogleMap,
    createMapMarker:createMapMarker,
    validateTaskEntry:validateTaskEntry
  };
  
})();