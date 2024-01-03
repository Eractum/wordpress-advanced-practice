<?php

function up_activate_plugin() {
    if(version_compare(get_bloginfo('version'), '5.9', '<')) {
        wp_die(__('Update Wordpress, Bozo!', 'phishsticks-plus'));
    }

    up_recipe_post_type();
    flush_rewrite_rules();

    global $wpdb;
    $tableName = "{$wpdb->prefix}recipe_ratings";
    $charsetCollate = "{$wpdb->get_charset_collate()}";

    $sql = "
    CREATE TABLE {$tableName} (
        recipe_id BIGINT(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
        post_id BIGINT(20) UNSIGNED NOT NULL ,
        user_id BIGINT(20) UNSIGNED NOT NULL ,
        rating FLOAT(3,2) UNSIGNED NOT NULL ,
        PRIMARY KEY (recipe_id)) ENGINE = InnoDB {$charsetCollate};
    ";

    require_once(ABSPATH . "/wp-admin/includes/upgrade.php");
    dbDelta($sql);

    //OPTIONS

    $options = get_option('up_options');

    if(!$options) {
        add_option('up_options', [
            'og_title'       => get_bloginfo('name'),
            'og_image'       => '',
            'og_description' => get_bloginfo('description'),
            'enable_og'      => 1
        ]);
    }
}