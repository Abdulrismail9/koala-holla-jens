console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );
  // Establish Click Listeners
  setupClickListeners()
  // load existing koalas on page load
  getKoalas();

}); // end doc ready

function setupClickListeners() {
  $( '#addButton' ).on( 'click', function(){
    console.log( 'in addButton on click' );
    // get user input and put in an object
    // NOT WORKING YET :(
    // using a test object
    let koalaToSend = {
      name: $( '#nameIn' ).val( ),
      age: $('#ageIn').val(),
      gender: $('#genderIn').val(),
      readyForTransfer: $('#readyForTransferIn').val(),
      notes: $('#notesIn').val(),
    };
    console.log( koalaToSend );
    // check to make sure inputs are valid before sending to server
    if (koalaToSend.name == '' || koalaToSend.age == '' || koalaToSend.gender == '' || koalaToSend.readyForTransfer == '' ){
      alert( 'One or more inputs are invali.  Please try again.' );
    }
    else{
      // call saveKoala with the new obejct
      saveKoala(koalaToSend);
    }
  }); 
  $('#viewKoalas').on('click', '.deleteBtn', deletekoalas);
  $( '#viewKoalas' ).on( 'click', '.transferBtn', editTransfer);
}

function getKoalas(){
  console.log( 'in getKoalas' );
  // ajax call to server to get koalas
  $.ajax({
    type: 'GET',
    url: '/koalas'
  }).then(function(response){
    console.log('GET response from server', response);
    $('#viewKoalas').empty();
    for(let koalas of response ) {
      let koalaItem = $(`<tr>
      <td>${koalas.name}</td>
      <td>${koalas.age}</td>
      <td>${koalas.gender}</td>
      <td>${koalas.ready_to_transfer}</td>
      <td>${koalas.notes}</td>
      <td><button class="transferBtn">Ready For Transfer</button></td>
      <td><button class="deleteBtn">Delete Me</button></td>
      </tr>`);

      $('#viewKoalas').append( koalaItem);

      koalaItem.data('koala', koalas);
      
    }
  }).catch(function(error){
    console.log('error in GET', error);
    
  })
} // end getKoalas


function saveKoala( newKoala ){
  console.log( 'in saveKoala', newKoala );
  // ajax call to server to get koalas
  $.ajax({
    method: 'POST',
    url: `/koalas`,
    data: newKoala

  }).then(function (res) {
    console.log('response from server on POST:', res);
    getKoalas();
  }).catch(function (err) {
    console.log('error in POST:', err);

  });
} // end saveKoala

function editTransfer( ){
  console.log( 'in editTransfer' );
  const koala = $( this ).parent( ).parent( ).data( 'koala' );
  console.log( koala);
  let operation = { operation: koala.ready_to_transfer };
  $.ajax({
    method: 'PUT',
    url: `/koalas/${koala.id}`,
    data: operation
  }).then( function( res ){
    console.log( 'PUT WORKED!:', res );
    getKoalas();
  }).catch( function( err ){
    console.log( err );
  })
}





// function for deleting koalas when button is clicked
function deletekoalas() {
  let koala = $(this).parent().parent().data('koala');
  console.log('in deleteKoalas', id);

  $.ajax({
    method: 'DELETE',
    url: `/koalas/${koala.id}`
  }).then(function(response) {
    console.log('delete working', response) 
    getKoalas();
  })


}
  

