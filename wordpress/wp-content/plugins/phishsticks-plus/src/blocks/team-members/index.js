import { registerBlockType } from '@wordpress/blocks';
import {
    useBlockProps, InspectorControls, InnerBlocks
} from '@wordpress/block-editor';
import {
    PanelBody, RangeControl, SelectControl
} from '@wordpress/components'
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js';
import './main.css';

registerBlockType('phishsticks-plus/team-members-group', {
    icon: {
        src: icons.primary
    },
    edit({ attributes, setAttributes }) {
        const { columns, imageShape } = attributes;
        const blockProps = useBlockProps({
            className: `cols-${columns}`
        });

        return (
            <>
                <InspectorControls>
                    <PanelBody title={__('Settings', 'phishsticks-plus')}>
                        <RangeControl
                            label={__('Columns', 'phishsticks-plus')}
                            onChange={columns => setAttributes({columns})}
                            value={columns}
                            min={2}
                            max={4}
                        />
                        <SelectControl
                            label={__('Image Shape', 'phishsticks-plus')}
                            value={ imageShape }
                            options={[
                                { label: __('Hexagon', 'phishsticks-plus'), value: 'hexagon' },
                                { label: __('Rabbet', 'phishsticks-plus'), value: 'rabbet' },
                                { label: __('Pentagon', 'phishsticks-plus'), value: 'pentagon' },
                            ]}
                            onChange={imageShape => setAttributes({ imageShape })}
                        />
                    </PanelBody>
                </InspectorControls>
                <div {...blockProps}>
                    <InnerBlocks
                        orientation="horizontal"
                        allowedBlocks={[
                            'phishsticks-plus/team-member'
                        ]}
                        template={[
                            [
                                'phishsticks-plus/team-member',
                                {
                                    name: 'Bozo',
                                    title: 'CEO of clowns',
                                    bio: 'A real human being'
                                }
                            ],
                            [ 'phishsticks-plus/team-member' ],
                            [ 'phishsticks-plus/team-member' ]
                        ]}
                        //templateLock="insert"
                    />
                </div>
            </>
        );
    },
    save({ attributes }) {
        const { columns } = attributes;
        const blockProps = useBlockProps.save({
            className: `cols-${columns}`
        });

        return (
            <div {...blockProps}>
                <InnerBlocks.Content />
            </div>
        )
    }
});