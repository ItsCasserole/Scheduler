/*
  Needs proper license disclaimer https://fullcalendar.io/license

 */



//returns the name of the currently displayed desktop

var startTime, endTime, currDesktop;

var submitted = 0;

function submitFunction() {
	var x = document.getElementById("Desktop").value;
	document.getElementById("demo").innerHTML = x;
	if(x != ""){
		submitted = 1;
	}
}

function checkForPopup(){
	if(submitted == 0){
		alert("You must submit a desktop choice to view time slot information.");
		return false;
	}
	else{
		window.open("popup.html","Information Window","width = 600px, height = 600px");
		document.getElementById("desk").innerHTML = currDesktop;
		return true;
	}
}

function setDesktop(){
	currDesktop = document.getElementById("Desktop");
}

function getDesktop(){
	return currDesktop;
}

function setStartTime(num){
	startTime = num;
}

function getStartTime(){
	return startTime;
}

function setEndTime(num){
	endTime = num;
}

function getEndTime(){
	return endTime;
}

function getTodaysDate() {
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1; //January is 0!
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}

	if (mm < 10) {
		mm = '0' + mm;
	}

	today = yyyy + '-' + mm + '-' + dd;

	return today;
}

/*
 * This function copies the start and end times
 * to the html textboxes.
 */
function setStartEndTime(start, end) {
	var a = new Date(start);
	var b = new Date(end);

	document.getElementById("start_time").value = a.toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit'});
	document.getElementById("end_time").value = b.toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit'});

}

function BuildCalendar() {

	$(document).ready(function() {

		$('#calendar').fullCalendar({

			schedulerLicenseKey: 'CC-Attribution-NonCommercial-NoDerivatives',
			timezone: 'local',
			defaultView: 'agendaWeek',
			//aspectRatio: 1.8,
			resourceGroupField: 'desktop',
			navLinks: true, // can click day/week names to navigate views
			selectable: true,
			selectHelper: true,
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			allDaySlot:false,
			slotDuration: "03:00:00",
			contentHeight: 'auto',
			eventDurationEditable: false, //prevents event from being resize

			resources: [
				{ id: 'MES1', desktop: 'TI-12', title: 'MES1', eventColor: 'blue' },
				{ id: 'MES2', desktop: 'TI-16', title: 'MES2', eventColor: 'green' },
				{ id: 'MES3', desktop: 'TI-16', title: 'MES3', eventColor: 'orange' }
				],

				header: {
					left: 'prev,next today',
					center: 'title',
					right: 'agendaWeek,timelineDay'

				},

				defaultDate: getTodaysDate(),

				select: function(start, end) {
					
					var check = checkForPopup();

					var quantity = $('.fc-event').length;
					if (check == false || quantity > 3)
					{
						$('#calendar').fullCalendar('unselect');
						// alert('You can only select a maximum of three slots!')
						return
					}

					end = start + 1.08e+7; // enforces the 3hr blocks. (milliseconds)
					setStartEndTime(start, end);
					//var title = prompt('Event Title:');
					var eventData;
					var title =  quantity + "-" + document.getElementById("Build").value;
					if (title) {

						eventData = {
								resourceId: document.getElementById("Desktop").value,
								title: title,
								start: start,
								end: end
						};
						$('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true

					}
					$('#calendar').fullCalendar('unselect');
				},

				eventClick: function(event, element) {
					event.title = "CLICKED!";
					$('#calendar').fullCalendar('updateEvent', event);
				},

				eventOverlap: function(stillEvent, movingEvent) {
					return stillEvent.allDay && movingEvent.allDay;
				},

				eventDrop: function(event, delta, revertFunc) {

					setStartEndTime(event.start, event.end);
				},
//				eventRender: function(event, element) { 
//				$(element).tooltip({title: event.title}); 

//				},




		});

	});
} // BuildCalendar