<?php

function up_load_php_translations() {
    load_plugin_textdomain('phishsticks-plus', false, 'phishsticks-plus/languages');
}

function up_load_block_translations() {
    $blocks = [
        'phishsticks-plus-fancy-header-editor-script',
        'phishsticks-plus-advanced-search-editor-script',
        'phishsticks-plus-page-header-editor-script',
        'phishsticks-plus-featured-video-editor-script',
        'phishsticks-plus-header-tools-editor-script',
        'phishsticks-plus-auth-modal-script',
        'phishsticks-plus-auth-modal-editor-script',
        'phishsticks-plus-recipe-summary-script',
        'phishsticks-plus-recipe-summary-editor-script',
        'phishsticks-plus-team-members-group-editor-script',
        'phishsticks-plus-team-member-editor-script',
        'phishsticks-plus-popular-recipes-editor-script',
        'phishsticks-plus-daily-recipe-editor-script'
    ];

    foreach ($blocks as $block) {
        wp_set_script_translations(
            $block,
            "phishsticks-plus",
            UP_PLUGIN_DIR . "languages"
        );
    }
}