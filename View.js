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
    createPageHeader:createPageHeader
  };
  
})();