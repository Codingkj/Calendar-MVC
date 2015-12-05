var View = (function () {
  
    function changeFormToVisible(formToChange){
    var changeform = $('#'+ formToChange);
    changeform.addClass('visible').removeClass('hidden');    
     } 

    function changeFormToHidden(formToChange){
        var changeform = $('#'+ formToChange);
        changeform.addClass('hidden').removeClass('visible'); 
    }

    function changeformHeader(dateSelected, currentMonthName, year){
        $('p.headingtext').text([dateSelected]+ ' '+currentMonthName+' '+ year);
    }

    function chooseAFormToDisplay(dateSelected,taskEntry){
        if (taskEntry === ""){
            return 'divTaskEntryForm'
            }  
        return 'divTaskEditForm';       
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

    function setTodayHighlight(selectedDate,calendarCell){
      console.log("Date is...",selectedDate);
      console.log("calendarCell",calendarCell);
      calendarCell.setAttribute("class","todaysdate");   
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
     function showPostcodeCoordinates(search){
        var url=('http://api.postcodes.io/postcodes/'+ search);
            console.log("url is...",url);
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
            
                var mapCreated = Utilities.createGoogleMap(latitudeReturnedFromLookup,longitudeReturnedFromLookup,'mapTaskEntry');
                var markerCreated = Utilities.createMapMarker(latitudeReturnedFromLookup, longitudeReturnedFromLookup ,mapCreated); 
                Model.setCoordsForLocation(locationsArray, dateSelected,latitudeReturnedFromLookup,longitudeReturnedFromLookup); 
                }
            xhr.send();
        }

    function showMapView(){
        $('#formDiv2').addClass("mapsurround2").removeClass("hidden");
    }

    function displayStarterMap(latitude,longitude){  //could use CreateGoogleMap instead
        var mapOptions={ 
            center:new google.maps.LatLng(latitude,longitude),
            zoom:12   };

        // var mylatlng = new google.maps.LatLng(latitude, longitude);
        // console.log("mylatlng", mylatlng);
        var map= new google.maps.Map(document.getElementById("mapView-mapdiv"),mapOptions);
        var marker = new google.maps.Marker({
                    position:{lat: latitude, lng: longitude},
                    map: map,
                    title: 'Your task is here!',
                   });  
  }
  function setArrayValuesToTablePosition(daysToUse,parentElement){
    var NUMBER_OF_COLUMNS = 7; 
    var $cell;
    var $tableRow;
    
    $.each(daysToUse, function(index) {
        if(!(index % NUMBER_OF_COLUMNS)) {
            $tableRow = $('<tr>');
        }

        $cell = $('<td>').html(daysToUse[index]);
        $cell.addClass('active');
        $tableRow.append($cell);
        parentElement.append($tableRow); 
    });       
  }        

  
  return {
    changeFormToVisible: changeFormToVisible,
    changeFormToHidden: changeFormToHidden,
    changeformHeader: changeformHeader,
    chooseAFormToDisplay:chooseAFormToDisplay,
    createGridOfDatesView:createGridOfDatesView,
    highlightDate:highlightDate,
    unHighlightDate:unHighlightDate,
    displayTaskText:displayTaskText,
    setTodayHighlight:setTodayHighlight,
    setWeekdayLabelsToColumns:setWeekdayLabelsToColumns,
    createPageHeader:createPageHeader,
    clearTasksInSliderView:clearTasksInSliderView,
    showPostcodeCoordinates:showPostcodeCoordinates,
    showMapView:showMapView,
    displayStarterMap:displayStarterMap,
    setArrayValuesToTablePosition:setArrayValuesToTablePosition
  };
  
})();