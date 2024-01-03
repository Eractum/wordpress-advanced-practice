<?php

function u_register_plugins() {
    $plugins = [
        [
            'name' => 'Regenerate Thumbnails',
            'slug' => 'regenerate-thumbnails',
            'required' => false
        ],
        [
            'name' => 'FishSticks Plus',
            'slug' => 'phishsticks-plus',
            'required' => true,
            'source' => 'plugins/phishsticks-plus.zip'
        ]
    ];
    $config = [
        'id' => 'phishsticks',
        'menu' => 'tgmpa-install-plugins',
        'parent-slug' => 'themes.php',
        'capability' => 'edit_theme_options',
        'has_notices' => true,
        'dismissable' => true
    ];

    tgmpa($plugins, $config);
}