var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS = 7;
  var dateSelected = "";
  var taskEntries = {};
  var locationsArray = [];
  var currentdateSelected = "";
  var mapMarkers = {};
  var firstMarker={};

  function initialiseTaskStorageArray(numDaysInMonth){  
    for (var counter = 1; counter < numDaysInMonth+1; counter++){
        taskEntries[counter] = "";
        }
    return taskEntries;
    }
  
  function initialiseLocationsStorageArray(numDaysInMonth){     
     for (var counter = 1; counter < numDaysInMonth+1; counter++) {
          locationsArray[counter] = [,];
        }    
  }

  function createWeekdayLabelCells(gridElement){
     $.each(DAY_NAMES, function (index) {
        if (!(index % NUMBER_OF_COLUMNS)) {
            tableRow = $('<tr>');
        }

        cell = $('<td>').html(DAY_NAMES[index]);
        cell.addClass('firstrow');
        $('#grid').append(tableRow.append(cell)); 
      });
   }

  function storeCoordsForLocation(dateSelected,latitude,longitude){
    console.log("locationsArray is..",locationsArray);
    locationsArray[dateSelected] = [latitude,longitude];
    console.log("stored locations are now",locationsArray);
  }

  function storeMarker(dateSelected,marker){
    date = dateSelected;
    mapMarkers[date] = marker;
   
    console.log("I'm storing marker for day ",mapMarkers[date]);
  }

  function storeStarterMarker(marker){
    firstMarker = marker;
  }

  function getStarterMarker(){
   return firstMarker;
  }

  function removeStarterMarker(marker){
    firstMarker = null;
  }

  function storeTaskEntry(taskText,dateSelected){
    taskEntries[dateSelected] = taskText;
    
  }

  function removeTaskEntry(dateSelected){
    taskEntries[dateSelected] = "";
  }

  function removeMarkersFromStorage(){  //not finished.
//     var allMarkers = mapMarkers;
//     $.each(allMarkers,function(index) {
//     Model.storeMarker(dateSelected,null);
//   }
// }
    mapMarkers = {};
  }

  function setDateSelected(dateSelected){
    currentdateSelected = dateSelected;
    console.log("Date now set as..",currentdateSelected);
  }

  function getDateSelected(){
    return currentdateSelected;
  }

  function getMarkers(){
    return mapMarkers;
  }

  function getStartCell(currentMonthName){
    var $getString = currentMonthName + ' 1, 2015 00:00:00';
    $startCell = new Date($getString).getDay();
    return $startCell;
  }

  function getWeekdayLabels(){
    return DAY_NAMES;
  }

  function getWeekdayCells(){
    var $headers = $('.firstrow');
    return $headers;
  }

  function getColumns(){
    return NUMBER_OF_COLUMNS;
  }

  function getExistingTask(dateSelected){    
    return taskEntries[dateSelected];
  }

  function getExistingLocation(dateSelected){  
      var coords = [locationsArray[dateSelected][0],locationsArray[dateSelected][1]];
      return coords;
  }
  
  function setBlanksAtStartOfMonth(currentMonthName,startCell){    
    var cellsThatCanHaveDates=$('datecell');    
    var daysToUse=[];

    for (var counter=0;counter<startCell-1;counter++){
        cellsThatCanHaveDates[counter]="";
        daysToUse.push(cellsThatCanHaveDates[counter]);
    }
    return daysToUse;
  }

  function setNumbersToRestOfMonth(currentMonthName,daysToUse,numDaysInMonth,startCell){
    var dayInTheMonthLabel=1;
    var cellsThatCanHaveDates=$('datecell'); 

    for (var counter = startCell-1; counter < numDaysInMonth + startCell-1; counter++){
        cellsThatCanHaveDates[counter]=dayInTheMonthLabel;

        dayInTheMonthLabel=dayInTheMonthLabel+1;
        daysToUse.push(cellsThatCanHaveDates[counter].toString());
    } 
    return daysToUse;
  } 

  function clearTaskText(){
    $('#taskWords').val('');           //empty the textbox  
                  
  }

  function getTodaysCellOnCalendar(){
    var $alldates = $('.active');
    for (var counter=0; counter < $alldates.length;counter++){
        if ($alldates[counter].innerHTML == today){
            var selectedDate = $alldates[counter];
          return selectedDate;
        }
    }
  }

  function getNumberOfTasksInRange(startDate, endDate){
    var tkCount=0;
    for (var iterator=startDate;iterator<endDate+1; iterator++){
              if (taskEntries[iterator]!==""){
                        tkCount=tkCount+1;
              }
          }
        return tkCount;
  }


  return {
    initialiseTaskStorageArray: initialiseTaskStorageArray,
    initialiseLocationsStorageArray:initialiseLocationsStorageArray,
    clearTaskText:clearTaskText,
    createWeekdayLabelCells:createWeekdayLabelCells,
    getColumns:getColumns,
    getMarkers:getMarkers,
    getWeekdayLabels:getWeekdayLabels,
    getWeekdayCells:getWeekdayCells,
    getExistingTask:getExistingTask,
    getTodaysCellOnCalendar:getTodaysCellOnCalendar,
    getNumberOfTasksInRange:getNumberOfTasksInRange,
    getExistingLocation:getExistingLocation,
    getDateSelected:getDateSelected,
    getStartCell:getStartCell,
    getStarterMarker:getStarterMarker,
    removeTaskEntry:removeTaskEntry,
    removeMarkersFromStorage:removeMarkersFromStorage,
    removeStarterMarker:removeStarterMarker,
    setDateSelected:setDateSelected,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    storeCoordsForLocation:storeCoordsForLocation,
    storeMarker:storeMarker,
    storeTaskEntry:storeTaskEntry,
    storeStarterMarker:storeStarterMarker,
  };
  
})();

