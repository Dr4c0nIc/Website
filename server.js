const express = require("express"),
  app = express(),
  url = require("url"),
  fs = require("fs");

app.listen(3001, () => {
  console.log("Your app is listening on port 3001");
});

app.get("/test", (req, res) => res.send("testlokhjoihfddt"))

app.get("/pageRouter", (req, res) => {
  const query = url.parse(req.url, true).query;
  let success = false;
  setTimeout(() => {
    if (!success) res.send("false");
  }, 500);
  fs.readdir(`${__dirname}/Pages/`, (err, files) => {
    if (err) return res.json(err);
    files.forEach(m => {
      if (query.page == m.replace(".html", "").replace(".ejs", ""))
        res.sendFile(`${__dirname}/Pages/${m}`), (success = true);
    });
  });
});

app.get("/warnings/:guildID/:userID", (req, res) => {
  res.render(`${__dirname}/Pages/warnings.ejs`, {
    guild: req.params.guildID,
    user: req.params.userID
  })
})

app.get("/style.css", (req, res) => {
  res.sendFile(`${__dirname}/Assets/style.css`);
});

app.get("/script.js", (req, res) => {
  res.sendFile(`${__dirname}/Assets/script.js`);
});

app.get("/partners.json", (req, res) => {
  res.sendFile(`${__dirname}/Assets/partners.json`);
});

app.get("/arc-sw.js", (req, res) => {
  res.sendFile(`${__dirname}/Assets/js.js`);
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", (req, res) => {
  res.redirect("/");
});
