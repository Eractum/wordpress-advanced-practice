import { registerBlockType } from '@wordpress/blocks';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import icons from '../../icons.js'
import './main.css'

registerBlockType('phishsticks-plus/auth-modal', {
    icon: {
        src: icons.primary
    },
    edit({ attributes, setAttributes }) {
        const { showRegister } = attributes;
        const blockProps = useBlockProps();

        return (
            <>
                <InspectorControls>
                    <PanelBody title={ __('General', 'phishsticks-plus') }>
                        <ToggleControl
                            label={__('Show Register', 'phishsticks-plus')}
                            checked={showRegister}
                            onChange={showRegister => setAttributes({ showRegister })}
                            help={
                                showRegister
                                    ?
                                    __( 'Shows Registration Form', 'phishsticks-plus')
                                    :
                                    __( 'Does not show Registration Form', 'phishsticks-plus')
                            }
                        />
                    </PanelBody>
                </InspectorControls>
                <div { ...blockProps }>
                    {__('This block is not previewable from the editor. View your site for a live demo.', 'phishsticks-plus')}
                </div>
            </>
        );
    }
});