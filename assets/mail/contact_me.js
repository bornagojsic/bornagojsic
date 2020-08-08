window.addEventListener("DOMContentLoaded", function() {

    // get the form elements defined in your form HTML above
    
    var form = document.getElementById("contactForm");
    var button = document.getElementById("sendMessageButton");
    var status = document.getElementById("contactFormStatus");

    // Success and Error functions for after the form is submitted
    
    function success() {
        // Success message
        $("#success").html("<div class='alert alert-success'>");
        $("#success > .alert-success")
            .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
        $("#success > .alert-success").append(
            "<strong>Your message has been sent. </strong>"
        );
        $("#success > .alert-success").append("</div>");
        //clear all fields
        $("#contactForm").trigger("reset");
    }

    function error() {  
        // Fail message
        $("#success").html("<div class='alert alert-danger'>");
        $("#success > .alert-danger")
            .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
            )
            .append("</button>");
        $("#success > .alert-danger").append(
            $("<strong>").text(
                "Sorry " +
                    firstName +
                    ", it seems that my mail server is not responding. Please try again later!"
            )
        );
        $("#success > .alert-danger").append("</div>");
        //clear all fields
        $("#contactForm").trigger("reset");
    }

    // handle the form submission event

    form.addEventListener("submit", function(ev) {
        ev.preventDefault();
        var data = new FormData(form);
        ajax(form.method, form.action, data, success, error);
    });
});

// helper function for sending an AJAX request

function ajax(method, url, data, success, error) {
    var xhr = new XMLHttpRequest();
    xhr.open(method, url);
    xhr.setRequestHeader("Accept", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState !== XMLHttpRequest.DONE) return;
        if (xhr.status === 200) {
            success(xhr.response, xhr.responseType);
        } else {
            error(xhr.status, xhr.response, xhr.responseType);
        }
    };
    xhr.send(data);
}