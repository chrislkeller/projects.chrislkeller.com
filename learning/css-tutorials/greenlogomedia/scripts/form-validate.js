//FORM VALIDATION
function Validate() {

    var form = document.contactus;

if (!form.client-name.value) {
alert("Please enter your name.");
form.client-name.focus();
return;
}

else if (!form.client-email.value) {
window.alert("Please enter your email.");
form.client-email.focus();
return;
}

else if (!form.client-phone.value) {
window.alert("Please enter your phone number.");
form.client-phone.focus();
return;
}

else if (!form.client-inquiry.value) {
window.alert("Please tell us how we can help.");
form.client-inquiry.focus();
return;
}

  return true;
}

document.Validate = Validate;