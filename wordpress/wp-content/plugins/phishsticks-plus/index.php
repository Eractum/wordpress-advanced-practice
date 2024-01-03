<?php
/**
 * Plugin Name:       FishSticks Plus
 * Plugin URI:        https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * Description:       A plugin to make your Bozo's life easier
 * Version:           1.0.0
 * Requires at least: 5.9
 * Requires PHP:      6.3
 * Author:            Me lol
 * Author URI:        https://www.youtube.com/watch?v=dQw4w9WgXcQ
 * Text Domain:       phishsticks-plus
 * Domain Path:       /languages
 */

if (!function_exists('add_action')) {
    echo 'I don\'t really like your attitude, you hacking person. I have evaluated your location and reported it as a criminal organisation headquarters to the US Government. You will be nuked shortly. Now think about your behaviour :)';
    exit;
}

//Setup
define('UP_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('UP_PLUGIN_FILE', __FILE__);

//Includes
$rootFiles = glob(UP_PLUGIN_DIR . 'includes/*.php');
$subRootFiles = glob(UP_PLUGIN_DIR . 'includes/**/*.php');

$allFiles = array_merge($rootFiles, $subRootFiles);

foreach ($allFiles as $file) {
    include_once($file);
}

//Hooks
register_activation_hook(__FILE__, 'up_activate_plugin');
add_action('init', 'up_register_blocks');
add_action('init', 'up_recipe_post_type');
add_action('rest_api_init', 'up_rest_api_init');
add_action('wp_enqueue_scripts','up_enqueue_scripts');
add_action('cuisine_add_form_fields', 'up_cuisine_add_form_fields');
add_action('create_cuisine', 'up_save_cuisine_meta');
add_action('cuisine_edit_form_fields', 'up_cuisine_edit_form_fields');
add_action('edited_cuisine', 'up_save_cuisine_meta');
add_action('save_post_recipe', 'up_save_post_recipe');
add_action('after_setup_theme', 'up_setup_theme');
add_filter('image_size_names_choose', 'up_custom_image_sizes');
add_filter('rest_recipe_query','up_rest_recipe_query', 10, 2);
add_action('admin_menu', 'up_admin_menus');
add_action('admin_post_up_save_options', 'up_save_options');
add_action('admin_enqueue_scripts', 'up_admin_enqueue');
add_action('init', 'up_register_assets');
add_action('admin_init', 'up_settings_api');
add_action('enqueue_block_editor_assets', 'up_enqueue_block_editor_assets');
add_action('wp_head', 'up_wp_head');
add_action('init', 'up_load_php_translations');
add_action('wp_enqueue_scripts', 'up_load_block_translations', 100);
