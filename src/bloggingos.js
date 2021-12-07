const axios = require('axios');
const { JSDOM } = require('jsdom');

const getWebsiteUrl = (url) => `https://bloggingos.com/tools/domain/${url}`

async function getInfo(url) {
    const websiteUrl = getWebsiteUrl(url);
    const { data } = await axios.get(websiteUrl);

    // console.log(data);
    const dom = new JSDOM(data);
    const getElement = (selector) => dom.window.document.querySelector(selector).textContent.trim();

    const title = getElement('#seoBox1 div .msgBox').replace('SEO Checker', 'SEO Audit Report by Ritik');
    const metaDesc = getElement('#seoBox2 div .bottom10').replace('SEO Checker', 'SEO Audit Report by Ritik');
    const URL = url;
    const altAttr = getElement('#seoBox6 div .msgBox').replace('web page', 'web page \n').replace('Show More  \n', '').replace('Show Less', '');

    const h1 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(1)');
    const h2 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(2)');
    const h3 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(3)');
    const h4 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(4)');
    const h5 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(5)');
    const h6 = getElement('#seoBox4 div .msgBox table tbody tr td:nth-child(6)');
    const headings = {h1, h2, h3, h4, h5, h6}
    console.log(headings);

    const textHtmlRatio = getElement('#seoBox9 div .msgBox b').replace('%', '');
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

    // Domain Registration Information
    const age = getElement('#seoBox21 div .msgBox div p:nth-child(1)');
    const createdAt = getElement('#seoBox21 div .msgBox div p:nth-child(2)');
    const updatedAt = getElement('#seoBox21 div .msgBox div p:nth-child(3)');
    const expiryDate = getElement('#seoBox21 div .msgBox div p:nth-child(4)');
    const domainRegistration = {age, createdAt, updatedAt, expiryDate}

    const mobileFriendliness = getElement('#seoBox23 div .msgBox');
    const favicon = getElement('#seoBox27 div .msgBox');
    const custome404Page = getElement('#seoBox28 div .msgBox');
    const pageSize = getElement('#seoBox29 div .msgBox').replace('KB (World Wide Web average is 320 Kb)', '');

    const loadTime = getElement('#seoBox30 div .msgBox').replace('second(s)', '');
    const language = getElement('#seoBox31 div .msgBox').replace('languageDeclared', 'language. Declared');
    const emailPrivacy = getElement('#seoBox34 div .msgBox');
    const safeBrowsing = getElement('#seoBox35 div .msgBox');

    const serverIp = getElement('#seoBox36 div .msgBox table tbody tr:nth-child(2) td:nth-child(1)');
    const serverLocation = getElement('#seoBox36 div .msgBox table tbody tr:nth-child(2) td:nth-child(2)');
    const serverProvider = getElement('#seoBox36 div .msgBox table tbody tr:nth-child(2) td:nth-child(3)');

    const serverDetails = { serverIp, serverLocation, serverProvider}

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
        headings,
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
        serverDetails,
        analytics,
        w3cValidate,
        docType,
        encoding,
        trafficBasedRank        
    }
    console.log(auditResult);
    return auditResult;
}

getInfo('youtube.com')
module.exports = getInfo;

