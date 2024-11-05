import ApiService from './ApiService';
import CacheUtil from '../util/CacheUtil';

class TaxonomyService {

    constructor(baseURL, authString, client) {
        this.baseURL = baseURL + "/o/headless-admin-taxonomy/v1.0";
        this.authString = authString;
        this.client = client;
    }

    getCategoriesByVocabularyId(vocabularyId) {

        let cachedResponse = CacheUtil.getSessionDataWithExpiry(vocabularyId);

        if(cachedResponse) {
            return Promise.resolve(cachedResponse);
        }

        return ApiService.makeCall(this.baseURL + "/taxonomy-vocabularies/" + vocabularyId + "/taxonomy-categories" + "/?fields=id%2Cname", this.authString, this.client, "GET").then(data => {
            
            let categories = data.items.map(item => ({
                id: item.id,
                name: item.name
            }));

            CacheUtil.setSessionDataWithExpiry(vocabularyId, categories, 60000);

            return categories;
        });

    }

    getCategoriesByParentCategoryId(parentCategoryId) {

        let cachedResponse = CacheUtil.getSessionDataWithExpiry(parentCategoryId);

        if(cachedResponse) {
            return Promise.resolve(cachedResponse);
        }

        return ApiService.makeCall(this.baseURL + "/taxonomy-categories/" + parentCategoryId + "/taxonomy-categories" + "/?fields=id%2Cname", this.authString, this.client, "GET").then(data => {

            let categories = data.items.map(item => ({
                id: item.id,
                name: item.name
            }));

            CacheUtil.setSessionDataWithExpiry(parentCategoryId, categories, 60000);

            return categories;
        });

    }

}

export default TaxonomyService;
