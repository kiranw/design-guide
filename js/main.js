var layout = 
[
    {"title": "Introduction",   "row":0, "background-color": "#FAB1A5", "pages": ["Intro"]},
    {"title": "Surveillance",   "row":1, "background-color": "#DA6668", "pages": ["Intro-S", "Panopticon", "Third Page"]},
    {"title": "Addiction",      "row":2, "background-color": "#5158A8", "pages": ["Intro-A", "Casino"]},
    {"title": "Friction",       "row":2, "background-color": "#FDC872", "pages": ["Intro-F", "Unsubscribe"]},
    {"title": "Commons",        "row":2, "background-color": "#2E706C", "pages": ["Intro-C", "Libraries"]}       
]

currentRow = 1;
currentPage = 0;

$(document).ready(function() {
    // var maxScrollX = $(document).width() - $('body').width();
  setRow(0);
});


 $(document).keydown(function (e) {
  var keyCode = e.keyCode || e.which;
  var arrow = {left: 37, up: 38, right: 39, down: 40 };
  switch (keyCode) {
    case arrow.left:
        updatePage(false);
        break;
    case arrow.up:
        updateRow(false);
        break;
    case arrow.right:
        updatePage(true);
        break;
    case arrow.down:
        updateRow(true);
        break;
  }
});


function updateRow(increment) {
    increment ? currentRow = Math.min(currentRow + 1, layout.length-1) : currentRow = Math.max(currentRow - 1, 0);
    setRow(currentRow);
}

function setRow(row){
    currentRow = row;
    currentPage = 0;

    updateRowTitle(currentRow, currentPage);
    updateNextRowTitle(currentRow, currentPage);
    updatePrevRowTitle(currentRow, currentPage);
    setPage(0);
    $("#frame").css('background-color', layout[currentRow]["background-color"]);
}

function updatePage(increment){
    increment ? currentPage = Math.min(currentPage + 1, layout[currentRow]["pages"].length - 1) : currentPage = Math.max(currentPage - 1, 0);
    setPage(currentPage);
}

function setPage(page){
    currentPage = page;

    if (page == 0 || page == layout[currentRow]["pages"].length - 1) {
        $("#next-row-title").show();
        $("#previous-row-title").show();
    }
    else {
        $("#next-row-title").hide();
        $("#previous-row-title").hide();
    }

    updateProgressFraction(currentRow, currentPage);
    updateNextPageButton(currentRow, currentPage);
    updatePreviousPageButton(currentRow, currentPage);
    updatePageTitle(currentRow, currentPage);
}


// UPDATE ROW UTILITIES

function updateRowTitle(row,page) {
    $("#row-title").text(layout[row]["title"]);
}

function updateNextRowTitle(row,page) {
    if (layout.length > (row + 1)){
        $("#next-row").show();
        $("#next-row-title").text(layout[row+1]["title"] + " ↓");
    } else {
        $("#next-row").hide()
    };
}

function updatePrevRowTitle(row,page) {
    if ((row - 1) >= 0) {
        $("#previous-row").show();
        $("#previous-row-title").text(layout[row-1]["title"] + " ↑");
    } else {
        $("#previous-row").hide();
    }   
}


// UPDATE PAGE UTILITIES

function getID(row,page) {
    return "r" + row + "-p" + page
}

function updateProgressFraction(row,page) {
    if (row==0 && page ==0){
        $("#progress-bar").width(0);
    } else {
        $("#progress-bar").width((page+1)/layout[row]["pages"].length * 100 + "%");
    }
}

function updatePreviousPageButton(row,page){
    return page - 1 >= 0 ? $("#previous-chevron").show() : $("#previous-chevron").hide();
}

function updateNextPageButton(row,page){
    return page + 1 < layout[row]["pages"].length ? $("#next-chevron").show() : $("#next-chevron").hide();
}

function updatePageTitle(row,page){
    $("#page-title").text(layout[row]["pages"][page]);
}
