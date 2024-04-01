/*
 * @Author: your name
 * @Date: 2021-10-27 15:42:24
 * @LastEditTime: 2024-03-30 10:36:24
 * @LastEditors: 李晓风 1091616642@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \webgis-sdk\html\examples_PMS\configs\devicesDemo.js
 */
const pmsDevicesDemo = {
  // 鍦板浘涓績鐐�
  center: [119.45259089995932, 32.93433342834534],
  // 鏈烘瀯灞傜骇
  ids: {
    orgId: 'ff80808149f52e24014a039871840007',
    provinceId: 'ff80808149f52e24014a039871840007'
  },
  // 璁惧鏌ヨ杩囨护
  device: {
    // 鐢电綉璧勬簮鏌ヨ
    ids: [
      { devId: '10197', classId: 110, distribution: 1, provinceId: 'ff80808149f52e24014a039871840007' },
      { devId: '133403886', classId: 200, distribution: 1, provinceId: 'ff80808149f52e24014a039871840007' }
    ],
    locateId:
            '{"devId":"da00e9d6-5bde-4a4e-8975-eff2d00e3d3e","devType":"0200000","distribution":1,"provinceId":"ff80808149f52e24014a039871840007"}',
    dynamicRender: '{"110":["10230","10234"],"200":["100255259"]}',
    renderBounds: [
      [120.1619289646693, 31.613147889448626],
      [120.26799346408444, 31.655677320017233]
    ],
    feeder: { devId: '10DKX-341329', classId: 300, provinceId: 'ff80808149f52e24014a039871840007', distribution: 0 },
    transId: '650008239558001',
    outLineIds: '357000356901101',
    orgId: '700000',
    devCardId: '652323175448100',
    stationId: '650011510096501',
    relateSwitchs: '652221579508700',
    simulateSwitches: '650003389835901',
    feederForTower: '650003387691401',
    zones: ['62632a29-e2de-17bc-e053-0a8657155d6e2tm3nf'], // 浣庡帇鍙板尯ID
    feederIds: ['SBID0000001B9E4A1418D94489948781CD5407FF4D', 'SBID000000DB42085DCB3E4D90AF4AEA09435FD801'], // 杈撶數绾胯矾ID
    provinces: ['ff80808149f52e24014a039871840007'], // 鐪佺骇ID
    cities: ['ff8080814a616f0f014b38b062e0050e'], // 鍦板競ID
    countries: ['ff808081542d934101542e24b2c30001'], // 鍖哄幙ID
    maintCrews: ['ff8080814db36458014db89148050006'], // 缁存姢鐝粍ID,
    lineIds: ['10DKX-395601'], // 閰嶇數绾胯矾ID
    hideYPDevices: true, // 鏄惁闅愯棌钀ラ攢璁惧

    // 璁惧鏄剧ず杩囨护琛ㄥ崟榛樿鍊�
    devIdFilter: '10230,10234',
    voltageLevel: '500000,220000',
    runStatus: 1, // 杩愯鐘舵€�
    chargedState: 0, // 甯︾數鐘舵€�
    mannerDefault: 'type',
    levelDefault: [],
    propertyDefault: 'vlevel_code',
    ownershipCode: 1, // 鐢电綉璧勪骇

    // 璁惧灞炴€ч珮浜〃鍗曢粯璁ゅ€�
    highlightManner: 'id',
    propertyRender: '10230,10234,100255259',
    highlightColor: '#0060ff',
    otherColor: '#999999',
    hasflash: 1,
    feederId: '90150224',

    // 鏈嶅姟绔繃婊�
    serviceManner: 'filter',
    serviceLevel: '4',
    serviceDomain: '1',
    serviceFilterName: 'cities',

    lnglat: '119.04805,32.03709', // 缁忕含搴�

    // 璁惧鍚嶇О鏌ヨ
    keyword: '220',
    NameQueryOrgId: '',
    distribution: 1,

    // 璁惧 ID 鏌ヨ
    idQueryManner: 'bothends',

    // 绾胯矾鍜岃繍琛屾潌濉旀煡璇�
    lineId: '80116367',
    poles: '80158265,80158271,80158277'
  },
  space: {
    // 绌洪棿鍒嗘瀽 - 绌洪棿鏌ヨ
    rectangle: '[[119.5259089995932, 32.93433342834534],[119.41603, 32.74]]', // 鐭╁舰鍧愭爣
    polygon: '[[119.26388, 32.12946],[119.15631, 32.52946],[119.18388, 32.85984],[119.34397, 32.85857]]', // 澶氳竟褰㈠潗鏍�
    // 绌洪棿鍒嗘瀽 - 缂撳啿鍖烘煡璇�
    polyline: '[[119.34397,32.85857],[119.34709,32.86392], [119.36636,32.86221]]', // 绾垮潗鏍�

    // 鏌ヨ
    radius: '10000',
    distribution: 1
  },
  topology: {
    // 鎷撴墤鍒嗘瀽
    supplyRadiusDevice: '650008239306401', // 渚涚數鑼冨洿
    supplyRadiusFeederId: '652221827488500', // 渚涚數鍗婂緞 - 棣堢嚎
    supplyRadiusTransId: '650008239306401', // 渚涚數鍗婂緞 - 鍙板尯
    powerSource: '650008239306401', // 鐢垫簮
    electricStatus: '650008239306401', // 甯︾數鐘舵€�
    shortPathStart: '651220001069800', // 鏈€鐭矾寰� - 璧峰璁惧ID
    shortPathEnd: '651220001337700', // 鏈€鐭矾寰� - 缁堟璁惧ID

    devId: '14000124192657',
    devType: '0111',
    classIdsForShowResultPanel: [136, 137, 335, 431],
    classIdsForDefineAffectPSRType: [
      338, 436, 490, 306, 310, 311, 312, 321, 335, 339, 342, 343, 344, 349, 410, 411, 412, 421, 430, 431, 433, 434, 435, 437, 439,
      441, 442, 443, 444, 505, 506, 510, 511, 512, 521, 546, 556, 558, 567, 569, 571
    ]
  },
  // 鏌ヨ闈㈡澘鐨勮澶囩被鍨嬮€夐」
  devicesTypeDemo: [
    { code: '296', name: '鍙戠數鍘�' },
    { code: '110', name: '鍙樼數绔�' },
    { code: '200', name: '杈撶數绾胯矾' },
    // { code: '300', name: '閰嶇數绾胯矾鍒嗘敮' },
    { code: '300', name: '棣堢嚎' },
    { code: '335', name: '閰嶇數鍙板彉' },
    { code: '342', name: '鏌变笂寮€鍏�' },
    { code: '521', name: '浣庡帇钀界伀鐐�' }
  ],
  topologyDevicesTypeDemo: [
    { code: '335', name: '閰嶇數鍙板彉' },
    { code: '211', name: '閰嶇數鐢电紗娈�' },
    { code: '310', name: '閰嶇數鏋剁┖娈�' },
    { code: '511', name: '浣庡帇鐢电紗娈�' },
    { code: '510', name: '浣庡帇鏋剁┖娈�' },
    { code: '342', name: '鏌变笂寮€鍏�' },
    { code: '521', name: '浣庡帇钀界伀鐐�' }
  ],
  // 鐜姘旇薄
  environment: {
    typhoonid: '202114'
  },
  // 鑱氱被鍥惧眰
  layer: {
    center: [118.2, 24.5]
  },
  // 绠＄悊缃戞牸
  grid: {
    center: [105.90544679658711, 39.1171887995564],
    initOrgIds: ['8a812897493378a0014956770fd56660']
  },
  // 鍔ㄧ敾
  visualization: {
    // 鍔ㄧ敾
    speed: 5,
    color: '2',
    backgroundWidth: 1,
    backgroundColor: '#ffffff',
    lineLength: 40,
    lineWidth: 5
  }
}

const devicesDemo = pmsDevicesDemo
