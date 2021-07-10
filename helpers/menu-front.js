

 const menuFront = ( role = 'USER_ROLE' )=>{

    const menu = [
        {
          titulo: 'Dashboard',
          icono: 'mdi mdi-gauge',
          submenu :[
            { titulo: 'Main', url:'/' },
            { titulo: 'Progresbar', url:'progress' },
            { titulo: 'Graficas', url:'grafica1' },
            { titulo: 'Promesas', url:'promesas' },
            { titulo: 'Rxjs', url:'rxjs' },
            
          ]
        },
        {
          titulo: 'Mantenimientos',
          icono: 'mdi mdi-gauge',
          submenu :[
          /*   { titulo: 'Usuarios', url:'usuarios' }, */
            { titulo: 'Medicos', url:'medicos' },
            { titulo: 'Hospitales', url:'hospitales' },
          
            
          ]
        }
      ];
      
      if(role === 'ADMIN_ROLE'){
        menu[1].submenu.unshift( { titulo: 'Usuarios', url:'usuarios' } )
      }

      return menu;
}

module.exports = {
  menuFront
}