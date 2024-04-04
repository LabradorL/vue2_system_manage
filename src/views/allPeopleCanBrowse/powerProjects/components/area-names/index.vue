<template>
  <div v-clickoutside="handleClickOutside" class="area-name-box">
    <div style="display: flex; align-items: center" @click="showCon">
      <span class="short-name">{{ initData["shortName"] }}</span>
      <i v-show="!isShow" class="el-icon-caret-bottom" />
      <i v-show="isShow" class="el-icon-caret-top" />
    </div>
    <!-- <div class="no-data" v-show="isShow && areaData.length === 0">暂无数据</div> -->
    <div v-show="isShow" class="content-box">
      <div :class="[isShow ? 'slideBottom' : 'slideTop']">
        <div
          v-if="initData['funcType'] != '05'"
          class="head-city"
          @click="back"
        >
          {{ initName }}
        </div>
        <div class="content-bottom">
          <div
            v-if="areaData[0] && areaData[0]['children']"
            class="content-inner"
          >
            <div v-for="(item, i) in areaData" :key="i" class="city-li">
              <div :id="item.id" class="city-l" @click="emitData(item)">
                {{ item.shortName }}
              </div>
              <div v-if="item.funcType === '04'" class="city-r">
                <span
                  v-for="(child, j) in item.children"
                  :id="child.id"
                  :key="j"
                  class="span-name-t"
                  @click="emitData(child)"
                >{{ child.shortName }}</span>
              </div>
              <div v-else class="city-r">
                <span
                  v-for="(child, j) in item.children"
                  :id="child.id"
                  :key="j"
                  class="span-name"
                  @click="emitData(child)"
                >{{ child.shortName }}</span>
              </div>
            </div>
          </div>
          <div v-else class="content-inner">
            <div v-for="(item, i) in areaData" :key="i" class="city-li">
              <div :id="item.orgId" class="city-l" @click="emitData(item)">
                {{ item.shortName }}
              </div>
              <div class="city-r" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Clickoutside from 'element-ui/src/utils/clickoutside.js'

export default {
  name: 'AreaNames',
  directives: {
    Clickoutside
  },
  props: {},
  data() {
    return {
      initName: '宁夏',
      initData: {
        shortName: '宁夏'
      },
      // 整个需要展示的组织机构
      areaData: [],
      // 当前选中的组织信息
      activeData: {},
      // 组织机构接口返回的信息
      fd: {},
      // 是否显示组织机构
      isShow: false
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  watch: {
    activeData: {
      handler: function(newVal, oldVal) {
        sessionStorage.setItem('activeOrg', JSON.stringify(newVal))
        this.$emit('activeArea', newVal)
      },
      deep: true,
      immediate: false
    }
  },
  created() {},
  mounted() {
    this.init()
  },
  beforeDestroy() {},
  methods: {
    // 点击其他地方收起组织机构
    handleClickOutside() {
      this.isShow = false
    },
    init() {
      // console.log("areaName----userInfo----" + JSON.stringify(this.userInfo));
      const param = {
        funcType: this.userInfo.funcType,
        parentId: this.userInfo.orgId
      }
      // this.getData(param)
      const res = {
        code: 200,
        message: '正确',
        data: {
          id: '46e5838467ee47970167f27a7fa600c6',
          parentId: '0',
          name: '国网宁夏电力公司',
          shortName: '宁夏',
          code: '640000',
          type: '02',
          lon: 106.278039,
          lat: 38.462941,
          children: [
            {
              id: '46e5838c6c2705aa016c274b0a36000d',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '银川供电公司',
              shortName: '银川',
              code: '640100',
              type: '03',
              lon: 106.319047,
              lat: 38.482612,
              children: [
                {
                  id: '46e5838c7196353b0171964a7f7f0045',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '滨河新区客户服务中心',
                  shortName: '滨河新区',
                  code: '370607',
                  type: '04',
                  lon: 106.518888,
                  lat: 38.380154,
                  children: [
                    {
                      id: '46e5838c71b590d00171b5db04510036',
                      parentId: '46e5838c7196353b0171964a7f7f0045',
                      name: '滨河新区配电运检班',
                      shortName: null,
                      code: '370650',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964b964a0049',
                      parentId: '46e5838c7196353b0171964a7f7f0045',
                      name: '月牙湖供电所',
                      shortName: null,
                      code: '370649',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964b3eb80047',
                      parentId: '46e5838c7196353b0171964a7f7f0045',
                      name: '金水园供电所',
                      shortName: null,
                      code: '370648',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b0171964514f10031',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '贺兰县供电公司',
                  shortName: '贺兰县',
                  code: '640122',
                  type: '04',
                  lon: 106.342892,
                  lat: 38.564305,
                  children: [
                    {
                      id: '46e5838c7196353b0171964995e50043',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '常信供电所',
                      shortName: null,
                      code: '370647',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196492d550041',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '立岗供电所',
                      shortName: null,
                      code: '370646',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719648c812003f',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '习岗供电所',
                      shortName: null,
                      code: '370645',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196485c0d003d',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '暖泉农场供电所',
                      shortName: null,
                      code: '370644',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964683f70037',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '金贵供电所',
                      shortName: null,
                      code: '370643',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964625290035',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '洪广供电所',
                      shortName: null,
                      code: '370642',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719645db750033',
                      parentId: '46e5838c7196353b0171964514f10031',
                      name: '贺兰配电运检一班',
                      shortName: null,
                      code: '370641',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b0171963f3dec001d',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '永宁县供电公司',
                  shortName: '永宁县',
                  code: '640121',
                  type: '04',
                  lon: 106.2625,
                  lat: 38.293002,
                  children: [
                    {
                      id: '46e5838c7196353b01719643fb41002f',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '杨河供电所',
                      shortName: null,
                      code: '370640',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719643a1ab002d',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '望远供电所',
                      shortName: null,
                      code: '370639',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196432b55002b',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '望洪供电所',
                      shortName: null,
                      code: '370638',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964297dc0029',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '通桥供电所',
                      shortName: null,
                      code: '370637',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196423fa20027',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '闽宁供电所',
                      shortName: null,
                      code: '370636',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964140fb0025',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '永宁李俊供电所',
                      shortName: null,
                      code: '370635',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719640f11a0023',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '胜利供电所',
                      shortName: null,
                      code: '370634',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719640a65a0021',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '永宁配电运检二班',
                      shortName: null,
                      code: '370633',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171964061eb001f',
                      parentId: '46e5838c7196353b0171963f3dec001d',
                      name: '永宁配电运检一班',
                      shortName: null,
                      code: '370632',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b0171963905840009',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '灵武市供电公司',
                  shortName: '灵武市',
                  code: '640181',
                  type: '04',
                  lon: 106.341462,
                  lat: 38.105367,
                  children: [
                    {
                      id: '46e5838c7196353b0171963e1643001a',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '农场供电所',
                      shortName: null,
                      code: '370631',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963da42b0018',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '梧桐树供电所',
                      shortName: null,
                      code: '370630',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963d5bf80016',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '马家滩供电所',
                      shortName: null,
                      code: '370629',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963cf68a0014',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '临河供电所',
                      shortName: null,
                      code: '370628',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963c4b740012',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '郝家桥供电所',
                      shortName: null,
                      code: '370627',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963bd5f80010',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '崇兴供电所',
                      shortName: null,
                      code: '370626',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963b6dc6000e',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '白土岗供电所',
                      shortName: null,
                      code: '370625',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171963adcec000c',
                      parentId: '46e5838c7196353b0171963905840009',
                      name: '灵武配电运检一班',
                      shortName: null,
                      code: '370624',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7195e1d70171960a84fb0267',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '西夏区供电公司',
                  shortName: '西夏区',
                  code: '640105',
                  type: '04',
                  lon: 106.129596,
                  lat: 38.491756,
                  children: [
                    {
                      id: '46e5838c7196839a01719a61d2d20133',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '镇北堡供电所',
                      shortName: null,
                      code: '370623',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a60f0ed012f',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '兴泾供电所',
                      shortName: null,
                      code: '370622',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5f975d0127',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '平吉堡供电所',
                      shortName: null,
                      code: '370621',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5eab130122',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '西夏区配电抢修一班',
                      shortName: null,
                      code: '370620',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5df159011e',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '农牧场供电所',
                      shortName: null,
                      code: '370619',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5d78c5011a',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '南梁供电所',
                      shortName: null,
                      code: '370618',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5d15240118',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '芦花供电所',
                      shortName: null,
                      code: '370617',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5c673d0114',
                      parentId: '46e5838c7195e1d70171960a84fb0267',
                      name: '黄羊滩供电所',
                      shortName: null,
                      code: '370616',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7195e1d7017196056ad00263',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '金凤区供电公司',
                  shortName: '金凤区',
                  code: '640106',
                  type: '04',
                  lon: 106.211834,
                  lat: 38.490215,
                  children: [
                    {
                      id: '46e5838c7196839a01719a6005f30129',
                      parentId: '46e5838c7195e1d7017196056ad00263',
                      name: '铁东供电所',
                      shortName: null,
                      code: '370615',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5e52c00120',
                      parentId: '46e5838c7195e1d7017196056ad00263',
                      name: '金凤区配电检修班',
                      shortName: null,
                      code: '370614',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5cc8d10116',
                      parentId: '46e5838c7195e1d7017196056ad00263',
                      name: '良田供电所',
                      shortName: null,
                      code: '370613',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5c01730112',
                      parentId: '46e5838c7195e1d7017196056ad00263',
                      name: '丰登供电所',
                      shortName: null,
                      code: '370612',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c718bef32017195c5700f009e',
                  parentId: '46e5838c6c2705aa016c274b0a36000d',
                  name: '兴庆区供电公司',
                  shortName: '兴庆区',
                  code: '640104',
                  type: '04',
                  lon: 106.28029,
                  lat: 38.469114,
                  children: [
                    {
                      id: '46e5838c7196839a01719a616d470131',
                      parentId: '46e5838c718bef32017195c5700f009e',
                      name: '掌政供电所',
                      shortName: null,
                      code: '370611',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a6064e2012b',
                      parentId: '46e5838c718bef32017195c5700f009e',
                      name: '通贵供电所',
                      shortName: null,
                      code: '370610',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5f02de0124',
                      parentId: '46e5838c718bef32017195c5700f009e',
                      name: '兴庆区配电运维班',
                      shortName: null,
                      code: '370609',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719a5b9f640110',
                      parentId: '46e5838c718bef32017195c5700f009e',
                      name: '大新供电所',
                      shortName: null,
                      code: '370608',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            },
            {
              id: '46e5838467ee47970167f29b07b500fa',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '吴忠供电公司',
              shortName: '吴忠',
              code: '640300',
              type: '03',
              lon: 106.24913,
              lat: 37.299249,
              children: [
                {
                  id: '46e5838c7196839a01719a7287180152',
                  parentId: '46e5838467ee47970167f29b07b500fa',
                  name: '利通区供电公司',
                  shortName: '利通区',
                  code: '640302',
                  type: '04',
                  lon: 106.215052,
                  lat: 37.980169,
                  children: [
                    {
                      id: '46e5838c71a9f9d70171aaffbd8c018d',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '孙家滩供电所',
                      shortName: null,
                      code: '370348',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c71a9f9d70171aa53337d00df',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '吴忠配电运维班',
                      shortName: null,
                      code: '370347',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c71a9f9d70171aa50f7f600db',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '吴忠电缆运检班',
                      shortName: null,
                      code: '370346',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba38621047b',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '扁担沟供电所',
                      shortName: null,
                      code: '370345',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba2bfce0479',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '东塔供电所',
                      shortName: null,
                      code: '370344',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba267a30477',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '金银滩供电所',
                      shortName: null,
                      code: '370343',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba207b80475',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '高闸供电所',
                      shortName: null,
                      code: '370342',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba1c7870473',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '利通农电古城供电所',
                      shortName: null,
                      code: '370341',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba17f42046f',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '金积供电所',
                      shortName: null,
                      code: '370340',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba10f13046d',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '板桥供电所',
                      shortName: null,
                      code: '370339',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba0c9ef046b',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '巴浪湖供电所',
                      shortName: null,
                      code: '370338',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719ba04d5a0469',
                      parentId: '46e5838c7196839a01719a7287180152',
                      name: '上桥供电所',
                      shortName: null,
                      code: '370337',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719a71c7200150',
                  parentId: '46e5838467ee47970167f29b07b500fa',
                  name: '同心供电公司',
                  shortName: '同心县',
                  code: '640324',
                  type: '04',
                  lon: 105.917181,
                  lat: 36.990608,
                  children: [
                    {
                      id: '46e5838c7196839a01719b9fd6f60467',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '窑山供电所',
                      shortName: null,
                      code: '370336',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9f79da0465',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '丁塘供电所',
                      shortName: null,
                      code: '370335',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9f27220463',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '预旺供电所',
                      shortName: null,
                      code: '370334',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9ea9780461',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '王团供电所',
                      shortName: null,
                      code: '370333',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9e4ade045f',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '河西供电所',
                      shortName: null,
                      code: '370332',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9e05b8045d',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '下马关供电所',
                      shortName: null,
                      code: '370331',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9db0e0045b',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '豫海供电所',
                      shortName: null,
                      code: '370330',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9d6c5c0459',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '石炭沟供电所',
                      shortName: null,
                      code: '370329',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9d084e0457',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '羊路供电所',
                      shortName: null,
                      code: '370328',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9cb6800455',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '韦州供电所',
                      shortName: null,
                      code: '370327',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9c2a2f0453',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '兴隆供电所',
                      shortName: null,
                      code: '370326',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9bd5520451',
                      parentId: '46e5838c7196839a01719a71c7200150',
                      name: '同心配电运维班',
                      shortName: null,
                      code: '370325',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719a713aa4014c',
                  parentId: '46e5838467ee47970167f29b07b500fa',
                  name: '红寺堡供电公司',
                  shortName: '红寺堡',
                  code: '640303',
                  type: '04',
                  lon: 106.067474,
                  lat: 37.424297,
                  children: [
                    {
                      id: '46e5838c71a9f9d70171aaf833cd017b',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '南川供电所',
                      shortName: null,
                      code: '370324',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c71a9f9d70171aae88e8f014b',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '红寺堡配电运维二班',
                      shortName: null,
                      code: '370323',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c71a9f9d70171aa6eebeb0117',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '红寺堡配电运维一班',
                      shortName: null,
                      code: '370322',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9af6b7044f',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '新庄集供电所',
                      shortName: null,
                      code: '370321',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9a8cc4044d',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '大河供电所',
                      shortName: null,
                      code: '370320',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9a448f044b',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '沙泉供电所',
                      shortName: null,
                      code: '370319',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b99f8f70449',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '城镇供电所',
                      shortName: null,
                      code: '370318',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b99a4250447',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '太阳山供电所',
                      shortName: null,
                      code: '370317',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9959c70445',
                      parentId: '46e5838c7196839a01719a713aa4014c',
                      name: '城网本部',
                      shortName: null,
                      code: '370316',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719a55902c0109',
                  parentId: '46e5838467ee47970167f29b07b500fa',
                  name: '青铜峡供电公司',
                  shortName: '青铜峡市',
                  code: '640381',
                  type: '04',
                  lon: 106.070678,
                  lat: 38.023367,
                  children: [
                    {
                      id: '46e5838c71a9f9d70171aa706de0011a',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '青铜峡配电运维一班',
                      shortName: null,
                      code: '370315',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b98ab220443',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '邵岗供电所',
                      shortName: null,
                      code: '370314',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9843a40441',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '大坝供电所',
                      shortName: null,
                      code: '370313',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b97e27a043f',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '连湖供电所',
                      shortName: null,
                      code: '370312',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9796b1043d',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '青铜峡城郊供电所',
                      shortName: null,
                      code: '370311',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b974e7d043b',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '叶盛供电所',
                      shortName: null,
                      code: '370310',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b96f3270439',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '峡口供电所',
                      shortName: null,
                      code: '370309',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b96932d0437',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '陈元滩供电所',
                      shortName: null,
                      code: '370308',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9631f40435',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '瞿靖供电所',
                      shortName: null,
                      code: '370307',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b94fbd70433',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '青镇供电所',
                      shortName: null,
                      code: '370306',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9496770431',
                      parentId: '46e5838c7196839a01719a55902c0109',
                      name: '青铜峡城网本部',
                      shortName: null,
                      code: '370305',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            },
            {
              id: '46e5838467ee47970167f29a3d0000f9',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '石嘴山供电公司',
              shortName: '石嘴山',
              code: '640200',
              type: '03',
              lon: 106.552102,
              lat: 38.97937,
              children: [
                {
                  id: '46e5838c7196839a01719b81e2bc03e3',
                  parentId: '46e5838467ee47970167f29a3d0000f9',
                  name: '红果子供电公司',
                  shortName: '红果子',
                  code: '370204',
                  type: '04',
                  lon: 106.719615,
                  lat: 39.133553,
                  children: [
                    {
                      id: '46e5838c719ffae70171a57ae09a0687',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '红果子配电运检班',
                      shortName: null,
                      code: '370231',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8cb49f0411',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '简泉供电所',
                      shortName: null,
                      code: '370230',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8c4f45040f',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '燕子墩供电所',
                      shortName: null,
                      code: '370229',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8be6f5040d',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '兰山供电所',
                      shortName: null,
                      code: '370228',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8b9f0d040b',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '庙台供电所',
                      shortName: null,
                      code: '370227',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8b4f150409',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '尾闸供电所',
                      shortName: null,
                      code: '370226',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8afbd60407',
                      parentId: '46e5838c7196839a01719b81e2bc03e3',
                      name: '园艺供电所',
                      shortName: null,
                      code: '370225',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719b814c9d03e1',
                  parentId: '46e5838467ee47970167f29a3d0000f9',
                  name: '大武口供电公司',
                  shortName: '大武口区',
                  code: '640202',
                  type: '04',
                  lon: 106.389536,
                  lat: 39.028283,
                  children: [
                    {
                      id: '46e5838c71a9f9d70171ab2ddf2e01d3',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '大武口配电运维班',
                      shortName: null,
                      code: '370224',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c71a9f9d70171ab0cf80701ad',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '大武口电缆运检班',
                      shortName: null,
                      code: '370223',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b853a3503eb',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '崇岗供电所',
                      shortName: null,
                      code: '370222',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b834c5803e9',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '长胜供电所',
                      shortName: null,
                      code: '370221',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b82e4fe03e7',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '隆湖供电所',
                      shortName: null,
                      code: '370220',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8279e303e5',
                      parentId: '46e5838c7196839a01719b814c9d03e1',
                      name: '沙湖供电所',
                      shortName: null,
                      code: '370219',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719b80cef003df',
                  parentId: '46e5838467ee47970167f29a3d0000f9',
                  name: '惠农供电公司',
                  shortName: '惠农',
                  code: '640205',
                  type: '04',
                  lon: 106.783229,
                  lat: 39.237095,
                  children: [
                    {
                      id: '46e5838c719ffae70171a54596c1064f',
                      parentId: '46e5838c7196839a01719b80cef003df',
                      name: '惠农配电运维班',
                      shortName: null,
                      code: '370218',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c719ffae70171a532c8180595',
                      parentId: '46e5838c7196839a01719b80cef003df',
                      name: '惠农电缆运检班',
                      shortName: null,
                      code: '370217',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719b804a7e03dd',
                  parentId: '46e5838467ee47970167f29a3d0000f9',
                  name: '平罗供电公司',
                  shortName: '平罗县',
                  code: '640221',
                  type: '04',
                  lon: 106.557934,
                  lat: 38.908078,
                  children: [
                    {
                      id: '46e5838c719ffae70171a53ae7ab05e1',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '平罗配电运维班',
                      shortName: null,
                      code: '370216',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8a3fe40404',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '红崖子供电所',
                      shortName: null,
                      code: '370215',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b89ca470402',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '陶乐供电所',
                      shortName: null,
                      code: '370214',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b896ed70400',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '高庄供电所',
                      shortName: null,
                      code: '370213',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b89183d03fe',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '黄渠桥供电所',
                      shortName: null,
                      code: '370212',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b88bc9803fc',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '宝丰供电所',
                      shortName: null,
                      code: '370211',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b884a7b03f8',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '灵沙供电所',
                      shortName: null,
                      code: '370210',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b87f79c03f6',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '头闸供电所',
                      shortName: null,
                      code: '370209',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b87a44b03f4',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '平罗渠口供电所',
                      shortName: null,
                      code: '370208',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b87553003f2',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '通伏供电所',
                      shortName: null,
                      code: '370207',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b86cce803f0',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '姚伏供电所',
                      shortName: null,
                      code: '370206',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b86143203ee',
                      parentId: '46e5838c7196839a01719b804a7e03dd',
                      name: '平罗城关供电所',
                      shortName: null,
                      code: '370205',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            },
            {
              id: '46e5838467ee47970167f29b465400fb',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '中卫供电公司',
              shortName: '中卫',
              code: '640500',
              type: '03',
              lon: 105.223687,
              lat: 37.126019,
              children: [
                {
                  id: '46e5838c7196353b017196621fc800a4',
                  parentId: '46e5838467ee47970167f29b465400fb',
                  name: '海兴县供电公司',
                  shortName: '海兴县',
                  code: '370404',
                  type: '04',
                  lon: 106.087668,
                  lat: 36.395747,
                  children: [
                    {
                      id: '46e5838c7196353b01719669a12d00bc',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '郑旗供电所',
                      shortName: null,
                      code: '370448',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719669002700b8',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '七营供电所',
                      shortName: null,
                      code: '370447',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719668a87500b6',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '李旺供电所',
                      shortName: null,
                      code: '370446',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196684cdd00b3',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '李俊供电所',
                      shortName: null,
                      code: '370445',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719667ef3700b0',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '九彩供电所',
                      shortName: null,
                      code: '370444',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719667772100ae',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '贾塘供电所',
                      shortName: null,
                      code: '370443',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719666f5c100ac',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '高崖供电所',
                      shortName: null,
                      code: '370442',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171966695bc00aa',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '甘城供电所',
                      shortName: null,
                      code: '370441',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196662d1800a8',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '三河供电所',
                      shortName: null,
                      code: '370440',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719665c47b00a6',
                      parentId: '46e5838c7196353b017196621fc800a4',
                      name: '海兴配电运检班',
                      shortName: null,
                      code: '370439',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b0171965ba37f008c',
                  parentId: '46e5838467ee47970167f29b465400fb',
                  name: '海原县供电公司',
                  shortName: '海原县',
                  code: '640522',
                  type: '04',
                  lon: 105.648833,
                  lat: 36.562526,
                  children: [
                    {
                      id: '46e5838c7196353b0171966163d800a2',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '曹洼供电所',
                      shortName: null,
                      code: '370438',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965f842f009e',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '红羊供电所',
                      shortName: null,
                      code: '370437',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965f2b70009c',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '关庄供电所',
                      shortName: null,
                      code: '370436',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965eb579009a',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '树台供电所',
                      shortName: null,
                      code: '370435',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965e5bb40098',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '兴仁供电所',
                      shortName: null,
                      code: '370434',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965deb3f0096',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '西安供电所',
                      shortName: null,
                      code: '370433',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965d83620094',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '关桥供电所',
                      shortName: null,
                      code: '370432',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965cfba00092',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '史店供电所',
                      shortName: null,
                      code: '370431',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965c8f770090',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '海城供电所',
                      shortName: null,
                      code: '370430',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965c0b7d008e',
                      parentId: '46e5838c7196353b0171965ba37f008c',
                      name: '海原配电运检班',
                      shortName: null,
                      code: '370429',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b01719654a077006c',
                  parentId: '46e5838467ee47970167f29b465400fb',
                  name: '中宁县供电公司',
                  shortName: '中宁县',
                  code: '640521',
                  type: '04',
                  lon: 105.688029,
                  lat: 37.49761,
                  children: [
                    {
                      id: '46e5838c719ffae70171a4ebb3a603f0',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '长山头农场供电所',
                      shortName: null,
                      code: '370428',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965ac545008a',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '喊叫水供电所',
                      shortName: null,
                      code: '370427',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965a46c30087',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '徐套供电所',
                      shortName: null,
                      code: '370426',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719659dee10085',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '长农供电所',
                      shortName: null,
                      code: '370425',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196596fed0083',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '大战场供电所',
                      shortName: null,
                      code: '370424',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965914bd0081',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '舟塔供电所',
                      shortName: null,
                      code: '370423',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196589574007f',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '新堡供电所',
                      shortName: null,
                      code: '370422',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196583f7e007d',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '恩和供电所',
                      shortName: null,
                      code: '370421',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719657da97007b',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '鸣沙供电所',
                      shortName: null,
                      code: '370420',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965772e80079',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '白马供电所',
                      shortName: null,
                      code: '370419',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965715ed0077',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '宁安供电所',
                      shortName: null,
                      code: '370418',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719656ca510075',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '余丁供电所',
                      shortName: null,
                      code: '370417',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b0171965633fd0073',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '石空供电所',
                      shortName: null,
                      code: '370416',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719655db7d0071',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '渠口供电所',
                      shortName: null,
                      code: '370415',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196551ce9006e',
                      parentId: '46e5838c7196353b01719654a077006c',
                      name: '中宁配电运检室',
                      shortName: null,
                      code: '370414',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196353b0171964f8ade0054',
                  parentId: '46e5838467ee47970167f29b465400fb',
                  name: '沙坡头区供电公司',
                  shortName: '沙坡头区',
                  code: '640502',
                  type: '04',
                  lon: 105.178939,
                  lat: 37.521821,
                  children: [
                    {
                      id: '46e5838d736ffecf017370105c190008',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '中卫输配运检室',
                      shortName: null,
                      code: '370413',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719653dcfd006a',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '东园供电所',
                      shortName: null,
                      code: '370412',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719653635c0068',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '永康供电所',
                      shortName: null,
                      code: '370411',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719652f57d0062',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '镇罗供电所',
                      shortName: null,
                      code: '370410',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196528f4f0060',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '柔远供电所',
                      shortName: null,
                      code: '370409',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196522c13005e',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '香山供电所',
                      shortName: null,
                      code: '370408',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719651d3b2005c',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '常乐供电所',
                      shortName: null,
                      code: '370407',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b01719650a16c005a',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '迎水供电所',
                      shortName: null,
                      code: '370406',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196353b017196502e8f0056',
                      parentId: '46e5838c7196353b0171964f8ade0054',
                      name: '宣和供电所',
                      shortName: null,
                      code: '370405',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            },
            {
              id: '46e5838467ee47970167f299fb6700f8',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '宁东供电公司',
              shortName: '宁东',
              code: '640600',
              type: '03',
              lon: 107.243611,
              lat: 37.710032,
              children: [
                {
                  id: '46e5838c719ffae70171a0c0ad470082',
                  parentId: '46e5838467ee47970167f299fb6700f8',
                  name: '灵州供电公司',
                  shortName: '灵州区',
                  code: '640622',
                  type: '04',
                  lon: 106.590159,
                  lat: 38.176186,
                  children: [
                    {
                      id: '46e5838c71a9f9d70171ab133f3501b2',
                      parentId: '46e5838c719ffae70171a0c0ad470082',
                      name: '宁东供电所',
                      shortName: null,
                      code: '370117',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c719ffae70171a0c2ba040088',
                      parentId: '46e5838c719ffae70171a0c0ad470082',
                      name: '灵州配电运检班',
                      shortName: null,
                      code: '370116',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c719ffae70171a0c1a6550086',
                      parentId: '46e5838c719ffae70171a0c0ad470082',
                      name: '灵州配电运维班',
                      shortName: null,
                      code: '370115',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719b8e5e4b0415',
                  parentId: '46e5838467ee47970167f299fb6700f8',
                  name: '盐池供电公司',
                  shortName: '盐池县',
                  code: '640621',
                  type: '04',
                  lon: 107.409539,
                  lat: 37.792588,
                  children: [
                    {
                      id: '46e5838c719ffae70171a0d3e9ec00b4',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '盐池配电运维班',
                      shortName: null,
                      code: '370114',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b937ab9042f',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '灵州供电所',
                      shortName: null,
                      code: '370113',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b930ccc042d',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '萌城供电所',
                      shortName: null,
                      code: '370112',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b92b80b042b',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '大水坑供电所',
                      shortName: null,
                      code: '370111',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9265de0429',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '冯记沟供电所',
                      shortName: null,
                      code: '370110',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b91dd560427',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '青山供电所',
                      shortName: null,
                      code: '370109',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b919b740423',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '麻黄山供电所',
                      shortName: null,
                      code: '370108',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b9139580421',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '惠安堡供电所',
                      shortName: null,
                      code: '370107',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b90d7b5041f',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '高沙窝供电所',
                      shortName: null,
                      code: '370106',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b909071041d',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '王乐井供电所',
                      shortName: null,
                      code: '370105',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8ffd86041b',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '柳杨堡供电所',
                      shortName: null,
                      code: '370104',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719b8f81cb0419',
                      parentId: '46e5838c7196839a01719b8e5e4b0415',
                      name: '花马池供电所',
                      shortName: null,
                      code: '370103',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            },
            {
              id: '46e5838467ee47970167f29c0f3000fc',
              parentId: '46e5838467ee47970167f27a7fa600c6',
              name: '固原供电公司',
              shortName: '固原',
              code: '640400',
              type: '03',
              lon: 106.24913,
              lat: 35.788969,
              children: [
                {
                  id: '46e5838c719ffae70171a57e82ec06a8',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '原州区供电公司',
                  shortName: '原州区',
                  code: '640402',
                  type: '04',
                  lon: 106.296993,
                  lat: 36.01195,
                  children: [
                    {
                      id: '46e5838c719ffae70171a57f2aca06aa',
                      parentId: '46e5838c719ffae70171a57e82ec06a8',
                      name: '固原配电运检班',
                      shortName: null,
                      code: '370560',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a0171970430d60036',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '三营供电公司',
                  shortName: '三营',
                  code: '370505',
                  type: '04',
                  lon: 106.169878,
                  lat: 36.282925,
                  children: [
                    {
                      id: '46e5838c7196839a0171971b313e009d',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '三营供电所',
                      shortName: null,
                      code: '370559',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971af513009b',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '炭山供电所',
                      shortName: null,
                      code: '370558',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971ab0250099',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '盐化工园区供电所',
                      shortName: null,
                      code: '370557',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971a40ff0097',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '张易供电所',
                      shortName: null,
                      code: '370556',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719719edd70095',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '彭堡供电所',
                      shortName: null,
                      code: '370555',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719719a4a30093',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '寨科供电所',
                      shortName: null,
                      code: '370554',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719718f6ea0091',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '清河供电所',
                      shortName: null,
                      code: '370553',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719718a3f8008f',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '河川供电所',
                      shortName: null,
                      code: '370552',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197185e18008d',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '中河供电所',
                      shortName: null,
                      code: '370551',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197181bec008b',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '黄铎堡供电所',
                      shortName: null,
                      code: '370550',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719717e0eb0089',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '官厅供电所',
                      shortName: null,
                      code: '370549',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197179d8f0087',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '头营供电所',
                      shortName: null,
                      code: '370548',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197174bc90085',
                      parentId: '46e5838c7196839a0171970430d60036',
                      name: '开城供电所',
                      shortName: null,
                      code: '370547',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719703c2780034',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '泾源供电公司',
                  shortName: '泾源县',
                  code: '640424',
                  type: '04',
                  lon: 106.346822,
                  lat: 35.494768,
                  children: [
                    {
                      id: '46e5838c7196839a017197139c9a006e',
                      parentId: '46e5838c7196839a01719703c2780034',
                      name: '泾河源供电所',
                      shortName: null,
                      code: '370546',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197135663006c',
                      parentId: '46e5838c7196839a01719703c2780034',
                      name: '新民供电所',
                      shortName: null,
                      code: '370545',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197130f6c006a',
                      parentId: '46e5838c7196839a01719703c2780034',
                      name: '香水供电所',
                      shortName: null,
                      code: '370544',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719712ac480068',
                      parentId: '46e5838c7196839a01719703c2780034',
                      name: '六盘山供电所',
                      shortName: null,
                      code: '370543',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719705d742003c',
                      parentId: '46e5838c7196839a01719703c2780034',
                      name: '泾源配电运维班',
                      shortName: null,
                      code: '370542',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a0171970372220030',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '隆德供电公司',
                  shortName: '隆德县',
                  code: '640423',
                  type: '04',
                  lon: 106.135792,
                  lat: 35.624497,
                  children: [
                    {
                      id: '46e5838c7196839a01719716eae70081',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '温堡供电所',
                      shortName: null,
                      code: '370541',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719716b5a7007f',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '隆德杨河供电所',
                      shortName: null,
                      code: '370540',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197167674007d',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '观庄供电所',
                      shortName: null,
                      code: '370539',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719716194f007b',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '神林供电所',
                      shortName: null,
                      code: '370538',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719715d7b80079',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '隆德城关供电所',
                      shortName: null,
                      code: '370537',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171970684910040',
                      parentId: '46e5838c7196839a0171970372220030',
                      name: '隆德配电运检班',
                      shortName: null,
                      code: '370536',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a01719702cf5f002e',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '西吉供电公司',
                  shortName: '西吉县',
                  code: '640422',
                  type: '04',
                  lon: 105.762224,
                  lat: 35.970849,
                  children: [
                    {
                      id: '46e5838c7196839a0171972105b300c3',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '什字供电所',
                      shortName: null,
                      code: '370535',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719720b51a00c1',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '马莲供电所',
                      shortName: null,
                      code: '370534',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171972067df00bf',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '西滩供电所',
                      shortName: null,
                      code: '370533',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719720156700bd',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '王民供电所',
                      shortName: null,
                      code: '370532',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971fa7f900bb',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '兴坪供电所',
                      shortName: null,
                      code: '370531',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971f337800b9',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '震湖供电所',
                      shortName: null,
                      code: '370530',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971ed55300b7',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '平峰供电所',
                      shortName: null,
                      code: '370529',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971e96be00b5',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '马建供电所',
                      shortName: null,
                      code: '370528',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971e4efa00b3',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '红耀供电所',
                      shortName: null,
                      code: '370527',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971e006600b1',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '沙沟供电所',
                      shortName: null,
                      code: '370526',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971dcd4800af',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '火石寨供电所',
                      shortName: null,
                      code: '370525',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971d8aa300ad',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '硝河供电所',
                      shortName: null,
                      code: '370524',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971d48e800ab',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '西吉兴隆供电所',
                      shortName: null,
                      code: '370523',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971d01e500a9',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '吉强供电所',
                      shortName: null,
                      code: '370522',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971cbdbe00a7',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '田坪供电所',
                      shortName: null,
                      code: '370521',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971c66e700a5',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '将台供电所',
                      shortName: null,
                      code: '370520',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971c288000a3',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '新营供电所',
                      shortName: null,
                      code: '370519',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971bf0d600a1',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '白崖供电所',
                      shortName: null,
                      code: '370518',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971bb7c4009f',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '偏城供电所',
                      shortName: null,
                      code: '370517',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719706d9f70042',
                      parentId: '46e5838c7196839a01719702cf5f002e',
                      name: '西吉配电运维班',
                      shortName: null,
                      code: '370516',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                },
                {
                  id: '46e5838c7196839a0171970278b0002c',
                  parentId: '46e5838467ee47970167f29c0f3000fc',
                  name: '彭阳供电公司',
                  shortName: '彭阳县',
                  code: '640425',
                  type: '04',
                  lon: 106.640115,
                  lat: 35.855259,
                  children: [
                    {
                      id: '46e5838c7196839a0171971223c60065',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '红河供电所',
                      shortName: null,
                      code: '370515',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719711e0400062',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '彭阳古城供电所',
                      shortName: null,
                      code: '370514',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719711a0060060',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '白阳供电所',
                      shortName: null,
                      code: '370513',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197114d19005e',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '王洼供电所',
                      shortName: null,
                      code: '370512',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197110752005c',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '孟塬供电所',
                      shortName: null,
                      code: '370511',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719710c01f005a',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '新集供电所',
                      shortName: null,
                      code: '370510',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a01719710793c0058',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '城阳供电所',
                      shortName: null,
                      code: '370509',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a0171971020110056',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '草庙供电所',
                      shortName: null,
                      code: '370508',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    },
                    {
                      id: '46e5838c7196839a017197062d53003e',
                      parentId: '46e5838c7196839a0171970278b0002c',
                      name: '彭阳配电运检班',
                      shortName: null,
                      code: '370507',
                      type: '05',
                      lon: null,
                      lat: null,
                      children: null
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
      this.$nextTick(() => {
        res.data.funcType === '02'
          ? this.initName = '全省'
          : res.data.funcType === '03'
            ? this.initName = '全市'
            : this.initName = '宁夏'
        this.initData = {
          orgId: res.data.orgId,
          lat: res.data.lat,
          lon: res.data.lon,
          shortName: res.data.shortName,
          funcType: res.data.funcType
        }
        if (!res.data.children) {
          this.areaData = []
          return
        }
        if (res.data.funcType === '04') {
          this.areaData = [res.data]
          sessionStorage.setItem('areaData', JSON.stringify([res.data]))
        } else {
          this.areaData = res.data.children
          sessionStorage.setItem('areaData', JSON.stringify(res.data.children))
        }
        // console.log(this.areaData)
        this.fd = res.data
      })
    },
    showCon() {
      this.isShow = !this.isShow
      // let arr = JSON.parse(sessionStorage.getItem('areaData'))
      const arr = this.areaData
      if (arr && arr !== 'undefined') {
        this.areaData = arr
      } else {
        const params = {
          orgId: this.userInfo.orgId,
          funcType: this.userInfo.funcType
        }
        this.getData(params)
      }
    },
    // 如果内存中没有,通过接口获取
    getData(params) {
      const url = '/faultanalysis/fault/getOrg'
      this.$axios.post(url, { params: params }).then((res) => {
        this.$nextTick(() => {
          res.data.funcType === '02'
            ? this.initName = '全省'
            : res.data.funcType === '03'
              ? this.initName = '全市'
              : this.initName = '宁夏'
          this.initData = {
            orgId: res.data.orgId,
            lat: res.data.lat,
            lon: res.data.lon,
            shortName: res.data.shortName,
            funcType: res.data.funcType
          }
          if (!res.data.children) {
            this.areaData = []
            return
          }
          if (res.data.funcType === '04') {
            this.areaData = [res.data]
            sessionStorage.setItem('areaData', JSON.stringify([res.data]))
          } else {
            this.areaData = res.data.children
            sessionStorage.setItem('areaData', JSON.stringify(res.data.children))
          }
          // console.log(this.areaData)
          this.fd = res.data
        })
      })
    },
    emitData(obj, type) {
      // console.log('emitData',obj);
      const elementsByClassName = document.getElementsByClassName('sgmap-popup')
      if (elementsByClassName) {
        for (let i = 0; i < elementsByClassName.length; i++) {
          elementsByClassName[i].remove()
        }
      }
      const ddd = document.getElementById(this.activeData.id)
      if (ddd) {
        ddd.style.color = ''
      }
      this.initData = obj
      this.activeData = obj
      if (document.getElementById(obj.id)) {
        document.getElementById(obj.id).style.color = 'chartreuse'
      }
      this.$nextTick(() => {
        this.isShow = false
      })
    },
    back() {
      const ddd = document.getElementById(this.activeData.orgId)
      if (ddd) {
        ddd.style.color = ''
      }
      this.initData = this.fd
      this.isShow = false
      this.$emit('activeArea', this.initData)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-icon-caret-bottom {
  color: #127edb;
}

.el-icon-caret-top {
  color: #127edb;
}

.area-name-box {
  position: relative;
  width: 100%;
  height: 100%;
  color: #fff;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #061427;
  box-shadow: inset 0px 0px 10px 0px rgba(54, 124, 255, 0.8);
  border: 1px solid;
  border-color: #187da3;
  border-radius: 4px;
}

.short-name {
  display: inline-block;
  width: 70px;
  color: #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 16px;
}

.no-data {
  position: absolute;
  top: 48px;
  left: 0;
  width: 200px;
  height: 40px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
  box-sizing: border-box;
  padding: 15px 13px;
  background-color: #0a1530;
  display: flex;
  justify-content: center;
  align-items: center;
}

.content-box {
  position: absolute;
  top: 48px;
  left: 0;
  width: 385px;
  min-height: 0;
  max-height: 380px;
  background: #071d41;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.08);
  border-radius: 7px;
  box-sizing: border-box;
  /*padding: 15px 13px;*/
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  padding: 16px 20px;
}

.content-bottom {
  // padding: 0 13px;
  position: relative;
  width: 100%;
}

.head-city {
  width: 100%;
  padding-bottom: 16px;
  color: #23c4fd;
  font-size: 14px;
  font-weight: bold;
  border-bottom: 1px solid;
  border-color: #06396b;
}

.city-li {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 10px 0;
}

::-webkit-scrollbar {
  width: 0;
}

.city-l {
  flex: 2;
  display: flex;
  flex-direction: column;
  color: #fff;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 700;
}

.city-r {
  flex: 7;
  display: flex;
  flex-wrap: wrap;
}

.span-name {
  // width: calc(100% / 3);
  margin-right: 20px;
  margin-bottom: 16px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: rgba(255, 255, 255, 0.8);
  -webkit-box-orient: vertical;
  font-size: 14px;
  font-family: Microsoft YaHei, Microsoft YaHei;
  font-weight: 400;
}
.span-name-t {
  font-size: 14px;
  width: calc(100% / 2);
  margin-bottom: 5px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  color: #ccd1da;
  -webkit-box-orient: vertical;
}

.span-name-t:hover {
  color: #23c4fd;
}

.span-name:hover {
  color: #23c4fd;
}

.slideBottom {
  -webkit-animation: slide-bottom 0.5s linear both;
  animation: slide-bottom 0.5s linear both;
  overflow: auto;
}

.slideTop {
  -webkit-animation: slide-top 0.5s linear both;
  animation: slide-top 0.5s linear both;
  overflow: auto;
}

@-webkit-keyframes slide-bottom {
  0% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
    height: 0;
  }
  100% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    height: 380px;
  }
}

@keyframes slide-top {
  0% {
    -webkit-transform: translateY(0);
    transform: translateY(0);
    height: 380px;
  }
  100% {
    -webkit-transform: translateY(-15px);
    transform: translateY(-15px);
    height: 0;
  }
}
</style>
