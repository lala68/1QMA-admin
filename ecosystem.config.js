module.exports = {
  deploy: {
    production: {
      user: "root",
      host: "64.226.74.250",
      ref: "origin/main",
      repo: "git@github.com:lala68/1QMA-admin.git",
      path: "/root/projects/sources/1qma.admin",
      "pre-deploy": "git reset --hard",
      "post-deploy":
        "npm install; pm2 startOrRestart ~/projects/config/1qma.admin.json --update-env --env production; pm2 save;",
    },

    staging: {
      user: "root",
      host: "64.226.74.250",
      ref: "origin/dev",
      repo: "git@github.com:lala68/1QMA-admin.git",
      path: "/root/projects/sources/staging.1qma.admin",
      "pre-deploy": "git reset --hard",
      "post-deploy":
        "npm install; ng build --configuration production; cp -rf /root/projects/sources/staging.1qma.admin/source/dist/coreui-free-angular-admin-template/browser /var/www/html/staging.admin.1qma.games/;",
    },
  },
};
