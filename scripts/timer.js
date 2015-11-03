var sessionIntervalId, breakIntervalId;
var sessionKnob = $('.session'), breakKnob = $('.break'); 
var sessionLength = 10;
var breakLength = 5;
//bind events to input fields and buttons
$( ".session_length" )
.keyup(function() {
    sessionLength = $( this ).val();
    console.log("Session Length is " + sessionLength);
})
.keyup();

$( ".break_length" )
.keyup(function() {
    breakLength = $( this ).val();
    console.log("Break Length is " + breakLength);
})
.keyup();

$('#terminate').click(function(){

    resetTimer(sessionKnob);
    resetTimer(breakKnob);
    stopTimer(sessionIntervalId);
    stopTimer(breakIntervalId);
    $(".session_length").prop('disabled', false);
    $(".break_length").prop('disabled', false);
});

$('#start').click(function(){
    sessionKnob.config(parseInt(sessionLength, 10));
    sessionIntervalId = startTimer(sessionKnob);
    $(".session_length").prop('disabled', true);
    $(".break_length").prop('disabled', true);
});

function startTimer(knob){
    var count = 0;
    id = setInterval(function(){ 
        newVal = ++count; 
        knob.val(newVal).trigger('change'); 
        }, 1000);
    return id;
}
function stopTimer(id){
        clearInterval(id);
}
function resetTimer(knob){
    knob.val(0).trigger('change');
    knob.config(0);
}

jQuery.fn.config = function( timerVal ){ 
    $(this).trigger(
        'configure',
        {
            "min":0,
            "max":timerVal,
            'readOnly': true,              
            'displayInput' : false, 
            'lineCap':'butt',
            'displayInput': false
        }
    );
};

jQuery(function($) {

    $(".session").knob({
        change : function (value) {
            console.log("session change : " + value);
        },
        release : function (value) {
            //console.log("session release : " + value);
            if (value == sessionLength){
                stopTimer(sessionIntervalId);
                breakKnob.config(parseInt(breakLength, 10));
                //Start break knob
                breakIntervalId = startTimer(breakKnob);
            }

            
        }
    });

    $(".break").knob({
        change : function (value) {
            console.log("break change : " + value);
        },
        release : function (value) {
            //console.log("break release : " + value);

            if (value == breakLength){
                stopTimer(breakIntervalId);
                resetTimer(sessionKnob);
                resetTimer(breakKnob);
                sessionKnob.config(parseInt(sessionLength, 10));
                //Start break knob
                sessionIntervalId = startTimer(sessionKnob);
            }        
            
        }
    });
});