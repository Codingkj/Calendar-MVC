var View = (function () {
  
    var starterMarkerIsOn = true;

    function changeFormToVisible(formToChange){
    var $changeform = $('#'+ formToChange);
    $changeform.addClass('visible').removeClass('hidden');    
     } 

    function changeFormToHidden(formToChange){
        var $changeform = $('#'+ formToChange);
        $changeform.addClass('hidden').removeClass('visible'); 
    }

    function changeformHeader(dateSelected, currentMonthName, year){
        $('p.headingtext').text([dateSelected]+ ' '+currentMonthName+' '+ year);
    }

    function chooseAFormToDisplay(taskEntry){
        if (taskEntry === ""){
            return 'divTaskEntryForm'
            }  
        return 'divTaskEditForm';       
    } 

    function hideSummaryMap(){
        $('#divMapViewForm').addClass("hidden").removeClass("mapsurround2");
    }

    function createGridOfDatesView(parentElement){
      var $table1 = $('<table id="grid"></table>');
      parentElement.append($table1);
    }

    function highlightDate(date){
      var checkdates = document.getElementsByClassName('active');
      for (var counter=0; counter < checkdates.length;counter++){
          if (checkdates[counter].innerHTML == date.toString()){
             var selectedDate = checkdates[counter];
             $(selectedDate).attr('class','shaded');
          }
      }
    } 

    function unHighlightDate(date){
        var checkdates = document.getElementsByClassName('shaded');
        for (var counter=0; counter < checkdates.length;counter++){
            if (checkdates[counter].innerHTML == date.toString()){
              var selectedDate = checkdates[counter];
              $(selectedDate).attr('class','unshaded');
            }
        }
    }

    function displayTaskText(taskText){
      $('#storedTextId').text(taskText);
    }
    
    function setTodayHighlight(dateToHighlight){
      var alldates = $('[class="active"]');
      for (var counter=0; counter<alldates.length;counter++){
        if (alldates[counter].textContent == dateToHighlight){
          var selectedBox = alldates[counter];
          $(selectedBox).attr('data-active','');
          $(selectedBox).attr('class','todaysdate');
        }
      }
    }

    function setWeekdayLabelsToColumns(headerCells,day_names){
     for (var counter=0;counter<day_names.length; counter++) {
          headerCells[counter].html = day_names[counter];
        }
        return headerCells;
    }

    function createPageHeader(currentMonth,currentYear,parentElement){
      var $divTop= $('<div></div>');
      var $pageHeader =$('<p class="calendarMonth"></p>').text(currentMonth+' '+currentYear);
      var $mapViewButton=$('<button id="mapViewButton" type="button">View Tasks by Map</button>');
      $divTop.append($mapViewButton);
      $divTop.append($pageHeader);
      parentElement.append($divTop);
    }
    function removeTasksInSliderView(){     //don't think this is needed.
      $('#textBox4').val('');
    
    }
    function showPostcodeCoordinates(search,dateSelected,mapcontainer){
        var url=('http://api.postcodes.io/postcodes/'+ search);
       
        console.log("url & date is...",url,dateSelected);
       
        var xhr = new XMLHttpRequest();
        xhr.open('GET', encodeURI(url));
        xhr.onload = function() {
            if (xhr.status !== 200) {
                console.log('Not OK: ' + xhr.status);
                 return;
            }  
            var data = JSON.parse(xhr.responseText);

            var latitudeReturnedFromLookup= data.result.latitude;
            var longitudeReturnedFromLookup= data.result.longitude;

            console.log('values are date,lat,lng',dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup);
            View.removeStartMarker();
            var mapCreated = Utilities.createGoogleMap(latitudeReturnedFromLookup,longitudeReturnedFromLookup,'mapTaskEntry');
            var markerCreated = Utilities.createMapMarker(latitudeReturnedFromLookup, longitudeReturnedFromLookup ,mapCreated); 
            Model.storeMarker(dateSelected, markerCreated);
            Model.storeCoordsForLocation(dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup); 
            
        }   
        
        xhr.send();
        
      
       
      }


    function showTaskListing(startDate,stopDate){

       var tasklist = $('[data-tasklisting]');
       $.each(tasklist,function(index) {

          if (($(this).attr('data-tasklisting') >= startDate) && ($(this).attr('data-tasklisting') <= stopDate)){
            console.log("task in range",index);
     
            $(this).removeClass('hidden').addClass('task-list'); 
          }
          else 
          {
            console.log("Date outside range");
            $(this).addClass('hidden').removeClass('task-list'); 
          }
        });
      }


     function filterMarkers(startDate,stopDate){

       var allMarkers = Model.getMarkers();
       $.each(allMarkers,function(index) {        
         
          if ((index >= startDate) && (index <= stopDate)){
              console.log("value in range",index);
          }
          else {
            console.log("Date outside range");
            allMarkers[index].setMap(null);
          }
      });
     }
     


    function hideTaskListing() {
      var tasklist = $('[data-tasklisting]').addClass('hidden').removeClass('task-list'); 
      // $('[data-tasklisting="show"]').attr(data-tasklisting,"hide")
      
    }

    function createTaskListing(){
      // get all tasks that are not blank, create a stylised Div for them class hidden.
      var currentYear = Utilities.getYearNumber();
      var currentMonth = Utilities.getCurrentMonthNumber();
      var numDaysInMonth = Utilities.getDatesInCurrentMonth(currentYear,currentMonth);
      console.log("Inside the createTaskListing");
      for (var counter=1;counter<numDaysInMonth+1;counter++){
          var selectedTask = Model.getExistingTask(counter);
          if (selectedTask !== ""){
                console.log("create me a task in listing");
                $textBox4 = $('<div id="textBox4" class="task-list"></div>');
                
                $textBox4.attr('data-tasklisting', counter);
                
                // var ptext4 = $('<p></p>').val="";
                var $lineBr = $('<br></br>'); 
                $('#mapform2').append($lineBr).append($lineBr);
                var monthName = Utilities.getMonthName(currentMonth);
                $textBox4.append(counter + ' ' + monthName + ' ' + selectedTask).append($lineBr);
              
                $('#mapform2').append($textBox4);  
                
                }
        
          }
    }

    function showMapView(){
        var formToChange = $('#divMapViewForm'); 
        formToChange.addClass('mapsurround2').removeClass('hidden'); 
        
        var latitude = 51.4996829;
        var longitude = -0.0845579;
      
        var mapCreatedinSummaryDiv = Utilities.createGoogleMap(latitude,longitude,'mapSummaryDiv');
        var starterMarker = Utilities.createMapMarker(latitude,longitude,mapCreatedinSummaryDiv);
        Model.storeStartMarker(starterMarker);
        //don't call store as the markers have already been stored.
        return mapCreatedinSummaryDiv;
    }

  function setArrayValuesToTablePosition(daysToUse){
    var NUMBER_OF_COLUMNS = 7; 
    
      $.each(daysToUse, function(index) {
          if(!(index%NUMBER_OF_COLUMNS)) tableRow = $('<tr>');
          
          cell = $('<td>').html(daysToUse[index]);
          $(cell).addClass('active');
          $(cell).attr('data-active','');
          $('#grid').append(tableRow.append(cell)); 
      });   
    }   

    function setMapOnForm(formToChange){    
      var dateSelected = Model.getDateSelected();
      if (formToChange === 'divTaskEditForm'){
            var locationSelected = Model.getExistingLocation(dateSelected);
            console.log('locationselected overall object',locationSelected);
            console.log('locationSelected 0....',locationSelected[0]);
            var latitude = locationSelected[0];
            var longitude = locationSelected[1];
            var mapCreatedInTaskEdit = Utilities.createGoogleMap(latitude,longitude,'mapTaskEdit');
            var markerCreated = Utilities.createMapMarker(latitude,longitude,mapCreatedInTaskEdit);
            //Don't store marker as you have no way to find new value.
            return;
      }
      var latitude = 51.4996829;
      var longitude = -0.0845579;
      var mapCreatedInTaskEntry = Utilities.createGoogleMap(latitude,longitude,'mapTaskEntry');  
      var markerCreated = Utilities.createMapMarker(latitude,longitude,mapCreatedInTaskEntry); 
      var storedMarker = Model.storeStarterMarker(markerCreated);
      } 
    

    function createMultipleMarkers(startDate,stopDate,map){
            console.log("Inside MM");
            var markerCreated; 
            var infowindow = new google.maps.InfoWindow();   
            View.removeStartMarker();
            for (var dateIterator = startDate; dateIterator < stopDate+1; dateIterator++){
                var dateWithTask = Model.getExistingTask(dateIterator);
                if (dateWithTask !== ""){
                    var coords = Model.getExistingLocation(dateIterator);
                    var latitude = coords[0];
                    var longitude = coords[1];
                    // mapContainer = $('#mapSummaryDiv');
                  
                    markerCreated = Utilities.createMapMarker(latitude,longitude,map); 
                    Model.storeMarker(dateIterator, markerCreated);   
                    google.maps.event.addListener(markerCreated, 'click', (function(markerCreated, dateIterator) { 
                            return function() {
                              var content = Model.getExistingTask(dateIterator);
                              infowindow.setContent(content);
                              infowindow.open(map, marker);
                            }
                    })(markerCreated, dateIterator));  //end of Listener
                }   //end of if loop
               }   //end of for loop
           }

  
  function removeAllMarkers(){  //to be called when user navigates back to calendar view.
    var markersToRemove = Model.getMarkers();
    $.each(tasklist,function(index) {
      markersToRemove[index].setMap(null);
    });
    View.filterMarkers(markersToRemove);
    Model.removeMarkersFromStorage(markersToRemove);
    }

  function removeStartMarker(){
    marker = Model.getStarterMarker();
    console.log(marker);
    marker.setMap(null);   
    if (starterMarkerIsOn) {
      Model.removeStarterMarker(marker);
      starterMarker = false;
    }
  }

  function showStartMarker(mapContainer){
    marker = Model.getStarterMarker();
    marker.setMap(mapContainer);
  }

    // function onSliderMove( event, ui ) {
    //       var currentMonthName = Utilities.getMonthName(Utilities.getCurrentMonthNumber());
    //       console.log("currentMonth in createslideris now",currentMonthName);
    //       $( "#slidevalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] + ' '+ currentMonthName);
    //       }

    // function onSliderStart( event, ui ) {
    //                   $( "#startvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
    //                }

    // function onSliderStop( event, ui ) {
    //                 View.removeTasksInSliderView();
    //                 $( "#stopvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] ); 
    //                 var tasksInRange = Model.getNumberOfTasksInRange(ui.values[0],ui.values[1]);           
    //                 View.showTasksInRange(tasksInRange);
    //                 View.createMultipleMarkers(ui.values[0],ui.values[1]);
  
    //                 }  //end of slider stop function               
   
  
  return {
    changeFormToVisible: changeFormToVisible,
    changeFormToHidden: changeFormToHidden,
    changeformHeader: changeformHeader,
    chooseAFormToDisplay:chooseAFormToDisplay,
    removeTasksInSliderView:removeTasksInSliderView,
    createGridOfDatesView:createGridOfDatesView,
  
    createPageHeader:createPageHeader,
    createMultipleMarkers:createMultipleMarkers,
    // createSlider:createSlider,
    createTaskListing:createTaskListing,
    displayTaskText:displayTaskText,
    filterMarkers:filterMarkers,
    hideTaskListing:hideTaskListing,
    hideSummaryMap:hideSummaryMap,
    highlightDate:highlightDate,
    removeAllMarkers:removeAllMarkers,
    removeStartMarker:removeStartMarker,
    setMapOnForm:setMapOnForm,
    setTodayHighlight:setTodayHighlight,
    setWeekdayLabelsToColumns:setWeekdayLabelsToColumns, 
    setArrayValuesToTablePosition:setArrayValuesToTablePosition,
    showPostcodeCoordinates:showPostcodeCoordinates,
    showMapView:showMapView,
    showStartMarker:showStartMarker,
    showTaskListing:showTaskListing,
    unHighlightDate:unHighlightDate
  };
  
})();