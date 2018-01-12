function showItem(button) {
var target=$('#'+ button +'').data('target');
var current=$('#'+ button +'').data('current');
$('#'+current+'').addClass('content-hidden');
$('#'+target+'').removeClass('content-hidden');
$('#left-sidebar button.standard').data("current",''+target+'');

};

var committee_settings=Cookies.get('committee_settings');
if (committee_settings === undefined) {
  $('#SetupModal').modal({
    show: true,
    keyboard: false,
    backdrop: 'static',
  });
}

function addDelegation(delegation_count){
  var new_delegation_count=delegation_count+1;
  $('#SetupModal #delegation-list .form-delegations').append('<input type="text" class="form-control" id="Delegation-'+new_delegation_count+'" data-delegation-number="'+new_delegation_count+'" placeholder="Delegation '+new_delegation_count+'">');
  $('#SetupModal #add-delegation').attr('onclick','addDelegation('+new_delegation_count+')');
  $('#committee-settings #save').data('delegations',new_delegation_count);
};

$("#committee-settings #save").click(function(e){
  var committee_name = $('#CommitteeName').val();
  var delegation_count = $('#committee-settings #save').data('delegations');
  var gsr_time = $('#CommitteeSpeakingTime').val();
  var delegations_entered=0;
  var committee_settings={};
  committee_settings["committee_name"]=committee_name;
  committee_settings["gsr_time"]=gsr_time;
  committee_settings["delegations"]={};
  committee_countries=[];
  for (delegation = 1; delegation <= delegation_count; delegation++) {
      var delegation_value=$('#committee-settings .form-delegations #Delegation-'+delegation+'').val();
      committee_countries.push(''+delegation_value+'');
  }
  committee_countries.sort();
  committee_countries.forEach(function(entry) {

      if (entry === '') {

      } else {
        committee_settings["delegations"][''+delegations_entered+'']={
          name: entry,
          present: false,
          in_gsr: false,
          may_abstain: false,
          voting_status: 'none',
          has_passed: false,
          speaking_time: 0,
        };
        delegations_entered++;

      }

  });

  var committee_settings_string=JSON.stringify(committee_settings);
  console.log(committee_settings_string);

  if (committee_settings === undefined) {
  } else {
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });
  location.reload();
  }
});

// Make a list of countries for roll call

function showRollCall() {
  if (committee_settings === undefined) {
  } else {
  var committee_settings_parsed=JSON.parse(committee_settings);
  var committee_members=committee_settings_parsed["delegations"];
  console.log(committee_members);
  Object.keys(committee_members).forEach(key => {
      // the value of the current key.
  if (committee_members[key]["present"]==false) {
    $('#rollcall-list').append("<div id=\"country-"+ key +"\" class=\"row rollcall-country\"><div class=\"col-8\">"+committee_members[key]["name"]+"</div><div class=\"col-4\"><button class=\"rollcall-standard rollcall-absent rollcall-filled\">Absent</button><button class=\"rollcall-standard rollcall-present\" onclick=\"markPresent("+key+",'absent')\">Present</button><button class=\"rollcall-standard rollcall-pv\" onclick=\"markPresentVoting("+key+",'absent')\">Present & Voting</button></div></div>");
  }

  else if (committee_members[key]["present"]==true && committee_members[key]["may_abstain"]==true) {
    $('#rollcall-list').append("<div id=\"country-"+ key +"\" class=\"row rollcall-country\"><div class=\"col-8\">"+committee_members[key]["name"]+"</div><div class=\"col-4\"><button class=\"rollcall-standard rollcall-absent\" onclick=\"markAbsent("+key+",'present')\">Absent</button><button class=\"rollcall-standard rollcall-present rollcall-filled\">Present</button><button class=\"rollcall-standard rollcall-pv\" onclick=\"markPresentVoting("+key+",'present')\">Present & Voting</button></div></div>");
  }

  else if (committee_members[key]["present"]==true && committee_members[key]["may_abstain"]==false) {
    $('#rollcall-list').append("<div id=\"country-"+ key +"\" class=\"row rollcall-country\"><div class=\"col-8\">"+committee_members[key]["name"]+"</div><div class=\"col-4\"><button class=\"rollcall-standard rollcall-absent\" onclick=\"markAbsent("+key+",'presentvoting')\">Absent</button><button class=\"rollcall-standard rollcall-present\" onclick=\"markPresent("+key+",'presentvoting')\">Present</button><button class=\"rollcall-standard rollcall-pv rollcall-filled\">Present & Voting</button></div></div>");
  }


  });

}
}

// Functions for roll call. Mark a country absent, present or present and voting and make it visual.
function markAbsent(key,current_status) {
  var committee_settings=Cookies.get('committee_settings');
  var committee_settings_current=JSON.parse(committee_settings);
  committee_settings_current["delegations"][key]['present']=false;
  committee_settings_current["delegations"][key]['may_abstain']=false;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });
  if (current_status=="present") {
    $('#country-'+ key +' .rollcall-present').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-absent').addClass('rollcall-filled');
  } else  {
    $('#country-'+ key +' .rollcall-pv').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-absent').addClass('rollcall-filled');
  }
  $('#country-'+ key +' .rollcall-absent').attr("onclick",null);
  $('#country-'+ key +' .rollcall-present').attr("onclick","markPresent("+key+",'absent')");
  $('#country-'+ key +' .rollcall-pv').attr("onclick","markPresentVoting("+key+",'absent')");

  showCountriesPresentGSR();

}

function markPresent(key,current_status) {
  var committee_settings=Cookies.get('committee_settings');
  var committee_settings_current=JSON.parse(committee_settings);
  committee_settings_current["delegations"][key]['present']=true;
  committee_settings_current["delegations"][key]['may_abstain']=true;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });

  if (current_status=="absent") {
    $('#country-'+ key +' .rollcall-absent').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-present').addClass('rollcall-filled');
  } else  {
    $('#country-'+ key +' .rollcall-pv').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-present').addClass('rollcall-filled');
  }
  $('#country-'+ key +' .rollcall-absent').attr("onclick","markAbsent("+key+",'present')");
  $('#country-'+ key +' .rollcall-present').attr("onclick",null);
  $('#country-'+ key +' .rollcall-pv').attr("onclick","markPresentVoting("+key+",'present')");

  showCountriesPresentGSR();


}

function markPresentVoting(key,current_status) {
  var committee_settings=Cookies.get('committee_settings');
  var committee_settings_current=JSON.parse(committee_settings);
  committee_settings_current["delegations"][key]['present']=true;
    committee_settings_current["delegations"][key]['may_abstain']=false;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });

  if (current_status=="absent") {
    $('#country-'+ key +' .rollcall-absent').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-pv').addClass('rollcall-filled');
  } else  {
    $('#country-'+ key +' .rollcall-present').removeClass('rollcall-filled');
    $('#country-'+ key +' .rollcall-pv').addClass('rollcall-filled');
  }
  $('#country-'+ key +' .rollcall-absent').attr("onclick","markAbsent("+key+",'presentvoting')");
  $('#country-'+ key +' .rollcall-present').attr("onclick","markPresent("+key+",'presentvoting')");
  $('#country-'+ key +' .rollcall-pv').attr("onclick",null);

  showCountriesPresentGSR();

}

// Load list of countries that is present;
function showCountriesPresentGSR() {
    var committee_settings=Cookies.get('committee_settings');
    var committee_settings_parsed=JSON.parse(committee_settings);
    var committee_members=committee_settings_parsed["delegations"];
    $('#gsr-countrylist').empty();
    Object.keys(committee_members).forEach(key => {
      if (committee_members[key]["present"]==true) {
        $('#gsr-countrylist').append("<div id=\"gsr-countrylist-country-"+key+"\" onclick=\"addCountryGSR("+key+")\"><p>"+committee_members[key]['name']+"</p></div>");
      }
      if (committee_members[key]["in_gsr"]==true) {
        $("#gsr-countrylist-country-"+key+"").addClass('country-in-gsr');
        $("#gsr-countrylist-country-"+key+"").attr('onclick',null);
      }
    });
}

//Add a country to the GSR.
function addCountryGSR(key) {
  var gsr=Cookies.get('gsr');
  var committee_settings=Cookies.get('committee_settings');
  var committee_settings_parsed=JSON.parse(committee_settings);
  if (gsr === undefined) {
    var gsr=[];
    gsr.push(key);
    var gsr_string=JSON.stringify(gsr);
    Cookies.set('gsr',''+gsr_string+'',{ expires: 14 });
  } else {
    var gsr_parsed=JSON.parse(gsr);
    gsr_parsed.push(key);
    var gsr_string=JSON.stringify(gsr_parsed);
    Cookies.set('gsr',''+gsr_string+'',{ expires: 14 });
  }
  committee_settings_parsed["delegations"][key]['in_gsr']=true;
  var committee_settings_string=JSON.stringify(committee_settings_parsed);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });
  $('#gsr').append("<div id=\"gsr-list-"+key+"\"class=\"gsr-country\"><p>"+committee_settings_parsed['delegations'][key]['name']+"</p></div>");
  $("#gsr-countrylist-country-"+key+"").attr('onclick',null);
  $("#gsr-countrylist-country-"+key+"").addClass('country-in-gsr');
  currentSpeakerGSR();

}

function removeCountryGSR(key){

}

function currentSpeakerGSR() {
  var gsr=Cookies.get('gsr');
  var committee_settings=Cookies.get('committee_settings');
  var gsr=Cookies.get('gsr');
  var committee_settings_parsed=JSON.parse(committee_settings);
  if (gsr === undefined) {
  }
  else {
    var gsr_parsed=JSON.parse(gsr);
    var key_value=gsr_parsed[0];
    $('#gsr-current-speaker').html("<h1>"+committee_settings_parsed['delegations'][key_value]['name']+"</h1>");

  }

}

function showGSR(){
  var gsr=Cookies.get('gsr');
  var committee_settings=Cookies.get('committee_settings');
  var gsr=Cookies.get('gsr');
  var committee_settings_parsed=JSON.parse(committee_settings);
  if (gsr === undefined) {
  }
  else {
    $('#gsr').html('');
    var gsr_parsed=JSON.parse(gsr);
    console.log(gsr_parsed);
    for (var key in gsr_parsed) {
    if (key == 0) {
    } else {
    var key_value=gsr_parsed[key];
    $('#gsr').append("<div id=\"gsr-"+key+"\"><p>"+committee_settings_parsed['delegations'][key_value]['name']+"</p></div>");
    }
  }
  if ($('#gsr').is(':empty')){
    $('#gsr').html('There are no other speakers on the list.');
  }

  }
}

function GSRTimer(action,speaking_time) {
  var committee_settings=Cookies.get('committee_settings');
  var committee_settings_parsed=JSON.parse(committee_settings);
  var committee_speaking_time=committee_settings_parsed["gsr_time"];
  var committee_speaking_time_length=committee_settings_parsed["gsr_time"].length;
  if (committee_speaking_time_length=== 3) {
  var max_minutes=committee_speaking_time.toString()[0];
  var max_seconds=committee_speaking_time.toString()[1] + committee_speaking_time.toString()[2];
  } else if (committee_speaking_time_length === 4 ) {
    var max_minutes=committee_speaking_time.toString()[0] + committee_speaking_time.toString()[1];
    var max_seconds=committee_speaking_time.toString()[2] + committee_speaking_time.toString()[3];

  }

  if (action=='show') {
  seconds=0;
  minutes=0;
  IntervalID=0;
  if (committee_settings_parsed["gsr_time"] === undefined) {
  $('#gsr-timer').append('<h2>0'+minutes+':0'+seconds+'</h2>');
  } else {
  $('#gsr-timer').append('<h2>0'+minutes+':0'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
  }
  }

  if (action=='start') {
     seconds=0;
     minutes=0;
     IntervalID=setInterval(GSRTimerRunning,1000);
     $('#gsr-timer-buttons .btn-start').attr('onclick',null);
     $('#gsr-timer-buttons .btn-start').addClass('btn-grey');
     $('#gsr-timer').html('<h2>0'+minutes+':0'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
  }

  else if (action=='resume') {
    IntervalID=setInterval(GSRTimerRunning,1000);
    $('#gsr-timer-buttons .btn-start').attr('onclick',null);
    $('#gsr-timer-buttons .btn-start').addClass('btn-grey');
    $('#gsr-timer-buttons .btn-pause').removeClass('btn-grey');
    $('#gsr-timer').html('<h2>0'+minutes+':0'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
  }

  else if (action=='pause') {
     Interval=clearInterval(IntervalID);
     Interval=0;
     $('#gsr-timer-buttons .btn-pause').attr('onclick',null);
     $('#gsr-timer-buttons .btn-start').attr("onclick","GSRTimer('resume')");
     $('#gsr-timer-buttons .btn-pause').addClass('btn-grey');
    $('#gsr-timer-buttons .btn-start').removeClass('btn-grey');
  }

  else if (action=='next') {
    // Pause Timer
    seconds=0;
    minutes=0;
    // Clear Interval -> Issue!
    if (IntervalID === undefined) {
    console.log('Interval is undefined!');
    } else {
      Interval=clearInterval(IntervalID);
    }
    // Update Timer
    $('#gsr-timer-buttons .btn-start').attr('onclick',"GSRTimer('start')");
    $('#gsr-timer').html('<h2>0'+minutes+':0'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');

    var gsr=Cookies.get('gsr');
    var gsr_parsed=JSON.parse(gsr);
    console.log(gsr_parsed);
    // Get information on new speaker
    var current_speaker=gsr_parsed[0];
    var next_speaker=gsr_parsed[1];
    $("#gsr-countrylist-country-"+current_speaker+"").attr("onclick","addCountryGSR("+current_speaker+")");
    $("#gsr-countrylist-country-"+current_speaker+"").removeClass('country-in-gsr');
    committee_settings_parsed["delegations"][current_speaker]['in_gsr']=false;


    // Unset first one.
    gsr_parsed.splice(0,1);
    var committee_settings_string=JSON.stringify(committee_settings_parsed);
    var gsr_string=JSON.stringify(gsr_parsed);
    console.log(gsr_string);
    Cookies.set('gsr', ''+gsr_string+'', { expires: 14 });
    Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });
    showGSR();
    currentSpeakerGSR();
  }

  function GSRTimerRunning() {
    seconds++;
    if (seconds >= 60) {
      minutes++;
      seconds=0;
    }
    if (seconds < 10) {
    $('#gsr-timer').html('<h2>0'+minutes+':0'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
    } else if (minutes < 10) {
    $('#gsr-timer').html('<h2>0'+minutes+':'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
    } else {
    $('#gsr-timer').html('<h2>'+minutes+':'+seconds+' / '+max_minutes+':'+max_seconds+'</h2>');
    }
    if (minutes >= max_minutes && seconds >= max_seconds ) {
      Interval=clearInterval(IntervalID);
      $('#gsr-timer-buttons .btn-pause').attr('onclick',null);
      $('#gsr-timer-buttons .btn-start').attr("onclick","GSRTimer('start')");
    }

  }
}
