document.addEventListener("DOMContentLoaded", function () {
  document.getElementById("login-btn").addEventListener("click", doLogin);
  document.getElementById("phone-input").addEventListener("keydown", function (e) {
    if (e.key === "Enter") doLogin();
  });
});

/* ═══════════════════════════════════════════════
   VOLUNTEER DATA — edit this section only
═══════════════════════════════════════════════ */

var DB = {

  "87824842": {
    name:     "Carissa Gabrielle Sim",
    school:   "Victoria Junior College",
    since:    "Jan 2024",
    hours:    "69",
    sessions: "8",
    stamps: [
      "assets/15:2:25.png",
      "assets/21:6:25.png",
      "assets/7:3:26.png"
    ],
    activities: [
      { event: "Sustainable Singapore Gallery Flagship Event", date: "Jun 2025", hrs: "4 h" },
      { event: "The Bettering Run",                           date: "Apr 2025", hrs: "6 h" },
      { event: "Seniors' Luncheon @ Fengshan CC",            date: "Mar 2025", hrs: "4 h" },
      { event: "Mission Lighthouse",                          date: "Feb 2025–May 2025", hrs: "3 h" },
      { event: "Recycle Red! 2025",                           date: "Jan 2025–Feb 2025", hrs: "6 h" },
      { event: "Beach Cleanup @ ECP",                         date: "Dec 2024", hrs: "3 h" },
      { event: "Food delivery to Homebound Seniors",          date: "Jun 2024", hrs: "3 h" },
      { event: "Arts & Crafts with Kids",                     date: "Dec 2024", hrs: "3 h" }
    ]
  },

  "80130084": {
    name:     "Alina Khan",
    school:   "Tanjong Katong Girls' School",
    since:    "Jan 2024",
    hours:    "263",
    sessions: "133",
    stamps: [
      "assets/17:5:25.png"
    ],
    activities: [
      { event: "The Bettering Run",                           date: "Apr 2025", hrs: "6 h" },
      { event: "Recycle Red! 2025",                           date: "Jan 2025–Feb 2025", hrs: "6 h" },
      { event: "Arts & Crafts with Kids",                     date: "Dec 2024", hrs: "3 h" },
      { event: "Seniors' Luncheon @ Fengshan CC",            date: "Sept 2025", hrs: "4 h" }
    ]
  },

    "89070733": {
    name:     "Cheryll Ng Yan Ling",
    school:   "Bedok Reservoir School of Being Bored",
    since:    "Jan 2026",
    hours:    "999",
    sessions: "67",
    stamps: [
      "assets/17:5:25.png",
        "assets/15:2:25.png",
      "assets/21:6:25.png",
      "assets/7:3:26.png"
    ],
    activities: [
      { event: "The Bettering Run",                           date: "Apr 2025", hrs: "6 h" },
      { event: "Recycle Red! 2025",                           date: "Jan 2025–Feb 2025", hrs: "6 h" },
      { event: "Arts & Crafts with Kids",                     date: "Dec 2024", hrs: "3 h" },
      { event: "Seniors' Luncheon @ Fengshan CC",            date: "Sept 2025", hrs: "4 h" }
    ]
  },

  "96204969": {
    name:     "Raean Cheong",
    school:   "Unicornland",
    since:    "May 3000",
    hours:    "69696969",
    sessions: "Infinite",
    stamps: [
      "assets/15:2:25.png",
      "assets/21:6:25.png",
      "assets/7:3:26.png",
                 "assets/17:5:25.png"
            ],
    activities: [
      { event: "Recycle Red! 2025",                           date: "Feb 2025", hrs: "999 h" },
      { event: "Seniors' Luncheon @ Fengshan CC",            date: "Sept 2024", hrs: "4 h" },
      { event: "Sustainable Singapore Gallery Flagship Event", date: "Jun 2025", hrs: "4 h" },
      { event: "Beach Cleanup @ ECP",                         date: "Sep 2024", hrs: "3 h" },
      { event: "The Bettering Run",                           date: "Jul 2024", hrs: "4 h" }
    ]
  }

};

/* ═══════════════════════════════════════════════
   APP LOGIC — no need to edit below this line
═══════════════════════════════════════════════ */

var MAX_STAMP_SLOTS = 12;

function doLogin() {
  var num = document.getElementById("phone-input").value.replace(/\D/g, "").slice(0, 8);
  var err = document.getElementById("login-error");

  if (num.length < 8) {
    err.textContent = "Please enter a valid 8-digit number.";
    err.style.display = "block";
    return;
  }

  var v = DB[num];
  if (!v) {
    err.textContent = "No account found. Please email a support request to The Bettering Branch's IT team via thebetteringbranch@gmail.com.";
    err.style.display = "block";
    return;
  }

  err.style.display = "none";

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
