const options = {
    target: 'https://test-qmyxcg.myscrm.cn', // target host
    changeOrigin: true, // needed for virtual hosted sites
    pathRewrite: {
      '^/api': '/api',
    },
    context: '/api'
};

// https://test-qmyxcg.myscrm.cn/api/broker/index/get-building-list?pageIndex=1&cityId=&keyword=&pageSize=20&unionId=&special=special0&from=b2c_h5&orgCode=hzzhongxadmin&tenant_code=hzzhongxadmin&token=cdkqqf1407307954&access_token=&env_orgcode=hzzhongxadmin

// https://test-qmyxcg.myscrm.com.cn/api/index.php?r=common/ad-picture/get-picture-list&type=1&_=1578902736549
// const options = {
//     target: 'https://test-qmyxcg.myscrm.com.cn', // target host
//     changeOrigin: true, // needed for virtual hosted sites
//     pathRewrite: {
//       '^/api': '/api',
//     },
//     context: '/api'
// };

module.exports = options