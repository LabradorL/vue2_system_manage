import dictOptions from "@/const/dicts/index";
import { selectDictLabel } from "@/const/dicts/index";
const noData = (data) => {
  if (data === 0) {
    return 0;
  } else if (data === "") {
    return "";
  } else if (data == null) {
    return 0;
  } else if (!data) {
    return "";
  } else {
    return data;
  }
};

const ifSubTitle = (data) => {
  if (data) {
    return `<div class="popup-con-head-sub-title" >
              <div>${data}停电</div>
            </div>`;
  }
  return "";
};

const ifEmpty = (data) => {
  if (data) {
    return "/" + data;
  }
  return "";
};

const staticHtml = {
  // 异常分析
  mapMalfunction: (option) => {
    let { name, orgName, abnormalType, startTime, abnormalDevice } = option;
    return `<div class='popup-con mark-malfunction-box'>
              <div class='mark-early-warning-head'>
                <span></span>
                <span class='text-overflow width68'>异常${
                  abnormalDevice == 1 ? "线路" : "配变"
                }：${name}</span>
                <span class='common-mark-type mark-early-type${
                  abnormalType * 1
                }'>${selectDictLabel(dictOptions.abnormalType,abnormalType)}<span>
              </div>
              <div class='mark-early-warning-body'>
                  <p class='mark-early-warning-bth' id='faultDiagnosis'>异常分析</p>
                  <p class='mark-early-warning-item'><span>单位名称：</span>${orgName}</p>
                  <p class='mark-early-warning-item'><span>开始时间：</span>${startTime}</p>
              </div>
          </div>`;
  },
};
export default staticHtml;
