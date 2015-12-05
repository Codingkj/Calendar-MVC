var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS=7;
  var taskEntries = {};

  function initialiseTaskStorageArray(numDaysInMonth){  
    for (var counter = 0; counter < numDaysInMonth; counter++){
        taskEntries[counter] = "";
        }
    return taskEntries;
    }
  
  function initialiseLocationsStorageArray(locationsArray,numDaysInMonth){     
     for (var counter = 0; counter < numDaysInMonth; counter++) {
          locationsArray[counter] = new Array(2);
          locationsArray[counter]=[];
        }    
  }

  function setCoordsForLocation(locationsArray,date,latitude,longitude){
    locationsArray[date]=[latitude,longitude];
  }

  function storeTaskEntry(taskText,dateSelected){
    taskEntries[dateSelected]=taskText;
  }

  function getWeekdayLabels(){
    return DAY_NAMES;
  }

  function getWeekdayCells(){
    var $headers = $('.firstrow');
    console.log('headers in function are',$headers.length);
    return $headers;
  }

  function getColumns(){
    return NUMBER_OF_COLUMNS;
  }

  function setTask(date,taskText){
    taskEntries[date] = taskText;
  }

  function getExistingTask(dateSelected){    
    return taskEntries[dateSelected];
  }

  function createWeekdayLabelCells(gridElement){

    // var $tableRow = $('<tr>');
    // for (var counter=0;counter<DAY_NAMES.length;counter++) {        
    //         var $cell = $('<td class="firstrow">');
    //         $tableRow.append($cell); 
    //         console.log ("this is",counter);
    //         console.log("$cell is",$tableRow);  
    
    //         gridElement.append($tableRow);
        // }
     $.each(DAY_NAMES, function (index) {
        if (!(index % NUMBER_OF_COLUMNS)) {
            tableRow = $('<tr>');
        }

        cell = $('<td>').html(DAY_NAMES[index]);
        cell.addClass('firstrow');
        $('#grid').append(tableRow.append(cell)); 
      });
   }

  function getTodayCell(todaysDate){
     var allCells = document.getElementsByClassName("active");
      // var $allCells = $('.active');
      var todayCell = allCells[todaysDate];
  return todayCell;
  }


  return {
    initialiseTaskStorageArray: initialiseTaskStorageArray,
    initialiseLocationsStorageArray:initialiseLocationsStorageArray,
    setCoordsForLocation:setCoordsForLocation,
    storeTaskEntry:storeTaskEntry,
    getColumns:getColumns,
    getWeekdayLabels:getWeekdayLabels,
    getWeekdayCells:getWeekdayCells,
    getExistingTask:getExistingTask,
    setTask:setTask,
    createWeekdayLabelCells:createWeekdayLabelCells,
    getTodayCell:getTodayCell

  };
  
})();

