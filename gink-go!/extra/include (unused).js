$(function() {
    // process "client side includes"
    processPartials($("div[data-include]"), function() { 
        // continue with the rest of the "on DOM ready" functionality
        // processSite()
    });

    function processPartials(selector, callback){
        jQuery.ajaxSetup({async:false});
        
        var partials = selector.toArray();

        while(partials.length > 0){

            // get first item
            var el = $(partials[0]);

            // get contents of include
            $.get(el.data("include"), function(data) {
                var $newElement = $(data);
                el.replaceWith($newElement);
                
                // process possible includes
                $newElement.find("[data-include]").each(function(index, item){
                    partials.push(item);
                });
            }).always(function(){
                // remove this item from partials list
                partials.splice($.inArray(partials[0], partials),1);
            });
        }

        callback();
    }
});