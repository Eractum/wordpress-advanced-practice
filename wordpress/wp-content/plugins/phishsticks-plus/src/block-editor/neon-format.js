import "./neon.css";
import { registerFormatType, toggleFormat } from "@wordpress/rich-text";
import { RichTextToolbarButton } from "@wordpress/block-editor";
import { __ } from "@wordpress/i18n";
import { useSelect } from "@wordpress/data";

registerFormatType("phishsticks-plus/neon", {
    title: __("Neon", "phishsticks-plus"),
    tagName: "span",
    className: "neon",
    edit({ isActive, onChange, value }) {
        const selectedBlock = useSelect(select => select("core/block-editor").getSelectedBlock());

        return <>
            {selectedBlock?.name === "core/paragraph" &&
                <RichTextToolbarButton
                    title={__("Neon", "phishsticks-plus")}
                    icon="superhero"
                    isActive={isActive}
                    onClick={() => {
                        onChange(toggleFormat(value, {
                            type: "phishsticks-plus/neon"
                        }));
                    }}
                />
            }
        </>
    }
});