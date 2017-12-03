import Vue from 'vue';
import VueRouter from 'vue-router';
import OfflineRedirect from './theme/OfflineRedirect.vue';
import Category from './page/Category.vue';
import NotFound from './page/NotFound.vue';

import Login from './page/Login.vue';
import Register from './page/Register.vue';
import AddLink from './page/AddLink.vue';
import User from './page/User.vue';
import SingleLink from './page/SingleLink.vue';

Vue.use(VueRouter);

const router = new VueRouter({
	mode: 'history',
	linkActiveClass: 'is-active',
	base: __dirname,
	scrollBehavior: () => ({ y: 0 }),
	routes: [
		{ path: '/:category/week/:week/year/:year', component: Category },
		{ path: '/week/:week/year/:year', component: Category, params: { category: '' } },
		{ path: '/:category/:id', component: SingleLink },
		{ path: '/login', components: { modal: Login } },
		{ path: '/register', component: Register },
		{ path: '/add', component: AddLink },
		{ path: '/profile', component: User },
		{ path: '/offline-redirect', component: OfflineRedirect },
		{ path: '/', component: Category },
		{ path: '*', component: NotFound }
	]
});

export default router;
