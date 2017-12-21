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
  var delegations_entered=0;
  var committee_settings={};
  committee_settings["committee_name"]=committee_name;
  committee_settings["delegations"]={};
  for (delegation = 1; delegation <= delegation_count; delegation++) {
      var delegation_value=$('#committee-settings .form-delegations #Delegation-'+delegation+'').val();
      if (delegation_value === '') {

      } else {
        committee_settings["delegations"][''+delegations_entered+'']={
          name: delegation_value,
          present: false,
          may_abstain: false,
          voting_status: 'none',
          has_passed: false,
          speaking_time: 0,
        };
        delegations_entered++;

      }

  }

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

}

// Load list of countries that is present;
function showCountriesPresentGSR() {
    var committee_settings=Cookies.get('committee_settings');
    var committee_settings_parsed=JSON.parse(committee_settings);
    var committee_members=committee_settings_parsed["delegations"];
    console.log(committee_members);
    Object.keys(committee_members).forEach(key => {
      if (committee_members[key]["present"]==true) {
        $('#gsr-countrylist').append("<div id=\"gsr-countrylist-country-"+key+"\" onclick=\"addCountryGSR("+key+")\"><p>"+committee_members[key]['name']+"</p></div>");
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
  $('#gsr').append("<div id=\"gsr-list-"+key+"\"class=\"gsr-country\"><p>"+committee_settings_parsed['delegations'][key]['name']+"</p></div>");
  $("#gsr-countrylist-country-"+key+"").attr('onclick',null);
  $("#gsr-countrylist-country-"+key+"").addClass('country-in-gsr');

}

function removeCountryGSR(key){

}

function currentSpeakerGSR() {
}

function showGSR(){
  var gsr=Cookies.get('gsr');
  var committee_settings=Cookies.get('committee_settings');
  var gsr=Cookies.get('gsr');
  var committee_settings_parsed=JSON.parse(committee_settings);
  if (gsr === undefined) {
  }
  else {
    var gsr_parsed=JSON.parse(gsr);
    console.log(gsr_parsed);
    for (var key in gsr_parsed) {
    var key_value=gsr_parsed[key];
    $('#gsr').append("<div id=\"gsr-"+key+"\"><p>"+committee_settings_parsed['delegations'][key_value]['name']+"</p></div>");
  }

  }
}

function GSRTimer() {
  var time = new Date();
  var seconds=0;
  var minutes=0;
  $('#gsr-timer').append('0'+minutes+':0'+seconds+'');

  

}
