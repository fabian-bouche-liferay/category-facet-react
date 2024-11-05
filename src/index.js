import React from 'react';
import ReactDOM from 'react-dom';

import '@clayui/css/lib/css/atlas.css';
import CategoryBrowser from './CategoryBrowser';
import "./CategoryBrowser.css";

import TaxonomyService from './services/TaxonomyService';

class CategoryBrowserWebComponent extends HTMLElement {

    /* For Local Testing */
    username = 'test@test.intra';
    password = 'test1234';
    authString = `${this.username}:${this.password}`;

    client = "category-browser-user-agent";

    baseURL = "http://localhost:8080";

    constructor() {
        super();
    }

    connectedCallback() {

        this.renderReactComponent();

    }

    renderReactComponent() {

        const spriteMap = window.Liferay ? window.Liferay.Icons.spritemap : "/icons.svg";

        ReactDOM.render(
            <>
                <CategoryBrowser
                    vocabularyId={this.getAttribute('vocabularyId')}
                    taxonomyService={new TaxonomyService(this.baseURL, this.authString, this.client)}
                    spriteMap={spriteMap}
                    namespace={Math.random().toString(36).slice(2, 7)}
                    selectedCategories={this.getAttribute('selectedCategories') ? this.getAttribute('selectedCategories') : ""}
                    categoryParam={this.getAttribute('categoryParam') ? this.getAttribute('categoryParam') : "category"}
                />                    
            </>,
            this
        );
    }

    disconnectedCallback() {
        ReactDOM.unmountComponentAtNode(this);
    }
}

const CATEGORY_BROWSER_ELEMENT_ID = 'category-browser';

if (!customElements.get(CATEGORY_BROWSER_ELEMENT_ID)) {
	customElements.define(CATEGORY_BROWSER_ELEMENT_ID, CategoryBrowserWebComponent);
}