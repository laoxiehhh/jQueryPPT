var ppt = {
    lenSlider: $('.slider-list .slider').length,
    nowIndex: 0,
    lastIndex: 0,
    timer: undefined,
    $slider: $('.slider'),
    key: true,
    init: function () {
        if (this.lenSlider > 1) {
            this.pptDom();
            this.bindEvent();
            this.autoMove();
        }
    }
};
ppt.pptDom = function () {
    var html = '<div class="btn">\
                    <span class="btnLeft"></span>\
                    <span class="btnRight"></span>\
                </div>\
                <div class="order-list">\
                    <ul>';
    for (var i = 0; i < this.lenSlider; i ++) {
        html += '<li></li>';
    }
    html += '</ul></div>';
    $(html).appendTo($('.wrapper')).find('li').eq(0).addClass('active');      
}
ppt.bindEvent = function () {
    var that = this;
    $('.btnLeft').add($('.btnRight')).add($('li')).on('click', function () {
        if (that.key) {
            that.key = false;
            if ($(this).attr('class') == 'btnLeft') {
                that.getIndex('left');
            } else if ($(this).attr('class') == 'btnRight') {
                that.getIndex('right');
            } else {
                var index = $(this).index();
                that.getIndex(index);
            }
            that.move(that.nowIndex, that.lastIndex);        
        }
    });
    this.$slider.on('go', function () {
        $(this).fadeOut(300)
            .find('p').animate({fontSize: '16px'}).end()
            .find('.image').animate({width: '0%'});
    });
    this.$slider.on('come', function () {
        if (that.lastIndex != that.nowIndex) {
            $(this).delay(300).fadeIn(300).find('p').delay(300).animate({fontSize: '20px'}).end()
            .find('.image').delay(300).animate({width: '40%'}, function () {
                that.key = true;
            });
        } else {
            $(this).fadeIn(300).find('p').animate({fontSize: '20px'}).end()
            .find('.image').animate({width: '40%'}, function () {
                that.key = true;
            });
        }
    });      
}
ppt.move = function (nowIndex, lastIndex) {
    this.$slider.eq(lastIndex).trigger('go').end().eq(nowIndex).trigger('come');
    this.autoMove();
    this.changeOrder();
}
ppt.getIndex = function (direction) {
    this.lastIndex = this.nowIndex;
    if (direction == 'left' || direction == 'right') {
        if (direction == 'left') {
            if (this.nowIndex == 0) {
                this.nowIndex = 2
            } else {
                this.nowIndex --;
            }
        } else {
            if (this.nowIndex == 2) {
                this.nowIndex = 0
            } else {
                this.nowIndex ++;
            }
        }
    } else {
        this.nowIndex = direction;
    }
}
ppt.autoMove = function () {
    var that = this;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
        that.getIndex('right');
        that.move(that.nowIndex, that.lastIndex);
    }, 3000);
}
ppt.changeOrder = function () {
    $('li').eq(this.lastIndex).removeClass('active')
        .end().eq(this.nowIndex).addClass('active');
}
ppt.init();