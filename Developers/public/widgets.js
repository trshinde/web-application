$(init);

function init()
{
    $("h1").addClass("ui-widget-header");
    $("#tabs").tabs();
    $("#datePicker").datepicker();
    $("#slider").slider().bind("slide", reportSlider);
    $("#selectable").selectable();
    $("#sortable").sortable();
    $("#dialog").dialog();
    $("#dialog").dialog("close");
}

function reportSlider()
{
    var sliderVal = $("#slider").slider("value");
    $("#slideOutput").html(sliderVal);
} 

function openDialog()
{
    $("#dialog").dialog("open");
} 

function closeDialog()
{
    $("#dialog").dialog("close");
}

