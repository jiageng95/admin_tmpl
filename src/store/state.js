export const state = {
    isLoading: false,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : '',
    hasLogin: 0,
    tabList: [],
    isFold: false,
    breadCrumb: '',
    pendingCount: {}
}
