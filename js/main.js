var layout = 
[
    {"title": "Home",           "row":0, "pages": ["Intro"]},
    {"title": "Poka-Yoke",      "row":1, "pages": ["Surveillance Intro", "Panopticon", "Cameras", "Page 4"]},
    {"title": "Privacy",        "row":2, "pages": ["Addiction Intro", "Casino"]},
    {"title": "Clarity",        "row":3, "pages": ["Friction Intro", "Unsubscribe"]},
    {"title": "Transparency",   "row":4, "pages": ["Commons Intro", "Libraries"]},       
    {"title": "Control",        "row":5, "pages": ["Commons Intro", "Libraries"]}       
]

currentRow = 0;
currentPage = 0;


$(document).ready(function() {
  setRow(0);

  // $("g.active>rect").animate({-webkit-filter: drop-shadow(0px 0px 15px #54A6FF)}, 100);
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

    $("#r" + currentRow)[0].scrollIntoView({behavior: 'smooth'});

    updateRowTitle(currentRow, currentPage);
    updateNextRowTitle(currentRow, currentPage);
    updatePrevRowTitle(currentRow, currentPage);
    setPage(0);
}

function updatePage(increment){
    beforePage = currentPage;
    increment ? currentPage = Math.min(currentPage + 1, layout[currentRow]["pages"].length - 1) : currentPage = Math.max(currentPage - 1, 0);
    console.log("beforePage: ",beforePage);
    console.log("targetPage: ",currentPage);
    if (beforePage != currentPage) setPage(currentPage);
}

function setPage(page){
    currentPage = page;

    $(getID(currentRow,currentPage))[0].scrollIntoView({behavior: 'smooth'});

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
    $("#row-title").hide();
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
    $("#page-title").hide();
}
