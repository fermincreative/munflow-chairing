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
   backdrop: 'static'
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

function takeRollCall() {
  var committee_settings=JSON.parse((Cookies.get('committee_settings'));

}
