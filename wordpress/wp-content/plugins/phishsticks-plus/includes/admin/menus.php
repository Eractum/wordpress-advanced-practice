<?php

function up_admin_menus() {
    add_menu_page(
        __('FishSticks Plus', 'phishsticks-plus'),
        __('FishSticks Plus', 'phishsticks-plus'),
        'edit_theme_options',
        'up-plugin-options',
        'up_plugin_options_page',
        plugins_url('letter-u.svg', UP_PLUGIN_FILE)
    );

    add_submenu_page(
        'up-plugin-options',
        __('Alt FishSticks Plus', 'phishsticks-plus'),
        __('Alt FishSticks Plus', 'phishsticks-plus'),
        'edit_theme_options',
        'up-plugin-options-alt',
        'up_plugin_options_alt_page'
    );
}