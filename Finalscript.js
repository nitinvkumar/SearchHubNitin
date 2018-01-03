$(document).ready(function () {
    // Hide collapsibles.
     // alert("ready");
    $(".panel-group").hide();
    
    // Create global variable for  text.
    var text;
    
    // Press enter to submit form.
    $('#text').keypress(function(event) {
        if (event.which == 13) {
            event.preventDefault();
            $('form').submit();
        }
    });
    
    // After submitting form:
    $('form').submit(function(event) {
        // Prevent submitting form.
          
        event.preventDefault();
        
        // Retrieve value of text.
        text = $('#websearch').val();
      
        // Regex for text.
        var textPattern = /^[a-z\d\-_\s]+$/i;
        
        // Error handling for incorrect queries.
        var error = '';
        if (!textPattern.test(text)) {
	        error += 'Please enter a valid text symbol.\n';
	        
	    }
	    if (error) {
	       // alert(error);
            return false;
	    }
	    

        
        
        // google
        $.ajax ({
            type: 'GET',
            url: 'https://www.googleapis.com/customsearch/v1?key=AIzaSyAtKY9P3HS-qXh6Uzt2De7NgwYB6AAg-iA&cx=017576662512468239146:omuauf_lfve&q=' + escape(text) , 
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
           
            success: function (res) {
                console.log(res);
   
               
                var html = "";
                for (var i = 0; i < res.items.length; i++)
                {
                    html += res.items[i]. htmlTitle + "<br />";
                }
                $("#gl").html(html);
               
               
               
            },
            
            error: function (jqXHR, textStatus, errorThrown) {
                
                //alert(errorThrown);
                console.log(errorThrown + jqXHR);
                
            }
            
        });

        //Wikipedia.
        $.ajax({
            type: "GET",
            url: 'https://en.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&redirects=true&callback=?',
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: {
                page: text,
            },
            success: function (data) {
                console.log(data);
                
                var markup = data.parse.text["*"];
                var section = $('#wiki').html(markup);
 
                // remove links 
                section.find('a').each(function() { $(this).replaceWith($(this).html()); });
     
                // remove references
                section.find('sup').remove();
                
                // remove cite error
                section.find('.mw-ext-cite-error').remove();
                $('#article').html($(section).find('p'));

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(errorThrown);
                console.log(jqXHR);
            }
        });
    
    
    

    //New York Times
    $.ajax({
      url: 'https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=b077b32ecae7423185f40b22b549d95e&q' + text ,
      method: 'GET',
      q: text ,
      
    }).done(function(result) {
      console.log(result);
    // alert(result.response.docs["1"].headline.main);
      
      var htmlN = "";
                for (var j = 0; j < result.response.docs.length; j++)
                {
                    htmlN += result.response.docs[j].headline.main + "<br />";
                }
                $("#NYT").html(htmlN);
                
      
    }).fail(function(err) {
      throw err;
      alert("err");
    });



        
    
    
        // Show collapsibles.
        $(".panel-group").show();
    
    });
});