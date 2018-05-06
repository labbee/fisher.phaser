export default {
    login() {
        return new Promise((resolve, reject) => {
            wx.login({
                success: resolve,
                fail: reject
            })
        })
    },

    getUserInfo(option={}) {
        return new Promise((resolve, reject) => {
            wx.getUserInfo({
                ...option,
                success: resolve,
                fail: reject
            })
        })
    }
}