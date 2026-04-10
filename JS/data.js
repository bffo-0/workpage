// JS/data.js - Tutti i dati del sito centralizzati
export const siteData = {
  // Lista dei works per la sidebar works
  works: [
     {
      id: 'film0',
      icon: 'fas fa-star',
      title: 'Agg vist nu rummore - Music Composer & Sound Designer ',
      year: '2025'
    },
    {
      id: 'film1',
      icon: 'fas fa-star',
      title: '[threaded or shredded] une fois de plus, sans - Music & Sound Designer',
      year: '2024'
    },
    {
      id: 'film2', 
      icon: 'fas fa-film',
      title: 'Night Shift - Music Composer & Sound Designer',
      year: '2024'
    },
    {
      id: 'film3',
      icon: 'fas fa-film', 
      title: 'Zanskar 6000 - Music Composer & Sound Designer',
      year: '2024'
    },
    {
      id: 'film4',
      icon: 'fas fa-headphones',
      title: 'Unrelible Object - Music Composer & Sound Designer', 
      year: '2023'
    },
    {
      id: 'film5',
      icon: 'fas fa-film',
      title: 'Suspended Lives - Music Composer',
      year: '2023'
    },
    {
      id: 'film6',
      icon: 'fas fa-film',
      title: 'Sleeping Close - Music Composer',
      year: '2023'
    },
    {
      id: 'film7',
      icon: 'fas fa-film',
      title: 'Burden Of Proof - Music Composer',
      year: '2022'
    },
    {
      id: 'film8',
      icon: 'fas fa-film',
      title: 'Once And For All - Music Composer',
      year: '2022'
    },
    {
      id: 'film9',
      icon: 'fas fa-star',
      title: 'A Little Order, A Little Grace - Music Composer',
      year: '2022'
    },
    {
      id: 'film10',
      icon: 'fas fa-film',
      title: 'Despite The Facts - Music Composer',
      year: '2022'
    },
    {
      id: 'film11',
      icon: 'fas fa-film',
      title: 'Donne che viaggiano sole - Music Composer & Sound Designer',
      year: '2019'
    }
  ],

  // Info dettagliate dei film (per le sidebar film-info)
  filmInfo: {
    film0: {
      title: 'Agg vist nu rummore',
      info: [
        'Curated by: Ambra Viviana',
        'Writed by: Federico Pozuelo',
        'Music Composed and Sound Designer by Tommaso Massimiliano Alfì', 
        'Exhibition at Istituto Svizzero',
        'Roma, 2025'
      ],
      image: 'IMG_page3/aggvistnurummore.webp',
      link: 'https://www.istitutosvizzero.it/it/installazione/agg-vist-nu-rummore-i-saw-a-noise/'
    },
    film1: {
      title: '[threaded or shredded] une fois de plus, sans',
      info: [
        'Projects by: dariya trubina',
        'Music Composed and Sound Designer by Tommaso Massimiliano Alfì', 
        'Exhibition at Gerrit Rietveld Academie',
        'Amsterdam, 2024'
      ],
      image: 'IMG_page3/[threaded or shredded] une fois de plus, sans2.webp',
      link: 'https://rietveldacademie.nl/page/1028292/dariya-trubina'
    },
    film2: {
      title: 'Night Shift',
      info: [
        'Nino works the night shift as a receptionist in a 2-star hotel.',
        'He is torn between insomnia, a harmful routine, and nostalgia for easier times.',
        'A film by Patrick Frunzio',
        'Music Composer & Sound Designer by Tommaso Massimiliano Alfì',
        'Italy, 2024'
      ]
    },
    film3: {
      title: 'Zanskar 6000',
      info: [
        'Italy, 2024, 19\'15\'\', 16:9, Full HD, stereo sound',
        'v.o. Italian/English, with english subtitles',
        'A film by Giada Ripa',
        'Music and Sound Design by Tommaso Massimiliano Alfì'
      ],
      image: 'Movies/zanskar60002.webp'
    },
    film4: {
      title: 'Unrelible Object',
      info: [
        'Otters holding hands is curated by Ambra Viviani and co-production Lumpen Station',
        'Original soundtrack and sound design by MVRGN',
        '2023'
      ],
      image: 'IMG_page3/unrelibleobject.webp',
      link: 'https://lumpenstation.art/archive/show/ohh-unreliable-object'
    },
    film5: {
      title: 'Suspended Lives',
      info: [
        'Written by Chiara Valenti',
        'Directed By Chiara Valenti & Patrick Frunzio',
        'Music Composer Tommaso Massimiliano Alfi',
        'Italy, 2023'
      ],
      image: 'assets/images/ui/viteinsospesoimg.webp'
    },
    film6: {
      title: 'Sleeping Close',
      info: [
        'Italy, France 2023, 109\', 2:1, Full HD, stereo sound, v.o Italian, with english subtitles',
        'A film by Giulio Pereno',
        'Music Composed by Tommaso Massimiliano Alfì'
      ],
      image: 'assets/images/ui/SELEEPING.webp',
      link: 'https://www.imdb.com/title/tt29376130/'
    },
    film7: {
      title: 'Burden Of Proof',
      info: [
        'Looped Video HD and photo series - 2022',
        'Director: Federico Pozuelo',
        'Music Composed by Tommaso Massimiliano Alfì'
      ],
      image: 'Movies/burdernframe.webp',
      link: 'https://www.imdb.com/title/tt33291155/'
    },
    film8: {
      title: 'Once And For All',
      info: [
        'Italy, 2022, 19\'15\'\', 16:9, Full HD',
        'A film by Federico Pozuelo & Javier Ruiz',
        'Music Composed by Tommaso Massimiliano Alfì'
      ],
      image: 'assets/images/ui/ONCEIMG.webp'
    },
    film9: {
      title: 'A Little Order, A Little Grace',
      info: [
        'Project and video\'s by Germana Frattini',
        'Music Composed by Tommaso Massimiliano Alfì',
        'Exhibition at Como Contemporanea',
        'Como, 2022'
      ],
      image: 'IMG_page3/como.webp',
      imageClass: 'film-img-order'
    },
    film10: {
      title: 'Despite The Facts',
      info: [
        'Through the narrative of a fictional political crime, the project explores the construction of',
        'cultural, political and historical narratives in northern Italy during the Years of Lead.',
        'A film by Federico Pozuelo',
        'Music Composed by Tommaso Massimiliano Alfì',
        '2022'
      ],
      image: 'IMG_page3/despitepic.webp',
      link: 'https://www.federicopozuelo.com/despite-the-facts.html'
    },
    film11: {
      title: 'Donne che viaggiano sole',
      info: [
        'Written, edited and directed by Giulio Pereno',
        'Music Composed and Sound Designer by Tommaso Massimiliano Alfì',
        'Cinematography: Jalal Albess',
        '75\', ITA-DE-FRA, 2019, 2:1, 16:9, Full HD, stereo sound'
      ],
      image: 'assets/images/ui/donneche2img.webp',
      link: 'https://m.imdb.com/title/tt21608742/'
    }
  },

  // Griglia dei thumbnail (ordinata come nell'originale)
  grid: [
    {
      id: 'main6',
      videoId: 'mySidebar6',
      image: 'Movies/zanskar6000.webp',
      alt: 'Zanskar 6000'
    },
    {
      id: 'main',
      videoId: 'mySidebar',
      image: 'Movies/dormiamo insieme locandina.webp', 
      alt: 'Sleeping Close'
    },
    {
      id: 'main3',
      videoId: 'mySidebar3',
      image: 'Movies/Burden.webp',
      alt: 'Burden Of Proof'
    },
    {
      id: 'main7',
      videoId: 'mySidebar7',
      image: 'assets/images/ui/Suspendedimg.webp',
      alt: 'Suspended Lives'
    },
    {
      id: 'main5',
      videoId: 'mySidebar5',
      image: 'Movies/onceandforall.webp',
      alt: 'Once And For All'
    },
    {
      id: 'main4',
      videoId: 'mySidebar4',
      image: 'Movies/Despite.webp',
      alt: 'Despite The Facts'
    },
    {
      id: 'main2',
      videoId: 'mySidebar2',
      image: 'Movies/donneche.webp',
      alt: 'Donne che viaggiano sole'
    }
  ],

  // Video sidebars
  videoSidebars: {
    mySidebar6: {
      title: 'ZANSKAR 6000',
      titleLink: 'https://www.rtve.es/television/20220418/metropolis-injuve-2022/2333780.shtml',
      videoSrc: 'assets/videos/ZANSKAR 6000 music_02.mp4',
      description: '"Zanskar 6000" Italy, 2024, 19\'15\'\', 16:9, Full HD, stereo sound.<br>A film by Giada Ripa',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/album=4130254768/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/',
        style: 'border:0;width:250px;height:450px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/album/once-and-for-all-original-motion-picture-soundtrack',
        title: 'Once And For All by Tommaso Massimiliano Alfì'
      }
    },
    mySidebar: {
      title: 'SLEEPING CLOSE',
      titleLink: 'https://www.imdb.com/title/tt29376130/',
      videoSrc: 'assets/videos/Acqua.mp4',
      description: '"Sleeping Close" Italy, France 2023, 109\', 2:1, Full HD.<br>A Film by Giulio Pereno',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/album=1265036739/size=large/bgcol=ffffff/linkcol=333333/artwork=none/transparent=true/',
        style: 'border:none;width:250px;height:500px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/album/sleeping-close-soundtrack',
        title: 'Sleeping Close - Soundtrack by Tommaso Massimiliano Alfi'
      }
    },
    mySidebar3: {
      title: 'BURDEN OF PROOF',
      titleLink: 'https://www.imdb.com/title/tt33291155/',
      videoSrc: 'assets/videos/Burden.mp4',
      description: 'Burden Of Proof, 2022 Italy.<br>A Film by Federico Pozuelo',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/album=2034586078/size=large/bgcol=ffffff/linkcol=0687f5/artwork=small/transparent=true/',
        style: 'border:0;width:250px;height:450px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/album/burden-of-proof-original-motion-picture-soundtrack',
        title: 'Burden Of Proof by Tommaso Massimiliano Alfì'
      }
    },
    mySidebar7: {
      title: 'Suspended Lives',
      titleLink: 'https://www.imdb.com/title/tt29376130/',
      videoSrc: 'assets/videos/suspended.mp4',
      description: '"Suspended Lives" Italy, 2023, 29\'.<br>A Film by Chiara Valenti & Patrick Frunzio',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/track=1106786924/size=large/bgcol=ffffff/linkcol=0687f5/tracklist=false/artwork=none/transparent=true/',
        style: 'border:0;width:90%;height:120px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/track/suspended-lives-theme-soundtrack',
        title: 'Suspended Lives - Theme by Tommaso Massimiliano Alfì'
      }
    },
    mySidebar5: {
      title: 'ONCE AND FOR ALL',
      titleLink: 'https://www.imdb.com/title/tt29376130/',
      videoSrc: 'assets/videos/OnceAndFor.mp4',
      description: 'Once And For All, 2022 Italy.<br>A Film by Federico Pozuelo & Javier Ruiz',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/album=4130254768/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/',
        style: 'border:0;width:250px;height:450px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/album/once-and-for-all-original-motion-picture-soundtrack',
        title: 'Once And For All by Tommaso Massimiliano Alfì'
      }
    },
    mySidebar4: {
      title: 'DESPITE THE FACTS',
      titleLink: 'https://www.federicopozuelo.com/despite-the-facts.html',
      videoSrc: 'assets/videos/DespiteTheFacts.mp4',
      description: 'Despite The Facts, 2022 Italy.<br>A Film by Federico Pozuelo',
      bandcamp: {
        src: 'https://bandcamp.com/EmbeddedPlayer/album=1256480392/size=large/bgcol=ffffff/linkcol=0687f5/artwork=none/transparent=true/',
        style: 'border:0;width:250px;height:450px;',
        link: 'https://tommasomassimilianoalfi.bandcamp.com/album/despite-the-fact-original-motion-picture-soundtrack',
        title: 'Despite The Facts by Tommaso Massimiliano Alfì'
      }
    },
    mySidebar2: {
      title: 'DONNE CHE VIAGGIANO SOLE',
      titleLink: 'https://www.imdb.com/title/tt21608742/',
      videoSrc: 'assets/videos/donneche.mp4',
      description: '75\', ITA-DE-FRA, 2019.<br>A Film By Giulio Pereno'
      // Nota: questo non ha bandcamp nell'originale
    }
  }
};

// Esporta i dati per l'uso nei moduli
if (typeof module !== 'undefined' && module.exports) {
  module.exports = siteData;
}