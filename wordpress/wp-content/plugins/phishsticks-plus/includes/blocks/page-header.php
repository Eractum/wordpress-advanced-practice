<?php

function up_page_header_render_cb($atts) {
    $heading = isset($atts['content'])||!esc_attr($atts['showCategory']) ? esc_attr($atts['content']) : get_the_archive_title();

    ob_start();
    ?>
    <div class="wp-block-phishsticks-plus-page-header">
        <div class="inner-page-header">
            <h1>
                <?php echo $heading; ?>
            </h1>
        </div>
    </div>
    <?php
    $output = ob_get_contents();
    ob_end_clean();

    return $output;
}