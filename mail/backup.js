function send_email() {
  // Taking User insertion
  var recipient = document.querySelector('#compose-recipients').value;
  var subject = document.querySelector('#compose-subject').value;
  var body = document.querySelector('#compose-body').value;

    // spliting if more than 1 email
    var recipients  = recipient.split(',')

    //looping over emails
    for (email in recipients){
      fetch('/emails', {
          method: 'POST',
          body: JSON.stringify({
              recipients: recipients[email],
              subject: subject,
              body: body
          })
          })
          .then(response => response.json())
          .then(result => {
            // Print result
           console.log(result);
           console.log(result.status);
           if (result['error']){
             document.querySelector('#error_msg').innerHTML =
             `<div class="alert alert-danger" role="alert">
                  ${result.error}
              </div>`;
              return false;
           }
           else {
              load_mailbox('sent');
           }
        });
    }
}
