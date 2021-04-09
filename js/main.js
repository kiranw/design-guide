var layout = 
[
    {"title": "Introduction",   "row":0, "background-color": "#FAB1A5", "pages": ["Intro"]},
    {"title": "Surveillance",   "row":1, "background-color": "#DA6668", "pages": ["Surveillance Intro", "Panopticon", "Cameras", "Page 4"]},
    {"title": "Addiction",      "row":2, "background-color": "#5158A8", "pages": ["Addiction Intro", "Casino"]},
    {"title": "Friction",       "row":3, "background-color": "#FDC872", "pages": ["Friction Intro", "Unsubscribe"]},
    {"title": "Commons",        "row":4, "background-color": "#2E706C", "pages": ["Commons Intro", "Libraries"]}       
]

currentRow = 0;
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


    const targetDiv = "#r" + currentRow;
    $("html, body").animate({scrollTop: $(targetDiv).offset().top }, 300);

    updateRowTitle(currentRow, currentPage);
    updateNextRowTitle(currentRow, currentPage);
    updatePrevRowTitle(currentRow, currentPage);
    setPage(0);
}

function updatePage(increment){
    beforePage = currentPage;
    increment ? currentPage = Math.min(currentPage + 1, layout[currentRow]["pages"].length - 1) : currentPage = Math.max(currentPage - 1, 0);

    if (beforePage != currentRow) setPage(currentPage) ;
}

function setPage(page){
    currentPage = page;

    const targetDiv = getID(currentRow,currentPage);
    console.log(targetDiv);
    $("#r"+currentRow).animate({scrollLeft: $(targetDiv).offset().left }, 300);

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
    if (layout.length > (row + 1) && row > 0){
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
    return "#r" + row + "-p" + page
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
