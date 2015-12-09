var View = (function () {
  
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
             selectedDate.setAttribute('class','shaded');
          }
      }
    } 

    function unHighlightDate(date){
        var checkdates = document.getElementsByClassName('shaded');
        for (var counter=0; counter < checkdates.length;counter++){
            if (checkdates[counter].innerHTML == date.toString()){
              var selectedDate = checkdates[counter];
              selectedDate.setAttribute('class','unshaded');
            }
        }
    }

    function displayTaskText(taskText){
      $('#storedTextId').text(taskText);
    }
    function showTasksInSelection(startDate,stopDate){
      console.log('startDate is..',startDate);
      console.log('stopdate is..',stopDate)
      for (var counter=startDate;counter<stopDate+1;counter++){
          var selectedTask = Model.getExistingTask(counter);
          if (selectedTask !== ""){
                
                $textBox4=$('<div id="textBox4"></div>');
                $ptext4=$('<p></p>').val="";
                console.log("task text",selectedTask);
                $lineBr=$('<br></br>'); 
                var monthName = Utilities.getMonthName(Utilities.getCurrentMonthNumber());
                $textBox4.append(counter + ' ' + monthName + ' ' + selectedTask).append($lineBr);
                $('#taskDiv').append($textBox4);  
                $('#taskDiv').append($lineBr);
                $('#taskDiv').append($lineBr);
                }
          }
    }

    function setTodayHighlight(DateToHighlight){
      var alldates = document.getElementsByClassName("active");
      for (var counter=0; counter < alldates.length;counter++){
        if (alldates[counter].innerHTML == DateToHighlight){
          var selectedBox = alldates[counter];
          selectedBox.setAttribute("class","todaysdate");
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
    function clearTasksInSliderView(){
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
            console.log("date selected inside xhr function is",dateSelected);

            var data = JSON.parse(xhr.responseText);
            var latitudeReturnedFromLookup= data.result.latitude;
            var longitudeReturnedFromLookup= data.result.longitude;

            console.log('values are date,lat,lng',dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup);
            var mapCreated = Utilities.createGoogleMap(latitudeReturnedFromLookup,longitudeReturnedFromLookup,'mapTaskEntry');
            var markerCreated = Utilities.createMapMarker(latitudeReturnedFromLookup, longitudeReturnedFromLookup ,mapCreated); 
                
            Model.storeCoordsForLocation(dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup); 
            console.log("after calling model.store",dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup);
        }   
        console.log("before the xhr send command");
        xhr.send();
        console.log("after the xhr send command");
        // return {};
       
      }

    function showMapView(){
        var formToChange = $('#divMapViewForm');
        formToChange.addClass('mapsurround2').removeClass("hidden");

    }

    function displayStarterMap(latitude,longitude){  //could use CreateGoogleMap instead
        var mapOptions={ 
            center:new google.maps.LatLng(latitude,longitude),
            zoom:12   };

        // var mylatlng = new google.maps.LatLng(latitude, longitude);
        // console.log("mylatlng", mylatlng);
        var map= new google.maps.Map(document.getElementById("mapSummaryDiv"),mapOptions);
        var marker = new google.maps.Marker({
                    position:{lat: longitude, lng: longitude},
                    map: map,
                    title: 'Your task is here!',
                   });  
  }

  function setArrayValuesToTablePosition(daysToUse){
    var NUMBER_OF_COLUMNS = 7; 
    
      $.each(daysToUse, function(index) {
          if(!(index%NUMBER_OF_COLUMNS)) tableRow = $('<tr>');
          
          cell = $('<td>').html(daysToUse[index]);
          cell.addClass('active');
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
            if (locationSelected !== ""){
              Utilities.createGoogleMap(latitude,longitude,'mapTaskEdit');
            } 
            return;
      }
      var latitude = 51.4996829;
      var longitude = -0.0845579;
      Utilities.createGoogleMap(latitude,longitude,'mapTaskEntry');   
      } 
    
    function showTasksInRange(tasksInRange){
        var lineBr=$('<br></br>');
        var taskShortDiv = $('#taskDiv');
        taskShortDiv.append(lineBr);
        var taskSummary = $('<p>There are '+ tasksInRange +' tasks in this range:</p>');
        taskShortDiv.append(taskSummary);
    }

    function createMultipleMarkers(startDate,stopDate){
            var marker; 
            var firstTime = 1;
            var infowindow = new google.maps.InfoWindow();   
            var map;
            for (var dateIterator=startDate; dateIterator<stopDate; dateIterator++){
                var dateWithTask = Model.getExistingTask(dateIterator);
                if (dateWithTask !== ""){
                    console.log("date iterator is now",dateIterator);
                    var coords = Model.getExistingLocation(dateIterator);
                    var latitude = coords[0];
                    var longitude = coords[1];
                    // mapContainer = $('#mapSummaryDiv');
                    console.log("Passed to map",latitude,longitude);
                    if (firstTime === 1) {
                        map = Utilities.createGoogleMap(latitude,longitude,'mapSummaryDiv');
                        firstTime = 2;
                    }
                    marker = Utilities.createMapMarker(latitude,longitude,map);    
                    google.maps.event.addListener(marker, 'click', (function(marker, dateIterator) { 
                            return function() {
                              var content = Model.getExistingTask(dateIterator);
                              infowindow.setContent(content);
                              infowindow.open(map, marker);
                            }
                    })(marker, dateIterator));  //end of Listener
                }   //end of if loop
               }   //end of for loop
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
    //                 View.clearTasksInSliderView();
    //                 $( "#stopvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] ); 
    //                 var tasksInRange = Model.getNumberOfTasksInRange(ui.values[0],ui.values[1]);           
    //                 View.showTasksInRange(tasksInRange);
    //                 View.createMultipleMarkers(ui.values[0],ui.values[1]);
  
    //                 }  //end of slider stop function               

    function createSlider(sliderWidth)  {
        $(function(){
        $("#slider-range").slider({
          range: true,
          min: 1,
          max: sliderWidth,       
          values:[1,20], 
          step:1,
          slide: function onSliderMove(event, ui){

                  var currentMonthName = Utilities.getMonthName(Utilities.getCurrentMonthNumber());
                  console.log("currentMonth in createslideris now",currentMonthName);
                  $( "#slidevalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] + ' '+ currentMonthName);
                  },
          start: function onSliderStart(event,ui){
                  $( "#startvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] );
                  },
          stop: function onSliderStop(event, ui){
                  View.clearTasksInSliderView();
                  $( "#stopvalue" ).val(ui.values[ 0 ] + " - " + ui.values[ 1 ] ); 
                  var tasksInRange = Model.getNumberOfTasksInRange(ui.values[0],ui.values[1]);           
                  View.showTasksInRange(tasksInRange);
                  View.createMultipleMarkers(ui.values[0],ui.values[1]);
                  }   
            });  
          });  
      }

      
  
  return {
    changeFormToVisible: changeFormToVisible,
    changeFormToHidden: changeFormToHidden,
    changeformHeader: changeformHeader,
    chooseAFormToDisplay:chooseAFormToDisplay,
    clearTasksInSliderView:clearTasksInSliderView,
    createGridOfDatesView:createGridOfDatesView,
    createPageHeader:createPageHeader,
    createMultipleMarkers:createMultipleMarkers,
    createSlider:createSlider,
    displayTaskText:displayTaskText,
    displayStarterMap:displayStarterMap,
    
    hideSummaryMap:hideSummaryMap,
    highlightDate:highlightDate,
    setMapOnForm:setMapOnForm,
    setTodayHighlight:setTodayHighlight,
    setWeekdayLabelsToColumns:setWeekdayLabelsToColumns, 
    setArrayValuesToTablePosition:setArrayValuesToTablePosition,
    showPostcodeCoordinates:showPostcodeCoordinates,
    showMapView:showMapView,
    showTasksInRange:showTasksInRange,
    showTasksInSelection:showTasksInSelection,
    unHighlightDate:unHighlightDate
  };
  
})();