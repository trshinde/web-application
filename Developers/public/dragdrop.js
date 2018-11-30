$(function() {
    $(".draggable").draggable({
        revert: true,
        helper: 'clone',
        start: function(event, ui) {
            $(this).fadeTo('fast', 0.5);
        },
        stop: function(event, ui) {
            $(this).fadeTo(0, 1);
        }
    }).resizable();

    $("#droppable").droppable({
        hoverClass: 'active',
        drop: function(event, ui) {
            this.value = $(ui.draggable).text();
        }
    });
});
