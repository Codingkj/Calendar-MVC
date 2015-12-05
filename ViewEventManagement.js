var ViewEvent = (function () {
  
    function clickedOnDate(event){     //use or selector with set above
        var dateSelected=event.target.textContent;
        console.log("TaskEntries are",taskEntryArray);  ///?????
        var formToChange = chooseAFormToDisplay(dateSelected,taskEntryArray);
        var currentMonth = getCurrentMonthNumber();
        var currentMonthName = getMonthName(currentMonth);
        var currentYearNumber = getYearNumber(); 
        changeformHeader(dateSelected,currentMonthName,currentYearNumber);

        changeFormToVisible(formToChange);
        var taskTextOnDate = getExistingTask(dateSelected);
        displayTaskText(taskTextOnDate);
        highlightDate(dateSelected);
        });   
  
  
  return {
    clickedOnDate:clickedOnDate
  };
  
})();