

window.googletag = window.googletag || { cmd: [] };
var googletag = window.googletag;

var bsads = {};
bsads.rewardSuccess = null;
bsads.rewardFail = null;
bsads.rewardSlot = null;
bsads.rewardPayLoad = null;

bsads.getRewardFlag = false;
bsads.initRewardFlag = false;

bsads.adUnitId = "/22639388115/rewarded_web_example";

bsads.initReward = function () {
  googletag.pubads().enableSingleRequest();

  googletag.pubads().addEventListener("rewardedSlotReady", (event) => {
    console.warn("rewardedSlotReady", bsads.rewardSlot, bsads.rewardPayLoad);
    bsads.getRewardFlag = false;
    bsads.rewardPayLoad = null;
    event.makeRewardedVisible();
  });
  googletag.pubads().addEventListener("rewardedSlotClosed", () => {
    console.warn("rewardedSlotClosed", bsads.rewardSlot, bsads.rewardPayLoad);
    if (bsads.rewardPayLoad && !bsads.getRewardFlag) {
      if (bsads.rewardSuccess) {
        bsads.rewardSuccess();
      }
      bsads.getRewardFlag = false;
      bsads.rewardPayLoad = null;
    } else {
      if (bsads.rewardFail) {
        bsads.rewardFail();
      }
      console.warn("rewardedSlotClosed fail")
    }
    if (bsads.rewardSlot) {
      googletag.destroySlots([bsads.rewardSlot]);
      bsads.rewardSlot = null;
    }
  });

  googletag.pubads().addEventListener("rewardedSlotGranted", (event) => {
    console.warn("rewardedSlotGranted", bsads.rewardSlot, bsads.rewardPayLoad);
    bsads.rewardPayLoad = event.payload;
    if (bsads.rewardSuccess) {
      bsads.rewardSuccess();
      bsads.getRewardFlag = true;
    }
  });

  googletag.pubads().addEventListener("slotRenderEnded", (event) => {
    console.warn("slotRenderEnded", bsads.rewardSlot, bsads.rewardPayLoad);
    if (event.slot === bsads.rewardSlot && event.isEmpty) {
      if (bsads.rewardFail) {
        bsads.rewardFail();
      }
      console.warn("slotRenderEnded fail")
    }
  });
}

bsads.showVideo = function (success, fail) {
  if (!bsads.initRewardFlag) {
    bsads.initReward();
    bsads.initRewardFlag = true;
  }
  googletag.pubads().collapseEmptyDivs();
  if (bsads.rewardSlot) {
    googletag.destroySlots([bsads.rewardSlot]);
    bsads.rewardSlot = null;
  }
  bsads.rewardSuccess = success;
  bsads.rewardFail = fail;
  googletag.cmd.push(function () {
    bsads.rewardSlot = googletag.defineOutOfPageSlot(
      bsads.adUnitId,
      googletag.enums.OutOfPageFormat.REWARDED
    )
    bsads.rewardSlot.addService(googletag.pubads());
    googletag.enableServices();
    googletag.display(bsads.rewardSlot);
  });
}

bsads.initInter = function () {

}

bsads.showInter = function () {
  googletag.pubads().collapseEmptyDivs();
  if (bsads.interSlot) {
    googletag.destroySlots([bsads.interSlot]);
    bsads.interSlot = null;
  }

  googletag.cmd.push(function () {
    bsads.interSlot = googletag.defineOutOfPageSlot(
      bsads.adUnitId,
      googletag.enums.OutOfPageFormat.INTERSTITIAL);
    
    if ( bsads.interSlot) 
    {
      bsads.interSlot.addService(googletag.pubads()).setConfig({
        interstitial: {
          triggers: {
            navBar: true,
            unhideWindow: true,
          },
        },
      });
      googletag.enableServices();
      googletag.display(bsads.interSlot);
    }
  });
}

window.bsads = bsads;





