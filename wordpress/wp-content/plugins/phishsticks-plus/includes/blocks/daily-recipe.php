<?php

function up_daily_recipe_cb($atts) {
    $title = esc_attr($atts['title']);
    $id = get_transient('up_daily_recipe_id');

    if(!$id) {
        $id = up_generate_daily_recipe();
    }

    ob_start();
    ?>
    <div class="wp-block-phishsticks-plus-daily-recipe">
        <h6><?php echo $title; ?></h6>
        <a href="<?php echo get_permalink($id); ?>">
            <img src="<?php echo get_the_post_thumbnail($id, 'full'); ?>" />
            <h3><?php echo get_the_title($id); ?></h3>
        </a>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();

    return $output;
}