/*
  Needs proper license disclaimer https://fullcalendar.io/license

 */

var startTime, endTime, currDesktop;

var submitted = 0;

function submitFunction() {
	var x = document.getElementById("Desktop").value;
	document.getElementById("demo").value = x;
	if(x != ""){
		submitted = 1;
	}
}

function setDesktop(){
	currDesktop = document.getElementById("Desktop");
}

function checkForInfoDisplay(start, end){
	if(submitted == 1){
		var a = new Date(start);
		var b = new Date(end);

		document.getElementById("date").value = "Date: " + a.toLocaleDateString('en-US');
		document.getElementById("time").value = "Time: " +a.toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit'})+ " - "+
		 b.toLocaleTimeString('en-US',{hour: '2-digit', minute:'2-digit'});
		document.getElementById("desktop").value = "Desktop: " + document.getElementById("Desktop").value;
		document.getElementById("reservedBy").value = "Reserved By: ";
		return true;
	}
	else{
		alert("You must select a desktop and submit to see time slot information.")
		return false;
	}
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
					end = start + 1.08e+7; // enforces the 3hr blocks. (milliseconds)
					var check = checkForInfoDisplay(start, end);
					var quantity = $('.fc-event').length;
					if (check == false || quantity > 3)
					{
						$('#calendar').fullCalendar('unselect');
						if(quantity > 3){
							alert('You can only select a maximum of three slots!')
						}
						return
					}

					
					//setStartEndTime(start, end);
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
