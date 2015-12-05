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
          locationsArray[counter] = [,];
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
     var allCells = document.getElementsByClassName("datecell");
      // var $allCells = $('.active');
      console.log(allCells);
      var todayCell = allCells[todaysDate];
  return todayCell;
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
    getTodayCell:getTodayCell,
    setBlanksAtStartOfMonth:setBlanksAtStartOfMonth,
    setNumbersToRestOfMonth:setNumbersToRestOfMonth,
    clearTaskText:clearTaskText,
    getTodaysCellOnCalendar:getTodaysCellOnCalendar

  };
  
})();

