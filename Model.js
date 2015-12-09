var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS = 7;
  var dateSelected = "";
  var taskEntries = {};
  var locationsArray = [];
  var currentdateSelected = "";

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

  function storeCoordsForLocation(dateSelected,latitude,longitude){
    console.log("got to store coords...",dateSelected,latitude,longitude);
    console.log("locationsArray is..",locationsArray);
    locationsArray[dateSelected] = [latitude,longitude];
    console.log("stored locations are now",locationsArray);
  }

  function storeTaskEntry(taskText,dateSelected){
    taskEntries[dateSelected] = taskText;
    console.log("TaskEntries are now",taskEntries);
  }

  function removeTaskEntry(dateSelected){
    taskEntries[dateSelected] = "";
  }

  function setDateSelected(dateSelected){
    currentdateSelected = dateSelected;
    console.log("Date now set as..",currentdateSelected);
  }

  function getDateSelected(){
    return currentdateSelected;
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

  function setTask(date,taskText){
    taskEntries[date] = taskText;
  }

  function getExistingTask(dateSelected){    
    return taskEntries[dateSelected];
  }

  function getExistingLocation(dateSelected){
    {
      console.log("dateSelected in getexisting location",dateSelected);
      console.log("locations array is currently...",locationsArray);
      var coords = [locationsArray[dateSelected][0],locationsArray[dateSelected][1]];

      return coords;
    }
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
    getWeekdayLabels:getWeekdayLabels,
    getWeekdayCells:getWeekdayCells,
    getExistingTask:getExistingTask,
    getTodaysCellOnCalendar:getTodaysCellOnCalendar,
    getNumberOfTasksInRange:getNumberOfTasksInRange,
    getExistingLocation:getExistingLocation,
    getDateSelected:getDateSelected,
    getStartCell:getStartCell,
    removeTaskEntry:removeTaskEntry,
    setTask:setTask,
    setDateSelected:setDateSelected,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    storeCoordsForLocation:storeCoordsForLocation,
    storeTaskEntry:storeTaskEntry,
  };
  
})();

