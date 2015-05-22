import loadDataset from '../actions/loadDataset';
import loadResource from '../actions/loadResource';
import loadUsersList from '../actions/loadUsersList';
import {appFullTitle, appShortTitle} from '../configs/general';

export default {
    home: {
        path: '/',
        method: 'get',
        handler: require('../components/Home'),
        label: appShortTitle,
        action: (context, payload, done) => {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: appFullTitle + ' | Home'});
            done();
        }
    },
    about: {
        path: '/about',
        method: 'get',
        handler: require('../components/About'),
        label: 'About',
        action: (context, payload, done) => {
            context.dispatch('UPDATE_PAGE_TITLE', { pageTitle: appFullTitle + ' | About'});
            done();
        }
    },
    dataset: {
        //if no id is provided -> will start by defaultGraphName in reactor.config
        path: '/dataset/:id?',
        method: 'get',
        handler: require('../components/Dataset'),
        label: 'Dataset',
        action: (context, payload, done) => {
            let graphName;
            graphName = payload.get('params').get('id');
            if (!graphName) {
                graphName = 0;
            }
            context.executeAction(loadDataset, { id: graphName}, done);
        }
    },
    resource: {
        path: '/dataset/:did/resource/:rid/:pcategory?',
        method: 'get',
        handler: require('../components/Resource'),
        label: 'Resource',
        action: (context, payload, done) => {
            //predicate Category
            let category;
            category = payload.get('params').get('pcategory');
            if(!category){
                category = 0;
            }
            context.executeAction(loadResource, { dataset: decodeURIComponent(payload.get('params').get('did')), resource: decodeURIComponent(payload.get('params').get('rid')), category: category}, done);
        }
    },
    users: {
        path: '/users',
        method: 'get',
        handler: require('../components/admin/UsersList'),
        label: 'Users List',
        action: (context, payload, done) => {
            context.executeAction(loadUsersList, {}, done);
        }
    }
};
