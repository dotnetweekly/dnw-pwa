import Vue from 'vue';
import Vuex from 'vuex';
import authModule from './auth';
import linksModule from './links';
import userModule from './user';
import linkModule from './link';
import newslettersModule from './newsletters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
		authModule,
		linksModule,
		userModule,
		linkModule,
		newslettersModule
	}
});

export default store;
