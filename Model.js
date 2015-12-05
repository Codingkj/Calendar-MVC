var Model = (function () {
  
  var DAY_NAMES = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']; 
  var NUMBER_OF_COLUMNS=7;
  var taskEntries = {};
  var locationsArray = [];

  function initialiseTaskStorageArray(numDaysInMonth){  
    for (var counter = 0; counter < numDaysInMonth; counter++){
        taskEntries[counter] = "";
        }
    return taskEntries;
    }
  
  function initialiseLocationsStorageArray(numDaysInMonth){     
     for (var counter = 0; counter < numDaysInMonth; counter++) {
          locationsArray[counter] = [,];
        }    
  }

  function storeCoordsForLocation(date,latitude,longitude){
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

  function getExistingLocation(dateSelected){
    var coords = {lat:locationsArray[dateSelected][0],
                  lng:locationsArray[dateSelected][1]}
    return coords;
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

  // function getTodayCell(todaysDate,alldates){
  //    // var allCells = $('datecell');
  //     // var $allCells = $('.active');
  //     console.log("all cells are",alldates);
  //     var todayCell = alldates[todaysDate];
  //     console.log("today cell is",todayCell);
  // return todayCell;
  // }

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
    storeCoordsForLocation:storeCoordsForLocation,
    storeTaskEntry:storeTaskEntry,
    getColumns:getColumns,
    getWeekdayLabels:getWeekdayLabels,
    getWeekdayCells:getWeekdayCells,
    getExistingTask:getExistingTask,
    setTask:setTask,
    createWeekdayLabelCells:createWeekdayLabelCells,
    // getTodayCell:getTodayCell,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    clearTaskText:clearTaskText,
    getTodaysCellOnCalendar:getTodaysCellOnCalendar,
    getNumberOfTasksInRange:getNumberOfTasksInRange,
    getExistingLocation:getExistingLocation
  };
  
})();

