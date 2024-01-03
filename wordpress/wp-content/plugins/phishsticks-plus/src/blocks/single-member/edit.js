import {
    useBlockProps,
    InspectorControls,
    RichText,
    MediaPlaceholder,
    BlockControls,
    MediaReplaceFlow
} from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import {
    PanelBody,
    TextareaControl,
    Button,
    Spinner,
    ToolbarButton,
    Tooltip,
    Icon,
    TextControl
} from '@wordpress/components';
import { isBlobURL, revokeBlobURL } from '@wordpress/blob';
import { useState } from  '@wordpress/element'
export default function({ attributes, setAttributes, context, isSelected }) {
    const {
        name, title, bio, imgID, imgAlt, imgURL, socialHandles
    } = attributes;
    const blockProps = useBlockProps();

    const [imgPreview, setImgPreview] = useState(imgURL);

    const selectImage = img => {
        let newImgURL = null

        if (isBlobURL(img.url)) {
            newImgURL = img.url;
        } else {
            newImgURL = img.sizes ?
                img.sizes.teamMember.url :
                img.media_details.sizes.teamMember.source_url;

            setAttributes({
                imgID: img.id,
                imgAlt: img.alt,
                imgURL: newImgURL
            });

            revokeBlobURL(imgPreview);
        }

        setImgPreview(newImgURL);
    }
    const selectURL = url => {
        console.log('url')
        setAttributes({
            imgID: null,
            imgAlt: null,
            imgURL: url
        });

        setImgPreview(newImgURL);
    }

    const imageClass = `wp-image-${imgID} img-${context["phishsticks-plus/image-shape"]}`;
    setAttributes({
        imageShape: context["phishsticks-plus/image-shape"]
    });

    const [activeSocialLink, setActiveSocialLink] = useState(null);

    return (
        <>
            {
                imgPreview && (
                <BlockControls group="inline">
                        <MediaReplaceFlow
                            name={__('Replace Image','phishsticks-plus')}
                            mediaId={imgID}
                            mediaURL={imgURL}
                            acceptedTypes={['image']}
                            accept={'image/*'}
                            onError={error => console.error(error)}
                            onSelect={selectImage}
                            onSelectURL={selectURL}
                        />
                        <ToolbarButton
                            onClick={() => {
                                setAttributes({
                                    imgID: 0,
                                    imgAlt: "",
                                    imgURL: ""
                                });
                            }}
                        >
                            {__('Remove Image','phishsticks-plus')}
                        </ToolbarButton>
                </BlockControls>
                )}
            <InspectorControls>
                <PanelBody title={__('Settings', 'phishsticks-plus')}>
                    {
                        imgPreview && !isBlobURL(imgPreview) && (
                        <TextareaControl
                            label={__('Alt Attribute', 'phishsticks-plus')}
                            value={imgAlt}
                            onChange={imgAlt => setAttributes({imgAlt})}
                            help={__(
                                'Description of your image for screen readers.',
                                'phishsticks-plus'
                            )}
                        />
                        )}
                </PanelBody>
            </InspectorControls>
            <div {...blockProps}>
                <div className="author-meta">
                    {
                        imgPreview && <img src={imgPreview} alt={imgAlt} className={imageClass}/>
                    }
                    {
                        isBlobURL(imgPreview) && <Spinner />
                    }
                    <MediaPlaceholder
                        acceptedTypes={['image']}
                        accept={'image/*'}
                        icon="admin-users"
                        onSelect={selectImage}
                        onError={error => console.error(error)}
                        disableMediaButtons={imgPreview}
                        onSelectURL={selectURL}
                    />
                    <p>
                        <RichText
                            placeholder={__('Name', 'phishsticks-plus')}
                            tagName="strong"
                            onChange={name => setAttributes({name})}
                            value={name}
                        />
                        <RichText
                            placeholder={__('Title', 'phishsticks-plus')}
                            tagName="span"
                            onChange={title => setAttributes({title})}
                            value={title}
                        />
                    </p>
                </div>
                {
                    imgPreview &&
                    <Button
                        variant="secondary"
                        onClick={() => {
                            setAttributes({
                                imgID: null,
                                imgAlt: null,
                                imgURL: null
                            })
                            setImgPreview(null)
                            revokeBlobURL(imgPreview);
                        }}
                    >
                        {__('Reset','phishsticks-plus')}
                    </Button>
                }
                <div className="member-bio">
                    <RichText
                        placeholder={__('Member bio', 'phishsticks-plus')}
                        tagName="p"
                        onChange={bio => setAttributes({bio})}
                        value={bio}
                    />
                </div>
                <div className="social-links">
                    {socialHandles.map((handle, index) => {
                        return <a
                            href={handle.url}
                            key={index}
                            onClick={event => {
                                event.preventDefault();
                                setActiveSocialLink(
                                    activeSocialLink === index ? null : index
                                );
                            }}
                            className={
                            activeSocialLink === index && isSelected ? "is-active" : ""
                            }
                        >
                            <i className={`bi bi-${handle.icon}`}></i>
                        </a>
                    })}
                    {
                        isSelected &&
                        <Tooltip
                            text={__('Add Social Media Handle', 'phishsticks-plus')}
                        >
                            <a href="#"
                               onClick={event => {
                                   event.preventDefault()
                                   setAttributes({
                                       socialHandles: [
                                           ...socialHandles,
                                           {
                                               icon: "question",
                                               url: ""
                                           }
                                       ]
                                   });
                                   setActiveSocialLink(socialHandles.length);
                               }}
                            >
                                <Icon icon="plus" />
                            </a>
                        </Tooltip>
                    }
                </div>
                {
                    isSelected && activeSocialLink !== null &&
                    <div className="team-member-social-edit-ctr">
                        <TextControl
                            label={__('URL', 'phishsticks-plus')}
                            value={socialHandles[activeSocialLink].url}
                            onChange={url => {
                                const tempLink = { ...socialHandles[activeSocialLink] };
                                const newSocial = [...socialHandles];

                                tempLink.url = url;
                                newSocial[activeSocialLink] = tempLink;

                                setAttributes({
                                    socialHandles: newSocial
                                });
                            }}
                        />
                        <TextControl
                            label={__('Icon', 'phishsticks-plus')}
                            value={socialHandles[activeSocialLink].icon}
                            onChange={icon => {
                                const tempLink = { ...socialHandles[activeSocialLink] };
                                const newSocial = [...socialHandles];

                                tempLink.icon = icon;
                                newSocial[activeSocialLink] = tempLink;

                                setAttributes({
                                    socialHandles: newSocial
                                });
                            }}
                        />
                        <Button isDestructive onClick={() => {
                            const tempCopy = [...socialHandles];
                            tempCopy.splice(activeSocialLink, 1);

                            setAttributes({
                                socialHandles: tempCopy
                            });
                            setActiveSocialLink(null);
                        }}>
                            {__('Remove', 'phishsticks-plus')}
                        </Button>
                    </div>
                }
            </div>
        </>
    );
}