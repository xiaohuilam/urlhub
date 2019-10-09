import './bootstrap';
import 'jquery.typewatch';
import 'jssocials';

/**
 * Copy short url to clipboard
 *
 * https://github.com/zenorocha/clipboard.js
 */
var ClipboardJS = require('clipboard');

new ClipboardJS('.btn-clipboard').on('success', function() {
    $('.btn-clipboard')
        .attr('data-original-title','Copied!').tooltip("_fixTitle").tooltip("show")
        .attr("title", "Copy to clipboard").tooltip("_fixTitle");
});



/**
 * Custom link Avail Check
 *
 * https://github.com/dennyferra/TypeWatch
 */
$(function() {
    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
    });

    var twOptions = {
        callback: function (value) {
            $.ajax({
                url: "/custom-link-avail-check",
                type: 'POST',
                data: {
                    'url_key': $('#custom_url_key').val()
                },
                dataType: "json"
            })
            .done(function(data) {
                if (data.errors) {
                    $("#link-availability-status")
                        .removeClass("text-success")
                        .addClass("text-danger");
                    document.getElementById("link-availability-status").innerHTML = data.errors[0];
                } else {
                    $("#link-availability-status")
                        .removeClass("text-danger")
                        .addClass("text-success");
                    document.getElementById("link-availability-status").innerHTML = data.success;
                }
            }).fail(function (jqXHR, textStatus) {
                document.getElementById("link-availability-status").innerHTML = "Hmm. We're having trouble connecting to the server.";
            });

            $('#link-availability-status').html('<span><i class="fa fa-spinner"></i> Loading..</span>');
        },
        wait: 500,
        captureLength: 1,
        highlight: true,
        allowSubmit: false
    };

    // Add TypeWatch to check when users type
    $('#custom_url_key').typeWatch(twOptions);
});



/**
 * Social Share
 * https://github.com/tabalinas/jssocials
 */
$("#jssocials").jsSocials({
    shareIn: "popup",
    showLabel: false,
    shares: [
        { share: "email", logo: "fas fa-envelope" },
        { share: "facebook", logo: "fab fa-facebook" },
        { share: "twitter", logo: "fab fa-twitter" },
        {
            share: "whatsapp",
            logo: "fab fa-whatsapp",
            shareUrl: "https://wa.me/?text={url}",
            shareIn: "popup"
        },
        {
            share: "telegram",
            logo: "fab fa-telegram",
            shareUrl: "https://telegram.me/share/url?url={url}",
            shareIn: "popup"
        }
    ]
});
