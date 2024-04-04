const commonUrl = '/station-yc/yc'
const hApi = {
    getOrg:`${commonUrl}/common/getOrg`,//获取组织机构
    getSubStaionByOrgId:`${commonUrl}/common/getSubStaionByOrgId`,//所属变电站下拉列表查询
    getMapBubbleList: `${commonUrl}/chart/getChartAreaStatistic`, //获取地图气泡数据
    getMapDeviceList: `${commonUrl}/chart/getChartDevList`, //获取地图打点列表
    getDeviceListByTable: `${commonUrl}/chart/getChartDev`, //获取在列表点击的打点列表
}
export default hApi;