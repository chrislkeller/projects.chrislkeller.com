/*******************************************************************************
 jquery.mb.components
 Copyright (c) 2001-2010. Matteo Bicocchi (Pupunzi); Open lab srl, Firenze - Italy
 email: info@pupunzi.com
 site: http://pupunzi.com
 Licences: MIT, GPL
 ******************************************************************************/

/*
 * Name:jquery.mb.scrollable
 * Version: 1.5.7
 */

(function($) {
  $.mbScrollable= {
    plugin:"mb.scroller",
    author:"MB",
    version:"1.5.7",
    defaults:{
      dir:"horizontal",
      width:950,
      elementsInPage:4,
      elementMargin:2,
      shadow:false,
      height:"auto",
      controls:"#controls",
      slideTimer:600,
      autoscroll:false,
      scrollTimer:6000,

      nextCallback:function(){},
      prevCallback:function(){}
    },

    buildMbScrollable: function(options){
      return this.each (function (){
        this.options = {};
        $.extend (this.options, $.mbScrollable.defaults);
        $.extend (this.options, options);

        var mbScrollable=this;
        mbScrollable.isVertical= mbScrollable.options.dir!="horizontal";
        var controls=$(mbScrollable.options.controls);
        mbScrollable.idx=1;
        mbScrollable.scrollTo=0;
        mbScrollable.elements= $(mbScrollable).children();
        mbScrollable.elements.addClass("scrollEl");
        controls.hide();

        $(mbScrollable).children().each(function(){$(this).wrap("<div class='SECont'></div>");});
        if (mbScrollable.options.shadow){
          $(mbScrollable.elements).css("-moz-box-shadow",mbScrollable.options.shadow);
          $(mbScrollable.elements).css("-webkit-box-shadow",mbScrollable.options.shadow);
        }
        mbScrollable.elements= $(mbScrollable).children();
        var eip= mbScrollable.options.elementsInPage<this.elements.size()?mbScrollable.options.elementsInPage:mbScrollable.elements.size();
        if(mbScrollable.isVertical){
          mbScrollable.singleElDim= (mbScrollable.options.height/eip)-mbScrollable.options.elementMargin;
          $(mbScrollable.elements).css({marginBottom:mbScrollable.options.elementMargin, height:mbScrollable.singleElDim, width:mbScrollable.options.width});
        }else{
          mbScrollable.singleElDim= (mbScrollable.options.width/eip)-mbScrollable.options.elementMargin;
          $(mbScrollable.elements).css({marginRight:mbScrollable.options.elementMargin, width:mbScrollable.singleElDim, display:"inline-block",float:"left" }); //float:"left"
        }
        this.elementsDim= (mbScrollable.singleElDim*mbScrollable.elements.size())+(mbScrollable.options.elementMargin*mbScrollable.elements.size());
        mbScrollable.totalPages= Math.ceil(mbScrollable.elements.size()/mbScrollable.options.elementsInPage);

        var adj= $.browser.safari && mbScrollable.options.elementsInPage>2?mbScrollable.options.elementMargin/(mbScrollable.options.elementsInPage):0;

        if(mbScrollable.isVertical)
          $(mbScrollable).css({overflow:"hidden", height:mbScrollable.options.height-adj,width:mbScrollable.options.width, paddingRight:5, position:"relative"});
        else
          $(mbScrollable).css({overflow:"hidden", width:mbScrollable.options.width-adj,height:mbScrollable.options.height,paddingBottom:5, position:"relative"});

        var mbscrollableStrip=$("<div class='scrollableStrip'/>").css({width:mbScrollable.elementsDim, position:"relative"});
        $(mbScrollable.elements).wrapAll(mbscrollableStrip);
        mbScrollable.mbscrollableStrip=$(mbScrollable).find(".scrollableStrip");
        $(mbScrollable.elements).hover(
                function(){
                  //                  console.debug(mbScrollable.autoScrollActive);
                  if(mbScrollable.autoScrollActive)
                    $(mbScrollable).mbStopAutoscroll();
                },
                function(){
                  if(mbScrollable.autoScrollActive)
                    $(mbScrollable).mbAutoscroll();
                });
        if(mbScrollable.options.autoscroll && mbScrollable.elements.size()>mbScrollable.options.elementsInPage){
          mbScrollable.autoScrollActive=true;
          $(mbScrollable).mbAutoscroll();
        }
        $(mbScrollable).mbPageIndex();
        $(mbScrollable).mbActivateControls();
        setTimeout(function(){
          $(".scrollEl").fadeIn();
        },1000);
        $(mbScrollable).mbManageControls();
      });
    },

    mbNextPage: function(auto){
      var mbScrollable= $(this).get(0);
      if (!auto) mbScrollable.autoScrollActive=false;

      if(mbScrollable.idx==mbScrollable.totalPages){
        $(mbScrollable).mbManageControls();
        return;
      }
      if (mbScrollable.options.nextCallback) mbScrollable.options.nextCallback();
      var adj=  $.browser.safari && mbScrollable.options.elementsInPage>2?mbScrollable.options.elementMargin/mbScrollable.options.elementsInPage:0;
      mbScrollable.scrollTo-=((mbScrollable.singleElDim+mbScrollable.options.elementMargin)*mbScrollable.options.elementsInPage)-adj;
      if (mbScrollable.isVertical){
        if ((mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.height))
          mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.height;
        $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }else{
        if ((mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.width))
          mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.width;
        $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }
      mbScrollable.idx+=1;
      $(this).mbManageControls();
    },

    mbPrevPage: function(auto){
      var mbScrollable= $(this).get(0);
      if (!auto) mbScrollable.autoScrollActive=false;

      if(mbScrollable.idx==1){
        $(mbScrollable).mbManageControls();
        return;
      }

      if (mbScrollable.options.prevCallback) mbScrollable.options.prevCallback();

      var adj=  $.browser.safari && mbScrollable.options.elementsInPage>2?mbScrollable.options.elementMargin/mbScrollable.options.elementsInPage:0;
      mbScrollable.scrollTo+=((mbScrollable.singleElDim+mbScrollable.options.elementMargin)*mbScrollable.options.elementsInPage)+adj;

      if (mbScrollable.isVertical){
        if (mbScrollable.scrollTo>=0) mbScrollable.scrollTo=0;
        $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }else{
        if (mbScrollable.scrollTo>=0) mbScrollable.scrollTo=0;
        $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }
      mbScrollable.idx-=1;
      $(this).mbManageControls();
    },

    mbFirstPage: function(){
      var mbScrollable= $(this).get(0);
      mbScrollable.autoScrollActive=false;

      mbScrollable.scrollTo=0;
      if (mbScrollable.isVertical){
        $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }else{
        $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }
      mbScrollable.idx=1;
      $(this).mbManageControls();
      $(mbScrollable).mbStopAutoscroll();
    },

    mbLastPage: function(){
      var mbScrollable= $(this).get(0);
      mbScrollable.autoScrollActive=false;

      if (mbScrollable.isVertical){
        mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.height;
        $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }else{
        mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.width;
        $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
      }
      mbScrollable.idx=mbScrollable.totalPages;
      $(mbScrollable).mbManageControls();
      $(mbScrollable).mbStopAutoscroll();
    },

    mbPageIndex: function(){
      var mbScrollable= $(this).get(0);
      var controls=$(mbScrollable.options.controls);
      var pages=controls.find(".pageIndex");
      if (pages){
        function getPage(i){
          mbScrollable.scrollTo=-((mbScrollable.singleElDim+mbScrollable.options.elementMargin)*(mbScrollable.options.elementsInPage*(i-1)));
          if(mbScrollable.isVertical){
            if (mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.height)
              mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.height;
            $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
          }else{
            if (mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.width)
              mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.width;
            $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},mbScrollable.options.slideTimer);
          }
          mbScrollable.idx = Math.floor(i);
          $(mbScrollable).mbManageControls();
        }
        var n=0;
        for(var i=1;i<=mbScrollable.totalPages;i++){
          n++;
          var p=$("<span class='page'> "+n+" <\/span>").bind("click",function(){
            getPage($(this).html());
            $(mbScrollable).mbStopAutoscroll();
            mbScrollable.autoScrollActive=false;
          });
          pages.append(p);
        };
      }
    },
    mbAutoscroll:function(){
      var dir= "next";
      var mbScrollable= $(this).get(0);
      mbScrollable.autoScrollActive=true;

      if(mbScrollable.autoscroll) return;
      var timer=mbScrollable.options.scrollTimer+mbScrollable.options.slideTimer;
      mbScrollable.autoscroll = true;
      mbScrollable.auto = setInterval(function(){
        dir= mbScrollable.idx==1?"next":mbScrollable.idx==mbScrollable.totalPages?"prev":dir;
        if(dir=="next")
          $(mbScrollable).mbNextPage(true);
        else
          $(mbScrollable).mbPrevPage(true);
      },timer);
      $(mbScrollable).mbManageControls();
    },

    mbStopAutoscroll: function(){
      var mbScrollable= $(this).get(0);
      mbScrollable.autoscroll = false;
      clearInterval(mbScrollable.auto);
      $(mbScrollable).mbManageControls();

    },

    mbActivateControls: function(){
      var mbScrollable=$(this).get(0);
      var controls=$(mbScrollable.options.controls);
      controls.find(".first").bind("click",function(){$(mbScrollable).mbFirstPage();});
      controls.find(".prev").bind("click",function(){$(mbScrollable).mbStopAutoscroll();$(mbScrollable).mbPrevPage();});
      controls.find(".next").bind("click",function(){$(mbScrollable).mbStopAutoscroll();$(mbScrollable).mbNextPage();});
      controls.find(".last").bind("click",function(){$(mbScrollable).mbLastPage();});
      controls.find(".start").bind("click",function(){$(mbScrollable).mbAutoscroll();});
      controls.find(".stop").bind("click",function(){$(mbScrollable).mbStopAutoscroll();mbScrollable.autoScrollActive=false;});
    },

    mbManageControls: function(){
      var mbScrollable=$(this).get(0);
      var controls=$(mbScrollable.options.controls);
      if (mbScrollable.elements.size()<=mbScrollable.options.elementsInPage){
        controls.hide();
      }else{
        controls.fadeIn();
      }
      if (mbScrollable.idx==mbScrollable.totalPages){
        controls.find(".last").addClass("disabled");
        controls.find(".next").addClass("disabled");
      }else{
        controls.find(".last").removeClass("disabled");
        controls.find(".next").removeClass("disabled");
      }

      if (mbScrollable.idx==1){
        controls.find(".first").addClass("disabled");
        controls.find(".prev").addClass("disabled");
      }else{
        controls.find(".first").removeClass("disabled");
        controls.find(".prev").removeClass("disabled");
      }

      if (mbScrollable.autoscroll){
        controls.find(".start").addClass("sel");
        controls.find(".stop").removeClass("sel");
      }else{
        controls.find(".start").removeClass("sel");
        controls.find(".stop").addClass("sel");
      }
      controls.find(".page").removeClass("sel");
      controls.find(".page").eq(mbScrollable.idx-1).addClass("sel");
      controls.find(".idx").html(mbScrollable.idx+" / "+mbScrollable.totalPages);
    },

    goToPage: function(i,noAnim) {
      var mbScrollable= $(this).get(0);
      var anim= noAnim?0:mbScrollable.options.slideTimer;
      if (i>mbScrollable.totalPages) i=mbScrollable.totalPages;
      mbScrollable.scrollTo=-((mbScrollable.singleElDim+mbScrollable.options.elementMargin)*(mbScrollable.options.elementsInPage*(i-1)));
      if(mbScrollable.isVertical){
        if (mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.height)
          mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.height;
        $(mbScrollable.mbscrollableStrip).animate({marginTop:mbScrollable.scrollTo},anim);
      }else{
        if (mbScrollable.scrollTo<-mbScrollable.elementsDim+mbScrollable.options.width)
          mbScrollable.scrollTo=-mbScrollable.elementsDim+mbScrollable.options.width;
        $(mbScrollable.mbscrollableStrip).animate({marginLeft:mbScrollable.scrollTo},anim);
      }
      mbScrollable.idx = Math.floor(i);
      $(mbScrollable).mbManageControls();
      $(mbScrollable).mbStopAutoscroll();
      mbScrollable.autoScrollActive=false;
    }
/*
    //WIP 1.6.0
    mbAddElement: function(n){
      var mbScrollable=$(this).get(0);
      var newEl=$(n);
      newEl.addClass("scrollEl");

      $(mbScrollable).find(".scrollableStrip").append(newEl);
      newEl.wrap("<div class='SECont'/>");
      newEl.css({marginRight:mbScrollable.options.elementMargin, width:mbScrollable.singleElDim});
    }
*/
  };

  $.fn.mbScrollable=$.mbScrollable.buildMbScrollable;
  $.fn.mbNextPage=$.mbScrollable.mbNextPage;
  $.fn.mbPrevPage=$.mbScrollable.mbPrevPage;
  $.fn.mbFirstPage=$.mbScrollable.mbFirstPage;
  $.fn.mbLastPage=$.mbScrollable.mbLastPage;
  $.fn.mbPageIndex=$.mbScrollable.mbPageIndex;
  $.fn.mbgotoPage=$.mbScrollable.gotoPage;
  $.fn.mbAutoscroll=$.mbScrollable.mbAutoscroll;
  $.fn.mbStopAutoscroll=$.mbScrollable.mbStopAutoscroll;
  $.fn.mbActivateControls=$.mbScrollable.mbActivateControls;
  $.fn.mbManageControls=$.mbScrollable.mbManageControls;
  $.fn.goToPage=$.mbScrollable.goToPage;

//  $.fn.mbAddElement=$.mbScrollable.mbAddElement;

})(jQuery);