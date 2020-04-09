if (document.documentMode || /Edge/.test(navigator.userAgent)) {
  $("#nonIErecommended").text("Internet Explorer and Microsoft Edge are not recommended on this website");
}

var isPC = screen.width > 699 ? true : false; // Check whether the device is PC or mobile determine at the monitor size.

/* Classes for room, use in following objects. */
var roomsClass = {
  off: 'off',
  idle: 'idle',
  light: 'light',
  top: 'top',
  button: 'button',
  blink: 'blink',
  base: isPC ? 'pcRooms' : 'mbRooms'
}

/* Information of welcome grid. */
var welcomeGridInfo = {
  container: "#gridContainer",
  grid: isPC ? [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ] : [
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1,
    1, 1, 1, 2, 1, 1, 1, 1, 1,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  column: isPC ? 24 : 9,
  roomsClass: roomsClass,
  enterClass: ['welcomeGrid', 'welcomeGridIn'],
  exitClass: ['welcomeGridOut'],
  elements: [
    '<div class=' + (isPC ? 'pcWelcomeTitle' : 'mbWelcomeTitle') + '>Novice</div>',
    '<div class=' + (isPC ? 'pcWelcomeName' : 'mbWelcomeName') + '>Edward Tu Portfolio</div>',
    '<div id=' + (isPC ? 'pcNextTrigger' : 'mbNextTrigger') + '></div>',
    '<canvas class=' + (isPC ? 'pcMask' : 'mbMask') + '>',
  ]
};

/* Information of welcome grid growing data. */
var welcomeGridGrowInfo = {
  orderList: isPC ? [
    [223],
    [222],
    [219],
    [228, 234],
    [217]
  ] : [
    [84],
    [83],
    [89],
    [81]
  ],
  offAmountList: isPC ? [
    [0],
    [1],
    [3],
    [5,6],
    [2]
  ] : [
    [0],
    [1],
    [4],
    [2]
  ],
  roomsClass: roomsClass,
  intervalTime: 100,
  callbackSeedOrder: 1
};

/* Information of welcome grid button. */
var nextButtonGridInfo = {
  container: isPC ? '#pcNextTrigger' : '#mbNextTrigger',
  grid: [4, 0, 0, 4],
  column: 4,
  roomsClass: roomsClass,
  elements: [
    '<div class=' + (isPC ? '"pcButtonText pcButtonTextNext"' : '"mbButtonText mbButtonTextNext"') + '>NEXT</div>',
    '<input type="image" src="img/empty.png" class="ButtonTrigger">'
  ]
};

/* Information of menu grid. */
var menuGridInfo = {
  container: '#gridContainer',
  grid: isPC ? [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ] : [
    2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0
  ],
  column: isPC ? 25 : 10,
  roomsClass: roomsClass,
  enterClass: ['menuGrid', 'menuGridIn'],
  exitClass: ['menuGridOut'],
  elements: [
    '<div id=' + (isPC ? 'pcButtonHome' : 'mbButtonHome') + '></div>',
    '<div id=' + (isPC ? 'pcButtonProfile' : 'mbButtonProfile') + '></div>',
    '<div id=' + (isPC ? 'pcButtonPortfolio': 'mbButtonPortfolio') + '></div>',
    '<div id=' + (isPC ? 'pcButtonTitle' : 'mbButtonTitle') + '></div>'
  ]
};

/* Information of home button in menu. */
var buttonHomeInfo = {
  container: isPC ? '#pcButtonHome' : '#mbButtonHome',
  grid: isPC ? [4, 0, 0, 4] : [4, 0, 0, 4],
  column: 4,
  roomsClass: roomsClass,
  elements: [
    '<div class=' + (isPC ? '"pcButtonText pcButtonTextHome"' : '"mbButtonText mbButtonTextHome"') + '>HOME</div>',
    '<input type="image" src="img/empty.png" class="ButtonTrigger">'
  ]
};

/* Information of profile button in menu. */
var buttonProfileInfo = {
  container: isPC ? '#pcButtonProfile' : '#mbButtonProfile',
  grid: isPC ? [4, 0, 0, 0, 4] : [4, 0, 0, 0, 4],
  column: 5,
  roomsClass: roomsClass,
  elements: [
    '<div class=' + (isPC ? '"pcButtonText pcButtonTextProfile"' : '"mbButtonText mbButtonTextProfile"') + ">PROFILE</div>",
    '<input type="image" src="img/empty.png" class="ButtonTrigger">'
  ]
};

/* Information of portfolio button in menu. */
var buttonPortfolioInfo = {
  container: isPC ? '#pcButtonPortfolio' : '#mbButtonPortfolio',
  grid: isPC ? [4, 0, 0, 0, 0, 4] : [4, 0, 0, 0, 4],
  column: isPC ? 6 : 5,
  roomsClass: roomsClass,
  elements: [
    '<div class=' + (isPC ? '"pcButtonText pcButtonTextPortfolio"' : '"mbButtonText mbButtonTextPortfolio"') + '>PORTFOLIO</div>',
    '<input type="image" src="img/empty.png" class="ButtonTrigger">'
  ]
};

/* Information of title button in menu. */
var buttonTitleInfo = {
  container: isPC ? '#pcButtonTitle' : '#mbButtonTitle',
  grid: isPC ? [4, 0, 0, 4] : [4, 0, 0, 4],
  column: 4,
  roomsClass: roomsClass,
  elements: [
    '<div class=' + (isPC ? '"pcButtonText pcButtonTextTitle"' : '"mbButtonText mbButtonTextTitle"') + '>TITLE</div>',
    '<input type="image" src="img/empty.png" class="ButtonTrigger">'
  ]
};

var photoUiInfo = {
  closeImage: 'img/close_btn.png',
  nextImage: 'img/next_btn.png'
}

/* Information of Porfolio album. */
var portfolioInfo = {
  ui: photoUiInfo,
  imagesLocation: 'img/solar/'
}

/* Main Script. */
let main = {
  // Show the welcome page.
  welcome: function() {
    createGrid(welcomeGridInfo, function(gridInfo) {
      for(i = 0; i < welcomeGridInfo.enterClass.length; i++) {
        $(gridInfo.container).addClass(welcomeGridInfo.enterClass[i]);
      }
      playSeed(gridInfo, welcomeGridGrowInfo, function(gridInfo) {
        appendLines(gridInfo, function() {
          createGrid(nextButtonGridInfo, function(clickGridInfo) {
            appendLines(clickGridInfo, function() {
              $(clickGridInfo.container).on('animationend', function() {
                $(clickGridInfo.container).addClass("Button");
                gridClickEvent(clickGridInfo, welcomeGridInfo, main.menu);
              });
            });
          });
        });
      });
    });
  },

  // Show the content menu.
  menu: function() {
    createGrid(menuGridInfo, function(gridInfo) {
      for(i = 0; i < gridInfo.enterClass.length; i++) {
        $(gridInfo.container).addClass(gridInfo.enterClass[i]);
      }
      appendLines(gridInfo, function() {
        createGrid(buttonHomeInfo, function(clickGridInfo) {
          $(clickGridInfo.container).addClass("Button");
          appendLines(clickGridInfo, function() {
          });
        });
        createGrid(buttonProfileInfo, function(clickGridInfo) {
          $(clickGridInfo.container).addClass("Button");
          appendLines(clickGridInfo, function() {
          });
        });
        createGrid(buttonPortfolioInfo, function(clickGridInfo) {
          $(clickGridInfo.container).addClass("Button");
          appendLines(clickGridInfo, function() {
            $(clickGridInfo.container).click(function() {
              photoViewer(portfolioInfo, photoUiInfo);
            });
          });
        });
        createGrid(buttonTitleInfo, function(clickGridInfo) {
          $(clickGridInfo.container).addClass("Button");
          appendLines(clickGridInfo, function() {
            gridClickEvent(buttonTitleInfo, gridInfo, main.welcome);
          });
        });
      });
    });
  }
};

main.menu();
