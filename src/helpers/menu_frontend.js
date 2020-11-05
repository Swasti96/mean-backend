exports.getMenuFrontEnd = (role = 'USER_ROL') => {

    const menu = [
        {
            titulo: 'Dashboard',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Main', url: '/' },
                // { titulo: 'ProgressBar', url: '/dashboard/progress' },
                // { titulo: 'Promesas', url: '/dashboard/promesas' },
                // { titulo: 'Rxjs', url: '/dashboard/rxjs' },
            ]
        },
        {
            titulo: 'Maintenance',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                // { titulo: 'User', url: '/dashboard/users' },
                { titulo: 'Hospitals', url: '/dashboard/hospitals' },
                { titulo: 'Medics', url: '/dashboard/medics' },
            ]
        }
    ]

    if (role === 'ADMIN_ROL') {
        menu[1].submenu.unshift({ titulo: 'User', url: '/dashboard/users' });
        menu[0].submenu.unshift({ titulo: 'Gráficas', url: '/dashboard/charts' });
    }

    return menu;
}