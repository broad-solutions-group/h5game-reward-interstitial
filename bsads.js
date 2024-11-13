

window.googletag = window.googletag || { cmd: [] };
var googletag = window.googletag;

var bsads = {};
bsads.rewardSuccess = null;
bsads.rewardFail = null;
bsads.rewardSlot = null;
bsads.rewardPayLoad = null;

bsads.getRewardFlag = false;
bsads.initRewardFlag = false;

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
      console.error("rewardedSlotClosed fail")
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
      console.error("slotRenderEnded fail")
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
      // "/21880406607/ca-pub-4881399016139609-tag/01_test_getfreshgame.com_reward",
      "/22639388115/rewarded_web_example",
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
  // bsads.interSuccess = success;
  // bsads.interFail = fail;
  // googletag.cmd.push(function () {
  //   bsads.interSlot = googletag.defineOutOfPageSlot(
  //     "/21880406607/ca-pub-4881399016139609-tag/01_test_getfreshgame.com_inter",
  //     // "/22639388115/rewarded_web_example",
  //     googletag.enums.OutOfPageFormat.INTERSTITIAL
  //   )
  //   bsads.interSlot.addService(googletag.pubads());
  //   googletag.enableServices();
  //   googletag.display(bsads.rewardSlot);
  // });


  googletag.cmd.push(function () {
    bsads.interSlot = googletag.defineOutOfPageSlot(
      // '/21880406607/ca-pub-4881399016139609-tag/01_test_getfreshgame.com_inter',
      "/6355419/Travel/Europe/France/Paris",
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

// window.googletag = window.googletag || {cmd: []};
// googletag.cmd.push(function() {
// var slot = googletag.defineOutOfPageSlot('/21880406607/ca-pub-4881399016139609-tag/01_test_getfreshgame.com_inter',
// googletag.enums.OutOfPageFormat.INTERSTITIAL);
// // Slot returns null if the page or device does not support interstitials
// if (slot)slot.addService(googletag.pubads());
// googletag.enableServices();
// // Consider delaying until first div on page
// googletag.display(slot);
// });















window.bsads = bsads;

export var bsads;





