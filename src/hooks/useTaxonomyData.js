import { useState, useCallback } from 'react';

export const useTaxonomyData = (taxonomyService) => {
    const [categories, setCategories] = useState(null);

    const buildCategoryTree = useCallback(async (parentCategoryId) => {
        // Fetch categories based on the parent ID (null for root level)
        const categories = await taxonomyService.getCategoriesByParentCategoryId(parentCategoryId);

        // If there are categories, map through each one to add children recursively
        return Promise.all(categories.map(async (category) => {
            const children = await buildCategoryTree(category.id);
            return { ...category, children };
        }));
    }, [taxonomyService]);

    const loadCategories = useCallback(async (vocabularyId) => {
        // Start by fetching top-level categories based on vocabulary ID
        const rootCategories = await taxonomyService.getCategoriesByVocabularyId(vocabularyId);

        // Recursively build the category tree for each top-level category
        const categoryTree = await Promise.all(rootCategories.map(async (category) => {
            const children = await buildCategoryTree(category.id);
            return { ...category, children };
        }));

        // Once the full tree is built, update the state
        setCategories(categoryTree);
    }, [taxonomyService, buildCategoryTree]);

    return { categories, loadCategories };
};
