<?php

function up_custom_image_sizes($sizes) {
    return array_merge($sizes, [
        'teamMember' => __('Team Member', 'phishsticks-plus'),
        'opengraph' => __('Open Graph', 'phishsticks-plus')
    ]);
}