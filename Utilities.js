var Utilities = (function () {
  
  function getCurrentMonthNumber(){
    return new Date().getMonth()+1;
  }
  function getYearNumber(){
      return new Date().getFullYear();
  }

  function getMonthName(monthNumber){
      
      var monthNamesArray=['January','February','March','April','May','June','July','August','September','October','December','December'];
      var currentMonthName = monthNamesArray[monthNumber-1];
      return currentMonthName;
  }
    

  function getDatesInCurrentMonth(currentYear,currentMonthNumber){        
      var dateCount;  //could this all be in the return statement.
      
      dateCount = new Date(currentYear, currentMonthNumber, null).getDate();
      console.log("dates in Month",dateCount);
      
      return dateCount;
  }
  function findTodaysDate(){
      var today = new Date().getDate();
    return today;
}

  
  return {
    getCurrentMonthNumber: getCurrentMonthNumber,
    getYearNumber:getYearNumber,
    getMonthName:getMonthName,
    getDatesInCurrentMonth:getDatesInCurrentMonth,
    findTodaysDate:findTodaysDate
  };
  
})();