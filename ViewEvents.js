var ViewEvents = (function () {
    
        var taskEntryFormShown = false;
        var taskEditFormShown = false;

    function showClickedOnDate(clickEvent){  
        console.log("this event is",clickEvent);
        console.log("just Event",event);
        var dateSelected = clickEvent.target.textContent;
        Model.setDateSelected(dateSelected);
        

        var taskEntry = Model.getExistingTask(dateSelected); 
       
        var formToChange = View.chooseAFormToDisplay(taskEntry);
      
        var currentMonth = Utilities.getCurrentMonthNumber();
        var currentMonthName = Utilities.getMonthName(currentMonth);
        var currentYearNumber = Utilities.getYearNumber(); 
        View.changeformHeader(dateSelected,currentMonthName,currentYearNumber);
        View.changeFormToVisible(formToChange);
        if (formToChange === 'divTaskEntryForm') {
          if  (!taskEntryFormShown) {
            View.setMapOnForm(formToChange);
            taskEntryFormShown = true;
        }   
      }
        if (formToChange === 'divTaskEditForm')  { 
          if(!taskEditFormShown) {
            View.setMapOnForm(formToChange);
            taskEditFormShown = true;
        }   
      }
        
       
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
            Model.removeTaskEntry(dateSelected);                    
            View.changeFormToHidden('divTaskEditForm');  
      } 
      function returnToCalendarScreen(event){
            event.preventDefault(); 
            event.stopPropagation();   
            var dateSelected = Model.getDateSelected(); 
            View.hideSummaryMap();                        
            View.clearTasksInSliderView();                             
      }

      function findPostcode(event){
            event.preventDefault(); 
            event.stopPropagation();  
            var dateSelected = Model.getDateSelected();
            var search = $('#postcode').val();
            mapContainer = document.getElementById('mapTaskEntry');
            View.showPostcodeCoordinates(search,dateSelected,mapContainer); 
      }


      function showSummaryMap(event) {   // to display all tasks on 1 map
        event.preventDefault(); 
        event.stopPropagation();
        console.log("got here too!!!!"); 

        // View.displayStarterMap(51.4996829,-0.0845579);
        View.showMapView();
        
        var currentMonthName = Utilities.getMonthName(Utilities.getCurrentMonthNumber());
        // View.createSlider(sliderWidth);
        $ (function() {
        $("#slider-range").slider({
          range: true,
          min: 1,
          max: 31,       
          values:[1,20], 
          step:1,
            slide: function( event, ui ) {
                      $( "#slidevalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] + ' '+ currentMonthName);
                   },
            start: function( event, ui ) {
                      $( "#startvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                   },
            stop: function( event, ui ) {
                    View.clearTasksInSliderView();
                    $( "#stopvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] ); 
                        var tasksInRange = Model.getNumberOfTasksInRange(ui.values[0],ui.values[1]);           
                        View.showTasksInRange(tasksInRange);
                        View.showTasksInSelection(ui.values[0],ui.values[1]);
                        View.createMultipleMarkers(ui.values[0],ui.values[1]);

                        var marker; 
                        var infowindow = new google.maps.InfoWindow();

                        for (var iterator=ui.values[ 0 ];iterator<ui.values[1]; iterator++){

                            google.maps.event.addListener(marker, 'click', (function(marker, iterator) {
                                    return function() {
                                      infowindow.setContent(taskEntries[iterator]);
                                      infowindow.open(map, marker);
                                }
                            })(marker, iterator));
                        }   //end of for loop
                          
                    },  //end of slider stop function
                }); //end of .slider function
         
      });  //end of  slider functionality function call
      }
  
  return {
    cancelTaskEntry:cancelTaskEntry,
    closeEditForm:closeEditForm,
    findPostcode:findPostcode,
    removeTask:removeTask,
    returnToCalendarScreen:returnToCalendarScreen,
    showClickedOnDate:showClickedOnDate,
    saveTaskEntry:saveTaskEntry,
    showEditForm:showEditForm,
    showSummaryMap:showSummaryMap
  };


})();