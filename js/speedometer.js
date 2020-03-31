$.fn.myfunc = function(userPref) {
  var self = this;
  this.defaultProperty = {
    maxVal: 180,
    divFact: 10,
    dangerLevel: 120,
    initDeg: -45,
    maxDeg: 270,
    edgeRadius: 150,
    speedNobeH: 4,
    speedoNobeW: 95,
    speedoNobeL: 13,
    indicatorRadius: 125,
    indicatorNumbRadius: 90,
    speedPositionTxtWH: 80,
    nobW: 20,
    nobH: 4,
    numbW: 30,
    numbH: 16,
    midNobW: 10,
    midNobH: 3,
    noOfSmallDiv: 2,
    eventListenerType: 'change',
    multiplier: 1,
    gagueLabel: 'km/h'
  }
  if (typeof userPref === 'object')
    for (var prop in userPref) this.defaultProperty[prop] = userPref[prop];

  var speedInDeg,
    noOfDev = this.defaultProperty.maxVal / this.defaultProperty.divFact,
    divDeg = this.defaultProperty.maxDeg / noOfDev,
    speedBgPosY,
    speedoWH = this.defaultProperty.edgeRadius * 2,
    speedNobeTop = this.defaultProperty.edgeRadius - this.defaultProperty.speedNobeH / 2,
    speedNobeAngle = this.defaultProperty.initDeg,
    speedPositionTxtTL = this.defaultProperty.edgeRadius - this.defaultProperty.speedPositionTxtWH / 2,
    tempDiv = '',
    induCatorLinesPosY, induCatorLinesPosX, induCatorNumbPosY, induCatorNumbPosX,
    induCatorLinesPosLeft, induCatorLinesPosTop, induCatorNumbPosLeft, induCatorNumbPosTop;

  this.setCssProperty = function() {
    var tempStyleVar = [
      '<style>',
      '#' + this.parentElemId + ' .envelope{',
      'width  :' + speedoWH + 'px;',
      'height :' + speedoWH + 'px;',
      '}',
      '#' + this.parentElemId + ' .speedNobe{',
      'height            :' + this.defaultProperty.speedNobeH + 'px;',
      'top               :' + speedNobeTop + 'px;',
      'transform         :rotate(' + speedNobeAngle + 'deg);',
      '-webkit-transform :rotate(' + speedNobeAngle + 'deg);',
      '-moz-transform    :rotate(' + speedNobeAngle + 'deg);',
      '-o-transform      :rotate(' + speedNobeAngle + 'deg);',
      '}',
      '#' + this.parentElemId + ' .speedPosition{',
      'width  :' + this.defaultProperty.speedPositionTxtWH + 'px;',
      'height :' + this.defaultProperty.speedPositionTxtWH + 'px;',
      'top  :' + speedPositionTxtTL + 'px;',
      'left :' + speedPositionTxtTL + 'px;',
      '}',
      '#' + this.parentElemId + ' .speedNobe div{',
      'width  :' + this.defaultProperty.speedoNobeW + 'px;',
      'left :' + this.defaultProperty.speedoNobeL + 'px;',
      '}',
      '#' + this.parentElemId + ' .nob{',
      'width  :' + this.defaultProperty.nobW + 'px;',
      'height :' + this.defaultProperty.nobH + 'px;',
      '}',
      '#' + this.parentElemId + ' .numb{',
      'width  :' + this.defaultProperty.numbW + 'px;',
      'height :' + this.defaultProperty.numbH + 'px;',
      '}',
      '#' + this.parentElemId + ' .midNob{',
      'width  :' + this.defaultProperty.midNobW + 'px;',
      'height :' + this.defaultProperty.midNobH + 'px;',
      '}',
      '</style>',
    ].join('');
    this.parentElem.append(tempStyleVar);
  }
  this.creatHtmlsElecments = function() {
    this.parentElemId = 'speedometerWraper-' + $(this).attr('id');
    $(this).wrap('<div id="' + this.parentElemId + '">');
    this.parentElem = $(this).parent();
    this.setCssProperty();
    this.createIndicators();
  }
  this.createIndicators = function() {
    for (var i = 0; i <= noOfDev; i++) {
      var curDig = this.defaultProperty.initDeg + i * divDeg;
      var curIndVal = i * this.defaultProperty.divFact;
      var dangCls = "";
      if (curIndVal >= this.defaultProperty.dangerLevel) {
        dangCls = "danger";
      }
      var induCatorLinesPosY = this.defaultProperty.indicatorRadius * Math.cos(0.01746 * curDig);
      var induCatorLinesPosX = this.defaultProperty.indicatorRadius * Math.sin(0.01746 * curDig);

      var induCatorNumbPosY = this.defaultProperty.indicatorNumbRadius * Math.cos(0.01746 * curDig);
      var induCatorNumbPosX = this.defaultProperty.indicatorNumbRadius * Math.sin(0.01746 * curDig);

      if (i % this.defaultProperty.noOfSmallDiv == 0) {
        induCatorLinesPosLeft = (this.defaultProperty.edgeRadius - induCatorLinesPosX) - 2;
        induCatorLinesPosTop = (this.defaultProperty.edgeRadius - induCatorLinesPosY) - 10;
        var tempDegInd = [
          'transform         :rotate(' + curDig + 'deg)',
          '-webkit-transform :rotate(' + curDig + 'deg)',
          '-o-transform      :rotate(' + curDig + 'deg)',
          '-moz-transform    :rotate(' + curDig + 'deg)',
        ].join(";");
        tempDiv += '<div class="nob ' + dangCls + '" style="left:' + induCatorLinesPosTop + 'px;top:' + induCatorLinesPosLeft + 'px;' + tempDegInd + '"></div>';
        induCatorNumbPosLeft = (this.defaultProperty.edgeRadius - induCatorNumbPosX) - (this.defaultProperty.numbW / 2);
        induCatorNumbPosTop = (this.defaultProperty.edgeRadius - induCatorNumbPosY) - (this.defaultProperty.numbH / 2);
        tempDiv += '<div class="numb ' + dangCls + '" style="left:' + induCatorNumbPosTop + 'px;top:' + induCatorNumbPosLeft + 'px;">' + curIndVal + '</div>';
      } else {
        induCatorLinesPosLeft = (this.defaultProperty.edgeRadius - induCatorLinesPosX) - (this.defaultProperty.midNobH / 2);
        induCatorLinesPosTop = (this.defaultProperty.edgeRadius - induCatorLinesPosY) - (this.defaultProperty.midNobW / 2);
        var tempDegInd = [
          'transform         :rotate(' + curDig + 'deg)',
          '-webkit-transform :rotate(' + curDig + 'deg)',
          '-o-transform      :rotate(' + curDig + 'deg)',
          '-moz-transform    :rotate(' + curDig + 'deg)',
        ].join(";");
        tempDiv += '<div class="nob ' + dangCls + ' midNob" style="left:' + induCatorLinesPosTop + 'px;top:' + induCatorLinesPosLeft + 'px;' + tempDegInd + '"></div>';
        tempDiv += '<div class="numb"></div>';
      }
    }
    this.parentElem.append('<div class="envelope">');

    var speedNobe = [
      '<div class="speedNobe">',
      '<div></div>',
      '</div>',
      '<div class="speedPosition"></div>'
    ].join();

    this.parentElem.find(".envelope").append(speedNobe + tempDiv);
  }
  this.changePosition = function() {
    console.log($(this).val())
    var speed = $(this).val();
    if (speed > self.defaultProperty.maxVal) {
      speed = self.defaultProperty.maxVal;
    }
    if (speed < 0 || isNaN(speed)) {
      speed = 0;
    }
    speedInDeg = (self.defaultProperty.maxDeg / self.defaultProperty.maxVal) * speed + self.defaultProperty.initDeg;

    self.parentElem.find(".speedNobe").css({
      "-webkit-transform": 'rotate(' + speedInDeg + 'deg)',
      "-webkit-transform": 'rotate(' + speedInDeg + 'deg)',
      "-moz-transform": 'rotate(' + speedInDeg + 'deg)',
      "-o-transform": 'rotate(' + speedInDeg + 'deg)'
    });

    var centerVal = speed * self.defaultProperty.multiplier;
    self.parentElem.find(".speedPosition").html(centerVal + "<br />" + self.defaultProperty.gagueLabel);

    self.parentElem.find(".envelope .nob,.envelope .numb").removeClass("bright");
    for (var i = 0; i <= noOfDev; i++) {
      if (speed >= i * self.defaultProperty.divFact) {
        self.parentElem.find(".envelope .nob").eq(i).addClass("bright");
        self.parentElem.find(".envelope .numb").eq(i).addClass("bright");
      } else {
        break;
      }
    }
  }
  this.creatHtmlsElecments();
  $(this).bind(this.defaultProperty.eventListenerType, this.changePosition);
  return this;
}