import React, { useCallback, useEffect, useState } from 'react';
import { Provider, TreeView } from '@clayui/core';
import Icon from '@clayui/icon';
import { useTaxonomyData } from './hooks/useTaxonomyData';
import {ClayCheckbox as Checkbox} from '@clayui/form';

function CategoryBrowser(props) {

    const { categories, loadCategories } = useTaxonomyData(props.taxonomyService);

    const [selectedIds, setSelectedIds] = useState(props.selectedCategories.split(",").map(item => item.trim()));

    useEffect(() => {
        console.log("CATEGORIES");
        console.log(JSON.stringify(categories));
    }, [categories]);

    useEffect(() => {
        loadCategories(props.vocabularyId);
    }, [props]);

    const TYPES_TO_SYMBOLS = {
        document: "document-text",
        pdf: "document-pdf",
        success: "check-circle-full",
        warning: "warning-full"
    };

    const TYPES_TO_COLORS = {
        document: "text-primary",
        pdf: "text-danger",
        success: "text-success",
        warning: "text-warning"
    };

    const namespace = props.namespace;

    const handleSelectionChange = (nextSelectedIds) => {
        console.log(nextSelectedIds);
        setSelectedIds(Array.from(nextSelectedIds));

        // Get the current URL and its parameters
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        params.delete(props.categoryParam);

        nextSelectedIds.forEach(id => {
            params.append(props.categoryParam, id);
        });

        if(window.Liferay) {
            window.Liferay.Util.navigate(`${url.pathname}?${params.toString()}`);
        } else {
            window.history.replaceState(null, '', `${url.pathname}?${params.toString()}`);
        }
    }

    return (
        <>

            {categories && (

                <Provider spritemap={props.spriteMap}>
                    <TreeView
                        defaultItems={categories}
                        nestedKey="children"
                        onSelectionChange={handleSelectionChange}
                        expandOnCheck="true"
                        selectedKeys={new Set(selectedIds)}
                        selectionMode="multiple"
                    >
                        {item => (
                        <TreeView.Item>
                            <TreeView.ItemStack>
                                <Checkbox 
                                    aria-labelledby={getId(namespace, item.id)}
                                    containerProps={{className: 'mb-0'}}
                                    tabIndex={-1}                                
                                />
                                <span id={getId(namespace, item.id)}>
                                    {item.name}
						        </span>                                
                            </TreeView.ItemStack>
                            <TreeView.Group items={item.children}>
                                {({ name, id, type }) => (
                                    <TreeView.Item>
                                        <Checkbox 
                                            aria-labelledby={getId(namespace, id)}
                                            containerProps={{className: 'mb-0'}}
                                            tabIndex={-1}
                                        />
                                        <span id={getId(namespace, id)}>
                                            {name}
						                </span>
                                    </TreeView.Item>
                                )}
                            </TreeView.Group>
                        </TreeView.Item>
                        )}
                    </TreeView>
                </Provider>

            )}

        </>
    );

    function getId(namespace, key) {
        return `${namespace}-category-tree-${key}`;
    }

}

export default CategoryBrowser;