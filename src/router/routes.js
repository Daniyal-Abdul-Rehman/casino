const routes = [
  {
    path: '/',
    component: () => import('src/pages/landing/index.vue'), // Optional: Add a layout for consistency
  },
  {
    path: '/admin',
    component: () => import('src/pages/admin/index.vue'), // Optional: Add a layout for consistency
  },
  {
    path: '/game',
    component: () => import('src/pages/game/index.vue'), // Optional: Add a layout for consistency
  },
  {
    path: '/register',
    component: () => import('src/layouts/RegisterLayout.vue'), // Optional: Add a separate layout for registration flow
    children: [
      {
        path: 'step-one', // Remove the leading slash (it's relative to '/register')
        component: () => import('src/pages/register/pageOne.vue'),
      },
      {
        path: 'step-two', // Remove the leading slash (it's relative to '/register')
        component: () => import('src/pages/register/pageTwo.vue'),
      },
      {
        path: 'step-three', // Remove the leading slash (it's relative to '/register')
        component: () => import('src/pages/register/pageThree.vue'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('src/pages/signIn/index.vue')
  },
  {
    path: '/forget-password',
    component: () => import('src/pages/otp/forgetPassword.vue')
  },
  {
    path: '/reset-password',
    component: () => import('src/pages/otp/ResetPassword.vue')
  },
  {
    path: '/verify-otp',
    component: () => import('src/pages/otp/otpVerification.vue')
  },
  {
    path: '/dashboard',
    component: () => import('src/pages/dashboard/index.vue')
  },
  {
    path: '/privacy',
    component: () => import('src/pages/privacy/index.vue')
  },
  {
    path: '/t&c',
    component: () => import('src/pages/t&c/index.vue')
  },
  {
    path: '/cookie-policy',
    component: () => import('src/pages/cookie/index.vue')
  },
  {
    path: '/responsible-gaming',
    component: () => import('src/pages/reponsibleGaming/index.vue')
  },
  
  {
    path: '/balance',
    component: () => import('src/layouts/balanceLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/balance/index.vue'),
      },
        {
        path: 'add',
        component: () => import('src/pages/balance/addBalance.vue'),
      },
      {
        path: 'payout',
        component: () => import('src/pages/balance/payout.vue'),
      },
      {
        path: 'payment-options',
        component: () => import('src/pages/balance/paymentOptions.vue'),
      },
      {
        path: 'account-details',
        component: () => import('src/pages/balance/accountDetails.vue'),
      },
      {
        path: 'deposit',
        component: () => import('src/pages/balance/deposite.vue'),
      },
    ]
  },
  {
    path: '/account',
    component: () => import('src/layouts/accountLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('src/pages/account/index.vue'),
      },
      {
        path: 'details',
        component: () => import('src/pages/account/details.vue'),
      },
    ]
  },
  // {
  //   path: '/:catchAll(.*)*',
  //   component: () => import('src/pages/Error404.vue'), // Fallback for 404 pages
  // },
];

export default routes;
