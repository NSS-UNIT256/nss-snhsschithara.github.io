// Merged and corrected script.js
// - Combines the functionality from your original script.js and the minimal api.js helper
// - Keeps your full volunteer arrays intact
// - Optional YouTube auto-fetch using YT_API_KEY / YT_CHANNEL_ID (leave empty to disable)
// - Caching, sanitization of YouTube IDs, robust fallback for file:// protocol (thumbnails + links)
// - i18n + rendering for pages: index, about, images, videos
//
// Usage:
//  - To enable auto-fetch of channel videos, set YT_API_KEY and YT_CHANNEL_ID below.
//  - Serve the site over http(s) for embedded iframes to work. file:// will fall back to thumbnail links.

// ---------------------------
// Configuration
// ---------------------------
const YT_API_KEY = 'AIzaSyCmda7YFfugrv2oRsEwBuSpZoO5XGceGUk'; // <-- Put your YouTube Data API v3 key here (or leave empty to disable auto-fetch)
const YT_CHANNEL_ID = 'UCNYUD1HguwfAJdn8d_gVZ_Q'; // <-- Put your channel's ID (starts with "UC...") here
const YT_MAX_RESULTS = 16; // how many recent videos to fetch
const YT_CACHE_TTL = 10 * 60 * 1000; // cache in ms (10 minutes)

// ---------------------------
// images (placeholder/demo)
// ---------------------------
const images = Array.from({ length: 20 }).map((_, i) => {
  const id = i + 1;
  return {
    id,
    title: `NSS Event Photo ${id}`,
    // Placeholder service so the gallery doesn't show broken images.
    // Replace with local paths like 'images/events/1.jpg' if you have them.
    src: `images/activities/`,
    date: new Date(Date.UTC(2025, 10, Math.max(1, 28 - i))).toISOString()
  };
});

// ---------------------------
// Videos - allow reassignment (let) later from fetched results
// ---------------------------
let videos = [
  { id: 'YO535HHbZpg?si=qX4im20DACxvY_D-', title: 'The Cynosure of art and skills', date: '' },
  { id: 'kJQP7kiw5Fk', title: 'NSS Awareness Drive', date: '2025-10-20T12:00:00Z' },
  { id: '3JZ_D3ELwOQ', title: 'Community Service Highlights', date: '2025-10-25T12:00:00Z' },
  { id: '9bZkp7q19f0', title: 'Tree Planting Program', date: '2025-10-27T12:00:00Z' },
  { id: 'fJ9rUzIMcZQ', title: 'Health Camp', date: '2025-10-28T12:00:00Z' },
  { id: 'e-ORhEE9VVg', title: 'Workshop: Leadership', date: '2025-09-10T12:00:00Z' },
  { id: 'uelHwf8o7_U', title: 'Clean-up Drive', date: '2025-09-20T12:00:00Z' }
];

// ---------------------------
// Volunteers (full arrays preserved from your original files)
// ---------------------------

const secondYear = [
  {
    id: '2Y-01',
    name: 'MUHAMMAD JR',
    class: '+2-Computer Science B (Leader)',
    photo: 'images/volunteers/2024-26/1.jpg'
  },
  {
    id: '2Y-02',
    name: 'NAKSHATHRA B',
    class: '+2-Biology Science A (Leader)',
    photo: 'images/volunteers/2024-26/2.png'
  },
  {
    id: '2Y-03',
    name: 'ABHIRAMI BS',
    class: '+2-Biology Science A',
    photo: 'images/volunteers/2024-26/ABHIRAMI-BS.png'
  },
  {
    id: '2Y-04',
    name: 'ABHIJITH RD',
    class:'',
    photo: 'images/volunteers/2024-26/ABHIJITH-RD.png'
  },
  {
    id: '2Y-05',
    name: 'ABHINAV SL',
    class: '+2-Computer Science B',
    photo: 'images/volunteers/2024-26/ABHINAV-SL.png'
  },
  {
    id: '2Y-06',
    name: 'ABHIRAM JAYAKUMAR',
    class: '+2-omputer Science A',
    photo: 'images/volunteers/2024-26/ABHIRAM-JAYAKUMAR.png'
  },
  {
    id: '2Y-07',
    name: 'ABHISHEK S S',
    class: '+2-Humanities',
    photo: 'images/volunteers/2024-26/ABHISHEK-SS.png'
  },
  {
    id: '2Y-08',
    name: 'ABHISHEK V',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ABHISHEK-V.png'
  },
  {
    id: '2Y-09',
    name: 'ADITHYAN VS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ADITHYAN-VS.png'
  },
  {
    id: '2Y-10',
    name: 'AJMALSHA NB',
    class: '12-C',
    photo: 'images/volunteers/2024-26/AJMAL-SHA-NB.png'
  },
  {
    id: '2Y-11',
    name: 'AKASH AS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/AKASH-AS.png'
  },
  {
    id: '2Y-12',
    name: 'ALEENA F',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ALEENA-F.png'
  },
  {
    id: '2Y-13',
    name: 'ALFIYA SS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ALFIYA-SS.png'
  },
  {
    id: '2Y-14',
    name: 'ALHUDA N',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ALHUDA-N.png'
  },
  {
    id: '2Y-15',
    name: 'AMAL LS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/AMAL-LS.png'
  },
  {
    id: '2Y-16',
    name: 'ANAMIKA SB',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ANAMIKA-SB.png'
  },
  {
    id: '2Y-17',
    name: 'ANANYA SUJITH',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ANANYA-SUJITH.png'
  },
  {
    id: '2Y-18',
    name: 'ANSALNA S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ANSALNA-S.png'
  },
  {
    id: '2Y-19',
    name: 'ARDRA SR',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ARDRA-SR.png'
  },
  {
    id: '2Y-20',
    name: 'ARJUN RD',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ARJUN-RD.png'
  },
  {
    id: '2Y-21',
    name: 'ASIF N',
    class: '12-C',
    photo: 'images/volunteers/2024-26/ASIF-N.png'
  },
  {
    id: '2Y-22',
    name: 'BHAMA N MANOJ',
    class: '12-C',
    photo: 'images/volunteers/2024-26/BHAMA-N-MANOJ.png'
  },
  {
    id: '2Y-23',
    name: 'BIBIN KRISHNA B',
    class: '12-C',
    photo: 'images/volunteers/2024-26/BIBIN-KRISHNA-B.png'
  },
  {
    id: '2Y-24',
    name: 'BLESSY MERIN JOY',
    class: '12-C',
    photo: 'images/volunteers/2024-26/BLESSY-MERIN-JOY.png'
  },
  {
    id: '2Y-25',
    name: 'DEVIKA AS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/DEVIKA-AS.png'
  },
  {
    id: '2Y-26',
    name: 'DEVIKA V',
    class: '12-C',
    photo: 'images/volunteers/2024-26/DEVIKA-V.png'
  },
  {
    id: '2Y-27',
    name: 'DIYA SALIM',
    class: '12-C',
    photo: 'images/volunteers/2024-26/DIYA-SALIM.png'
  },
  {
    id: '2Y-28',
    name: 'DIYAJITH S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/DIYAJITH-S.png'
  },
  {
    id: '2Y-29',
    name: 'DRISHYA PRASANTH',
    class: '12-C',
    photo: 'images/volunteers/2024-26/DRISHYA-PRASANTH.png'
  },
  {
    id: '2Y-30',
    name: 'GOURI DEVANANDA P',
    class: '12-C',
    photo: 'images/volunteers/2024-26/GOURI-DEVANANDA-P.png'
  },
  {
    id: '2Y-31',
    name: 'GOURI S NAIR',
    class: '12-C',
    photo: 'images/volunteers/2024-26/GOURI-S-NAIR.png'
  },
  {
    id: '2Y-32',
    name: 'IRFAN S SIDHEEK',
    class: '12-C',
    photo: 'images/volunteers/2024-26/IRFAN-S-SIDHEEK.png'
  },
  {
    id: '2Y-33',
    name: 'KEERTHI MS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/KEERTHI-MS.png'
  },
  {
    id: '2Y-34',
    name: 'MIDHUNA BM',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MIDHUNA-BM.png'
  },
  {
    id: '2Y-35',
    name: 'MINHA SHAFI',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MINHA-SHAFI.png'
  },
  {
    id: '2Y-36',
    name: 'MUHAMMED ADIL B',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMED-ADIL-B.png'
  },
  {
    id: '2Y-37',
    name: 'MUHAMMED ALTHAF A',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMED-ALTHAF-A.png'
  },
  {
    id: '2Y-38',
    name: 'MUHAMMED ASIF S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMED-ASIF-S.png'
  },
  {
    id: '2Y-39',
    name: 'MOHAMMED IMDAD',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MOHAMMED-IMDAD.png'
  },
  {
    id: '2Y-40',
    name: 'MUHAMMED NAHSIN N',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMAD-NAHSIN-N.png'
  },
  {
    id: '2Y-41',
    name: 'MUHAMMAD NOUFAL Z',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMAD-NOUFAL-Z.png'
  },
  {
    id: '2Y-42',
    name: 'MUHAMMED SAFEER S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMED-SAFEER-S.png'
  },
  {
    id: '2Y-43',
    name: 'MUHAMMED SAFIN SS',
    class: '12-C',
    photo: 'images/volunteers/2024-26/MUHAMMED-SAFIN-SS.png'
  },
  {
    id: '2Y-44',
    name: 'NANDANA S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/NANDANA-S.png'
  },
  {
    id: '2Y-45',
    name: 'NIHAL MUHAMMAD F',
    class: '12-C',
    photo: 'images/volunteers/2024-26/NIHAL-MUHAMMAD-F.png'
  },
  {
    id: '2Y-46',
    name: 'SANA FATHIMA',
    class: '12-C',
    photo: 'images/volunteers/2024-26/SANA-FATHIMA.png'
  },
  {
    id: '2Y-47',
    name: 'SANA FATHIMA S',
    class: '+2 Biology Science B',
    photo: 'images/volunteers/2024-26/SANA-FATHIMA-S.png'
  },
  {
    id: '2Y-48',
    name: 'SREEHARI D',
    class: '12-C',
    photo: 'images/volunteers/2024-26/SREEHARI-D.png'
  },
  {
    id: '2Y-49',
    name: 'THASNIYA JAFAR S',
    class: '12-C',
    photo: 'images/volunteers/2024-26/THASNIYA-JAFAR-S.png'
  },
  {
    id: '2Y-50',
    name: 'VISHAK V',
    class: '12-C',
    photo: 'images/volunteers/2024-26/VISHAK-V.png'
  }
];

const firstYear = [
  {
    id: '1Y-01',
    name: 'MUHAMMED SAHIL',
    class: '+1-Computer Science B (Leader)',
    photo: 'images/volunteers/2025-27/1.jpeg'
  },
  {
    id: '1Y-02',
    name: 'AFSANA S SHAIJU',
    class: '+1-Biology Science B (Leader)',
    photo: 'images/volunteers/2025-27/2.JPEG'
  },
    {
        id: '1Y-03',
        name: 'ABINAS S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ABINAS-S.JPG'
    },
    {
        id: '1Y-04',
        name: 'ADHAL S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ADHAL-S.JPG'
    },
    {
        id: '1Y-05',
        name: 'ADITHYA BINU',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ADITHYA-BINU.JPG'
    },
    {
        id: '1Y-06',
        name: 'ADITHYAN S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ADITHYAN-S.JPG'
    },
    {
        id: '1Y-07',
        name: 'AISWARYA RS',
        class: '11-A',
        photo: 'images/volunteers/2025-27/AISWARYA-RS.JPG'
    },
    {
        id: '1Y-08',
        name: 'AJMAL MUHAMMAD S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/AJMAL-MUHAMMAD-S.JPG'
    },
    {
        id: '1Y-09',
        name: 'AL AMEEN S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/AL-AMEEN-S.JPG'
    },
    {
        id: '1Y-10',
        name: 'AL FARIS ASHARAF',
        class: '11-A',
        photo: 'images/volunteers/2025-27/AL-FARIS-ASHARAF.JPG'
    },
    {
        id: '1Y-11',
        name: 'ALFIYA S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ALFIYA-S.JPG'
    },
    {
        id: '1Y-12',
        name: 'AMINA NIZAM',
        class: '11-A',
        photo: 'images/volunteers/2025-27/AMINA-NIZAM.JPG'
    },
    {
        id: '1Y-13',
        name: 'ANANTHAN NARAYANAN SR',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANANTHAN-NARAYANAN-SR.JPG'
    },
    {
        id: '1Y-14',
        name: 'ANFIYA NN',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANFIYA-NN.JPG'
    },
    {
        id: '1Y-15',
        name: 'ANJANA AJITH',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANJANA-AJITH.JPG'
    },
    {
        id: '1Y-16',
        name: 'ANSHA SHAM',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANSHA-SHAM.JPG'
    },
    {
        id: '1Y-17',
        name: 'ANZIL SALIM',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANZIL-SALIM.JPG'
    },
    {
        id: '1Y-18',
        name: 'ANZAR A',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ANZAR-A.JPG'
    },
    {
        id: '1Y-19',
        name: 'APSARA AJ',
        class: '11-A',
        photo: 'images/volunteers/2025-27/APSARA-AJ.JPG'
    },
    {
        id: '1Y-20',
        name: 'ARADHYA SJ',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ARADHYA-SJ.JPG'
    },
    {
        id: '1Y-21',
        name: 'ARPPITHA BS',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ARPPITHA-BS.JPG'
    },
    {
        id: '1Y-22',
        name: 'ARUN M',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ARUN-M.JPG'
    },
    {
        id: '1Y-23',
        name: 'ARYAJITH A',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ARYAJITH-A.JPG'
    },
    {
        id: '1Y-24',
        name: 'ASHIK S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/ASHIK-S.JPG'
    },
    {
        id: '1Y-25',
        name: 'DAYA DEEPAN',
        class: '11-A',
        photo: 'images/volunteers/2025-27/DAYA-DEEPAN.JPG'
    },
    {
        id: '1Y-26',
        name: 'DEVANANDHA SS',
        class: '11-A',
        photo: 'images/volunteers/2025-27/DEVANANDHA-SS.JPG'
    },
    {
        id: '1Y-27',
        name: 'DIYA DEEPAN',
        class: '11-A',
        photo: 'images/volunteers/2025-27/DIYA-DEEPAN.JPG'
    },
    {
        id: '1Y-28',
        name: 'FARHANA F',
        class: '11-A',
        photo: 'images/volunteers/2025-27/FARHANA-F.JPG'
    },
    {
        id: '1Y-29',
        name: 'GANGA-LAKSHMI',
        class: '11-A',
        photo: 'images/volunteers/2025-27/GANGA-LAKSHMI.JPG'
    },
    {
        id: '1Y-30',
        name: 'GOPIKA G',
        class: '11-A',
        photo: 'images/volunteers/2025-27/GOPIKA-G.JPG'
    },
    {
        id: '1Y-31',
        name: 'HAJIRA R',
        class: '11-A',
        photo: 'images/volunteers/2025-27/HAJIRA-R.JPG'
    },
    {
        id: '1Y-32',
        name: 'HARINANDAN R',
        class: '11-A',
        photo: 'images/volunteers/2025-27/HARINANDAN-R.JPG'
    },
    {
        id: '1Y-33',
        name: 'IHSAN SAJEER',
        class: '11-A',
        photo: 'images/volunteers/2025-27/IHSAN-SAJEER.JPG'
    },
    {
        id: '1Y-34',
        name: 'INJAS AHAMMED K H',
        class: '11-A',
        photo: 'images/volunteers/2025-27/INJAS-AHAMMED-KH.JPG'
    },
    {
        id: '1Y-35',
        name: 'MEENAKSHI BG',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MEENAKSHI-BG.JPG'
    },
    {
        id: '1Y-36',
        name: 'MOULANA MUHAMMED M',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MOULANA-MUHAMMED-M.JPG'
    },
    {
        id: '1Y-37',
        name: 'MUHAMMED ALIF A',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MUHAMMED-ALIF-A.JPG'
    },
    {
        id: '1Y-38',
        name: 'MUHAMMED IRFAN A',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MUHAMMED-IRFAN-A.JPG'
    },
    {
        id: '1Y-39',
        name: 'MUHAMMED IRFAN F',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MUHAMMED-IRFAN-F.JPG'
    },
    {
        id: '1Y-40',
        name: 'MUHAMMAD SHA SIRAJ',
        class: '11-A',
        photo: 'images/volunteers/2025-27/MUHAMMAD-SHA-SIRAJ.JPG'
    },
    {
        id: '1Y-41',
        name: 'RHUTHUL KRISHNA SR',
        class: '11-A',
        photo: 'images/volunteers/2025-27/RHUTHUL-KRISHNA-SR.JPG'
    },
    {
        id: '1Y-42',
        name: 'SAFNA N',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SAFNA-N.JPG'
    },
    {
        id: '1Y-43',
        name: 'SAHAL A S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SAHAL-AS.JPG'
    },
    {
        id: '1Y-44',
        name: 'SHAFNA FATHIMA',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SHAFNA-FATHIMA.JPG'
    },
    {
        id: '1Y-45',
        name: 'SHAHANA NR',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SHAHANA-NR.JPG'
    },
    {
        id: '1Y-46',
        name: 'SOORAJ S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SOORAJ-S.JPG'
    },
    {
        id: '1Y-47',
        name: 'SREEHARI RS',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SREEHARI-RS.JPG'
    },
    {
        id: '1Y-48',
        name: 'SREELAKSHMI AS',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SREELAKSHMI-AS.JPG'
    },
    {
        id: '1Y-49',
        name: 'SYAM SANTHOSH',
        class: '11-A',
        photo: 'images/volunteers/2025-27/SYAM-SANTHOSH.JPG'
    },
    {
        id: '1Y-50',
        name: 'THANZEELA S',
        class: '11-A',
        photo: 'images/volunteers/2025-27/THANZEELA-S.JPG'
    }
];

// ---------------------------
// Leadership & Social links
// ---------------------------
const leadership = {
  manager: { name: 'Mr. Vellapally Natesan', photo:'images/lead/Vellapally-Natesan.jpeg' },
  programOfficer: { name: 'Mr. Priji Gopinath', photo: 'images/lead/priji-gopinath.jpeg' },
  principal: { name: 'Mrs. Beena V S', photo: 'images/lead' },
  md: { name: 'Mr. Pachayil Sandeep', photo: 'images/lead/pachayil-sandeep.jpeg' }
};

const socialLinks = {
  phone1: '+91 94472 48993',
  phone2: '+91 79070 85905',
  instagram: 'https://instagram.com/snhss__nss/',
  youtube: 'https://youtube.com/@snhsschithara?si=BaZsRDAO78gC4NCi',
  email: 'nationalserviceschemeunit256@gmail.com',
  whatsapp: 'https://wa.me/+919447248993'
};

// ---------------------------
// i18n
// ---------------------------
const i18n = {
  en: {
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.images': 'Images',
    'nav.videos': 'Videos',
    'history.title': 'History of the National Service Scheme',
    'history.text': 'The National Service Scheme (NSS) was launched in 1969 with the primary objective of developing students’ personality through community service. NSS aims to foster social responsibility, leadership skills and civic consciousness among youth by engaging them in structured community activities.',
    'history.cta': 'Learn more about our unit',
    'latest.photos': 'Latest Photos',
    'latest.videos': 'Latest Videos',
    'callout.title': 'Join Us / Contact',
    'callout.text': 'Unit 256 at Sree Narayana HSS Chithara is active year-round. Volunteers meet for regular activities and special community projects. Use the About page to find contacts and social links.',
    'about.leadershipTitle': 'Leadership',
    'about.manager.title':'General Manager',
    'about.programOfficer.title': 'Program Officer (NSS)',
    'about.principal.title': 'Principal',
    'about.md.title': 'SNDP Yogam Councillor',
    'about.contact.title': 'Contact & Social',
    'about.contact.phone': 'Phone',
    'about.contact.email': 'Email',
    'about.secondYear.title': '2nd Year NSS Volunteers',
    'about.secondYear.desc': '50 students. Each card shows photo, name and class.',
    'about.firstYear.title': '1st Year NSS Volunteers',
    'about.firstYear.desc': '50 students. Each card shows photo, name and class.',
    'images.title': 'Gallery',
    'images.desc': 'A collection of photos from our events and activities. Click to view larger.',
    'images.videosTab': 'Videos',
    'images.videosDesc': 'Embedded videos of our activities. Click play to watch.',
    'videos.title': 'All Videos',
    'videos.desc': 'Watch recordings of events, awareness programs, and community activities.'
  },
  ml: {
    'nav.home': 'ഹോം',
    'nav.about': 'ഞങ്ങളെക്കുറിച്ച്',
    'nav.images': 'ഫോട്ടോകൾ',
    'nav.videos': 'വീഡിയോസ്',
    'history.title': 'നാഷണൽ സർവീസ് സ്കീമിന്റെ ചരിത്രം',
    'history.text': 'നാഷണൽ സർവീസ് സ്കീം (NSS) 1969-ൽ ആരംഭിക്കുകയും കമ്മ്യൂണിറ്റി സേവനത്തിലൂടെ വിദ്യാർത്ഥികളുടെ വ്യക്തിത്വത്തെ വളർത്തുക എന്ന ലക്ഷ്യത്തോടെ പ്രവർത്തിക്കുകയും ചെയ്യുന്നു. NSS യുവജനങ്ങളിൽ സാമൂഹിക ഉത്തരവാദിത്തം, നേതృ കഴിവുകൾ, പൗരബോധം എന്നിവ വളർത്തുന്നതിനായി വിവിധ പ്രവർത്തനങ്ങളിലൂടെ അവരെ പങ്കെടുപ്പിക്കുന്നു.',
    'history.cta': 'ഞങ്ങളേക്കുറിച്ച് കൂടുതൽ അറിയൂ',
    'latest.photos': 'പുതിയ അഞ്ച് ഫോടോകൾ',
    'latest.videos': 'പുതിയ അഞ്ച് വീഡിയോകൾ',
    'callout.title': 'ഞങ്ങളോട് ചേർതടുക്കുക / ബന്ധപ്പെടുക',
    'callout.text': 'ശ്രീ നാരായണ ഹൈയർ സെക്കൻഡറി സ്കൂൾ ചിതറയിലെ യൂണിറ്റ് 256 വർഷം മുഴുവൻ സജീവമാണ്. വോളണ്ടിയർമാർ സ്ഥിരമായി പരിപാടികളിലും സമൂഹ പരിപാടികളിലും പങ്കെടുക്കുന്നു. വിവരങ്ങൾക്കായി About പേജ് കാണുക.',
    'about.leadershipTitle': 'മേധാവിമാർ',
    'about.manager.title':'ജനറൽ മാനേജർ',
    'about.programOfficer.title': 'പ്രോഗ്രാം ഓഫീസർ (NSS)',
    'about.principal.title': 'പ്രിൻസിപ്പൽ',
    'about.md.title': 'എസ്. എൻ . ഡി . പി യോഗം കൗൺസിലർ',
    'about.contact.title': 'ബന്ധപ്പെടാം & സോഷ്യൽ',
    'about.contact.phone': 'ഫോൺ',
    'about.contact.email': 'ഇമെയിൽ',
    'about.secondYear.title': '2-ആം വർഷം NSS വോളണ്ടിയേഴ്സ്',
    'about.secondYear.desc': '50 വിദ്യാർത്ഥികൾ. ഓരോ കാർഡിലും ഫോട്ടോ, പേര്, ക്ലാസ് കാണിക്കും.',
    'about.firstYear.title': '1-ആം വർഷം NSS വോളണ്ടിയേഴ്സ്',
    'about.firstYear.desc': '50 വിദ്യാർത്ഥികൾ. ഓരോ കാർഡിലും ഫോട്ടോ, പേര്, ക്ലാസ് കാണിക്കും.',
    'images.title': 'ഗ്യാലറി',
    'images.desc': 'ഞങ്ങളുടെ പരിപാടികളിലെ ഫോട്ടോകളുടെ ശേഖരം. വലിയതായ ദൃശ്യം കാണുവാൻ ക്ലിക്ക് ചെയ്യൂ.',
    'images.videosTab': 'വീഡിയോസ്',
    'images.videosDesc': 'വീഡിയോസ് ഇവിടെ ഉൾപ്പെടുത്തിയിരിക്കുന്നു. പ്ലേ ചെയ്യാൻ ക്ലിക്ക് ചെയ്യൂ.',
    'videos.title': 'എല്ലാ വീഡിയോകളും',
    'videos.desc': 'ഈവന്റുകൾ, അവബോധ പരിപാടികൾ, സാമൂഹിക പ്രവർത്തനങ്ങൾ എന്നിവയുടെ റെക്കോർഡിംഗുകൾ കാണുക.'
  }
};

// ---------------------------
// Helpers
// ---------------------------
function $(sel) { return document.querySelector(sel); }
function $all(sel) { return Array.from(document.querySelectorAll(sel)); }

function formatDate(d) {
  if (!d) return '';
  const dt = new Date(d);
  return dt.toLocaleDateString();
}

function latest(items, n = 5) {
  return (items || []).slice().sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, n);
}

function escapeHtml(s) {
  if (!s) return '';
  return s.replace(/[&<>"']/g, function (m) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]; });
}

function isLocalFileProtocol() {
  return location.protocol === 'file:';
}

// ---------------------------
// YouTube fetcher & caching (integrated)
// ---------------------------
async function fetchYouTubeChannelVideos(apiKey, channelId, maxResults = 8) {
  if (!apiKey || !channelId) return null;

  const cacheKey = `yt_videos_${channelId}`;
  try {
    const rawCache = localStorage.getItem(cacheKey);
    if (rawCache) {
      const cached = JSON.parse(rawCache);
      if (cached && (Date.now() - cached.fetchedAt) < YT_CACHE_TTL) {
        return cached.items;
      }
    }
  } catch (e) {
    console.warn('YT cache read error', e);
  }

  const url = `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(apiKey)}&channelId=${encodeURIComponent(channelId)}&part=snippet,id&order=date&maxResults=${Math.min(maxResults, 50)}&type=video`;
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      const txt = await resp.text();
      console.warn('YouTube API responded with non-OK:', resp.status, txt);
      return null;
    }
    const data = await resp.json();
    const items = (data.items || []).map(it => {
      const vid = it.id && (it.id.videoId || it.id);
      const sn = it.snippet || {};
      return {
        type: 'youtube',
        id: vid,
        title: sn.title || 'YouTube Video',
        date: sn.publishedAt || ''
      };
    }).filter(x => x.id);

    try {
      localStorage.setItem(cacheKey, JSON.stringify({ fetchedAt: Date.now(), items }));
    } catch (e) {
      console.warn('YT cache write error', e);
    }
    return items;
  } catch (err) {
    console.error('Error fetching YouTube videos', err);
    return null;
  }
}

// ---------------------------
// Minimal external fetch helper (same idea as api.js but included here)
// ---------------------------
async function fetchYouTubeVideosMinimal(apiKey, channelId, maxResults = 10) {
  if (!apiKey || !channelId) return null;
  const apiURL = `https://www.googleapis.com/youtube/v3/search?key=${encodeURIComponent(apiKey)}&channelId=${encodeURIComponent(channelId)}&part=snippet,id&order=date&maxResults=${maxResults}&type=video`;
  try {
    const res = await fetch(apiURL);
    if (!res.ok) {
      console.warn('YouTube API non-OK', res.status);
      return null;
    }
    const data = await res.json();
    return data.items || [];
  } catch (err) {
    console.error('Error fetching YouTube videos (minimal):', err);
    return null;
  }
}

// ---------------------------
// Video normalization & card creation
// ---------------------------
function normalizeYouTubeId(raw) {
  if (!raw) return '';
  let s = String(raw).trim();
  try {
    if (s.includes('youtu')) {
      if (!s.startsWith('http')) s = 'https://' + s;
      const u = new URL(s);
      if (u.hostname && u.hostname.includes('youtu.be')) {
        return u.pathname.replace(/^\//, '').split('?')[0];
      }
      if (u.searchParams && u.searchParams.get('v')) {
        return u.searchParams.get('v').split('?')[0];
      }
      const parts = u.pathname.split('/');
      const embedIndex = parts.indexOf('embed');
      if (embedIndex !== -1 && parts[embedIndex + 1]) return parts[embedIndex + 1];
    }
    if (s.includes('?')) s = s.split('?')[0];
    if (s.includes('&')) s = s.split('&')[0];
    if (s.includes('/')) s = s.split('/').pop();
    return s;
  } catch (err) {
    if (s.includes('?')) s = s.split('?')[0];
    if (s.includes('&')) s = s.split('&')[0];
    if (s.includes('/')) s = s.split('/').pop();
    return s;
  }
}

function normalizeVideoEntry(v) {
  const copy = Object.assign({}, v);
  if (!copy.type) copy.type = 'youtube';
  if (copy.type === 'youtube') {
    copy.id = normalizeYouTubeId(copy.id || copy.src || copy.url);
  }
  return copy;
}

function createVideoCard(rawItem) {
  const v = normalizeVideoEntry(rawItem);
  const card = document.createElement('div');
  card.className = 'video-card';
  const title = escapeHtml(v.title || 'Untitled');
  const dateStr = v.date ? formatDate(v.date) : '';
  const canEmbedIframes = !isLocalFileProtocol() && (location.protocol === 'http:' || location.protocol === 'https:');
  const originSafe = (location && location.origin) ? encodeURIComponent(location.origin) : '';

  if (v.type === 'youtube') {
    const youtubeUrl = `https://www.youtube.com/watch?v=${v.id}`;
    const thumb = `https://img.youtube.com/vi/${v.id}/hqdefault.jpg`;

    if (v.id && canEmbedIframes) {
      const params = `?rel=0&modestbranding=1&playsinline=1${originSafe ? `&origin=${originSafe}` : ''}`;
      const src = `https://www.youtube.com/embed/${v.id}${params}`;
      card.innerHTML = `
        <iframe src="${src}" title="${title}" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        <div style="padding:8px;">
          <strong>${title}</strong>
          <div class="muted" style="font-size:0.85rem">${dateStr}</div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <a href="${youtubeUrl}" target="_blank" rel="noopener" style="display:block;border-radius:8px;overflow:hidden;">
          <img src="${thumb}" alt="${title}" style="width:100%;height:150px;object-fit:cover;display:block;" loading="lazy" />
        </a>
        <div style="padding:8px;">
          <a href="${youtubeUrl}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;"><strong>${title}</strong></a>
          <div class="muted" style="font-size:0.85rem">${dateStr}</div>
        </div>
      `;
    }
  } else if (v.type === 'vimeo') {
    const vimeoUrl = `https://vimeo.com/${v.id}`;
    const thumb = v.poster || '';
    if (canEmbedIframes && v.id) {
      const src = `https://player.vimeo.com/video/${v.id}`;
      card.innerHTML = `
        <iframe src="${src}" title="${title}" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        <div style="padding:8px;">
          <strong>${title}</strong>
          <div class="muted" style="font-size:0.85rem">${dateStr}</div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <a href="${vimeoUrl}" target="_blank" rel="noopener" style="display:block;border-radius:8px;overflow:hidden;">
          ${ thumb ? `<img src="${thumb}" alt="${title}" style="width:100%;height:150px;object-fit:cover;display:block;" loading="lazy" />` : `<div style="height:150px;background:#111;border-radius:6px;display:flex;align-items:center;justify-content:center;color:#fff">Open on Vimeo</div>` }
        </a>
        <div style="padding:8px;">
          <a href="${vimeoUrl}" target="_blank" rel="noopener" style="text-decoration:none;color:inherit;"><strong>${title}</strong></a>
          <div class="muted" style="font-size:0.85rem">${dateStr}</div>
        </div>
      `;
    }
  } else if (v.type === 'local') {
    const src = escapeHtml(v.src || '');
    const posterAttr = v.poster ? ` poster="${escapeHtml(v.poster)}"` : '';
    card.innerHTML = `
      <div style="border-radius:8px;overflow:hidden;background:#000;">
        <video controls preload="metadata" style="width:100%;height:150px;object-fit:cover;display:block;"${posterAttr}>
          <source src="${src}" type="video/mp4">
          Your browser does not support the video tag.
        </video>
      </div>
      <div style="padding:8px;">
        <strong>${title}</strong>
        <div class="muted" style="font-size:0.85rem">${dateStr}</div>
      </div>
    `;
  } else {
    const href = v.url || '#';
    card.innerHTML = `
      <div style="padding:12px;">
        <a href="${escapeHtml(href)}" target="_blank" rel="noopener"><strong>${title}</strong></a>
        <div class="muted" style="font-size:0.85rem">${dateStr}</div>
      </div>
    `;
  }
  return card;
}

// ---------------------------
// Rendering functions
// ---------------------------
function renderLatestPhotos() {
  const target = $('#latest-photos');
  if (!target) return;
  target.innerHTML = '';
  const latestPhotos = latest(images, 12);
  latestPhotos.forEach(img => {
    const a = document.createElement('a');
    a.href = img.src;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'photo-item';
    a.innerHTML = `<img src="${img.src}" alt="${escapeHtml(img.title)}" loading="lazy" />`;
    target.appendChild(a);
  });
}

function renderLatestVideos() {
  const target = $('#latest-videos');
  if (!target) return;
  target.innerHTML = '';
  const latestV = latest(videos, 8);
  latestV.forEach(raw => {
    const card = createVideoCard(raw);
    target.appendChild(card);
  });
}

function renderGalleryPage() {
  const gal = $('#images-gallery');
  if (gal) {
    gal.innerHTML = '';
    images.forEach(img => {
      const d = document.createElement('div');
      d.className = 'photo-card';
      d.innerHTML = `<img src="${img.src}" alt="${escapeHtml(img.title)}" loading="lazy" />`;
      d.addEventListener('click', () => window.open(img.src, '_blank'));
      gal.appendChild(d);
    });
  }
  const vidTarget = $('#images-videos');
  if (vidTarget) {
    vidTarget.innerHTML = '';
    videos.forEach(v => {
      const c = createVideoCard(v);
      vidTarget.appendChild(c);
    });
  }
}

function renderVideosPage() {
  const list = $('#videos-list');
  if (!list) return;
  list.innerHTML = '';
  videos.forEach(v => {
    const c = createVideoCard(v);
    list.appendChild(c);
  });
}

// ---------------------------
// Volunteers, leadership, social-render
// ---------------------------
function renderVolunteers() {
  const sGrid = $('#second-year-grid');
  const fGrid = $('#first-year-grid');

  function createVolCard(s) {
    const el = document.createElement('div');
    el.className = 'vol-card';
    const imgSrc = s.photo || 'logo.png';
    const sanitizedName = escapeHtml(s.name);
    const sanitizedClass = escapeHtml(s.class);
    el.innerHTML = `<img src="${imgSrc}" alt="${sanitizedName}" loading="lazy" /><h4>${sanitizedName}</h4><p>${sanitizedClass}</p>`;
    const img = el.querySelector('img');
    if (img) {
      img.addEventListener('error', () => {
        img.src = 'images/activities/';
      });
    }
    return el;
  }

  if (sGrid) {
    sGrid.innerHTML = '';
    const list = (typeof secondYear !== 'undefined' ? secondYear : []);
    list.forEach(s => sGrid.appendChild(createVolCard(s)));
  }
  if (fGrid) {
    fGrid.innerHTML = '';
    const list = (typeof firstYear !== 'undefined' ? firstYear : []);
    list.forEach(s => fGrid.appendChild(createVolCard(s)));
  }
}

function renderLeadership() {
  // Placeholder: your HTML currently includes leadership markup.
  // If you'd prefer dynamic injection, implement it here.
}

function renderSocialHome() {
  const container = $('#social-home');
  if (!container) return;
  container.innerHTML = `
    <a class="cta" href="tel:${socialLinks.phone1}"><i class="fa fa-phone" style="margin-right:8px"></i>${socialLinks.phone1}</a>
    <a class="cta" href="tel:${socialLinks.phone2}"><i class="fa fa-phone" style="margin-right:8px"></i>${socialLinks.phone2}</a>
    <a class="cta" href="${socialLinks.instagram}" target="_blank" rel="noopener"><i class="fab fa-instagram" style="margin-right:8px"></i>Instagram</a>
    <a class="cta" href="${socialLinks.youtube}" target="_blank" rel="noopener"><i class="fab fa-youtube" style="margin-right:8px"></i>YouTube</a>
    <a class="cta" href="mailto:${socialLinks.email}"><i class="fa fa-envelope" style="margin-right:8px"></i>Email</a>
    <a class="cta" href="${socialLinks.whatsapp}" target="_blank" rel="noopener"><i class="fa fa-whatsapp" style="margin-right:8px"></i> WhatsApp</a>
  `;
}

// ---------------------------
// i18n
// ---------------------------
function applyTranslations(lang) {
  document.querySelectorAll('[data-i18n]').forEach(node => {
    const key = node.getAttribute('data-i18n');
    if (i18n[lang] && i18n[lang][key]) {
      node.textContent = i18n[lang][key];
    }
  });
  document.body.setAttribute('data-lang', lang);
  if (lang === 'ml') {
    document.body.classList.add('lang-ml');
    const brandTitle = document.getElementById('site-title');
    if (brandTitle) brandTitle.textContent = 'നാഷണൽ സർവീസ് സ്കീം';
    const brandSub = document.getElementById('site-sub');
    if (brandSub) brandSub.textContent = 'യൂണിറ്റ് 256 — ശ്രീ നാരായണ ഹൈയർ സെക്കൻഡറി സ്‌കൂൾ ചിതറ';
  } else {
    document.body.classList.remove('lang-ml');
    const brandTitle = document.getElementById('site-title');
    if (brandTitle) brandTitle.textContent = 'National Service Scheme';
    const brandSub = document.getElementById('site-sub');
    if (brandSub) brandSub.textContent = 'Unit 256 — Sree Narayana Higher Secondary School Chithara';
  }
  document.querySelectorAll('.lang-btn').forEach(b => {
    if (b.id === `lang-${lang}`) {
      b.setAttribute('aria-pressed', 'true');
    } else {
      b.setAttribute('aria-pressed', 'false');
    }
  });
}

// ---------------------------
// Initialization (async so we can await YouTube fetch)
// ---------------------------
async function init() {
  // Try to auto-fetch YouTube videos only if API key & channel ID are provided.
  if (YT_API_KEY && YT_CHANNEL_ID) {
    try {
      const fetched = await fetchYouTubeChannelVideos(YT_API_KEY, YT_CHANNEL_ID, YT_MAX_RESULTS);
      if (fetched && fetched.length) {
        videos = fetched;
      }
    } catch (err) {
      console.warn('Failed to fetch YouTube videos:', err);
    }
  }

  // If you prefer the minimal helper usage, you can call fetchYouTubeVideosMinimal(YT_API_KEY, YT_CHANNEL_ID)

  // render components
  renderLatestPhotos();
  renderLatestVideos();
  renderGalleryPage();
  renderVideosPage();
  renderVolunteers();
  renderLeadership();
  renderSocialHome();

  // set years dynamically
  $all('#year,#year-2,#year-3,#year-4').forEach(el => el && (el.textContent = (new Date()).getFullYear()));

  // language buttons
  const enBtn = document.getElementById('lang-en');
  const mlBtn = document.getElementById('lang-ml');

  const storedLang = localStorage.getItem('nss_lang') || 'en';
  applyTranslations(storedLang);

  if (enBtn) enBtn.addEventListener('click', () => {
    localStorage.setItem('nss_lang', 'en');
    applyTranslations('en');
    document.body.style.fontFamily = '';
  });
  if (mlBtn) mlBtn.addEventListener('click', () => {
    localStorage.setItem('nss_lang', 'ml');
    applyTranslations('ml');
    document.body.style.fontFamily = "'Manjari', Arial, sans-serif";
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
