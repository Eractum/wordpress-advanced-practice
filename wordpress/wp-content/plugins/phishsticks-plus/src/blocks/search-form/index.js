import { registerBlockType } from '@wordpress/blocks';
import {
    PanelColorSettings, useBlockProps, InspectorControls
} from '@wordpress/block-editor';
import { __ } from "@wordpress/i18n";
import { PanelBody, ColorPalette } from '@wordpress/components'
import block from './block.json';
import './main.css';
import icons from '../../icons.js';

registerBlockType(block.name, {
    icon: icons.primary,
    edit({ attributes, setAttributes }) {
        const { bgColor, textColor } = attributes
        const blockProps = useBlockProps();

        const style = {
            "background-color": bgColor,
            "color": textColor
        }

        return (
            <>
                <InspectorControls>
                    <PanelColorSettings
                        colorSettings={[
                            {
                                label: __('Background Color', 'phishsticks-plus'),
                                value: bgColor,
                                onChange: newValue => setAttributes({ bgColor: newValue })
                            },
                            {
                                label: __('Text Color', 'phishsticks-plus'),
                                value: textColor,
                                onChange: newValue => setAttributes({ textColor: newValue })
                            }
                        ]}
                    />
                </InspectorControls>
                <div {...blockProps} style={style}>
                    <h1>Search: Your search term here</h1>
                    <form>
                        <input type="text" placeholder="Search" />
                        <div className="btn-wrapper">
                            <button style={style} type="submit">Search</button>
                        </div>
                    </form>
                </div>
            </>
        )
    }/*,
    save({ attributes }) {
        const { bgColor, textColor } = attributes
        const blockProps = useBlockProps.save({
            style: {
                "background-color": bgColor,
                "color": textColor
            }
        });

        const style = {
            "background-color": bgColor,
            "color": textColor
        }

        return (
            <div {...blockProps}>
                <h1>Search: Your search term here</h1>
                <form>
                    <input type="text" placeholder="Search" />
                    <div className="btn-wrapper">
                        <button style={style} type="submit">Search</button>
                    </div>
                </form>
            </div>
        )
    }*/
})