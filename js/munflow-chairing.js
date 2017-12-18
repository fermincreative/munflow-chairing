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

function addDelegation(current_delegation_count){
  current_delegation_count++;
  console.log(current_delegation_count);
  $('#SetupModal #delegation-list .form-delegations').append('<input type="text" class="form-control" id="Delegation-'+current_delegation_count+'" data-delegation-number="'+current_delegation_count+'" placeholder="Delegation '+current_delegation_count+'">');
  $('#SetupModal #add-delegation').attr('onclick','addDelegation('+current_delegation_count+')');
}
