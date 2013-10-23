new TWTR.Widget({
  version: 2,

//USE THIS FOR PROFILE WIDGET
	//type: 'profile',
	//rpp: 4,

//USE THIS FOR SEARCH WIDGET
	type: 'search',
	search: 'chrislkeller',

  interval: 3000,
  title: 'Something to Keep Me Busy',
  subject: 'Chris L Keller on Twitter',
  width: 300,
  height: 600,
  theme: {
    shell: {
      background: '#cccccc',
      color: '#000000'
    },
    tweets: {
      background: '#ffffff',
      color: '#000000',
      links: '#34526F'
    }
  },
  features: {
    scrollbar: true,
    loop: true,
    live: true,
    hashtags: true,
    timestamp: true,
    avatars: true,
    behavior: 'default'
  }

//USE THIS FOR SEARCH WIDGET
}).render().start();