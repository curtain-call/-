module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://192.168.79.196:16083/', //接口域名（你请求的第三方接口）
                changeOrigin: true,             //是否跨域 （虚拟的站点需要更管origin）
                ws: true,                       //是否代理 websockets
                pathRewrite: {                  //路径重置
                    '^/api': ''
                }
            }
        }
    }
};