function router(page) {
  $.ajax({
    type: "GET",
    url: "pageRouter",
    data: {
      page: page
    },
    success: response => {
      console.log(response);
      $(".content").html(response);
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
