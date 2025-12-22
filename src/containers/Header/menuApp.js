export const adminMenu = [
    { //hệ thống
        // name: 'menu.system.header',
        // menus: [
        //     {
        //         name: 'menu.system.system-administrator.header',
        //         subMenus: [
        //             { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
        //             { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
        //             { name: 'menu.system.system-administrator.register-package-group-or-account', link: '/system/register-package-group-or-account' },
        //         ]
        //     },
        //     // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
        // ]
        //Quản lý người dùng
        name: 'menu.admin.manage-user',
        menus: [
            { name: 'menu.admin.manage-user', link: '/system/user-manage' },
            { name: 'menu.admin.manage-doctor', link: '/system/manage-doctor' },
            { name: 'menu.admin.crud-user', link: '/system/crud-user' },
            { name: 'menu.admin.crud-redux', link: '/system/crud-redux' },
            //Quản lý lịch khám bệnh của Bác sĩ
           
            { name: 'menu.doctor.manage-schedule', link: '/doctor/manage-schedule' }
                
           
        ]

    },
    //Quản lý phòng khám
    {
        name: 'menu.admin.clinic',
        menus: [
            { name: 'menu.admin.manage-clinic', link: '/system/manage-clinic' },
            //{ name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            //{ name: 'menu.admin.crud-user', link: '/system/crud-user' },
            //{ name: 'menu.admin.crud-redux', link: '/system/crud-redux' }
        ]
    },
    //Quản lý chuyên khoa
    {
        name: 'menu.admin.specialty',
        menus: [
            { name: 'menu.admin.manage-specialty', link: '/system/manage-speciality' },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            { name: 'menu.admin.crud-user', link: '/system/crud-user' },
            { name: 'menu.admin.crud-redux', link: '/system/crud-redux' }
        ]
    },
    //Quản lý cẩm nang
    {
        name: 'menu.admin.handbook',

        menus: [

            { name: 'menu.admin.manage-handbook', link: '/system/manage-handbook' },
            { name: 'menu.admin.manage-doctor', link: '/system/user-doctor' },
            { name: 'menu.admin.crud-user', link: '/system/crud-user' },
            { name: 'menu.admin.crud-redux', link: '/system/crud-redux' }
        ]
    },
    
        //Quản lý lịch khám bệnh của Bác sĩ
        {
        name: 'menu.doctor.manage-schedule',

        menus: [
            { name: 'menu.doctor.manage-schedule', link: '/system/manage-schedule' }
       
        ]}
];
export const doctorMenu = [
    {
        //Quản lý lịch khám bệnh của Bác sĩ
        name: 'menu.admin.manage-user',
        menus: [
                { name: 'menu.doctor.manage-schedule', link: '/system/manage-schedule' }
            ]
    }
];