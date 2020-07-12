const app = require("express")(),
  url = require("url"),
  fs = require("fs");

app.listen(3001, () => {
  console.log("Your app is listening on port 3001");
});

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

app.get("/style.css", (req, res) => {
  res.sendFile(`${__dirname}/Assets/style.css`);
});

app.get("/script.js", (req, res) => {
  res.sendFile(`${__dirname}/Assets/script.js`);
});

app.get("/partners.json", (req, res) => {
  res.sendFile(`${__dirname}/Assets/partners.json`);
});

app.get("/", (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.get("*", (req, res) => {
  res.redirect("/");
});
