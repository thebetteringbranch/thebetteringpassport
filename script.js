document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-btn").addEventListener("click", doLogin);
  document.getElementById("phone-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") doLogin();
  });

  // Warm up the Apps Script so login feels instant
  fetch(APPS_SCRIPT_URL + "?phone=ping").catch(function(){});
});

/* ═══════════════════════════════════════════════
   CONFIG — paste your Apps Script URL here
═══════════════════════════════════════════════ */

var APPS_SCRIPT_URL = "YOUR_APPS_SCRIPT_DEPLOYMENT_URL_HERE";

/* ═══════════════════════════════════════════════
   APP LOGIC
═══════════════════════════════════════════════ */

var MAX_STAMP_SLOTS = 12;

function doLogin() {
  var num = document.getElementById("phone-input").value.replace(/\D/g, "").slice(0, 8);
  var err = document.getElementById("login-error");
  var btn = document.getElementById("login-btn");

  if (num.length < 8) {
    err.textContent = "Please enter a valid 8-digit number.";
    err.style.display = "block";
    return;
  }

  // Loading state
  err.style.display = "none";
  btn.disabled = true;
  var dots = 0;
  var loadingInterval = setInterval(function() {
    dots = (dots + 1) % 4;
    btn.textContent = "Loading" + ".".repeat(dots);
  }, 400);

  fetch(APPS_SCRIPT_URL + "?phone=" + num)
    .then(function (res) { return res.json(); })
    .then(function (v) {
      clearInterval(loadingInterval);
      btn.textContent = "Open Passport";
      btn.disabled = false;

      if (!v || v.error) {
        err.textContent = "No account found. Please email a support request to The Bettering Branch's IT team via thebetteringbranch@gmail.com.";
        err.style.display = "block";
        return;
      }

      renderPassport(v);
    })
    .catch(function () {
      clearInterval(loadingInterval);
      btn.textContent = "Open Passport";
      btn.disabled = false;
      err.textContent = "Connection error. Please check your internet and try again.";
      err.style.display = "block";
    });
}

function renderPassport(v) {
  // Bio
  document.getElementById("pp-name").textContent     = v.name;
  document.getElementById("pp-school").textContent   = v.school;
  document.getElementById("pp-hours").textContent    = v.hours;
  document.getElementById("pp-sessions").textContent = v.sessions;
  document.getElementById("pp-since").textContent    = v.since;

  // Stamps
  var grid = document.getElementById("stamps-grid");
  grid.innerHTML = "";
  for (var i = 0; i < MAX_STAMP_SLOTS; i++) {
    var wrap = document.createElement("div");
    wrap.className = "stamp-wrap";
    if (i < v.stamps.length) {
      var img = document.createElement("img");
      img.className = "stamp-img";
      img.src = v.stamps[i];
      img.alt = "stamp";
      wrap.appendChild(img);
    } else {
      var empty = document.createElement("div");
      empty.className = "stamp-empty-slot";
      wrap.appendChild(empty);
    }
    grid.appendChild(wrap);
  }

  // Activity log
  var logEl = document.getElementById("log-rows");
  logEl.innerHTML = "";
  v.activities.forEach(function (a) {
    var row = document.createElement("div");
    row.className = "log-row";
    row.innerHTML =
      "<div class=\"log-dot\"></div>" +
      "<div class=\"log-info\">" +
        "<div class=\"log-evt\">" + a.event + "</div>" +
        "<div class=\"log-date\">" + a.date + "</div>" +
      "</div>" +
      "<div class=\"log-hrs\">" + a.hrs + "</div>";
    logEl.appendChild(row);
  });

  document.getElementById("cover").style.display           = "none";
  document.getElementById("passport-screen").style.display = "flex";
}

function handleLogout() {
  document.getElementById("passport-screen").style.display = "none";
  document.getElementById("cover").style.display           = "block";
  document.getElementById("phone-input").value             = "";
  document.getElementById("login-error").style.display     = "none";
}
