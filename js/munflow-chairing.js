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

  else if (committee_members[key]["present"]==true || committee_members[key]["may_abstain"]==true) {
    $('#rollcall-list').append("<div id=\"country-"+ key +"\" class=\"row rollcall-country\"><div class=\"col-8\">"+committee_members[key]["name"]+"</div><div class=\"col-4\"><button class=\"rollcall-standard rollcall-absent\" onclick=\"markPresentVoting("+key+",'present')\">Absent</button><button class=\"rollcall-standard rollcall-present rollcall-filled\">Present</button><button class=\"rollcall-standard rollcall-pv\" onclick=\"markPresentVoting("+key+",'present')\">Present & Voting</button></div></div>");
  }

  else if (committee_members[key]["present"]==true || committee_members[key]["may_abstain"]==false) {
    $('#rollcall-list').append("<div id=\"country-"+ key +"\" class=\"row rollcall-country\"><div class=\"col-8\">"+committee_members[key]["name"]+"</div><div class=\"col-4\"><button class=\"rollcall-standard rollcall-absent\" onclick=\"markAbsent("+key+",'presentvoting')\">Absent</button><button class=\"rollcall-standard rollcall-present\" onclick=\"markPresent("+key+",'presentvoting')\">Present</button><button class=\"rollcall-standard rollcall-pv rollcall-filled\">Present & Voting</button></div></div>");
  }


  });

}
}

function markAbsent(value,current_status) {
  var committee_settings_current=JSON.parse(committee_settings);
  console.log(value);
  committee_settings_current["delegations"][value]['present']=false;
  committee_settings_current["delegations"][value]['may_abstain']=false;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });

}

function markPresent(value,current_status) {
  var committee_settings_current=JSON.parse(committee_settings);
  console.log(value);
  committee_settings_current["delegations"][value]['present']=true;
  committee_settings_current["delegations"][value]['may_abstain']=true;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });


}

function markPresentVoting(value,current_status) {
  var committee_settings_current=JSON.parse(committee_settings);
  committee_settings_current["delegations"][value]['present']=true;
    committee_settings_current["delegations"][value]['may_abstain']=false;
  var committee_settings_string=JSON.stringify(committee_settings_current);
  Cookies.set('committee_settings', ''+committee_settings_string+'', { expires: 14 });
}
