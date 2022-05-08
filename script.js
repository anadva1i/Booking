var week = [];

$(document).ready(function(){
  $('body').on('click', '#week a', function(){
    var top = "45vh";
    var padding = "20vh";
    var height = "60vh";
    if ($(window).width() < 800){
      top = "10vh";
      padding = "5vh";
      height = "120vh";
    }
    $(".book").animate({top: top});
    $(".book").animate({height: height});
    $(".header").animate({padding: padding});
    $(".final-form").removeClass("hide");
    if ($(".checked")[0]){
      $(".checked").removeClass("checked")
    }
    if (!$(".disabled")[0])
      $(".btn").addClass("disabled")
    $(this).addClass("checked")
    PrintDate($(this).parent().index())
  });

  $('body').on('click', '.sessions a', function(){
    if($(".active")[0]){
      $(".active").removeClass("active")
    }
    if ($(".disabled")[0]){
      $(".disabled").removeClass("disabled")
    }
    $(this).addClass("active");
  });

  $('body').on('click', '#confirm', function(){
    $(".active").removeClass("green");
    $(".active").addClass("red");
    $(".active").removeClass("active");
    $(".modal").addClass("hide");
    $(".final-form .btn").addClass("disabled");
    Book();
  });

  $("#btnBook").click(function(){
    $("#confirm-date").text($(".paragraph-date").text());
    $("#confirm-time").text($(".active").text());
    if($(".active")[0]){
      $(".modal").removeClass("hide");
    }
  })

  $(".close").click(function(){
    $(".modal").addClass("hide");
  })

  DisplayWeekDays();

  //Calendar
  function DisplayWeekDays(){
    week = nextWeek();
    $(week).each(function(key, value){
      var day = value.getUTCDate()
      var li = '<li class="flex-item"><a href="#">'+day+'</a></li>';
      $("#week").append(li);
    })
  }

  function nextWeek(){
    var today = new Date();
    var nextWeek = [];
    for(let i=0; i<7; i++){
      var nextDay = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      nextWeek.push(nextDay);
    }
    return nextWeek;
  }

  function PrintDate(index){
    var day = week[index].toDateString();
    $(".paragraph-date").text(day);
    RefreshTimes(index, day)
  }

  function RefreshTimes(index, day){
    $(".sessions").empty();
    var startTime = 10;
    var endTime = 20;
    if(day.includes("Sat") || day.includes("Sun")){
      startTime = 12;
      endTime = 22;
    }
    if(index == 0){
      var dt = new Date();
      var hour = dt.getHours();
      if(hour > startTime && hour+2 < endTime){
        startTime = hour + hour%2;
      }
      else {
        startTime = 0;
        endTime = 0;
      }
    }
    for(var i=startTime; i<endTime; i+=2){
      var div = '<div class="flex-item"><a class="green" href="#">'+i+':00</a></div>';
      $(".sessions").append(div)
    }
    myBookings(day);
  }

  function Book(){
    var date = $("#confirm-date").text();
    var time = $("#confirm-time").text();
    var times = JSON.parse(localStorage.getItem(date));
    if(times == null)
      times = [];
    times.push(time);
    localStorage.setItem(date, JSON.stringify(times));
  }

  function myBookings(date){
    var times =  JSON.parse(localStorage.getItem(date));
    $(".sessions .green").each(function(index, value) {
      if(jQuery.inArray($(this).text(), times) != -1){
        $(this).removeClass("green");
        $(this).addClass("red");
      }
    });
  }
});
