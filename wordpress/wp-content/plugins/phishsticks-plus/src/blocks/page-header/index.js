import { registerBlockType } from '@wordpress/blocks';
import {
    RichText, useBlockProps, InspectorControls
} from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import { PanelBody, ToggleControl } from '@wordpress/components'
import block from './block.json';
import './main.css';
import icons from '../../icons.js';

registerBlockType(block.name, {
    icon: icons.primary,
    edit({ attributes, setAttributes }) {
        const { content, showCategory } = attributes;
        const blockProps = useBlockProps();
        const style = {
            "": ""
        }

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('General', 'phishsticks-plus')}>
                        <ToggleControl
                            label={__('Show Category', 'phishsticks-plus')}
                            checked={showCategory}
                            onChange={showCategory => setAttributes({ showCategory })}
                            help={
                                showCategory
                                    ?
                                        __( 'Render the page category instead of a custom prompt', 'phishsticks-plus')
                                    :
                                        __( 'Render a custom prompt instead of the page category', 'phishsticks-plus')
                        }
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <div className="inner-page-header">
                        {
                            showCategory
                                ?
                                    <h1>{__('Category: Some Category', 'phishsticks-plus')}</h1>
                                :
                                    <RichText
                                        style={style}
                                        tagName="h1"
                                        placeholder={__('Enter Heading', 'phishsticks-plus')}
                                        value={content}
                                        onChange={content => setAttributes({ content }) }
                                        allowedFormats={['core/bold', 'core/italic']}
                                    />
                        }
                    </div>
                </div>
            </>
        )
    },
})