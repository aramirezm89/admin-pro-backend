 const getMenuFrontEnd = (role = 'USER_ROLE') =>{
    const menu = [
      {
        titulo: "Dashboard",
        icono: "mdi mdi-gauge",
        submenu: [
          { titulo: "Main", url: "main" },
          { titulo: "ProgressBar", url: "progress" },
          { titulo: "Graficas", url: "grafica1" },
          { titulo: "Account Settings", url: "account-settings" },
        ],
      },
      {
        titulo: "Mantenimiento",
        icono: "mdi mdi-folder-lock-open",
        submenu: [
          //{ titulo: "Usuarios", url: "usuarios" },
          { titulo: "Hospitales", url: "hospitales" },
          { titulo: "Médicos", url: "medicos" },
        ],
      },
      {
        titulo: "Promesas",
        icono: "mdi mdi-label",
        submenu: [
          { titulo: "Promesa", url: "promesa" },
          { titulo: "Rxjs", url: "rxjs" },
        ],
      },
    ];

    if(role === 'ADMIN_ROLE'){{
        menu[1].submenu.unshift({ titulo: "Usuarios", url: "usuarios" });
    }}

    return menu;
}

module.exports = {
    getMenuFrontEnd
}