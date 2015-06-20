//Sets up grid of divs with hover events to simulate etch-a-sketch
//
//
//

$(document).ready(function(){
 
    var $gridwrap = $('#gridwrap');

    var $tbWidth = $('#tbWidth');   
    var $tbHeight = $('#tbHeight');
    
    var $tbBgColor = $('#tbBgColor');
    var $tbFgColor = $('#tbFgColor');

    var $cbOpacity = $('#cbOpacity');
    var $cbTrail = $('#cbTrail');

    var $btnInit = $('#btnInit');
    var settings = getSettings(); 
 
    $btnInit.click(function(){
        settings = getSettings(); 
        if(!validateSettings())
            return;

        $gridwrap.empty().hide();
        initialize();
        
        $gridwrap.fadeIn('slow');

    });
    
    $('html').keypress(function(e){
        var key = e.which;
        if(key === 13)
            $btnInit.click();
    });

    $gridwrap.on('mouseover', 'div', function(){
        var $this = $(this);
        $this.css('background-color', settings.fgcolor);
        if(settings.opacity){
            $this.css('opacity', $this.css('opacity') - 0.1);
        }
        if(settings.trail){
            //$this.animate({backgroundColor: settings.bgcolor}, 'slow');
            $this.css('opacity', 0.5).fadeTo('slow', 1, function(){
                $this.css('background-color', settings.bgcolor);
            });
        }
    });

    function initialize(){
        var widthPct = 100/settings.width;
        var heightPct = 100/settings.height;
        
        var $div = $('<div class="cell" />')
                        .css('width', widthPct + '%')
                        .css('height', heightPct + '%')
                        .css('background-color', settings.bgcolor);

        for(var i = 0; i < settings.height; i++){
            for(var j = 0; j < settings.width; j++){
                $gridwrap.append($div.clone());
            }
        }
    } 

    function validateSettings(){
        var isValid = true;

        if(isNaN(settings.width) || settings.width > 50){
            isValid = false;
            $tbWidth.css('border-color', 'red');
        }else
            $tbWidth.css('border-color', '');

        if(isNaN(settings.height) || settings.height > 50){
            isValid = false;
            $tbHeight.css('border-color', 'red');
        }else
            $tbHeight.css('border-color', '');

        var $dummy = $('<div />').css('background-color', 'white');
        
        $dummy.css('background-color',settings.bgcolor);
        var dummycolor = $dummy.css('background-color');
        if($dummy.css('background-color') == 'rgb(255, 255, 255)'){
            isValid = false;
            $tbBgColor.css('border-color', 'red');
        }else
            $tbBgColor.css('border-color', '');        
        
        $dummy.css('background-color', 'white');
        $dummy.css('background-color', settings.fgcolor);
        if($dummy.css('background-color') == 'rgb(255, 255, 255)'){
            isValid = false;
            $tbFgColor.css('border-color', 'red');
        }else
            $tbFgColor.css('border-color', '');        
        
        
        
        return isValid;
    }

    function getSettings(){
        var s = {
            width: $tbWidth.val(),
            height: $tbHeight.val(),
            opacity: $cbOpacity.is(':checked'),
            trail: $cbTrail.is(':checked'),
            bgcolor: $tbBgColor.val(),
            fgcolor: $tbFgColor.val() 
        }
        return s;
    }
});
