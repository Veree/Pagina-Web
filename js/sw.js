//ASIGNAR NOMBRE Y VERISON DE LA CACHE
const CACHE_NAME='v1_cache_pwa_prueba';

//archivos cacheables en la aplicación
//todas las imagenes y estilos
var UrlsToCache=[
  './',
  './css/styles.css',
  './css/menu.css',
  './js/abrir.js',
  './C:\Users\Verenice Ramos\Desktop\fd/logo.jpg',
  './C:\Users\Verenice Ramos\Desktop\fd/logo.png',
  './C:\Users\Verenice Ramos\Desktop\fd/logo.png',
  './C:\Users\Verenice Ramos\Desktop\fd/tec.png',
  './C:\Users\Verenice Ramos\Desktop\fd/menu.svg',
  './C:\Users\Verenice Ramos\Desktop\fd/mono.png',
  './C:\Users\Verenice Ramos\Desktop\fd/facebook.png',
  './C:\Users\Verenice Ramos\Desktop\fd/instagram.png',
  './C:\Users\Verenice Ramos\Desktop\fd/twitter.png',
  './../imagenes/code.jpg',
];

//evento install (de instalación )
//instalación y guardar en cache los recursos estáticos
self.addEventListener('install',e=>{
  e.waitUntil(
    caches.open(CACHE_NAME)
    .then(cache=>{
      return cache.addAll(UrlsToCache)
      .then(()=>{
        self.skipWaiting();
      });
    }).catch(err=>
      console.log('no se ha registrado el cache',err)));
});

//evento activate activar la aplicación
//este evento es el que hace que funcione sin conexion
self.addEventListener('activate',e=>{
  const cacheWhiteList=[CACHE_NAME];
  e.waitUntil(
    caches.keys()
      .then(cacheNames =>{
        return Promise.all(cacheNames.map(cacheName=>{
          if(cacheWhiteList.indexOf(cacheName)===- 1){
              //borramos los elementos que no necesitamos
              return caches.delete(cacheName);
          }
        })
       );
     })
     .then(()=>{
       //activa la cache en el dispositivo
        self.clients.claim();
     })
  );
});

//evento fetch traer desde el internet
//comprobarra si la url está en cache y si no la solicita por internet
self.addEventListener('fetch',e=>{
    e.respondWith(
      caches.match(e.request)
        .then(res=>{
          if(res){
            //devuelvo datos desde caches
            return res;
          }
          return fetch(e.request);
        })
    );
});
