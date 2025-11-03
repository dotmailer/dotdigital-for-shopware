import Plugin from 'src/plugin-system/plugin.class';
import CookieStorage from 'src/helper/storage/cookie-storage.helper';
import { DotdigitalCookies } from '../cookies';
import '../dotdigital-tag.js';

export default class WbtPlugin extends Plugin {
    static options = {
        /**
         * Region
         * @type string
         */
        regionId: '1',
        /**
         * Web behavior tracking profile ID
         * @type string
         */
        profileId: '',
        /**
         * Product data (only product pages)
         * @type {Object}
         */
        productData: {},
        /**
         * Dotdigital cookie name
         * @type string
         */
        ddEnabledCookie: DotdigitalCookies.GOVERNOR,
    };

    init() {
        const { regionId, profileId, productData, ddEnabledCookie } = this.options;
        const ddTrackingEnabled = CookieStorage.getItem(ddEnabledCookie);
        if (ddTrackingEnabled) {
            window.ddg.init(regionId, profileId);

            if (productData && Object.keys(productData).length > 0) {
                window.ddg.productBrowse(productData);
            }
        }
    }
}