export const mutations = {
    isLoading (state, value) {
        state.isLoading = value
    },
    userInfo (state, value) {
        localStorage.setItem('userInfo', JSON.stringify(value))
        state.userInfo = value
    },
    hasLogin (state, value) {
        state.hasLogin = value
    },
    tabList (state, value) {
        state.tabList = value
    },
    toggleSideBar (state, value) {
        state.isFold = value
    },
    changeBreadCrumb (state, value) {
        state.breadCrumb = value
    },
    updatePendingCount (state, value) {
        state.pendingCount = value
    }
}
