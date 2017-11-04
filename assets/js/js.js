var database = firebase.database();

$(document).on("click", "#submit", function(){
    var trainRef = database.ref("trains");

    var trainName = $("#trainName").val();

    var destination =  $("#destination").val();

    var frequency = $("#frequency").val();

    var firstArrival = $("#firstArrival").val();

    if(trainName === '' || destination === '' || frequency === '' ||
        firstArrival === ''){

        alert('you must complete every field!')
    }
    else{


        trainRef.push({

            "trainName" : trainName,
            "destination": destination,
            "frequency" : frequency,
            "firstArrival": firstArrival

        });

        $("#trainName").val('');
        $("#destination").val('');
        $("#frequency").val('');
        $("#firstArrival").val('');
     }

});

database.ref("trains").on("value", function(snapshot){
   $(".tbody").empty();
    snapshot.forEach(function(childSnap){


        var newTR = $("<tr>");
        var newTrain = $("<td>");
        var newDestination = $("<td>");
        var newFrequency = $("<td>");
        var newArrival = $("<td>");
        var newMinutesAway = $("<td>");
        var newDelete = $("<td>");
        var newBtn = $("<button>");

        var arrivalTime = moment(childSnap.val().firstArrival, 'h:mm a');
        var currentTime = moment().format('h:mm a');
        var minutesAway = moment(arrivalTime).fromNow();
        console.log(arrivalTime);
        console.log(minutesAway);

        newTrain.addClass("mdl-data-table__cell--non-numeric");
        newTrain.html(childSnap.val().trainName);

        newDestination.addClass("mdl-data-table__cell--non-numeric");
        newDestination.html(childSnap.val().destination);

        newFrequency.html(childSnap.val().frequency);

        newArrival.html(childSnap.val().firstArrival);

        newMinutesAway.html(minutesAway);

        newBtn.addClass("mdl-button mdl-js-button mdl-button--fab mdl-button--mini-fab mdl-button--colored");
        newBtn.html("<i class='material-icons'>delete</i>");

        newDelete.append(newBtn);

        newTR.append(newTrain);
        newTR.append(newDestination);
        newTR.append(newFrequency);
        newTR.append(newArrival);
        newTR.append(newMinutesAway);
        newTR.append(newDelete);

        $(".tbody").append(newTR);

    })
})

