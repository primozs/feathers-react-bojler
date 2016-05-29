const initialState = {
  mainMenu: [
    {
      loc: '/',
      label: 'Home'
    },
    {
      loc: '/chat',
      label: 'Chat'
    },
    {
      loc: '/contact',
      label: 'Contact'
    }
  ],
  userMenu: [
    {
      loc: '/signup',
      label: 'Signup',
      auth: false
    },
    {
      loc: '/login',
      label: 'Login',
      auth: false
    },
    {
      loc: '/profile',
      label: 'Profile',
      auth: true
    },
    {
      loc: '/logout',
      label: 'Logout',
      auth: true
    }
  ],
  languages: [{
    language: 'en',
    label: 'english',
    menuicon: 'Language'
  }, {
    language: 'sl',
    label: 'slovenian',
    menuicon: 'Language'
  }]
};

export default function navReducer(state = initialState, action) {
  switch (action.type) {
    default:
      return state;
  }
}
