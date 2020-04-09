/* Changing room status and class. */
function changeRoom(gridInfo, targetId, newStatus) {
  if(Object.values(gridInfo.roomsClass).includes(newStatus)) {
    gridInfo.grid[targetId] = Object.values(gridInfo.roomsClass).indexOf(newStatus);
    $(gridInfo.container).children('.' + gridInfo.roomsClass.base + '#' + targetId).removeClass().addClass(gridInfo.roomsClass.base + ' ' + newStatus);
  }
}

/* Create grid and set css on them. */
function createGrid(gridInfo, callback) {
  $(gridInfo.container).empty();
  $(gridInfo.container).removeClass(); // Clean the container.
  for(i = 0; i < gridInfo.grid.length; i++) {
    var newCanvas;
    newCanvas = $('<canvas/>').addClass(gridInfo.roomsClass.base);  // Define new room classes
    newCanvas.addClass(Object.values(gridInfo.roomsClass)[gridInfo.grid[i]]).attr('id', i); // Define new ID.
    $(gridInfo.container).append(newCanvas);
  }
  $(gridInfo.container).css({
    'width' : (parseInt($('.' + gridInfo.roomsClass.base).css('width')) + (parseInt($('.' + gridInfo.roomsClass.base).css('borderLeftWidth')) * 2)) * gridInfo.column + 'px', // Set container width.
    'height' : (parseInt($('.' + gridInfo.roomsClass.base).css('width')) + (parseInt($('.' + gridInfo.roomsClass.base).css('borderLeftWidth')) * 2)) * (gridInfo.grid.length / gridInfo.column) + 'px'  // Set container height.
  });

  if(callback)
    callback(gridInfo); // Callback.
}

/* Seed playing. */
function playSeed(gridInfo, growInfo, callback) {
  /* Grow the seed from root automatically. */
  var growSeed = function(gridInfo, growInfo, rootInfo, callback) {
    if(rootInfo.steps < rootInfo.stepsToEnd) {
      changeRoom(gridInfo, rootInfo.rootId - (rootInfo.steps * gridInfo.column), gridInfo.roomsClass.light);  // Change the next room.
      rootInfo.steps++;
      setTimeout(growSeed, growInfo.intervalTime, gridInfo, growInfo, rootInfo, callback);
    } else if(rootInfo.steps == rootInfo.stepsToEnd) {
      changeRoom(gridInfo, rootInfo.rootId - (rootInfo.steps * gridInfo.column), gridInfo.roomsClass.top);  // Change the final room.
      callback(); // Callback.
    }
  }

  // Setup.
  var _gridInfo = JSON.parse(JSON.stringify(gridInfo)); // Clone gridInfo, avoiding changing original.
  growInfo.order = 0; // Order in growlist.
  growInfo.seedsGrew = [] // Record grew seeds.

  for(i = 0; i < growInfo.orderList[0].length; i++) {
    $('#' + growInfo.orderList[0][i]).addClass(gridInfo.roomsClass.blink);  // Blink the first seed.
  }

  callbackActive = false; // Avoiding callback run repeatly.
  $('.' + gridInfo.roomsClass.base).mouseenter(function() {  // Mouse enter listener.
    for(i = 0; i <= growInfo.order; i++) {
      if(growInfo.orderList[i].includes(parseInt($(this).get(0).id)) && !growInfo.seedsGrew.includes(parseInt($(this).get(0).id))) {  // Check the room pointing is at or below order and not grew.
        var rootInfo = {};  // Define current root's information.
        rootInfo.rootId = parseInt($(this).get(0).id);  // Root ID.
        rootInfo.order = i; // Position in order of current root.
        rootInfo.stepsToEnd = Math.floor(rootInfo.rootId / _gridInfo.column); // Calculate steps to grow.
        $(_gridInfo.container).children('#' + rootInfo.rootId).removeClass(gridInfo.roomsClass.blink); // Stop all blinking rooms.
        rootInfo.steps = 0; // steps for grow age.
        growInfo.seedsGrew.push(rootInfo.rootId); // Mark current root as grew root.
        growSeed(_gridInfo, growInfo, rootInfo, function() {
          for(j = 0; j < growInfo.offAmountList[rootInfo.order][growInfo.orderList[rootInfo.order].indexOf(rootInfo.rootId)]; j++) {  // Randomly turn off grids which in idle state.
            var randomRoom;
            do
              randomRoom = Math.floor(Math.random() * _gridInfo.grid.length);
            while(_gridInfo.grid[randomRoom] != Object.values(gridInfo.roomsClass).indexOf(gridInfo.roomsClass.idle));  // Random pick a idle room.
            changeRoom(_gridInfo, randomRoom, gridInfo.roomsClass.off); // Turn off the picked up room.
          }
          growInfo.order = Math.min(Math.max(growInfo.order, rootInfo.order + 1), growInfo.orderList.length - 1); // Roll order.
          for(j = 0; j <= growInfo.orderList[growInfo.order].length; j++) {
            changeRoom(_gridInfo, growInfo.orderList[growInfo.order][j], gridInfo.roomsClass.light);  // Change next order seed to light.
            $('#' + growInfo.orderList[growInfo.order][j]).addClass(!growInfo.seedsGrew.includes(growInfo.orderList[growInfo.order][i]) ? gridInfo.roomsClass.blink : '');  // Make next seed blink.
          }
          if(growInfo.callbackSeedOrder == growInfo.order && !callbackActive) {
            callback(_gridInfo);  // Callback.
            callbackActive = true;
          }
        });
      }
    }
  });
}

/* Give multiple lines of html. */
function appendLines(gridInfo, callback) {
  for(i = 0; i <= gridInfo.elements.length; i++) {
    $(gridInfo.container).append(gridInfo.elements[i]); // Append line.
  }
  if(callback)
    callback(gridInfo); // Callback.
}

/* Click event. */
function gridClickEvent(buttonInfo, affectInfo, callback) {
  $(buttonInfo.container).click(function() {
    var played = false
    $('.' + affectInfo.enterClass).addClass(affectInfo.exitClass).on('animationend', function() {
      $('.' + affectInfo.enterClass).off();
      callback(); // Callback.
    });
  });
}

/* Photo slide manually. */
function photoViewer(album) {
  var clearDiv =
  $('body').append('<div id="photoContainer"></div>');
  $('#photoContainer').append('<input type="image" id="closePhotoBtn" src=' + album.ui.closeImage + '>');
  $('#closePhotoBtn').click(function() { $('#photoContainer').remove(); });
  $('#photoContainer').append('<input type="image"  id="nextPhotoBtn" src=' + album.ui.nextImage + '>');
  $('#photoContainer').append('<input type="image"  id="previousPhotoBtn" src=' + album.ui.nextImage + '>');

  var photosList = [];
  var currentPhoto = 1;
  /*
  while($.get(location.href.replace("index.html", "") + album.imagesLocation + currentPhoto + ".jpg").done(function(){return true;})) {
    photosList.push(album.imagesLocation + currentPhoto + ".jpg");
    currentPhoto++;
  }
  */

  $.ajax({
      //This will retrieve the contents of the folder if the folder is configured as 'browsable'
      url: album.imagesLocation,
      success: function (data) {
          //List all .png file names in the page
          $(data).find("a:contains(.jpg)").each(function () {
              var filename = this.href.replace(window.location.host, "").replace("http://", "");
              $("body").append("<img src='" + dir + filename + "'>");
          });
      }
  });

  console.log($.get(location.href.replace("index.html", "") + album.imagesLocation + currentPhoto + ".jpg"));
}
