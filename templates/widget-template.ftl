<@liferay_ui["panel-container"]
	extended=true
	id="${namespace + 'facetAssetCategoriesPanelContainer'}"
	markupView="lexicon"
	persistState=true
>
	<#assign vocabularyNames = assetCategoriesSearchFacetDisplayContext.getVocabularyNames()![] />

	<@liferay_ui.panel
		collapsible=true
		cssClass="search-facet search-facet-display-vocabulary"
		id="${namespace + 'facetAssetCategoriesPanel'}"
		markupView="lexicon"
		persistState=true
		title="${(vocabularyNames?size == 1)?then(vocabularyNames[0]!'', 'category')}"
	>
		<#if !assetCategoriesSearchFacetDisplayContext.isNothingSelected()>
			<@clay.button
				cssClass="btn-unstyled c-mb-4 facet-clear-btn"
				displayType="link"
				id="${namespace + 'facetAssetCategoriesClear'}"
				onClick="Liferay.Search.FacetUtil.clearSelections(event);"
			>
				<strong>${languageUtil.get(locale, "clear")}</strong>
			</@clay.button>
		</#if>

		<#if vocabularies?has_content>
			<ul class="treeview treeview-light treeview-nested treeview-vocabulary-display" role="tree">
				<#list vocabularies as vocabulary>
					<#if vocabularyNames?seq_contains(vocabulary.name)>
							<#if entries?has_content>
								<#assign selectedCategoryIds="${assetCategoriesSearchFacetDisplayContext.parameterValues?join(',')}" />
							</#if>
							<#if assetCategoriesSearchFacetDisplayContext?has_content>
								<#assign categoryParam="${assetCategoriesSearchFacetDisplayContext.parameterName}" />
							</#if>
							<category-browser 
									vocabularyId="${vocabulary.id}"
									categoryParam="${categoryParam}"
									namespace="${namespace + vocabulary.name}"
									selectedCategories="${selectedCategoryIds}">        
      				</category-browser>
					</#if>
				</#list>
			</ul>
		</#if>
	</@>
</@>