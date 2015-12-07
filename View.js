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
        $('#formDiv2').addClass("hidden").removeClass("mapsurround2");
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
    function displayTasksInSelection(iterator,startDate,stopDate){
      var $selectedTask = Model.getExistingTask(iterator);
      if ($selectedTask !== ""){
            
            $textBox4=$('<div id="textBox4"></div>');
            $ptext4=$('<p></p>').val="";
            console.log("task text",$selectedTask);
            $lineBr=$('<br></br>'); 
            $textBox4.append(iterator," Nov: ",$selectedTask).append($lineBr);
            $('#taskDiv').append($textBox4);  
            $('#taskDiv').append($lineBr);
            $('#taskDiv').append($lineBr);
            }
    }

    function setTodayHighlight(DateToHighlight){
      var alldates = document.getElementsByClassName("active");
      for (var counter=0; counter < alldates.length;counter++){
        if (alldates[counter].innerHTML == DateToHighlight){
          var selectedDate = alldates[counter];
          selectedDate.setAttribute("class","todaysdate");
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
        $('#formDiv2').addClass("mapsurround2").removeClass("hidden");
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

  
  return {
    changeFormToVisible: changeFormToVisible,
    changeFormToHidden: changeFormToHidden,
    changeformHeader: changeformHeader,
    chooseAFormToDisplay:chooseAFormToDisplay,
    clearTasksInSliderView:clearTasksInSliderView,
    createGridOfDatesView:createGridOfDatesView,
    createPageHeader:createPageHeader,
    displayTaskText:displayTaskText,
    displayStarterMap:displayStarterMap,
    displayTasksInSelection:displayTasksInSelection,
    hideSummaryMap:hideSummaryMap,
    highlightDate:highlightDate,
    setTodayHighlight:setTodayHighlight,
    setWeekdayLabelsToColumns:setWeekdayLabelsToColumns, 
    setArrayValuesToTablePosition:setArrayValuesToTablePosition,
    showPostcodeCoordinates:showPostcodeCoordinates,
    showMapView:showMapView,
    unHighlightDate:unHighlightDate
  };
  
})();