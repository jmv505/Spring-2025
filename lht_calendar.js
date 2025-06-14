"use strict";

/*
   New Perspectives on HTML5 and CSS3, 8th Edition
   Tutorial 10
   Tutorial Case

   Author: Juan Carlos Montero
   Date: 4/28/2025  

   Filename:   lht_calendar.js  

   Function List:
   createCalendar(calDate)
      Creates the calendar table for the month specified in the
      calDate parameter. The current date is highlighted in 
      the table.

   calCaption(calDate)
      Writes the caption of the calendar table

   calWeekdayRow()
      Writes the weekday title rows in the calendar table

   daysInMonth(calDate)
      Returns the number of days in the month from calDate

   calDays(calDate)
      Writes the daily rows in the calendar table, highlighting calDate
	
*/

/* set the date displayed in the calendar */
var thisDay = new Date();

/* Write the calendar to the element with the id "calendar" */
document.getElementById("calendar").innerHTML = createCalendar(thisDay);

/* Function to generate the calendar table */
function createCalendar(calDate){
	var calendarHTML = "<table id='calendar_table'>";
	calendarHTML += calCaption(calDate);
	calendarHTML += calWeekdayRow();
	calendarHTML += calDays(calDate);
	calendarHTML += "</table>";
	return calendarHTML;
}

/* Function to write the calendar caption */
function calCaption(calDate){
	//monthName array contains the list of month names 
	var monthName = ["January", "February", "March", "April",
					"May", "June", "July", "August", "September",
					"October", "November", "December"];
					
	// Determine the current month
	var thisMonth = calDate.getMonth();
	
	// Determine the current year
	var thisYear = calDate.getFullYear();
	
	//write the caption
	return "<caption>" + monthName[thisMonth] + " " + thisYear + "</caption>";
}

/* Function to write a tabl row of weekday abbreviations */
function calWeekdayRow(){
	// Array of weekday abbreviations
	var dayName = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	var rowHTML = "<tr>";
	
	// Loop through the dayName array
	for(var i = 0; i < dayName.length; i++){
		rowHTML += "<th class='calendar_weekdays'>" + dayName[i] + "</th>";
	}

	rowHTML += "</tr>";
	return rowHTML;
}

/* Function to calculate the number of days in a month */
function daysInMonth(calDate){
	// Array of days in each month
	var dayCount = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	
	// Extract the four digit year and month value
	var thisYear = calDate.getFullYear();
	var thisMonth = calDate.getMonth();
	
	// Revise the days in February for leap years
	if(thisYear % 4 === 0){
		if((thisYear % 400 === 0) || (thisYear % 100 !== 0)){
			dayCount[1] = 29;
		}
	}
	
	// Return the number of days for the current month
	return dayCount[thisMonth];
}

/* Function to write table rows for each day of the month */ 
function calDays(calDate){
	// Determine the starting day of the month
	var day = new Date(calDate.getFullYear(), calDate.getMonth(), 1);
	var weekDay = day.getDay();
	var today = new Date();
	var currentDay = (today.getFullYear() === calDate.getFullYear() && 
					today.getMonth() === calDate.getMonth()) ? today.getDate() : -1;
	
	// Write blank cells preceding the first day of the month
	var htmlCode = "<tr>";
	for(var i = 0; i < weekDay; i++){
		htmlCode += "<td></td>";
	}
	
	// Write cells for each day of the month
	var totalDays = daysInMonth(calDate);
	for(var i = 1; i <= totalDays; i++){
		day.setDate(i);
		weekDay = day.getDay();

		if(weekDay === 0) htmlCode += "<tr>";
		if(i === currentDay){
			htmlCode += "<td class='calendar_dates' id='calendar_today'>" + i + "</td>";
		}
		else{
			htmlCode += "<td class='calendar_dates'>" + i + "</td>";
		}
		if(weekDay === 6) htmlCode += "</tr>";
	}
	
	// Close the last row if needed
	if (weekDay !== 6) {
		htmlCode += "</tr>";
	}
	
	return htmlCode;
}
