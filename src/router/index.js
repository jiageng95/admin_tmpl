/**
 * 路由配置
 */
export default {
    routes: [],
    initRoutes: function () {
        let routes = Object.keys(this.routes).map(route => {
            let keepAlive = route.split('/').length < 3
            let path = route !== '/' ? '/' + route : '/'
            return {
                path: path,
                component: this.routes[route],
                meta: { keepAlive }
            }
        })
        return routes
    }
}
