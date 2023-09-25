document.addEventListener('DOMContentLoaded', function() {
    (function () {
    
        function showError(errorMessage) {
            $('.error-msg').html(errorMessage);
        }
        const urlParams = new URLSearchParams(window.location.search);
        const form = document.getElementById('registration-form');
        const fieldPassword = document.getElementById('password');
        const fieldEmail = document.getElementById('email');
        const fieldPhone = document.getElementById('field-phone');
        const errorMap = ["Invalid number", "Invalid country code", "Too short", "Too long", "Incorrect number"];
        const phoneNumberInput = document.querySelector('input[name="phone"]');
        const phoneNumberField = window.intlTelInputGlobals.getInstance(phoneNumberInput);
        const loader0 = document.querySelector('.preloader');
        window.addEventListener('message', function (event) {
            if (event.data == 'capturePort') {
                if (event.ports[0] != null) {
                    port = event.ports[0];
    
                    port.onmessage = function (event) {
                        var data = JSON.parse(event.data);
                    };
                }
            }
        }, false);
    
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            if (!form.checkValidity()) {
                form.reportValidity();
                return;
              }
            $("#submit_button").html("BITTE WARTEN ...");
            loader0.style.display = 'block';
            const selectedCountryData = phoneNumberField.getSelectedCountryData();
            const urlParams = new URLSearchParams(window.location.search);
            const subId1 = urlParams.get('aff_sub1');
            const subId2 = urlParams.get('aff_sub2');
            const subId3 = urlParams.get('aff_sub3');
            const subId4 = urlParams.get('aff_sub4');
            const offer = urlParams.get('offer');
            const source = urlParams.get('source');
            const ip = urlParams.get('ip');
            const countryCode = urlParams.get('country');
            const first_name = $('#field_first_name').val();
            const last_name = $('#field_last_name').val();
            const email = $('#email').val();
            const phone = $('#field-phone').val();
            const area_code = '' + selectedCountryData.dialCode;
    
            // Make the AJAX request to thanks.php
            $.ajax({
                type: "POST",
                url: "https://global.profitsimulators.help/Client/",
                data: {
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    password: fieldPassword.value,
                    area_code: '+' + area_code,
                    country: countryCode,
                    ip: ip,
                    sub1: subId1,
                    sub2: subId2,
                    sub3: subId3,
                    sub4: subId4,
                    sub5: offer,
                    referrer: source,
                },
                success: function (response) {
                    handleApiResponse(response, {
                        first_name: first_name,
                        last_name: last_name,
                        email: email,
                        password: fieldPassword.value,
                        phone: phone,
                        area_code: area_code,
                        country: countryCode,
                        ip: ip,
                        sub1: subId1,
                        sub2: subId2,
                        sub3: subId3,
                        sub4: subId4,
                        sub5: offer,
                    });
                    loader0.style.display = 'none';
                    $("#submit_button").html("ACCOUNT REGISTRIEREN");
                },
                error: function (xhr, status, error) {
                    handleApiResponse(xhr.responseText);
                    loader0.style.display = 'none';
                    $("#submit_button").html("ACCOUNT REGISTRIEREN");
                }
    
            });
            return true;
        });
    
        function handleApiResponse(response, formData) {
            const responseData = isJSON(response) ? JSON.parse(response) : response;
            console.log('Response Data:', responseData);
            if (responseData.hasOwnProperty('redirectUrl')) {
                const redirectUrl = responseData.redirectUrl;
                console.log('Redirect URL:', redirectUrl);
                window.location.replace(redirectUrl);
            } else if (responseData.hasOwnProperty('errorMessage')) {
                const errorMessage = responseData.errorMessage;
                showError(errorMessage);
                console.log('Error Message:', errorMessage);
            } else {
                const errorMessage = responseData.message || 'Error occurred. Please try again later.';
                showError(errorMessage);
                console.log('No Redirect URL or Error Message found in the response data.');
            }
        }      
        function isJSON(jsonString) {
            try {
                const data = JSON.parse(jsonString);
                if (typeof data === 'object' && data !== null) {
                    return true;
                }
            } catch (error) {
                return false;
            }
            return false;
        }
    }());
    });
    