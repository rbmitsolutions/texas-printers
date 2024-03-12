const allowlist = [
  "https://texas-dashboard-develop.herokuapp.com",
  "https://texas-dashboard-develop.herokuapp.com/",
  "https://texas-website-developer.herokuapp.com/",
  "https://texas-website-developer.herokuapp.com",
  "https://texas-website.herokuapp.com/",
  "https://texas-website.herokuapp.com",
  "https://www.texassteakout.ie/",
  "https://www.texassteakout.ie",
  "https://www.texassteakout.com/",
  "https://www.texassteakout.com",
  "https://texassteakout.com/",

  "https://texas-steak-out.herokuapp.com",
  "https://texas-steak-out.herokuapp.com/",

  "https://steakout-hrcontrol.com",
  "https://www.steakout-hrcontrol.com",
  "https://www.steakout-hrcontrol.com/",
  "https://www.steakout-hrcontrol.com/admin",
  "https://steakout-hrcontrol.com/admin",

  "https://steakout-haccp.com",
  "https://www.steakout-haccp.com",
  "https://www.steakout-haccp.com/",
  "https://www.steakout-haccp.com/admin",
  "https://steakout-haccp.com/admin",

  "https://texassteakout.ie",
  "https://texassteakout.com",
  "https://texas-steak-out-develop.herokuapp.com/",
  "https://texas-steak-out-develop.herokuapp.com",
  "https://texas-website.herokuapp.com/",
  "https://texas-website.herokuapp.com",
  "https://texassteakout.ie/",
  "https://texassteakout.ie",
  "https://www.texassteakout.ie/",
  "https://www.texassteakout.ie",
  "https://texas-website-developer.herokuapp.com/",
  "https://texas-website-developer.herokuapp.com",
  "https://software-develop.herokuapp.com/",
  "https://software-develop.herokuapp.com",

  "https://texas-dashboard-production.herokuapp.com/",
  "https://texas-dashboard-production.herokuapp.com",

  "https://texas-apps-8ed12fdd5eb3.herokuapp.com",
  "https://www.texas-apps-8ed12fdd5eb3.herokuapp.com",

  "https://texas-apps-develop-ba7722104aad.herokuapp.com",
  "https://www.texas-apps-develop-ba7722104aad.herokuapp.com",

  "https://texas-dashboard-develop.herokuapp.com/admin",
  "https://texas-dashboard-develop.herokuapp.com",
  "https://www.texas-dashboard-develop.herokuapp.com/admin",

  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002",
];

export const corsOptionsApp = {
  methods: "GET,PUT,POST,DELETE",
  origin: (origin: any, callback: any) => {
    callback(null, true);
  },
};

export const corsOptions = {
  methods: "GET,PUT,POST,DELETE",
  origin: (origin: any, callback: any) => {
    if (allowlist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Origin not allowed by CORS"));
    }
  },
};
