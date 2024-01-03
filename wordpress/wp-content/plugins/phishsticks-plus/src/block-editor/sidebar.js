import { registerPlugin } from "@wordpress/plugins";
import { PluginSidebar } from "@wordpress/edit-post";
import {
    PanelBody,
    TextControl,
    TextareaControl,
    ToggleControl,
    Button
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { useSelect, useDispatch } from "@wordpress/data";
import { MediaUpload, MediaUploadCheck } from "@wordpress/block-editor";

registerPlugin("up-sidebar", {
    render() {
        const { og_title, og_image, og_description, og_override_image } = useSelect(select => {
            return select("core/editor").getEditedPostAttribute("meta");
        });

        const { editPost } = useDispatch("core/editor");

        return <PluginSidebar
            name="up_sidebar"
            icon="share"
            title={__("FishSticks Plus Sidebar", "phishsticks-plus")}
        >
            <PanelBody title={__("Opengraph Options", "phishsticks-plus")}>
                <TextControl
                    label={__("Title", "phishsticks-plus")}
                    value={og_title}
                    onChange={og_title => editPost({
                        meta: {
                            og_title
                        }
                    })}
                />
                <TextareaControl
                    label={__("Description", "phishsticks-plus")}
                    value={og_description}
                    onChange={og_description => editPost({
                        meta: {
                            og_description
                        }
                    })}
                />
                <ToggleControl
                    label={__("Override Featured Image", "phishsticks-plus")}
                    checked={og_override_image}
                    help={__(
                        "By default, the featured image will be used as the image. Check this option to use a different image.",
                        "phishsticks-plus"
                    )}
                    onChange={og_override_image => editPost({
                        meta: {
                            og_override_image
                        }
                    })}
                />
                { og_override_image &&
                <>
                    <img src={og_image} />
                    <MediaUploadCheck>
                        <MediaUpload
                            accept={["image"]}
                            render={({ open }) => {
                                return <Button isPrimary onClick={open}>
                                    {__("Change Image", "phishsticks-plus")}
                                </Button>
                            }}
                            onSelect={(image) => {
                                editPost({
                                    meta: {
                                        og_image: image.sizes.opengraph.url
                                    }
                                })
                            }}
                        />
                    </MediaUploadCheck>
                </>
                }
            </PanelBody>
        </PluginSidebar>
    }
});