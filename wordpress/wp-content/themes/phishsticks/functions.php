<?php
// Variable Declarations

// Includes
include_once('includes/fronts/enqueue.php');
include_once('includes/fronts/head.php');
include_once('includes/register-plugins.php');
include_once('includes/setup.php');
include_once('includes/class-tgm-plugin-activation.php');
// Hooks
add_action('wp_enqueue_scripts', 'u_enqueue');
add_action('wp_head', 'u_head', 5);
add_action('after_setup_theme', 'u_setup_theme');
add_action('tgmpa_register', 'u_register_plugins');
