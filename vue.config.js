module.exports = {
    devServer: {
        proxy: {
            '/api': {    // search为转发路径
                target: 'http://192.168.31.114:8080/',  // 目标地址
                // target:'http://192.168.31.220',
                ws: true, // 是否代理websockets
                changeOrigin: true, // 设置同源  默认false，是否需要改变原始主机头为目标URL,
                // withCredentials: true,
                // crossDomain: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}