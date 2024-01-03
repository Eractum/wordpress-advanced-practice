<?php

function up_recipe_post_type() {
    $labels = array(
        'name'                  => _x( 'Recipes', 'Post type general name', 'udemi-plus' ),
        'singular_name'         => _x( 'Recipe', 'Post type singular name', 'udemi-plus' ),
        'menu_name'             => _x( 'Recipes', 'Admin Menu text', 'udemi-plus' ),
        'name_admin_bar'        => _x( 'Recipe', 'Add New on Toolbar', 'udemi-plus' ),
        'add_new'               => __( 'Add New', 'udemi-plus' ),
        'add_new_item'          => __( 'Add New Recipe', 'udemi-plus' ),
        'new_item'              => __( 'New Recipe', 'udemi-plus' ),
        'edit_item'             => __( 'Edit Recipe', 'udemi-plus' ),
        'view_item'             => __( 'View Recipe', 'udemi-plus' ),
        'all_items'             => __( 'All Recipes', 'udemi-plus' ),
        'search_items'          => __( 'Search Recipes', 'udemi-plus' ),
        'parent_item_colon'     => __( 'Parent Recipes:', 'udemi-plus' ),
        'not_found'             => __( 'No Recipes found.', 'udemi-plus' ),
        'not_found_in_trash'    => __( 'No Recipes found in Trash.', 'udemi-plus' ),
        'featured_image'        => _x( 'Recipe Cover Image', 'Overrides the “Featured Image” phrase for this post type. Added in 4.3', 'udemi-plus' ),
        'set_featured_image'    => _x( 'Set cover image', 'Overrides the “Set featured image” phrase for this post type. Added in 4.3', 'udemi-plus' ),
        'remove_featured_image' => _x( 'Remove cover image', 'Overrides the “Remove featured image” phrase for this post type. Added in 4.3', 'udemi-plus' ),
        'use_featured_image'    => _x( 'Use as cover image', 'Overrides the “Use as featured image” phrase for this post type. Added in 4.3', 'udemi-plus' ),
        'archives'              => _x( 'Recipe archives', 'The post type archive label used in nav menus. Default “Post Archives”. Added in 4.4', 'udemi-plus' ),
        'insert_into_item'      => _x( 'Insert into Recipe', 'Overrides the “Insert into post”/”Insert into page” phrase (used when inserting media into a post). Added in 4.4', 'udemi-plus' ),
        'uploaded_to_this_item' => _x( 'Uploaded to this Recipe', 'Overrides the “Uploaded to this post”/”Uploaded to this page” phrase (used when viewing media attached to a post). Added in 4.4', 'udemi-plus' ),
        'filter_items_list'     => _x( 'Filter Recipes list', 'Screen reader text for the filter links heading on the post type listing screen. Default “Filter posts list”/”Filter pages list”. Added in 4.4', 'udemi-plus' ),
        'items_list_navigation' => _x( 'Recipes list navigation', 'Screen reader text for the pagination heading on the post type listing screen. Default “Posts list navigation”/”Pages list navigation”. Added in 4.4', 'udemi-plus' ),
        'items_list'            => _x( 'Recipes list', 'Screen reader text for the items list heading on the post type listing screen. Default “Posts list”/”Pages list”. Added in 4.4', 'udemi-plus' ),
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true, //&recipe=pizza
        'rewrite'            => array( 'slug' => 'recipe' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'supports'           => array( 'title', 'editor', 'author', 'thumbnail', 'excerpt', 'custom-fields' ),
        'show_in_rest'       => true,
        'description'        => __('A custom post type for recipes', 'phishsticks-plus'),
        'taxonomies'         => ['category', 'post_tag']
    );

    register_post_type( 'recipe', $args );
    register_taxonomy('cuisine', 'recipe', [
        'label' => __('Cuisine', 'phishsticks_plus'),
        'rewrite' => ['slug' => 'cuisine'],
        'show_in_rest' => true
    ]);

    register_term_meta('cuisine', 'more_info_url', [
        'type' => 'string',
        'description' => __('A URL a user can click to learn more information about the cuisine','phishsticks-plus'),
        'single' => true,
        'show_in_rest' => true,
        'default' => '#'
    ]);

    register_post_meta('rating', 'recipe_rating', [
        'type' => 'number',
        'description' => __('Rating for recipe','phishsticks-plus'),
        'single' => true,
        'show_in_rest' => true,
        'default' => '0'
    ]);

    register_post_meta('', 'og_title', [
        'single' => true,
        'type' => 'string',
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('', 'og_description', [
        'single' => true,
        'type' => 'string',
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('', 'og_image', [
        'single' => true,
        'type' => 'string',
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);

    register_post_meta('', 'og_override_image', [
        'single' => true,
        'type' => 'boolean',
        'default' => false,
        'show_in_rest' => true,
        'sanitize_callback' => 'sanitize_text_field',
        'auth_callback' => function() {
            return current_user_can('edit_posts');
        }
    ]);
}