function router(page) {
  $.ajax({
    type: "GET",
    url: "pageRouter",
    data: {
      page: page
    },
    success: response => {
      response == "false"
        ? (window.location.hash = "Home")
        : (() => {
            $(".content").css("display", "none");
            $("#loadDiv").css("display", "block");
            $(".content").html(response);
            setTimeout(() => { 
              $("#loadDiv").css("display", "none");
              $(".content").css("display", "block");
              const nav = $(".navv");
              nav.map(a => {
                const x = nav[a];
                if(window.location.hash.replace("#", "") == x.innerHTML)
                  $(x).css("background-color", "rgba(57, 148, 196, 0.5)");
                else 
                  $(x).css("background-color", "rgba(255, 255,  255, 0.2)");
              })
            }, 500)
        })()
    },
    error: () => {
      $(".content").html(`<div class="center">The PageRouter does not seem to be online right now, try load a new page in a few minutes!</div>`)
    }
  });
}
if (!window.location.hash) window.location.hash = "Home";
else {
  if (location.href.indexOf("#") > -1) {
    router(location.hash.substr(1));
  }
}
$(window).bind("hashchange", function () {
  router(location.hash.substr(1));
});
