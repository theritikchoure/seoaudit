const axios = require('axios');
const { JSDOM } = require('jsdom');

const getWebsiteUrl = (url) => `https://bloggingos.com/tools/domain/${url}`

async function getInfo(url) {
    const websiteUrl = getWebsiteUrl(url);
    const { data } = await axios.get(websiteUrl);

    // console.log(data);
    const dom = new JSDOM(data);
    const getElement = (selector) => dom.window.document.querySelector(selector).textContent.trim();

    const previewImageURL = await dom.window.document.querySelector('#screenshotData div').getAttribute('class');
    
    console.log(previewImageURL)
    //#screenshotData > img

    const title = getElement('#seoBox1 div .msgBox').replace('SEO Checker', 'SEO Audit Report by Ritik');
    const metaDesc = getElement('#seoBox2 div .bottom10').replace('SEO Checker', 'SEO Audit Report by Ritik');
    const URL = getElement('#seoBox26 div .msgBox').replace('comLength', 'com Length');
    const altAttr = getElement('#seoBox6 div .msgBox').replace('Show More  \n', '').replace('Show Less', '');

    const textHtmlRatio = getElement('#seoBox9 div .msgBox');
    const gzipCompression = getElement('#seoBox10 div .msgBox');
    const wwwResolve = getElement('#seoBox11 div .msgBox');
    const ipCanonicalization = getElement('#seoBox12 div .msgBox');

    const brokenLink = getElement('#seoBox14 div .msgBox');
    const xmlSitemap = getElement('#seoBox15 div .msgBox').replace('file!http', 'file. http').replace(' Show Less', '');
    const robotsTxt = getElement('#seoBox16 div .msgBox').replace('file!http', 'file. http').replace(' Show Less', '');
    const urlRewrite = getElement('#seoBox17 div .msgBox');

    const underscoresInUrl = getElement('#seoBox18 div .msgBox');
    const embeddedObjects = getElement('#seoBox19 div .msgBox');
    const iFrame = getElement('#seoBox20 div .msgBox');
    const domainRegistration = getElement('#seoBox21 div .msgBox div');

    const mobileFriendliness = getElement('#seoBox23 div .msgBox');
    const favicon = getElement('#seoBox27 div .msgBox');
    const custome404Page = getElement('#seoBox28 div .msgBox');
    const pageSize = getElement('#seoBox29 div .msgBox');

    const loadTime = getElement('#seoBox30 div .msgBox');
    const language = getElement('#seoBox31 div .msgBox');
    const emailPrivacy = getElement('#seoBox34 div .msgBox');
    const safeBrowsing = getElement('#seoBox35 div .msgBox');

    const serverIp = getElement('#seoBox36 div .msgBox table tbody');
    const analytics = getElement('#seoBox38 div .msgBox');
    const w3cValidate = getElement('#seoBox39 div .msgBox');
    const docType = getElement('#seoBox40 div .msgBox');

    const encoding = getElement('#seoBox41 div .msgBox');
    const trafficBasedRank = getElement('#seoBox46 div .msgBox');

    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const reportGenerationTime = today.toDateString() + ', ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(); 

//----------------------------------------------------------------------------------------------------------------------------
    // RESULT
    const auditResult = {
        title,
        metaDesc,
        URL,
        reportGenerationTime,
        altAttr,
        textHtmlRatio,
        gzipCompression,
        wwwResolve,
        ipCanonicalization,
        brokenLink,
        xmlSitemap,
        robotsTxt,
        urlRewrite,
        underscoresInUrl,
        embeddedObjects,
        iFrame,
        domainRegistration,
        mobileFriendliness,
        favicon,
        custome404Page,
        pageSize,
        loadTime,
        language,
        emailPrivacy,
        safeBrowsing,
        serverIp,
        analytics,
        w3cValidate,
        docType,
        encoding,
        trafficBasedRank        
    }
    // console.log(auditResult);
    // return auditResult;
}

getInfo('google.com')
module.exports = getInfo;

