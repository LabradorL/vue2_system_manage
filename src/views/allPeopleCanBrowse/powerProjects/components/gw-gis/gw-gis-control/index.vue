<template>
    <div class="map-control">
        <div class="item item-text" @click="zoomIn">
            <el-tooltip popper-class="set-tooltip" effect="dark" placement="right">
                <div slot="content">图层放大</div>
                <span class="zoom-text">+</span>
            </el-tooltip>
        </div>
        <div class="item item-text" @click="zoomOut">
            <el-tooltip popper-class="set-tooltip" effect="dark" placement="right">
                <div slot="content">图层缩小</div>
                <span class="zoom-text">-</span>
            </el-tooltip>
        </div>
        <div class="item item-icon" v-show="!isShow" @click="isShowVec">
            <el-tooltip popper-class="set-tooltip" effect="dark" placement="right">
                <div slot="content">显示矢量图层</div>
                <span class="show-icon"><img src="../images/open-eye.png" alt=""></span>
            </el-tooltip>
        </div>
        <div class="item item-icon" v-show="isShow" @click="isShowVec">
            <el-tooltip popper-class="set-tooltip" effect="dark" placement="right">
                <div slot="content">隐藏矢量图层</div>
                <span class="hide-icon"><img src="../images/open-eye.png" alt=""></span>
            </el-tooltip>
        </div>

        <div class="item item-icon item-style" @mouseover="styleChange=true" @mouseleave="styleChange=false"
             :style="{width:  styleWidth}">
            <div class="item-style-sub">
                <el-tooltip popper-class="set-tooltip" effect="dark" placement="bottom">
                    <div slot="content">{{ styleItem.value }}</div>
                    <span class="show-icon">{{ styleItem.value.substring(0, 1) }}</span>
                </el-tooltip>
            </div>
            <div class="item-style-sub" @click="handleStyleClick(item)" v-show="styleChange"
                 v-for="(item ,index) in styleList.filter(data=>data.key!==styleItem.key)" :key="index">
                <el-tooltip popper-class="set-tooltip" effect="dark" placement="bottom">
                    <div slot="content">{{ item.value }}</div>
                    <span class="show-icon">{{ item.value.substring(0, 1) }}</span>
                </el-tooltip>
            </div>

        </div>

    </div>
</template>

<script>

export default {
    name: "gwGisControl",
    data () {
        return {
            isShow: true,
            styleList: [
                {key: 'StreetsDark', value: '夜景深色底图'},
                // {key: 'Streets', value: '标准底图'},
                {key: 'Satellite512', value: '影像图层'},
                {key: 'StreetsLight', value: '浅色背景底图'},
                // {key: 'Road', value: '路网图层'},
            ],
            styleItem: null,
            styleChange: false
        }
    },
    computed: {
        styleWidth: function () {
            if (!this.styleChange) {
                return '32px';
            } else {
                return (32 * this.styleList.length) + 'px'
            }
        }
    },
    created () {
        let itemStyle = sessionStorage.getItem("gis-style-key")
        let index = 0;
        if (itemStyle) {
            index = this.styleList.findIndex(d => d.key === itemStyle)
        }
        this.styleItem = JSON.parse(JSON.stringify(this.styleList[index]));
    },
    methods: {
        handleStyleClick (item) {
            this.styleItem = item;
            sessionStorage.setItem("gis-style-key", item.key)
            this.$emit('styleChange', item.key)
        },

        isShowVec () {
            this.isShow = !this.isShow;
            this.$emit('isShowVec', this.isShow)
        },
        zoomIn () {
            this.$emit('zoomIn')
        },
        zoomOut () {
            this.$emit('zoomOut')
        },
    }
}
</script>
<style lang="scss" scoped>

.el-tooltip__popper.set-tooltip {
    margin-left: 20px;
    padding: 5px 9px !important;
}

.el-tooltip__popper.set-tooltip .popper__arrow {
    top: 25% !important;
}

.map-control {
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);

    .item {
        width: 32px;
        height: 32px;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid var(--controlBorder);
        cursor: pointer;
        background-color: var(--panelBgColor);

        &:nth-child(2) {
            border-top: none;
        }
    }

    .item-text {
        .zoom-text {
            color: var(--cityColor);
            font-size: 26px;
            font-weight: 500;
        }
    }

    .item-icon {
        margin-top: 5px;
    }

    .item-style {
        justify-content: start;

        .item-style-sub {
            width: 32px;
            display: flex;
            justify-content: center;
            color: #23C4FD;
            font-size: 12px;
        }
    }
}
</style>