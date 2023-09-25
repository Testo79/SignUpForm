$(document).ready(function() {
  $.validator.addMethod("usernameRegex", function(value, element) {
    return this.optional(element) || regex_first_last_name.test(value);
  }, "Der Name muss mehr als 2 Zeichen lang sein, ohne spezielle Symbole und Leerzeichen");

  $.validator.addMethod("lastusernameRegex", function(value, element) {
    return this.optional(element) || regex_first_last_name.test(value);
  }, "Nachname muss mehr als 2 Zeichen lang sein, ohne spezielle Symbole und Leerzeichen");

  $.validator.addMethod("passwordRegex", function(value, element) {
    return this.optional(element) || /[a-z]/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value) && /^[0-9A-Za-z]+$/.test(value);
  }, 'Das Passwort muss zwischen 8-12 Zeichen lang sein, einschließlich Buchstaben (A-Z, a-z) und Ziffern (0-9). Ohne Sonderzeichen (^@()_#*+/\"?!=.{}~`&) Und Leerzeichen.');

  $.validator.addMethod("phoneRegex", function(value, element) {
    return this.optional(element) || /^(\d[- ]?){7,11}$/.test(value);
  }, "Die Nummer muss zwischen 7 und 11 Zeichen ohne Sonderzeichen sein");

  $(function() {
    var form = $("#registration-form");
    form.validate({
      ignore: "hidden", // Include hidden fields for validation
      onfocusout: function(element) {
        this.element(element);
      },
      onkeyup: function(element) {
        $(element).valid();
        $('[name="' + element.name + '"]').val(element.value);
      },
      rules: {
        first_name: {
          required: true,
          usernameRegex: false,
          minlength: 2,
          maxlength: 60,
        },
        last_name: {
          required: true,
          lastusernameRegex: false,
          minlength: 2,
          maxlength: 60,
        },
        password: {
          required: true,
          passwordRegex: true,
          minlength: 8,
          maxlength: 12,
        },
        email: {
          required: true,
          email: true,
        },
        phone: {
          phoneRegex: true,
          required: true,
        }
      },
      messages: {
        first_name: {
          required: "Das Vorname-Feld ist erforderlich",
          minlength: "Der Vorname muss mindestens 2 Zeichen lang sein",
          maxlength: "Vorname kann maximal 60 Zeichen lang sein",
        },
        last_name: {
          required: "Das Nachname-Feld ist erforderlich",
          minlength: "Der Nachname muss mindestens 2 Zeichen lang sein",
          maxlength: "Nachname kann maximal 60 Zeichen lang sein",
        },
        password: {
          required: "Das Passwortfeld ist erforderlich",
          minlength: "Das Passwort muss mindestens 8 Zeichen lang sein",
          maxlength: "Das Passwort darf nicht länger als 12 Zeichen sein",
        },
        email: {
          required: "Das E-Mail-Feld ist erforderlich",
          email: "Die E-Mail muss eine gültige Adresse sein",
        },
        phone: {
          required: "Das Telefonnummernfeld ist erforderlich",
        }
      },

    });
  });
});
