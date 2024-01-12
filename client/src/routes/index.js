import Home from '~/pages/home';
import AddProduct from '~/pages/add';
import ListProduct from '~/pages/list';
import UpdateProduct from '~/pages/update';

const publicRoutes = [
    { path: '/', component: Home },
    { path: '/add-product', component: AddProduct },
    { path: '/list-product', component: ListProduct },
    { path: '/update-product/:_id', component: UpdateProduct },
];

export { publicRoutes };
