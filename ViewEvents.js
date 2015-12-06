var ViewEvents = (function () {
  
    function showClickedOnDate(event){  
        console.log("this event is",event);
        // var dateSelected=event.target.textContent;
        var dateSelected=event.target.textContent;
        Model.setDateSelected(dateSelected);  //not the right way to pass that!!
        console.log("dateSelected b4 goingto model",dateSelected);
        var taskEntry = Model.getExistingTask(dateSelected);
        console.log("TaskEntry is...",taskEntry); 
       
        var formToChange = View.chooseAFormToDisplay(taskEntry);
        var currentMonth = Utilities.getCurrentMonthNumber();
        var currentMonthName = Utilities.getMonthName(currentMonth);
        var currentYearNumber = Utilities.getYearNumber(); 
        View.changeformHeader(dateSelected,currentMonthName,currentYearNumber);

        View.changeFormToVisible(formToChange);
        var taskTextOnDate = Model.getExistingTask(dateSelected);
        View.displayTaskText(taskTextOnDate);
        View.highlightDate(dateSelected);
        return dateSelected;
        }   

    function saveTaskEntry(event){
        event.preventDefault(); 
        event.stopPropagation();
        
        var textEntered = $('textarea').val(); 
        Utilities.validateTaskEntry(textEntered);
        var dateSelected = Model.getDateSelected();
        Model.storeTaskEntry(textEntered,dateSelected);
        console.log("stored entry is",textEntered);
        console.log("date recorded against is",dateSelected);
        View.highlightDate(dateSelected);    
        View.changeFormToHidden('divTaskEntryForm');  
        Model.clearTaskText(dateSelected); 
        } 

    function cancelTaskEntry(event){
        event.preventDefault(); 
        event.stopPropagation();   
        var dateSelected = Model.getDateSelected();                  
        View.changeFormToHidden('divTaskEntryForm');                      
        View.unHighlightDate(dateSelected);     
        Model.clearTaskText(dateSelected);
        }

    function closeEditForm(event){
        event.preventDefault(); 
        event.stopPropagation();
        //cancel form = delete text, turn to hidden, and empty textbox
        // taskEntries.dateSelected="";  
        var dateSelected = Model.getDateSelected();
        View.changeFormToHidden('divTaskEditForm');
        View.highlightDate(dateSelected);
        dateSelected="";
      }  

      function showEditForm(event){
            event.preventDefault();
            event.stopPropagation(); 
            var dateSelected = Model.getDateSelected();  
            View.changeFormToVisible('divTaskEditForm');     
      } 

      function removeTask(event){
            event.preventDefault(); 
            event.stopPropagation();
            var dateSelected = Model.getDateSelected();
            View.unHighlightDate(dateSelected);   
            taskEntries[dateSelected]="";                   
            View.changeFormToHidden('divTaskEditForm');  
      } 
      function returnToCalendarScreen(event){
            event.preventDefault(); 
            event.stopPropagation();   
                                    
            $('#formDiv2').addClass("hidden").removeClass("mapsurround2");
            View.clearTasksInSliderView();                             
      }

      function findPostcode(event,dateSelected){
            event.preventDefault(); 
            event.stopPropagation();  
            var dateSelected = Model.getDateSelected();
            var search=$('#postcode').val();

            View.showPostcodeCoordinates(search); 
            
      }
  
  return {
    showClickedOnDate:showClickedOnDate,
    saveTaskEntry:saveTaskEntry,
    cancelTaskEntry:cancelTaskEntry,
    showEditForm:showEditForm,
    removeTask:removeTask,
    closeEditForm:closeEditForm,
    returnToCalendarScreen:returnToCalendarScreen,
    findPostcode:findPostcode
  };


})();