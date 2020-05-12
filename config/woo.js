import WooCommerceRestApi from '@woocommerce/woocommerce-rest-api';

const woo = new WooCommerceRestApi({
    url: "https://dev-topstore.pantheonsite.io/",
    consumerKey: "ck_585f4a010018c5f8df53c6cb36d4dedcb83663ba",
    consumerSecret: "cs_c581aa162f7857daa7bda08ba35eca19821dac0d",
    version: "wc/v3",
    wpApi: true
})

export default woo