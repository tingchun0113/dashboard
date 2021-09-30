import { apiHelper } from "./../utils/helpers";

export default {
  getPrefix() {
    return apiHelper.get("/check/mitigate");
  },
  getBlacklisted() {
    return apiHelper.get("/check/blockip");
  },
  getSearchedIp({ ip }) {
    return apiHelper.get(`/check/blockip?ip=${ip}`);
  },
  uploadBlacklist({ blacklist }) {
    return apiHelper.post("/check/blockip", blacklist);
  },
  getCdnList() {
    return apiHelper.get("/cdnGrouplist");
  },
  getEmptySites({ client }) {
    return apiHelper.get(`/search/zerosite?d=${client}`);
  },
  getDomains({ client }) {
    return apiHelper.get(`/download?d=${client}`);
  },
  getSLBIpList({ client }) {
    return apiHelper.get(`/check/slb_ip_list?d=${client}`);
  },
  clearCache({ cdn, domain, key }) {
    return apiHelper.post("/clear_cache", { cdn, domain, key });
  },
  checkProtect() {
    return apiHelper.get("/check/protect");
  },
  searchSlbIp({ ip, domain }) {
    return apiHelper.post("/search/slb_ip", { ip, domain });
  },
  editSlbIp({ cookie, hostname, ip }) {
    return apiHelper.post("/edit/slb_ip", { cookie, hostname, ip });
  }
};
